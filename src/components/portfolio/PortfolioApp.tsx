import { useEffect, useMemo, useRef, useState } from "react";
import { copy, type Lang, profile, type ThemeMode } from "../../data/portfolioContent";
import ContactCTA from "./ContactCTA";
import CursorFollower from "./CursorFollower";
import HeroSection from "./HeroSection";
import InfoCards from "./InfoCards";
import MusicWidget from "./MusicWidget";
import NowSection from "./NowSection";
import Preloader from "./Preloader";
import ProjectsSection from "./ProjectsSection";
import ScrollProgress from "./ScrollProgress";
import SkillsCarousel from "./SkillsCarousel";
import TopBar from "./TopBar";
import WorkShowcase from "./WorkShowcase";

function detectLang(): Lang {
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function detectTheme(): ThemeMode {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function PortfolioApp() {
  // Server-safe defaults: the real preference is read after mount, otherwise
  // the SSR markup and the first client render disagree and hydration fails.
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const dictionary = useMemo(() => copy[lang], [lang]);
  const mainRef = useRef<HTMLElement | null>(null);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    setLang(detectLang());
    setTheme(detectTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // Lenis drives the scroll position; GSAP's ticker drives Lenis, so both stay
  // on a single rAF loop and ScrollTrigger reads the smoothed value.
  useEffect(() => {
    if (!introReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        // Slightly quicker than the default so it reads as eased, not laggy.
        const lenis = new Lenis({
          duration: 0.95,
          wheelMultiplier: 1,
          easing: (t: number) => 1 - (1 - t) ** 4,
        });
        const raf = (time: number) => lenis.raf(time * 1000);

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(raf);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [introReady]);

  // Held back until the preloader curtain lifts, so the page is not already
  // animating behind it.
  useEffect(() => {
    if (!introReady) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelled = false;
    let cleanup = () => {};

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/SplitText"),
      import("gsap/ScrambleTextPlugin"),
      import("gsap/CustomEase"),
    ]).then(
      ([{ gsap }, { ScrollTrigger }, { SplitText }, { ScrambleTextPlugin }, { CustomEase }]) => {
        if (cancelled || !mainRef.current) return;
        gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase);

        const SIGNATURE = CustomEase.create("signature", "M0,0 C0.2,0 0.1,1 1,1");

        {
          const ctx = gsap.context(() => {
            // Above the fold: runs on load.
            // The header itself is delivered by the preloader handoff, so the
            // intro only picks up from the controls onward.
            const intro = gsap.timeline();
            intro
              .from(".js-control", {
                y: -10,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
                clearProps: "all",
              })
              .from(
                ".js-hero > *:not(.js-bio)",
                {
                  y: 22,
                  opacity: 0,
                  duration: 0.75,
                  stagger: 0.09,
                  ease: "power3.out",
                  clearProps: "all",
                },
                "-=0.35",
              )
              // SplitText measures real line boxes, so the bio rises line by
              // line and reflows correctly instead of guessing at word wrap.
              .from(
                new SplitText(".js-bio", { type: "lines", mask: "lines" }).lines,
                {
                  yPercent: 110,
                  rotateX: -55,
                  duration: 1,
                  stagger: 0.09,
                  ease: SIGNATURE,
                },
                "-=0.5",
              );

            // Below the fold: each block waits until it is actually scrolled to.
            const reveal = (target: string, vars: gsap.TweenVars) => {
              for (const el of gsap.utils.toArray<HTMLElement>(target)) {
                gsap.from(el, {
                  ...vars,
                  clearProps: "all",
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
              }
            };

            reveal(".js-work", { y: 34, opacity: 0, duration: 0.7, ease: "power3.out" });
            reveal(".js-cards .card", { y: 26, opacity: 0, duration: 0.6, ease: "power3.out" });
            reveal(".js-project", { y: 26, opacity: 0, duration: 0.6, ease: "power3.out" });
            reveal(".js-cta", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" });
            reveal(".js-footer", { y: 10, opacity: 0, duration: 0.4 });

            gsap.from(".js-now-line", {
              yPercent: 115,
              duration: 0.75,
              stagger: 0.09,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: { trigger: ".js-now", start: "top 85%", once: true },
            });

            // Layers drift at different speeds so the hero gains depth on scroll.
            // Only above 1100px: below that the cat sits in normal flow and any
            // parallax would shove it into the paragraph above it.
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1100px)", () => {
              const drift = (target: string, yPercent: number) => {
                const el = document.querySelector(target);
                if (!el) return;
                gsap.to(el, {
                  yPercent,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".js-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                });
              };

              drift(".js-hero-ghost", 26);
              drift(".js-cat", -12);
            });

            mm.add("(max-width: 1099px)", () => {
              gsap.to(".js-hero-ghost", {
                yPercent: 18,
                ease: "none",
                scrollTrigger: {
                  trigger: ".js-hero",
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.6,
                },
              });
            });

            gsap.from(".js-cta-action", {
              y: 12,
              opacity: 0,
              duration: 0.45,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: { trigger: ".js-cta", start: "top 78%", once: true },
            });

            gsap.from(".js-link", {
              x: -10,
              opacity: 0,
              duration: 0.4,
              stagger: 0.06,
              clearProps: "all",
              scrollTrigger: { trigger: ".js-cards", start: "top 80%", once: true },
            });

            // Section labels decode themselves — reads as machine type, which is
            // what the mono/pixel lettering is already suggesting.
            for (const label of gsap.utils.toArray<HTMLElement>(".js-scramble")) {
              const text = label.textContent ?? "";
              gsap.to(label, {
                duration: 1.1,
                scrambleText: { text, chars: "upperCase", speed: 0.45, revealDelay: 0.15 },
                scrollTrigger: { trigger: label, start: "top 92%", once: true },
              });
            }
          }, mainRef);

          cleanup = () => ctx.revert();
        }
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [introReady]);

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <>
      <Preloader onDone={() => setIntroReady(true)} />
      {introReady ? <ScrollProgress /> : null}
      <CursorFollower />
      <main
        ref={mainRef}
        data-intro={introReady ? "ready" : "pending"}
        className="relative mx-auto w-[min(1360px,92%)] overflow-x-hidden py-6 pb-14 [font-family:var(--font-body)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--fg)_2%,transparent)_0%,transparent_24%,transparent_76%,color-mix(in_srgb,var(--fg)_2%,transparent)_100%)] before:opacity-80 after:pointer-events-none after:absolute after:-top-[40%] after:left-1/2 after:h-[140%] after:w-[140%] after:-translate-x-1/2 after:rounded-full after:border after:border-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]"
      >
        <TopBar
          handle={profile.handle}
          lang={lang}
          theme={theme}
          onToggleLang={toggleLang}
          onToggleTheme={toggleTheme}
        />

        <HeroSection
          label={dictionary.label}
          name={profile.name}
          handle={profile.handle}
          bio={dictionary.bio}
        />

        <WorkShowcase title={dictionary.workTitle} items={dictionary.workItems} />
        <SkillsCarousel title={dictionary.skillsTitle} rows={dictionary.skillsRows} />

        <InfoCards
          aboutTitle={dictionary.aboutTitle}
          aboutText={dictionary.aboutText}
          linksTitle={dictionary.linksTitle}
          labels={{
            github: dictionary.github,
            youtube: dictionary.youtube,
            email: dictionary.email,
            whatsapp: dictionary.whatsapp,
          }}
        />

        <ProjectsSection title={dictionary.projectsTitle} items={dictionary.projects} />

        <NowSection title={dictionary.nowTitle} items={dictionary.nowItems} />

        <ContactCTA
          title={dictionary.ctaTitle}
          text={dictionary.ctaText}
          labels={{
            email: dictionary.ctaEmail,
            whatsapp: dictionary.ctaWhatsapp,
            cv: dictionary.ctaCv,
          }}
          email={profile.email}
          whatsapp={profile.whatsapp}
          cv={profile.cv}
        />

        <footer className="js-footer mt-8 border-t border-[var(--border)] pt-4 [font-family:var(--font-mono)] text-sm text-[color:var(--muted)]">
          {dictionary.footer}
        </footer>
      </main>
      <MusicWidget />
    </>
  );
}
