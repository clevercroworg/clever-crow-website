import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Code2, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  Globe
} from "lucide-react";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, phone,
      dob_day, dob_month, dob_year,
      education, 
      country, state, address,
      run_beginning,
      consent
    } = body;

    const dob = `${dob_day} ${dob_month} ${dob_year}`;

    // Extract skill levels
    const skills: Record<string, string> = {};
    Object.keys(body).forEach(key => {
      if (key.startsWith('skill_')) {
        const skillName = key.replace('skill_', '').toUpperCase();
        skills[skillName] = body[key];
      }
    });

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Format skills for email
    const skillsHtml = Object.entries(skills)
      .map(([name, level]) => `<li><strong>${name}:</strong> ${level || 'N/A'}</li>`)
      .join('');

    const mailOptions = {
      from: `"Clever Crow Internships" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || "manojvg900@gmail.com",
      subject: `New Internship Application: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; padding: 24px;">
          <h2 style="color: #eab308; border-bottom: 2px solid #fef9c3; padding-bottom: 12px;">🎓 New Internship Application</h2>
          
          <h3 style="color: #4b5563; margin-top: 24px;">Personal Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>DOB/Age:</strong> ${dob}</p>

          <h3 style="color: #4b5563; margin-top: 24px;">Academic & Skills</h3>
          <p><strong>Education:</strong> ${education}</p>
          <ul style="list-style: none; padding-left: 0;">
            ${skillsHtml}
          </ul>

          <h3 style="color: #4b5563; margin-top: 24px;">Location</h3>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Country:</strong> ${country}</p>

          <h3 style="color: #4b5563; margin-top: 24px;">Additional Details</h3>
          <p><strong>Run from beginning:</strong> ${run_beginning}</p>
          <p><strong>Data Consent:</strong> ${consent ? 'Yes' : 'No'}</p>
          
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #9ca3af;">
            Submitted via Clever Crow Internship Portal
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Internship application email sent:", info.messageId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("INTERNSHIP API ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
