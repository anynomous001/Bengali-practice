/** English text with Bengali words inside it: the Bengali runs are marked as Bengali so they use the Bengali font. */
export default function Mixed({ text }: { text: string }) {
  const parts = text.split(/([ঀ-৿]+(?:\s+[ঀ-৿]+)*[?!।]?)/);
  return <>{parts.map((p, i) => (/[ঀ-৿]/.test(p) ? <span key={i} lang="bn" className="kt-inline-bn">{p}</span> : p))}</>;
}
