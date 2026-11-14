import { getTranslations } from 'next-intl/server';

type Section = {
  eyebrow: string;
  title: string;
  body: string[];
};

/**
 * Document légal (mentions légales ou confidentialité), rendu depuis
 * messages/<langue>.json › <namespace>. Si le namespace a une liste `rights`,
 * elle s'insère après la première phrase de la section `rightsSection`.
 */
export default async function LegalDocument({
  locale,
  namespace,
  rightsSection,
}: {
  locale: string;
  namespace: 'legal' | 'privacy';
  rightsSection?: number;
}) {
  const t = await getTranslations({ locale, namespace });
  const sections = t.raw('sections') as Section[];
  const rights = t.has('rights') ? (t.raw('rights') as string[]) : [];

  return (
    <div className="container-narrow section-y">
      <header className="mb-22">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="heading-lg mt-8">{t('title')}</h1>
        <p className="ref-tag mt-8">{t('updated')}</p>
      </header>

      {sections.map((section, i) => (
        <section key={section.eyebrow} className="mb-18">
          <div className="rule mb-8" />
          <p className="eyebrow">
            {String(i + 1).padStart(2, '0')} · {section.eyebrow}
          </p>
          <h2 className="heading-sm mt-6 mb-6">{section.title}</h2>

          {section.body.map((paragraph, j) => (
            <div key={j}>
              <p className="prose-narrow mb-4">{paragraph}</p>
              {rights.length > 0 && i === rightsSection && j === 0 && (
                <ul className="mb-6 grid sm:grid-cols-2 gap-x-6">
                  {rights.map((right) => (
                    <li key={right} className="ref-tag py-2">
                      {right}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
