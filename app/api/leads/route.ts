import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message, source, company, service, budget, timeline } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    try {
      console.log("Attempting to send lead email via Gmail SMTP...");
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      // Email recipients - both existing and new email
      const emailRecipients = [
        process.env.TO_EMAIL || "manojvg900@gmail.com",
        "krishna@clevercrow.in"
      ].filter(Boolean).join(",");

      const info = await transporter.sendMail({
        from: `"clever crow" <${process.env.SMTP_USER}>`,
        to: emailRecipients,
        subject: `New Lead: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 600px; background-color: #f8fafc; color: #334155;">
            <h2 style="color: #d97706; margin-top: 0; font-size: 20px; font-weight: 800; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">🆕 New Lead Received</h2>
            <div style="margin-top: 15px; font-size: 14px; line-height: 1.6;">
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Email:</strong> ${email || "Not provided"}</p>
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Phone:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Company / Website:</strong> ${company || "Not provided"}</p>
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Service Needed:</strong> ${service || "Not provided"}</p>
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Monthly Budget:</strong> ${budget || "Not provided"}</p>
              <p style="margin: 8px 0;"><strong style="color: #0f172a;">Expected Timeline:</strong> ${timeline || "Not provided"}</p>
              <p style="margin: 15px 0 8px 0; padding-top: 10px; border-top: 1px solid #e2e8f0;"><strong style="color: #0f172a;">Message / Details:</strong></p>
              <blockquote style="margin: 0; padding: 10px 15px; background-color: #fff; border-left: 4px solid #f59e0b; border-radius: 4px; font-style: italic;">
                ${message || "No additional message provided"}
              </blockquote>
              <p style="margin: 15px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; tracking-wider: 0.1em;"><strong>Lead Source:</strong> ${source || "Contact Page Form"}</p>
            </div>
          </div>
        `,
      })
      console.log("Email sent successfully:", info.messageId);
    } catch (mailError) {
      console.error("GMAIL SMTP ERROR:", mailError);
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("LEAD API ERROR:", error)
    return NextResponse.json({ success: true }, { status: 200 }) 
  }
}
