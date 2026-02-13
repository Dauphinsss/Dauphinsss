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
    <section className="grid js-cards">
      <article className="card">
        <h2>{aboutTitle}</h2>
        <p>{aboutText}</p>
      </article>

      <article className="card">
        <h2>{linksTitle}</h2>
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
