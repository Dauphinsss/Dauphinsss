type Props = {
  title: string;
  items: readonly string[];
};

export default function WorkShowcase({ title, items }: Props) {
  return (
    <section className="js-work relative mb-4 min-h-[320px] overflow-hidden rounded-[18px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--bg)_0%,color-mix(in_srgb,var(--bg)_84%,var(--soft))_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--fg)_30%,transparent)_1.25px,transparent_1.75px)] before:bg-[length:10px_10px] before:opacity-[0.38] max-[740px]:min-h-[260px]">
      <p className="absolute top-4 left-[1.1rem] z-[2] m-0 [font-family:var(--font-mono)] text-[0.84rem] tracking-[0.04em] text-[var(--muted)] uppercase">
        {title}
      </p>
      <div
        className="absolute bottom-[-22px] left-[46%] z-[1] -translate-x-[44%] [font-family:var(--font-display)] leading-[0.88] tracking-[0.03em] max-[740px]:bottom-[-6px] max-[740px]:left-1/2 max-[740px]:-translate-x-[48%]"
        aria-hidden="true"
      >
        <p className="work-line m-0 text-[clamp(3.9rem,10.5vw,7.9rem)] text-[color:color-mix(in_srgb,var(--fg)_28%,transparent)]">
          {items[0] ?? ""}
        </p>
        <p className="work-line m-0 text-[clamp(3.9rem,10.5vw,7.9rem)] text-[color:color-mix(in_srgb,var(--fg)_28%,transparent)]">
          {items[1] ?? ""}
        </p>
        <p className="work-line m-0 text-[clamp(3.9rem,10.5vw,7.9rem)] text-[var(--fg)] [text-shadow:0_0_16px_color-mix(in_srgb,var(--fg)_22%,transparent)]">
          {items[2] ?? ""}
        </p>
      </div>
    </section>
  );
}

