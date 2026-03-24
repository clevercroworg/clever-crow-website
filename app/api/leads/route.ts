import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, message, source } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 🔴 THIS MUST BE AWAITED
    await transporter.sendMail({
      from: `"Clever Crow Leads" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `New Lead – ${source || "Website"}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <p><strong>Source:</strong> ${source}</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("LEAD EMAIL ERROR:", error)

    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    )
  }
}
