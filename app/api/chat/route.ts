import { NextResponse } from "next/server";
import {
  CLEVER_CROW_SYSTEM_PROMPT,
  CACHED_RESPONSES,
  findCachedResponse,
  isOffTopicQuery,
  OFF_TOPIC_RESPONSE,
  UNKNOWN_OPERATIONAL_FALLBACK,
  synthesizeLocalResponse,
} from "@/lib/chatbotKnowledge";

export const dynamic = "force-dynamic";

/**
 * Normalizes and cleans raw LLM output to guarantee mobile chat bubble aesthetics.
 * Strips raw markdown tables, converts pipe rows to bullets, removes raw HTML tags.
 */
function sanitizeLlmResponse(text: string): string {
  if (!text) return "";

  // Replace <br>, <br/> with clean newlines
  let t = text.replace(/<br\s*\/?>/gi, "\n");

  // Remove table horizontal divider lines like |---|---|
  t = t.replace(/^\s*\|[-:\s|]+\|\s*$/gm, "");

  // Transform markdown table rows | Key | Value | into clean bullet points
  const rawLines = t.split("\n");
  const processedLines: string[] = [];

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);

      // Skip header rows like | Details | or | 📌 | Details |
      if (
        cells.length === 0 ||
        (cells.length === 2 &&
          (cells[0].toLowerCase() === "category" ||
            cells[0].toLowerCase() === "📌" ||
            cells[1].toLowerCase() === "details"))
      ) {
        continue;
      }

      if (cells.length === 2) {
        const cleanKey = cells[0].replace(/\*\*/g, "").replace(/\*/g, "");
        processedLines.push(`• **${cleanKey}:** ${cells[1]}`);
      } else if (cells.length > 2) {
        processedLines.push(`• ${cells.join(" — ")}`);
      } else if (cells.length === 1) {
        processedLines.push(`• ${cells[0]}`);
      }
    } else {
      processedLines.push(line);
    }
  }

  // De-duplicate consecutive identical lines
  const deduped: string[] = [];
  for (const l of processedLines) {
    if (
      deduped.length > 0 &&
      l.trim() !== "" &&
      l.trim() === deduped[deduped.length - 1].trim()
    ) {
      continue;
    }
    deduped.push(l);
  }

  return deduped.join("\n").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array provided" },
        { status: 400 }
      );
    }

    const latestUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // 1. Guardrail 1: Off-topic deflection
    if (isOffTopicQuery(latestUserMessage)) {
      return NextResponse.json({
        reply: OFF_TOPIC_RESPONSE,
        provider: "cache-guardrail",
      });
    }

    // 2. High-speed Cached Responses for common / obvious questions (0ms, 0 tokens)
    const cachedMatch = findCachedResponse(latestUserMessage);
    if (cachedMatch) {
      return NextResponse.json({
        reply: cachedMatch.reply,
        provider: "cache",
        category: cachedMatch.category,
      });
    }

    // 3. Live LLM Inference via Groq (Primary: Qwen 2.5 32B / Qwen 3.8 27B)
    const groqApiKey = process.env.GROQ_API_KEY;
    if (groqApiKey) {
      try {
        const groqMessages = [
          { role: "system", content: CLEVER_CROW_SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ];

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
            messages: groqMessages,
            temperature: 0.3,
            max_tokens: 650,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const rawReply = data.choices?.[0]?.message?.content?.trim() || "";
          if (rawReply) {
            const cleanReply = sanitizeLlmResponse(rawReply);
            return NextResponse.json({ reply: cleanReply, provider: "groq" });
          }
        } else {
          const errText = await groqRes.text();
          console.warn(`Groq primary model returned ${groqRes.status}:`, errText);
          const fallbackRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqApiKey}`,
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: groqMessages,
              temperature: 0.3,
              max_tokens: 650,
            }),
          });
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const rawFallbackReply = fallbackData.choices?.[0]?.message?.content?.trim() || "";
            if (rawFallbackReply) {
              const cleanReply = sanitizeLlmResponse(rawFallbackReply);
              return NextResponse.json({ reply: cleanReply, provider: "groq-backup" });
            }
          }
        }
      } catch (groqErr) {
        console.error("Groq API call failed:", groqErr);
      }
    }

    // 4. Fallback Provider: Google Gemini
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const contents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: CLEVER_CROW_SYSTEM_PROMPT }],
              },
              contents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
          if (rawReply) {
            return NextResponse.json({
              reply: sanitizeLlmResponse(rawReply),
              provider: "gemini",
            });
          }
        }
      } catch (geminiErr) {
        console.error("Gemini API call failed:", geminiErr);
      }
    }

    // 5. Fallback Provider: OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
      try {
        const openAiMessages = [
          { role: "system", content: CLEVER_CROW_SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ];

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: openAiMessages,
            temperature: 0.3,
            max_tokens: 600,
          }),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          const rawReply = data.choices?.[0]?.message?.content?.trim() || "";
          if (rawReply) {
            return NextResponse.json({
              reply: sanitizeLlmResponse(rawReply),
              provider: "openai",
            });
          }
        }
      } catch (openAiErr) {
        console.error("OpenAI API call failed:", openAiErr);
      }
    }

    // 6. Intelligent Local Synthesis Fallback (when external LLMs fail or rate-limit)
    const localReply = synthesizeLocalResponse(latestUserMessage);
    return NextResponse.json({
      reply: localReply,
      provider: "clevercrow-local-engine",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: UNKNOWN_OPERATIONAL_FALLBACK,
        provider: "fallback",
      },
      { status: 200 }
    );
  }
}
