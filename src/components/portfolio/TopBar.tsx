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
    <header className="topbar js-topbar">
      <div className="brand">{handle}</div>
      <div className="controls">
        <button className="control js-control" type="button" onClick={onToggleLang} aria-label="Change language">
          <Globe size={14} strokeWidth={1.9} />
          <span>{lang.toUpperCase()}</span>
        </button>
        <button className="control js-control" type="button" onClick={onToggleTheme} aria-label="Change theme">
          <MoonStar size={14} strokeWidth={1.9} />
          <span>{theme === "auto" ? "Auto" : theme === "dark" ? "Dark" : "Light"}</span>
        </button>
      </div>
    </header>
  );
}
