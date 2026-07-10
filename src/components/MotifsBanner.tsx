import Image from 'next/image';
import { motifComponents, type MotifKey } from './MotifSvgs';

type MotifEntry = {
  key: MotifKey;
  ref: string;
  image: string | null;
  alt: string;
};

const motifs: MotifEntry[] = [
  {
    key: 'frogskin',
    ref: 'REF. 01',
    image: '/images/products/frogskin-combi-col.jpg',
    alt: 'Frogskin Жабешка кожа',
  },
  {
    key: 'splinter_1991',
    ref: 'REF. 02',
    image: '/images/products/splinter-1991-multipouch.jpg',
    alt: 'Splinter 1991',
  },
  {
    key: 'dpm',
    ref: 'REF. 03',
    image: '/images/products/dpm-multipouch.jpg',
    alt: 'Bulgarian DPM',
  },
  {
    key: 'flecktarn',
    ref: 'REF. 04',
    image: '/images/products/flecktarn-multipouch.jpg',
    alt: 'German Flecktarn',
  },
];

export default function MotifsBanner() {
  return (
    <div className="border-y border-olive-deep/10 bg-cream">
      <div className="grid grid-cols-4 divide-x divide-olive-deep/10">
        {motifs.map(({ key, ref, image, alt }) => {
          const Motif = motifComponents[key];
          return (
            <div key={key} className="aspect-square relative group overflow-hidden bg-olive-deep/5">
              {image ? (
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 350px"
                />
              ) : (
                <Motif className="w-full h-full" />
              )}
              <div className="absolute inset-0 flex items-end p-3 md:p-4 bg-gradient-to-t from-olive-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-cream text-xs font-mono tracking-extra">
                  {ref}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
