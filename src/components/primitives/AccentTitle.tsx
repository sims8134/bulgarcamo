/**
 * Met un seul mot d'un titre en vert phosphore : le dernier.
 * Le texte vient tel quel des fichiers de traduction, rien n'est réécrit.
 */
export function AccentTitle({ text }: { text: string }) {
  const trimmed = text.trim();
  const cut = trimmed.lastIndexOf(' ');
  if (cut === -1) return <span className="text-accent">{trimmed}</span>;
  return (
    <>
      {trimmed.slice(0, cut + 1)}
      <span className="text-accent">{trimmed.slice(cut + 1)}</span>
    </>
  );
}
