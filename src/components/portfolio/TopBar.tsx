import { Globe, MoonStar } from "lucide-react";
import type { Lang, ThemeMode } from "../../data/portfolioContent";
import FlowerMark from "./FlowerMark";

type Props = {
  handle: string;
  lang: Lang;
  theme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
};

export default function TopBar({ handle, lang, theme, onToggleLang, onToggleTheme }: Props) {
  return (
    <header className="js-topbar sticky top-2 z-20 mb-2 flex items-center justify-between gap-2 border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_92%,transparent)] px-3 py-2 backdrop-blur-md max-[768px]:flex-col max-[768px]:items-stretch">
      <div className="flex items-center gap-2 [font-family:var(--font-display)] text-[0.95rem] tracking-[0.08em] uppercase max-[768px]:justify-center">
        <FlowerMark
          size={18}
          className="js-flower shrink-0 transition-[rotate] duration-700 ease-out hover:rotate-180"
        />
        <span className="js-handle">{handle}</span>
      </div>
      <div className="flex gap-[0.55rem] max-[768px]:grid max-[768px]:grid-cols-2">
        <button
          className="js-control inline-flex cursor-pointer items-center justify-center gap-1.5 border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[0.78rem] text-[color:var(--fg)] transition duration-300 hover:-translate-y-px hover:bg-[var(--fg)] hover:text-[color:var(--bg)] max-[768px]:w-full"
          type="button"
          onClick={onToggleLang}
          aria-label="Change language"
        >
          <Globe size={14} strokeWidth={1.9} />
          <span>{lang.toUpperCase()}</span>
        </button>
        <button
          className="js-control inline-flex cursor-pointer items-center justify-center gap-1.5 border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[0.78rem] text-[color:var(--fg)] transition duration-300 hover:-translate-y-px hover:bg-[var(--fg)] hover:text-[color:var(--bg)] max-[768px]:w-full"
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
