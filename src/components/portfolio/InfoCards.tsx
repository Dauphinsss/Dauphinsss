import { profile } from "../../data/portfolioContent";
import SocialLinks from "./SocialLinks";

type Props = {
  aboutTitle: string;
  aboutText: string;
  linksTitle: string;
  labels: {
    github: string;
    youtube: string;
    email: string;
    whatsapp: string;
  };
};

export default function InfoCards({ aboutTitle, aboutText, linksTitle, labels }: Props) {
  return (
    <section className="js-cards grid grid-cols-2 gap-4 max-[740px]:grid-cols-1">
      <article className="card group relative overflow-hidden border border-[var(--border)] bg-[var(--card)] p-[1.1rem] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--bg)]">
        <h2 className="js-scramble mb-3.5 text-[0.95rem] [font-family:var(--font-mono)] tracking-[0.03em] uppercase">
          {aboutTitle}
        </h2>
        <p className="leading-[1.55] text-[color:var(--muted)]">{aboutText}</p>
        <span className="pointer-events-none absolute right-3 bottom-2 [font-family:var(--font-display)] text-xl text-[color:color-mix(in_srgb,var(--fg)_20%,transparent)] transition duration-300 group-hover:text-[color:color-mix(in_srgb,var(--fg)_44%,transparent)]">
          ||
        </span>
      </article>

      <article className="card group relative overflow-hidden border border-[var(--border)] bg-[var(--card)] p-[1.1rem] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--bg)]">
        <h2 className="js-scramble mb-3.5 text-[0.95rem] [font-family:var(--font-mono)] tracking-[0.03em] uppercase">
          {linksTitle}
        </h2>
        <SocialLinks
          labels={labels}
          urls={{
            github: profile.github,
            youtube: profile.youtube,
            email: profile.email,
            whatsapp: profile.whatsapp,
          }}
        />
        <span className="pointer-events-none absolute right-3 bottom-2 [font-family:var(--font-display)] text-xl text-[color:color-mix(in_srgb,var(--fg)_20%,transparent)] transition duration-300 group-hover:text-[color:color-mix(in_srgb,var(--fg)_44%,transparent)]">
          ||
        </span>
      </article>
    </section>
  );
}
