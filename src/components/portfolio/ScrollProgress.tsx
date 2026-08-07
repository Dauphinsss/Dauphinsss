import { useEffect, useRef } from "react";

/**
 * A hairline at the top of the viewport that fills as the page scrolls. Stands
 * in for the native scrollbar, which is hidden so Lenis can own the scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const tween = gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.25,
            },
          },
        );

        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-px bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]"
    >
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-[var(--fg)]" />
    </div>
  );
}
