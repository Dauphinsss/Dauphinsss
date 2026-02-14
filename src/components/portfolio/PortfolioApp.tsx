import { useEffect, useMemo, useRef, useState } from "react";
import CursorFollower from "./CursorFollower";
import HeroSection from "./HeroSection";
import InfoCards from "./InfoCards";
import TopBar from "./TopBar";
import WorkShowcase from "./WorkShowcase";
import { copy, profile, type Lang, type ThemeMode } from "../../data/portfolioContent";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function detectInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function PortfolioApp() {
  const [lang, setLang] = useState<Lang>(() => detectInitialLang());
  const [theme, setTheme] = useState<ThemeMode>(() => detectInitialTheme());
  const dictionary = useMemo(() => copy[lang], [lang]);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelled = false;
    let cleanup = () => {};
    import("gsap").then(({ gsap }) => {
      if (cancelled || !mainRef.current) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(".js-topbar", { y: -16, opacity: 0, duration: 0.45, ease: "power2.out", clearProps: "all" })
          .from(".js-control", { y: -8, opacity: 0, duration: 0.3, stagger: 0.06, clearProps: "all" }, "-=0.25")
          .from(".js-hero > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.07, clearProps: "all" }, "-=0.05")
          .from(".js-work", { y: 18, opacity: 0, duration: 0.55, clearProps: "all" }, "-=0.2")
          .from(".work-line", { y: 10, opacity: 0, duration: 0.35, stagger: 0.06, clearProps: "all" }, "-=0.25")
          .from(".js-cards .card", { y: 18, opacity: 0, duration: 0.5, stagger: 0.1, clearProps: "all" }, "-=0.2")
          .from(".js-link", { x: -8, opacity: 0, duration: 0.35, stagger: 0.05, clearProps: "all" }, "-=0.25")
          .from(".js-footer", { y: 8, opacity: 0, duration: 0.35, clearProps: "all" }, "-=0.2");
      }, mainRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <>
      <CursorFollower />
      <main ref={mainRef} className="mx-auto w-[min(920px,92%)] py-8 pb-12 [font-family:var(--font-body)]">
        <TopBar
          handle={profile.handle}
          lang={lang}
          theme={theme}
          onToggleLang={toggleLang}
          onToggleTheme={toggleTheme}
        />

        <HeroSection label={dictionary.label} name={dictionary.name} handle={profile.handle} bio={dictionary.bio} />

        <WorkShowcase title={dictionary.workTitle} items={dictionary.workItems} />

        <InfoCards
          aboutTitle={dictionary.aboutTitle}
          aboutText={dictionary.aboutText}
          linksTitle={dictionary.linksTitle}
          labels={{
            github: dictionary.github,
            linkedin: dictionary.linkedin,
            email: dictionary.email,
            whatsapp: dictionary.whatsapp
          }}
        />

        <footer className="js-footer mt-4 border-t border-[var(--border)] pt-4 [font-family:var(--font-mono)] text-sm text-[var(--muted)]">
          {dictionary.footer}
        </footer>
      </main>
    </>
  );
}

