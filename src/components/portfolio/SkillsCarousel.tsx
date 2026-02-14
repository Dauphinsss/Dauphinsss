import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiAstro,
  SiClaude,
  SiCss3,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiVscodium
} from "react-icons/si";

type Props = {
  title: string;
  rows: readonly string[];
};

type RowProps = {
  skills: readonly string[];
  baseVelocity: number;
};

type SkillIcon = {
  Icon: IconType;
  color: string;
};

const iconMap: Record<string, SkillIcon> = {
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  Expo: { Icon: SiExpo, color: "#FFFFFF" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  Angular: { Icon: SiAngular, color: "#DD0031" },
  Astro: { Icon: SiAstro, color: "#FF5D01" },
  HTML5: { Icon: SiHtml5, color: "#E34F26" },
  CSS3: { Icon: SiCss3, color: "#1572B6" },
  TailwindCSS: { Icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  Express: { Icon: SiExpress, color: "#FFFFFF" },
  NestJS: { Icon: SiNestjs, color: "#E0234E" },
  Rust: { Icon: SiRust, color: "#FFFFFF" },
  Python: { Icon: SiPython, color: "#3776AB" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Prisma: { Icon: SiPrisma, color: "#2D3748" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  GSAP: { Icon: SiGreensock, color: "#88CE02" },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  Tauri: { Icon: SiTauri, color: "#24C8D8" },
  Git: { Icon: SiGit, color: "#F05032" },
  "VS Code": { Icon: SiVscodium, color: "#2F80ED" },
  Claude: { Icon: SiClaude, color: "#D97706" }
};

function SkillChip({ skill }: { skill: string }) {
  const icon = iconMap[skill];
  const color = icon?.color ?? "#ffffff";
  const GlowIcon = icon?.Icon;
  const pulseDelay = `${(skill.length % 9) * 0.35}s`;

  return (
    <span className="skill-badge group/badge relative mr-3 inline-flex items-center gap-2 border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_96%,transparent)] px-3.5 py-2">
      {GlowIcon ? (
        <GlowIcon
          aria-hidden="true"
          className="skill-rgb-icon h-4 w-4"
          style={{ ["--skill-color" as string]: color, animationDelay: pulseDelay }}
        />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
      )}
      <span className="[font-family:var(--font-body)] text-[0.9rem] text-[color:color-mix(in_srgb,var(--fg)_82%,var(--bg))] max-[768px]:text-[0.82rem]">
        {skill}
      </span>
    </span>
  );
}

function InfiniteRow({ skills, baseVelocity }: RowProps) {
  const baseX = useMotionValue(0);
  const velocityRef = useRef(baseVelocity);
  const setRef = useRef<HTMLDivElement | null>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const longSkills = useMemo(() => {
    const counters = new Map<string, number>();
    const out: Array<{ id: string; label: string }> = [];
    for (let rep = 0; rep < 3; rep += 1) {
      for (const skill of skills) {
        const current = (counters.get(skill) ?? 0) + 1;
        counters.set(skill, current);
        out.push({ id: `${skill}-${current}`, label: skill });
      }
    }
    return out;
  }, [skills]);

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
    const targetVelocity = isHovered ? 0 : baseVelocity;
    velocityRef.current += (targetVelocity - velocityRef.current) * 0.08;
    const moveBy = velocityRef.current * (delta / 1000);
    let next = baseX.get() + moveBy;

    if (next <= -setWidth) next += setWidth;
    if (next >= 0) next -= setWidth;

    baseX.set(next);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        style={{ x: baseX }}
        className="inline-flex"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div ref={setRef} className="inline-flex">
          {longSkills.map((skill) => (
            <SkillChip key={`a-${skill.id}`} skill={skill.label} />
          ))}
        </div>
        <div className="inline-flex" aria-hidden="true">
          {longSkills.map((skill) => (
            <SkillChip key={`b-${skill.id}`} skill={skill.label} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SkillsCarousel({ title, rows }: Props) {
  const one = (rows[0] ?? "").split("·").map((s) => s.trim()).filter(Boolean);
  const two = (rows[1] ?? "").split("·").map((s) => s.trim()).filter(Boolean);
  const three = (rows[2] ?? "").split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="js-work skills-glow relative mt-4 mb-5 overflow-hidden border border-[var(--border)] bg-[var(--card)] py-5 max-[768px]:py-4">
      <p className="relative z-[2] mb-3 ml-4 [font-family:var(--font-body)] text-[0.78rem] tracking-[0.14em] text-[var(--muted)] uppercase">
        {title}
      </p>
      <div className="relative z-[2] space-y-2">
        <InfiniteRow skills={one} baseVelocity={-16} />
        <InfiniteRow skills={two} baseVelocity={14} />
        <InfiniteRow skills={three} baseVelocity={-12} />
      </div>
    </section>
  );
}
