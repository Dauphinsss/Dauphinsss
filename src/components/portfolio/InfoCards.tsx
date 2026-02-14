import SocialLinks from "./SocialLinks";
import { profile } from "../../data/portfolioContent";

type Props = {
  aboutTitle: string;
  aboutText: string;
  linksTitle: string;
  labels: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
};

export default function InfoCards({ aboutTitle, aboutText, linksTitle, labels }: Props) {
  return (
    <section className="js-cards grid grid-cols-2 gap-4 max-[740px]:grid-cols-1">
      <article className="card rounded-2xl border border-[var(--border)] bg-[var(--card)] p-[1.1rem]">
        <h2 className="mb-3.5 text-[0.95rem] [font-family:var(--font-mono)] tracking-[0.03em] uppercase">{aboutTitle}</h2>
        <p className="leading-[1.55] text-[var(--muted)]">{aboutText}</p>
      </article>

      <article className="card rounded-2xl border border-[var(--border)] bg-[var(--card)] p-[1.1rem]">
        <h2 className="mb-3.5 text-[0.95rem] [font-family:var(--font-mono)] tracking-[0.03em] uppercase">{linksTitle}</h2>
        <SocialLinks
          labels={labels}
          urls={{
            github: profile.github,
            linkedin: profile.linkedin,
            email: profile.email,
            whatsapp: profile.whatsapp
          }}
        />
      </article>
    </section>
  );
}

