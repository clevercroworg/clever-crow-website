import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message, source } = body

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

      const info = await transporter.sendMail({
        from: `"clever crow" <${process.env.SMTP_USER}>`,
        to: process.env.TO_EMAIL || "manojvg900@gmail.com",
        subject: `New Lead: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #fbbf24;">🆕 New AI Lead Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Requirement:</strong> ${message || "Interested in services"}</p>
            <p><strong>Source:</strong> ${source || "Chatbot"}</p>
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
