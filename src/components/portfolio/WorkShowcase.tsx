import { wrap } from "@motionone/utils";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from "framer-motion";

type Props = {
  title: string;
  items: readonly string[];
};

type ParallaxRowProps = {
  text: string;
  baseVelocity: number;
};

function ParallaxRow({ text, baseVelocity }: ParallaxRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        style={{ x }}
        className="[font-family:var(--font-display)] text-[clamp(2rem,7.5vw,4.8rem)] leading-[0.88] tracking-[0.06em] uppercase"
      >
        <span className="mr-8 inline-block text-[color:color-mix(in_srgb,var(--fg)_26%,transparent)]">{text}</span>
        <span className="mr-8 inline-block text-[color:color-mix(in_srgb,var(--fg)_42%,transparent)]">{text}</span>
        <span className="mr-8 inline-block text-[var(--fg)]">{text}</span>
        <span className="mr-8 inline-block text-[color:color-mix(in_srgb,var(--fg)_42%,transparent)]">{text}</span>
      </motion.div>
    </div>
  );
}

export default function WorkShowcase({ title, items }: Props) {
  const one = items[0] ?? "VISUAL";
  const two = items[1] ?? "PULSE";
  const three = items[2] ?? "SALMON";

  return (
    <section className="js-work relative mt-8 mb-6 overflow-hidden border border-[var(--border)] bg-[var(--bg)] py-8 max-[768px]:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--fg)_34%,transparent)_1px,transparent_1.7px)] bg-[length:11px_11px] opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,color-mix(in_srgb,var(--fg)_7%,transparent)_50%,transparent_100%)]" />

      <p className="relative z-[2] mb-6 ml-4 [font-family:var(--font-mono)] text-[0.82rem] tracking-[0.1em] text-[var(--muted)] uppercase max-[768px]:mb-4">
        {title}
      </p>
      <span className="pointer-events-none absolute top-4 right-4 z-[2] [font-family:var(--font-display)] text-[clamp(1.1rem,3.4vw,2rem)] leading-none tracking-[0.08em] text-[var(--fg)] opacity-65">
        SALMON
      </span>

      <div className="relative z-[2] space-y-1.5">
        <ParallaxRow text={one} baseVelocity={-4} />
        <ParallaxRow text={two} baseVelocity={4} />
        <ParallaxRow text={three} baseVelocity={-3.4} />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-[linear-gradient(90deg,var(--bg),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-[linear-gradient(270deg,var(--bg),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-16 bg-[linear-gradient(0deg,var(--bg),transparent)]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-[2] h-12 bg-[linear-gradient(180deg,var(--bg),transparent)]" />
    </section>
  );
}
