import { Resend } from 'resend';
import { verifyTurnstile } from '@/lib/turnstile';

export const runtime = 'nodejs';

const MAX = { name: 120, email: 200, subject: 200, message: 5000 };

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  // Pot de miel rempli = robot. On répond 200 pour ne rien lui apprendre.
  if (clean(body.company, 50)) return Response.json({ ok: true });

  const ip =
    req.headers.get('CF-Connecting-IP') ??
    req.headers.get('x-forwarded-for')?.split(',')[0] ??
    null;

  if (!(await verifyTurnstile(body.token, ip))) {
    return Response.json({ error: 'verification_failed' }, { status: 403 });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const subject = clean(body.subject, MAX.subject) || 'Bulgarcamo — enquiry';
  const message = clean(body.message, MAX.message);
  const locale = clean(body.locale, 5);

  if (!email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'invalid_fields' }, { status: 422 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject,
      text: `${name || '—'} <${email}>${locale ? ` · ${locale}` : ''}\n\n${message}`,
      html: `<p><strong>${escapeHtml(name || '—')}</strong> &lt;${escapeHtml(email)}&gt;${
        locale ? ` · ${escapeHtml(locale)}` : ''
      }</p>
             <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch {
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
