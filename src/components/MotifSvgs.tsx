// Motifs SVG abstraits pour identité visuelle - placeholders avant photos réelles

export function MotifFrogskin({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="200" height="200" fill="#E8DEC0" />
      <ellipse cx="50" cy="40" rx="35" ry="22" fill="#7FA052" opacity="0.8" />
      <ellipse cx="150" cy="60" rx="30" ry="18" fill="#3D4D2A" opacity="0.85" />
      <ellipse cx="80" cy="120" rx="40" ry="25" fill="#7FA052" opacity="0.75" />
      <ellipse cx="160" cy="150" rx="32" ry="20" fill="#3D4D2A" opacity="0.8" />
      <ellipse cx="30" cy="170" rx="25" ry="15" fill="#5C4A30" opacity="0.7" />
      <g stroke="#5C4A30" strokeWidth="0.8" fill="none" opacity="0.6">
        <path d="M20,90 q4,-2 8,0 t8,0 t8,0" />
        <path d="M100,30 q4,-2 8,0 t8,0 t8,0" />
        <path d="M110,180 q4,-2 8,0 t8,0 t8,0" />
      </g>
    </svg>
  );
}

export function MotifSplinter1991({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="200" height="200" fill="#B8AC8E" />
      <polygon points="0,30 70,10 90,70 40,90 0,70" fill="#3D4D2A" opacity="0.9" />
      <polygon points="110,20 190,30 200,80 140,100" fill="#5C4A30" opacity="0.9" />
      <polygon points="30,100 90,110 80,170 20,180" fill="#1F2818" opacity="0.85" />
      <polygon points="120,110 200,100 200,180 130,190" fill="#3D4D2A" opacity="0.85" />
      <g stroke="#1F2818" strokeWidth="0.7" fill="none" opacity="0.6">
        <path d="M10,40 q5,-2 10,0 t10,0 t10,0" />
        <path d="M120,30 q5,-2 10,0 t10,0" />
        <path d="M40,130 q5,-2 10,0 t10,0 t10,0" />
        <path d="M140,150 q5,-2 10,0 t10,0" />
      </g>
    </svg>
  );
}

export function MotifDPM({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="200" height="200" fill="#7A7560" />
      <path d="M0,60 Q40,30 80,50 T160,40 L200,55 L200,90 Q140,100 80,90 T0,95 Z" fill="#3D4D2A" opacity="0.85" />
      <path d="M0,110 Q50,90 110,115 T200,120 L200,150 Q150,170 80,155 T0,160 Z" fill="#1F2818" opacity="0.9" />
      <path d="M40,20 Q60,10 80,25 L75,40 L50,35 Z" fill="#5C4A30" opacity="0.9" />
      <path d="M130,160 Q160,150 180,170 L170,185 L140,180 Z" fill="#5C4A30" opacity="0.9" />
    </svg>
  );
}

export function MotifFlecktarn({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="200" height="200" fill="#3D4D2A" />
      <g fill="#1F2818" opacity="0.95">
        <ellipse cx="40" cy="50" rx="18" ry="12" />
        <ellipse cx="130" cy="80" rx="22" ry="15" />
        <ellipse cx="80" cy="140" rx="20" ry="14" />
        <ellipse cx="170" cy="160" rx="15" ry="10" />
      </g>
      <g fill="#5C4A30" opacity="0.85">
        <ellipse cx="100" cy="40" rx="15" ry="10" />
        <ellipse cx="30" cy="120" rx="18" ry="12" />
        <ellipse cx="160" cy="50" rx="14" ry="9" />
        <ellipse cx="120" cy="170" rx="16" ry="11" />
      </g>
      <g fill="#B8AC8E" opacity="0.9">
        <circle cx="60" cy="80" r="5" />
        <circle cx="150" cy="120" r="6" />
        <circle cx="90" cy="100" r="4" />
        <circle cx="180" cy="40" r="5" />
        <circle cx="20" cy="170" r="4" />
        <circle cx="110" cy="60" r="3" />
      </g>
    </svg>
  );
}

export const motifComponents = {
  frogskin: MotifFrogskin,
  splinter_1991: MotifSplinter1991,
  dpm: MotifDPM,
  flecktarn: MotifFlecktarn,
} as const;

export type MotifKey = keyof typeof motifComponents;
