import Mixed from "./Mixed";

/** One titled section of a stage page. */
export default function Block({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="g-sec kt-block" id={id}>
      <h2>{title}</h2>
      {note && <p className="muted"><Mixed text={note} /></p>}
      {children}
    </section>
  );
}
