import { useEffect, useMemo, useState } from "react";
import CursorFollower from "./CursorFollower";
import HeroSection from "./HeroSection";
import InfoCards from "./InfoCards";
import TopBar from "./TopBar";
import WorkShowcase from "./WorkShowcase";
import { copy, profile, type Lang, type ThemeMode } from "../../data/portfolioContent";
import "./portfolio.css";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function detectInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem("theme");
  if (stored === "auto" || stored === "light" || stored === "dark") return stored;
  return "auto";
}

function resolveTheme(theme: ThemeMode): "light" | "dark" {
  if (theme === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

export default function PortfolioApp() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<ThemeMode>("auto");
  const dictionary = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    setLang(detectInitialLang());
    setTheme(detectInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    const apply = (mode: ThemeMode) => {
      document.documentElement.dataset.theme = resolveTheme(mode);
    };

    apply(theme);
    localStorage.setItem("theme", theme);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "auto") apply("auto");
    };

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [theme]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const tl = gsap.timeline();
      tl.from(".js-topbar", { y: -16, autoAlpha: 0, duration: 0.45, ease: "power2.out" })
        .from(".js-control", { y: -8, autoAlpha: 0, duration: 0.3, stagger: 0.06 }, "-=0.25")
        .from(".js-hero > *", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.07 }, "-=0.05")
        .from(".js-work", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.2")
        .from(".work-line", { y: 10, autoAlpha: 0, duration: 0.35, stagger: 0.06 }, "-=0.25")
        .from(".js-cards .card", { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from(".js-link", { x: -8, autoAlpha: 0, duration: 0.35, stagger: 0.05 }, "-=0.25")
        .from(".js-footer", { y: 8, autoAlpha: 0, duration: 0.35 }, "-=0.2");
    });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));
  const toggleTheme = () =>
    setTheme((prev) => (prev === "auto" ? "light" : prev === "light" ? "dark" : "auto"));

  return (
    <>
      <CursorFollower />
      <main className="shell">
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

        <footer className="footer js-footer">{dictionary.footer}</footer>
      </main>
    </>
  );
}
