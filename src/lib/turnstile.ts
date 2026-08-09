type VerifyResult = { success: boolean; 'error-codes'?: string[] };

export async function verifyTurnstile(
  token: unknown,
  ip?: string | null,
): Promise<boolean> {
  if (typeof token !== 'string' || token.length === 0) return false;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Pas de clé configurée : on ne bloque pas le développement local.
  if (!secret) return process.env.NODE_ENV !== 'production';

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          response: token,
          ...(ip ? { remoteip: ip } : {}),
        }),
      },
    );
    const data = (await res.json()) as VerifyResult;
    return data.success === true;
  } catch {
    return false;
  }
}
