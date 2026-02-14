import { Globe, MoonStar } from "lucide-react";
import type { Lang, ThemeMode } from "../../data/portfolioContent";

type Props = {
  handle: string;
  lang: Lang;
  theme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
};

export default function TopBar({ handle, lang, theme, onToggleLang, onToggleTheme }: Props) {
  return (
    <header className="js-topbar flex items-center justify-between border-b border-[var(--border)] pb-4">
      <div className="[font-family:var(--font-display)] text-[0.95rem] tracking-[0.05em] uppercase">{handle}</div>
      <div className="flex gap-[0.55rem]">
        <button
          className="js-control inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[0.8rem] text-[var(--fg)] transition duration-200 hover:-translate-y-px hover:opacity-90"
          type="button"
          onClick={onToggleLang}
          aria-label="Change language"
        >
          <Globe size={14} strokeWidth={1.9} />
          <span>{lang.toUpperCase()}</span>
        </button>
        <button
          className="js-control inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[0.8rem] text-[var(--fg)] transition duration-200 hover:-translate-y-px hover:opacity-90"
          type="button"
          onClick={onToggleTheme}
          aria-label="Change theme"
        >
          <MoonStar size={14} strokeWidth={1.9} />
          <span>{theme === "dark" ? "Dark" : "Light"}</span>
        </button>
      </div>
    </header>
  );
}

