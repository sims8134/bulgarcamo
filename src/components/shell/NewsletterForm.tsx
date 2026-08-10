'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

export default function NewsletterForm() {
  const t = useTranslations('footer.journal');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(''); // pot de miel
  const [token, setToken] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Rendu explicite du widget : le scan automatique du script Turnstile
  // n'a lieu qu'une fois, au chargement, et rate les montages ultérieurs.
  useEffect(() => {
    let cancelled = false;

    const render = () => {
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (!ts || !widgetRef.current || cancelled) return false;
      if (widgetId.current !== undefined) return true;

      widgetId.current = ts.render(widgetRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'light',
        callback: (value: string) => setToken(value),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
      return true;
    };

    if (render()) return () => { cancelled = true; };

    const interval = setInterval(() => {
      if (render()) clearInterval(interval);
    }, 300);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, company, locale, token }),
      });
      if (res.ok) {
        setState('done');
        setEmail('');
      } else {
        setState('error');
        // Un jeton Turnstile est à usage unique : on en redemande un.
        const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
        ts?.reset(widgetId.current);
        setToken('');
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return <p className="prose-narrow">{t('done')}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div className="flex items-center border-b border-encre/30 pt-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          className="flex-1 bg-transparent py-2 outline-none font-sans text-[14px] text-encre placeholder:text-encre/40"
        />
        <button
          type="submit"
          disabled={state === 'sending' || !consent}
          className="font-mono text-mono-xs uppercase text-encre hover:text-sauge-deep transition-colors duration-400 pl-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state === 'sending' ? t('sending') : t('cta')}
        </button>
      </div>

      <label className="flex items-start gap-3 font-mono text-mono-xs uppercase text-encre/55 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-encre"
        />
        <span>
          {t('consent')}{' '}
          <Link href="/legal" className="underline underline-offset-2">
            {t('consent_link')}
          </Link>
        </span>
      </label>

      {/* Pot de miel — invisible pour un humain */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div ref={widgetRef} />

      {state === 'error' && (
        <p className="font-mono text-mono-xs uppercase text-encre/55">{t('error')}</p>
      )}
    </form>
  );
}