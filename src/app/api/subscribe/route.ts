import { Resend } from 'resend';
import { verifyTurnstile } from '@/lib/turnstile';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    return Response.json({ ok: true });
  }

  if (body.consent !== true) {
    return Response.json({ error: 'consent_required' }, { status: 422 });
  }

  const ip =
    req.headers.get('CF-Connecting-IP') ??
    req.headers.get('x-forwarded-for')?.split(',')[0] ??
    null;

  if (!(await verifyTurnstile(body.token, ip))) {
    return Response.json({ error: 'verification_failed' }, { status: 403 });
  }

  const email =
    typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'invalid_email' }, { status: 422 });
  }

  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 5) : '—';

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      subject: 'Bulgarcamo — journal, nouvelle inscription',
      text: `${email}\nLocale : ${locale}\nConsentement : oui`,
    });
  } catch {
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
