import { Resend } from "resend";

export async function POST(request: Request) {
  const { name, email, gym, message } = await request.json();

  if (!name || !email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Athul @ LS OptimAIze <info@lsoptimaize.com>",
      to: email,
      subject: "Thanks for reaching out to LS OptimAIze!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; border: 1px solid #eaeaea; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          <h2 style="color: #111111; margin-top: 0; font-size: 24px;">Let's Talk!</h2>
          <p style="color: #444444; font-size: 16px; line-height: 1.6;">Hey ${name}, got your message.</p>
          <p style="color: #444444; font-size: 16px; line-height: 1.6;">Thanks for reaching out to <strong>LS OptimAIze</strong>. I didn't want you waiting around so here's the fastest way to talk.</p>
          
          <div style="margin: 36px 0; text-align: center; padding: 24px; background-color: #fafafa; border-radius: 8px; border: 1px solid #f0f0f0;">
            <a href="https://calendly.com/lsoptimaize/discovery-call-ls-optimaize" style="background-color: #ff3b30; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">
              📅 Book a Discovery Call
            </a>
            <p style="font-size: 13px; color: #888888; margin-top: 14px; margin-bottom: 0;">🔗 This is a secure <strong>Calendly</strong> link</p>
          </div>
          
          <p style="color: #444444; font-size: 16px; line-height: 1.6;">Pick whatever slot works for you and your time zone. A Zoom link gets sent automatically.</p>
          
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 32px 0;" />
          
          <p style="color: #666666; font-size: 14px; margin-bottom: 4px;">Best regards,</p>
          <p style="color: #111111; font-weight: 600; font-size: 16px; margin-top: 0;">Athul @ LS OptimAIze</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error: "Failed to send email." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}
