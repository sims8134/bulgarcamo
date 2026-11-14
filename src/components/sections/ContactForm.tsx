'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/cn';
import { AccentTitle } from '@/components/primitives/AccentTitle';

interface Props {
  initialSubject?: string;
  initialRef?: string;
  initialPiece?: string;
}

export default function ContactForm({
  initialSubject,
  initialRef,
  initialPiece,
}: Props) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [token, setToken] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Rendu explicite du widget Turnstile : le scan automatique du script
  // n'a lieu qu'une fois, au chargement, et rate les pages atteintes ensuite.
  useEffect(() => {
    let cancelled = false;

    const render = () => {
      const ts = (window as unknown as { turnstile?: {
        render: (el: HTMLElement, opts: Record<string, unknown>) => string;
        reset: (id?: string) => void;
      } }).turnstile;

      if (!ts || !widgetRef.current || cancelled) return false;
      if (widgetId.current !== undefined) return true;

      widgetId.current = ts.render(widgetRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'dark',
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

  const subjectMap: Record<string, string> = {
    'made-to-measure': t('subjects.made_to_measure'),
    trade: t('subjects.trade'),
  };

  const initialMessage = initialRef
    ? t('preset_message_piece', { ref: initialRef })
    : initialSubject === 'made-to-measure'
    ? t('preset_message_mtm')
    : initialSubject === 'trade'
    ? t('preset_message_trade')
    : '';

  const presetSubject =
    initialSubject && subjectMap[initialSubject]
      ? subjectMap[initialSubject]
      : initialRef
      ? t('subjects.piece', { ref: initialRef })
      : '';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    const message = (data.get('message') as string) ?? '';
    const piece = data.get('piece') as string | null;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: (data.get('subject') as string) || t('default_subject'),
          message: `${message}${piece ? `\n\n— Pièce : ${piece}` : ''}`,
          company: data.get('company'), // pot de miel
          locale,
          token,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        // Un jeton Turnstile est à usage unique : on en redemande un.
        const ts = (window as unknown as { turnstile?: { reset: (id?: string) => void } }).turnstile;
        ts?.reset(widgetId.current);
        setToken('');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <article className="relative min-h-screen">
      <div className="container-page pt-14 lg:pt-22 pb-22">
        <div className="grid grid-cols-12 gap-6">
          {/* Colonne gauche — intro sticky */}
          <div className="col-span-12 lg:col-span-4 space-y-8 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="heading-md">
              <AccentTitle text={t('title')} />
            </h1>
            <p className="lede max-w-prose-narrow">{t('intro')}</p>
            <div className="space-y-3 pt-8 border-t border-line">
              <p className="eyebrow">{t('direct_label')}</p>
              <p>
                <a href="mailto:contact@bulgarcamo.com" className="link-line text-lede">
                  contact@bulgarcamo.com
                </a>
              </p>
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                  {initialPiece && (
                    <input type="hidden" name="piece" defaultValue={initialPiece} />
                  )}

                  <FormField name="name" label={t('fields.name')} required />
                  <FormField name="email" label={t('fields.email')} type="email" required />
                  <FormField
                    name="subject"
                    label={t('fields.subject')}
                    defaultValue={presetSubject}
                  />
                  <FormField
                    name="message"
                    label={t('fields.message')}
                    multiline
                    defaultValue={initialMessage}
                    required
                  />

                  {/* Pot de miel — invisible pour un humain, rempli par les robots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div ref={widgetRef} />

                  <div className="pt-6 border-t border-line space-y-4">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="cta"
                    >
                      <span>{status === 'sending' ? t('sending') : t('submit')}</span>
                      <span aria-hidden>→</span>
                    </button>

                    {status === 'error' && (
                      <p role="alert" className="label text-text">
                        {t('error_message')}
                      </p>
                    )}
                  </div>
              </form>
            ) : (
              <div role="status" className="space-y-6 pt-12">
                  <p className="eyebrow">{t('sent_eyebrow')}</p>
                  <p
                    className="text-text font-medium"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
                  >
                    {t('sent_title')}
                  </p>
                  <p className="prose-narrow">
                    {t('sent_body')}
                  </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function FormField({
  name,
  label,
  type = 'text',
  required = false,
  multiline = false,
  defaultValue = '',
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  defaultValue?: string;
}) {
  const baseClasses = 'field';

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block label text-text-muted"
      >
        {label} {required && <span aria-hidden className="text-accent">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={5}
          defaultValue={defaultValue}
          className={cn(baseClasses, 'resize-none leading-relaxed')}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          className={baseClasses}
        />
      )}
    </div>
  );
}