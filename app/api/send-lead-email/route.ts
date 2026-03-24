import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Initialize inside the function to avoid Next.js build errors when the API key is not present in the environment
    const resendApiKey = process.env.RESEND_API_KEY || 're_fallback_key';
    const resend = new Resend(resendApiKey);

    const { name, phone, service, pageUrl } = await request.json();

    await resend.emails.send({
      from: 'noreply@resend.dev',  // ✅ Resend's verified domain - WORKS IMMEDIATELY
      to: 'krishna@clevercrow.in',
      subject: `New Lead: ${name} for ${service}`,
      html: `
        <h2>🆕 New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Page:</strong> <a href="${pageUrl}">${pageUrl}</a></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
