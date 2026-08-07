type Props = {
  title: string;
  items: readonly string[];
};

export default function NowSection({ title, items }: Props) {
  return (
    <section className="js-now mt-8 border-t border-[var(--border)] pt-6">
      <h2 className="mb-5 [font-family:var(--font-mono)] text-[0.82rem] tracking-[0.1em] text-[color:var(--muted)] uppercase">
        {title}
      </h2>

      <ul className="m-0 grid list-none gap-0 p-0">
        {items.map((item) => (
          <li
            key={item}
            className="js-now-item group flex items-baseline gap-4 border-b border-[var(--border)] py-3.5 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="[font-family:var(--font-mono)] text-[0.78rem] text-[color:var(--soft)] transition-colors duration-300 group-hover:text-[color:var(--fg)]"
            >
              —
            </span>
            <span className="overflow-hidden py-[0.1em] text-[1.02rem] leading-[1.5] text-[color:color-mix(in_srgb,var(--fg)_88%,var(--bg))] max-[768px]:text-[0.95rem]">
              <span className="js-now-line block">{item}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
