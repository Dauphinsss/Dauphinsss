type Props = {
  label: string;
  name: string;
  handle: string;
  bio: string;
};

export default function HeroSection({ label, name, handle, bio }: Props) {
  return (
    <section className="js-hero py-12 pb-9">
      <p className="mb-3.5 [font-family:var(--font-mono)] text-xs tracking-[0.08em] text-[var(--muted)] uppercase">{label}</p>
      <h1 className="m-0 [font-family:var(--font-display)] text-[clamp(2.2rem,7vw,4rem)] leading-[0.98] tracking-[-0.01em]">
        {name}
      </h1>
      <p className="my-2.5 [font-family:var(--font-mono)] text-base text-[var(--muted)]">@{handle}</p>
      <p className="m-0 max-w-[64ch] text-[1.02rem] leading-[1.6]">{bio}</p>
    </section>
  );
}

