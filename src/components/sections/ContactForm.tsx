'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/primitives/Reveal';
import { cn } from '@/lib/cn';

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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const subject = data.get('subject') as string;
    const message = data.get('message') as string;
    const piece = data.get('piece') as string | null;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name,
          email,
          subject: subject || t('default_subject'),
          message: `${message}${piece ? `\n\n— Pièce : ${piece}` : ''}`,
          from_name: 'Bulgarcamo',
          replyto: email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <article className="relative bg-ivoire min-h-screen">
      <div className="container-page pt-22 lg:pt-30 pb-30">
        <div className="grid grid-cols-12 gap-6">
          {/* Colonne gauche — intro sticky */}
          <div className="col-span-12 lg:col-span-4 space-y-8 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="eyebrow">— {t('eyebrow')}</p>
            </Reveal>
            <Reveal delay={150}>
              <h1
                className="font-display font-light text-encre tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
              >
                {t('title')}
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="lede max-w-prose-narrow text-encre/80">
                {t('intro')}
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="space-y-1 pt-8 border-t border-encre/15">
                <p className="eyebrow">{t('direct_label')}</p>
                <a
                  href="mailto:contact@bulgarcamo.com"
                  className="font-display italic text-encre hover:text-encre/60 transition-colors duration-400"
                  style={{ fontSize: '1.125rem' }}
                >
                  contact@bulgarcamo.com
                </a>
              </div>
            </Reveal>
          </div>

          {/* Colonne droite — formulaire */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {status !== 'success' ? (
              <Reveal delay={200}>
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

                  <div className="pt-6 border-t border-encre/15 space-y-4">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="cta-quiet disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{status === 'sending' ? t('sending') : t('submit')}</span>
                      <span aria-hidden>→</span>
                    </button>

                    {status === 'error' && (
                      <p className="font-mono text-mono-xs uppercase text-red-700/80">
                        {t('error_message')}
                      </p>
                    )}
                  </div>
                </form>
              </Reveal>
            ) : (
              <Reveal>
                <div className="space-y-6 pt-12">
                  <p className="eyebrow">{t('sent_eyebrow')}</p>
                  <p
                    className="font-display italic text-encre"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
                  >
                    {t('sent_title')}
                  </p>
                  <p className="text-body text-encre/75 max-w-prose-narrow">
                    {t('sent_body')}
                  </p>
                </div>
              </Reveal>
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
  const baseClasses = cn(
    'w-full bg-transparent text-encre',
    'text-body font-sans',
    'border-b border-encre/25',
    'pb-3 pt-2 px-0',
    'outline-none',
    'transition-colors duration-400 ease-expo-out',
    'focus:border-encre',
    'placeholder:text-encre/30'
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block font-mono text-mono-xs uppercase text-encre/55"
      >
        {label} {required && <span className="text-encre/40">*</span>}
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