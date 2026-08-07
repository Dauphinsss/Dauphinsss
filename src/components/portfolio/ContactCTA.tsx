import { ArrowUpRight, Download, Mail, MessageCircle } from "lucide-react";

type Props = {
  title: string;
  text: string;
  labels: {
    email: string;
    whatsapp: string;
    cv: string;
  };
  email: string;
  whatsapp: string;
  /** Empty means no CV is published yet, so the button is skipped entirely. */
  cv: string;
};

const ACTION =
  "js-cta-action group inline-flex items-center gap-2 border border-[var(--border)] px-5 py-3 [font-family:var(--font-mono)] text-[0.86rem] transition duration-300 hover:-translate-y-px";

export default function ContactCTA({ title, text, labels, email, whatsapp, cv }: Props) {
  return (
    <section className="js-cta relative mt-10 overflow-hidden border border-[var(--border)] bg-[var(--card)] px-8 py-10 max-[768px]:px-5 max-[768px]:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--fg)_30%,transparent)_1px,transparent_1.7px)] bg-[length:13px_13px] opacity-25" />

      <div className="relative z-[2]">
        <h2 className="m-0 max-w-[16ch] [font-family:var(--font-display)] text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.98] tracking-[0.02em] uppercase">
          {title}
        </h2>

        <p className="mt-4 mb-7 max-w-[54ch] text-[1.02rem] leading-[1.6] text-[color:var(--muted)] max-[768px]:text-[0.95rem]">
          {text}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${email}`}
            className={`${ACTION} border-[var(--fg)] bg-[var(--fg)] text-[color:var(--bg)]`}
          >
            <Mail size={16} strokeWidth={1.8} />
            <span>{labels.email}</span>
            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className={`${ACTION} bg-[var(--bg)] text-[color:var(--fg)] hover:bg-[var(--fg)] hover:text-[color:var(--bg)]`}
          >
            <MessageCircle size={16} strokeWidth={1.8} />
            <span>{labels.whatsapp}</span>
          </a>

          {cv ? (
            <a
              href={cv}
              download
              className={`${ACTION} bg-[var(--bg)] text-[color:var(--fg)] hover:bg-[var(--fg)] hover:text-[color:var(--bg)]`}
            >
              <Download size={16} strokeWidth={1.8} />
              <span>{labels.cv}</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
