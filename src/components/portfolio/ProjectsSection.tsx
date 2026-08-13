import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Shot = {
  src: string;
  alt: string;
};

type Project = {
  name: string;
  logo: string;
  tags: string;
  status: string;
  text: string;
  url: string;
  cta: string;
  siteUrl: string;
  siteCta: string;
  shots: readonly Shot[];
};

type Props = {
  title: string;
  items: readonly Project[];
};

/**
 * Two identical tracks slide left; when the first has travelled its own width
 * the offset wraps, so the seam never shows and the loop reads as endless.
 */
function ShotsMarquee({
  shots,
  onOpen,
}: {
  shots: readonly Shot[];
  onOpen: (index: number) => void;
}) {
  const baseX = useMotionValue(0);
  const velocityRef = useRef(-30);
  const setRef = useRef<HTMLDivElement | null>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!setRef.current) return;
      setSetWidth(setRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!setWidth) return;
    const target = paused ? 0 : -30;
    velocityRef.current += (target - velocityRef.current) * 0.06;
    let next = baseX.get() + velocityRef.current * (delta / 1000);

    if (next <= -setWidth) next += setWidth;
    if (next >= 0) next -= setWidth;

    baseX.set(next);
  });

  const track = (keyPrefix: string, hidden: boolean) => (
    <div ref={hidden ? undefined : setRef} className="flex" aria-hidden={hidden || undefined}>
      {shots.map((shot, index) => (
        <button
          key={`${keyPrefix}-${shot.src}`}
          type="button"
          onClick={() => onOpen(index)}
          tabIndex={hidden ? -1 : 0}
          className="mr-4 shrink-0 cursor-zoom-in border-0 bg-transparent p-0"
        >
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            draggable={false}
            className="h-[340px] w-auto rounded-[18px] border border-[var(--border)] opacity-95 transition duration-500 hover:-translate-y-1.5 hover:opacity-100 max-[768px]:h-[250px]"
          />
        </button>
      ))}
    </div>
  );

  return (
    <section
      // Breaks out of the centered column to span the full viewport.
      className="relative mt-8 ml-[calc(50%-50vw)] w-screen overflow-hidden"
      aria-label="Screenshots"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div style={{ x: baseX }} className="flex w-max">
        {track("a", false)}
        {track("b", true)}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,var(--bg),transparent)] max-[768px]:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,var(--bg),transparent)] max-[768px]:w-12" />
    </section>
  );
}

function Lightbox({
  shots,
  index,
  onClose,
  onStep,
}: {
  shots: readonly Shot[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    // The page keeps scrolling behind a fixed overlay otherwise.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, onStep]);

  const shot = shots[index];
  if (!shot) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[color:color-mix(in_srgb,var(--bg)_88%,transparent)] p-6 backdrop-blur-md max-[768px]:p-3"
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
    >
      {/* Click-anywhere-to-close, as a real button so it is keyboard reachable. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full cursor-zoom-out border-0 bg-transparent"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 z-10 border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 [font-family:var(--font-mono)] text-[0.8rem] text-[color:var(--fg)] transition duration-300 hover:bg-[var(--bg)]"
      >
        ESC ✕
      </button>

      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Previous"
        className="absolute left-5 z-10 border border-[var(--border)] bg-[var(--card)] px-3 py-2 [font-family:var(--font-mono)] text-[color:var(--fg)] transition duration-300 hover:bg-[var(--bg)] max-[768px]:left-2"
      >
        ←
      </button>

      <figure className="pointer-events-none relative m-0 flex max-h-full flex-col items-center gap-3">
        <img
          src={shot.src}
          alt={shot.alt}
          className="max-h-[82vh] w-auto rounded-[20px] border border-[var(--border)]"
        />
        <figcaption className="[font-family:var(--font-mono)] text-[0.78rem] tracking-[0.05em] text-[color:var(--muted)]">
          {shot.alt} · {index + 1}/{shots.length}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Next"
        className="absolute right-5 z-10 border border-[var(--border)] bg-[var(--card)] px-3 py-2 [font-family:var(--font-mono)] text-[color:var(--fg)] transition duration-300 hover:bg-[var(--bg)] max-[768px]:right-2"
      >
        →
      </button>
    </div>
  );
}

export default function ProjectsSection({ title, items }: Props) {
  const [open, setOpen] = useState<{ project: string; index: number } | null>(null);
  const active = items.find((item) => item.name === open?.project);

  const step = useCallback(
    (delta: number) => {
      setOpen((current) => {
        if (!current) return current;
        const project = items.find((item) => item.name === current.project);
        if (!project) return current;
        const total = project.shots.length;
        return { ...current, index: (current.index + delta + total) % total };
      });
    },
    [items],
  );

  return (
    <section className="js-projects mt-8 border-t border-[var(--border)] pt-6">
      <h2 className="js-scramble mb-7 [font-family:var(--font-mono)] text-[0.82rem] tracking-[0.1em] text-[color:var(--muted)] uppercase">
        {title}
      </h2>

      <div className="grid gap-14">
        {items.map((project) => (
          <article key={project.name} className="js-project">
            <header className="flex items-center gap-3.5">
              <img
                src={project.logo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-[11px]"
              />
              <div className="min-w-0">
                <h3 className="[font-family:var(--font-mono)] text-[1rem] tracking-[0.03em] text-[color:var(--fg)] uppercase">
                  {project.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1.5 [font-family:var(--font-mono)] text-[0.7rem] tracking-[0.06em] text-[color:var(--muted)] uppercase">
                  <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fg)] opacity-50" />
                  {project.status}
                </p>
              </div>
            </header>

            <p className="mt-5 max-w-[62ch] leading-[1.65] text-[color:var(--muted)]">
              {project.text}
            </p>

            <p className="mt-3 [font-family:var(--font-mono)] text-[0.74rem] tracking-[0.05em] text-[color:color-mix(in_srgb,var(--muted)_75%,var(--bg))]">
              {project.tags}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="js-link inline-flex items-center gap-2 border-b border-[var(--border)] pb-0.5 [font-family:var(--font-mono)] text-[0.85rem] text-[color:var(--fg)] no-underline transition duration-300 hover:-translate-y-px hover:border-[var(--fg)]"
              >
                <img
                  src="/projects/google-play.webp"
                  alt=""
                  width={15}
                  height={15}
                  className="h-[15px] w-[15px] object-contain"
                />
                {project.cta}
              </a>
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="js-link inline-flex items-center gap-1.5 border-b border-[var(--border)] pb-0.5 [font-family:var(--font-mono)] text-[0.85rem] text-[color:var(--muted)] no-underline transition duration-300 hover:-translate-y-px hover:border-[var(--fg)] hover:text-[color:var(--fg)]"
              >
                ↗ {project.siteCta}
              </a>
            </div>

            <ShotsMarquee
              shots={project.shots}
              onOpen={(index) => setOpen({ project: project.name, index })}
            />
          </article>
        ))}
      </div>

      {active && open ? (
        <Lightbox
          shots={active.shots}
          index={open.index}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      ) : null}
    </section>
  );
}
