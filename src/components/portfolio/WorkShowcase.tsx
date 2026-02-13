type Props = {
  title: string;
  items: readonly string[];
};

export default function WorkShowcase({ title, items }: Props) {
  return (
    <section className="work-showcase js-work">
      <p className="work-title">{title}</p>
      <div className="work-grid" aria-hidden="true">
        <p className="work-line work-soft">{items[0] ?? ""}</p>
        <p className="work-line work-soft">{items[1] ?? ""}</p>
        <p className="work-line work-bright">{items[2] ?? ""}</p>
      </div>
    </section>
  );
}
