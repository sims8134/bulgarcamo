// Ligne de coordonnées sous l'en-tête (décorative, identique dans les trois langues)
export default function MetaBar() {
  return (
    <div aria-hidden className="site-layer border-b border-line">
      <p className="container-page py-2 meta-dim flex flex-wrap gap-x-3 gap-y-0">
        <span>42.6977 N</span>
        <span>·</span>
        <span>23.3219 E</span>
        <span>·</span>
        <span>SOFIA</span>
        <span>·</span>
        <span>СОФИЯ</span>
      </p>
    </div>
  );
}
