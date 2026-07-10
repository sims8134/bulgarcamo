import { useTranslations } from 'next-intl';

const categories = ['uniformes', 'edc', 'maison'] as const;

export default function PiecesSection() {
  const t = useTranslations('pieces_section');
  const tc = useTranslations('pieces_section.categories');

  return (
    <section id="pieces" className="bg-olive-deep/5 border-y border-olive-deep/10">
      <div className="container-page py-20 md:py-32">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-section text-olive-deep mb-6">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((cat) => {
            const items = tc.raw(`${cat}.items`) as string[];
            return (
              <div key={cat}>
                <h3 className="text-sm font-bold tracking-extra uppercase text-frogskin mb-6 pb-3 border-b border-olive-deep/20">
                  {tc(`${cat}.title`)}
                </h3>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="text-olive-deep/80 leading-relaxed border-b border-olive-deep/5 pb-3 last:border-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}