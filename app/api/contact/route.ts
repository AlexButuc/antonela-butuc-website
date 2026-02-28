import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'alexbutuc@proton.me',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #c9a962; padding-bottom: 10px;">New Contact Form Submission</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666; width: 100px;">Name:</td>
              <td style="padding: 10px 0; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #c9a962; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #c9a962;">
            <p style="margin: 0; font-weight: bold; color: #666; margin-bottom: 10px;">Message:</p>
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    console.log('Email sent:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
