import { useEffect, useRef } from "react";
import FlowerMark from "./FlowerMark";

const BEE_COUNT = 6;

/**
 * The illustration's resting heading, in degrees. `autoRotate` aims the bee down
 * its flight path and this offset corrects for whichever way the artwork faces.
 */
const BEE_HEADING_OFFSET = 90;

const BEE_SIZES = [104, 68, 124, 84, 56, 94];

type Props = {
  onDone: () => void;
};

/** Measures where `el` has to travel to land exactly on `target`. */
function flip(el: HTMLElement, target: Element) {
  const a = el.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  return {
    x: b.left + b.width / 2 - (a.left + a.width / 2),
    y: b.top + b.height / 2 - (a.top + a.height / 2),
    scale: a.width ? b.width / a.width : 1,
  };
}

export default function Preloader({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headerFlower = document.querySelector(".js-flower");
    const headerName = document.querySelector(".js-handle");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.display = "none";
      doneRef.current();
      return;
    }

    document.body.style.overflow = "hidden";

    let cancelled = false;
    let finished = false;
    let cleanup = () => {};

    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = "";
      doneRef.current();
    };

    // If GSAP never loads, the curtain would sit over the page forever.
    const failsafe = window.setTimeout(() => {
      root.style.display = "none";
      if (headerFlower) (headerFlower as HTMLElement).style.visibility = "visible";
      if (headerName) (headerName as HTMLElement).style.visibility = "visible";
      finish();
    }, 9000);

    Promise.all([import("gsap"), import("gsap/MotionPathPlugin")]).then(
      ([{ gsap }, { MotionPathPlugin }]) => {
        if (cancelled || !rootRef.current) return;
        gsap.registerPlugin(MotionPathPlugin);

        const ctx = gsap.context(() => {
          const bees = gsap.utils.toArray<HTMLElement>(".js-pl-bee");
          const flower = root.querySelector<HTMLElement>(".js-pl-flower");
          const name = root.querySelector<HTMLElement>(".js-pl-name");
          const counter = root.querySelector<HTMLElement>(".js-pl-count");
          if (!flower || !name) return;

          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const center = { x: vw / 2, y: vh / 2 };

          // The header's copies stay hidden until the preloader hands off to them.
          const handoff = headerFlower && headerName;
          if (handoff) gsap.set([headerFlower, headerName], { autoAlpha: 0 });

          // Transparent to begin with, so they can fade in mid-flight instead
          // of popping into existence at the edge of the screen.
          gsap.set(bees, { autoAlpha: 0 });

          // Wing flutter sits on an inner node so it never fights the motion
          // path, which owns transform on the wrapper.
          for (const bee of bees) {
            const body = bee.querySelector(".js-pl-bee-body");
            if (!body) continue;
            gsap.to(body, {
              scaleY: 0.8,
              duration: 0.085,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }

          const tl = gsap.timeline({
            onComplete: () => {
              window.clearTimeout(failsafe);
              finish();
            },
          });

          // The bloom eases open rather than popping in.
          tl.from(flower, {
            scale: 0.55,
            autoAlpha: 0,
            rotate: -90,
            duration: 1.5,
            ease: "power3.out",
          }).from(
            ".js-pl-letter",
            { yPercent: 130, duration: 0.9, stagger: 0.05, ease: "power4.out" },
            0.55,
          );

          bees.forEach((bee, index) => {
            const fromLeft = index % 2 === 0;
            const at = 0.35 + index * 0.16;
            const entryY = vh * (0.18 + (index / BEE_COUNT) * 0.62);
            const angle = (index / BEE_COUNT) * Math.PI * 2;
            const orbit = Math.min(vw, vh) * 0.22 + (index % 3) * 34;
            const rest = {
              x: center.x + Math.cos(angle) * orbit,
              y: center.y + Math.sin(angle) * orbit,
            };

            const approach = [
              { x: fromLeft ? -120 : vw + 120, y: entryY },
              { x: fromLeft ? vw * 0.25 : vw * 0.75, y: entryY - vh * 0.14 },
              { x: fromLeft ? vw * 0.6 : vw * 0.4, y: center.y + vh * 0.18 },
              rest,
            ];

            // Peels off along the tangent first, then curves outward. Leaving
            // straight down the radius reads as an instant U-turn.
            const tangent = angle + Math.PI / 2;
            const scatter = [
              rest,
              {
                x: rest.x + Math.cos(tangent) * orbit * 0.75,
                y: rest.y + Math.sin(tangent) * orbit * 0.75,
              },
              {
                x: center.x + Math.cos(angle + 0.5) * vw * 0.4,
                y: center.y + Math.sin(angle + 0.5) * vh * 0.36,
              },
              {
                x: center.x + Math.cos(angle + 0.7) * vw * 1.2,
                y: center.y + Math.sin(angle + 0.7) * vh * 1.2,
              },
            ];

            const landed = at + 1.35;
            // Each bee gets its own departure slot, so they trickle away in the
            // order they arrived instead of all breaking formation at once.
            const leaves = 3.15 + index * 0.11;

            tl.to(bee, { autoAlpha: 1, duration: 0.55, ease: "power1.out" }, at)
              .to(
                bee,
                {
                  duration: 1.35,
                  ease: "power2.inOut",
                  motionPath: { path: approach, curviness: 1.5, autoRotate: BEE_HEADING_OFFSET },
                },
                at,
              )
              .to(
                bee,
                {
                  duration: 1.7,
                  ease: "power1.in",
                  motionPath: { path: scatter, curviness: 1.4, autoRotate: BEE_HEADING_OFFSET },
                },
                leaves,
              );

            // Pollinating bob. Deliberately a standalone tween: an infinite
            // repeat inside the timeline would make its duration infinite, so
            // onComplete — and the preloader's own teardown — would never run.
            gsap.to(bee.querySelector(".js-pl-bee-bob"), {
              y: 11,
              duration: 0.42,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: landed,
            });
          });

          // The bloom answers the swarm.
          tl.to(flower, { rotate: 180, scale: 1.28, duration: 1, ease: "back.out(1.8)" }, 2.3).to(
            flower,
            { scale: 1, duration: 0.6, ease: "power2.out" },
            3.3,
          );

          if (counter) {
            const progress = { value: 0 };
            tl.to(
              progress,
              {
                value: 100,
                duration: 4,
                ease: "power1.inOut",
                onUpdate: () => {
                  counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
                },
              },
              0,
            );
          }

          // Handoff: the curtain dissolves and the mark settles into the header.
          const HANDOFF = 4.2;

          if (counter) tl.to(counter, { autoAlpha: 0, duration: 0.4 }, HANDOFF - 0.3);

          tl.to(
            ".js-pl-curtain",
            { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
            HANDOFF + 0.15,
          );

          // Hand over while the curtain is still dissolving, so the page
          // animates in underneath it instead of after it. Waiting for the
          // timeline to end leaves a dead beat that reads as a hard cut.
          tl.call(finish, [], HANDOFF + 0.3);

          if (handoff) {
            // Measured at tween start, so the header is already in its final spot.
            tl.to(
              flower,
              {
                x: () => flip(flower, headerFlower).x,
                y: () => flip(flower, headerFlower).y,
                scale: () => flip(flower, headerFlower).scale,
                rotate: 360,
                duration: 1.25,
                ease: "power3.inOut",
              },
              HANDOFF,
            )
              .to(
                name,
                {
                  x: () => flip(name, headerName).x,
                  y: () => flip(name, headerName).y,
                  scale: () => flip(name, headerName).scale,
                  duration: 1.25,
                  ease: "power3.inOut",
                },
                HANDOFF,
              )
              .set([headerFlower, headerName], { autoAlpha: 1 })
              .set([flower, name], { autoAlpha: 0 });
          } else {
            tl.to([flower, name], { autoAlpha: 0, duration: 0.5 }, HANDOFF);
          }

          tl.set(root, { display: "none" });
        }, rootRef);

        cleanup = () => ctx.revert();
      },
    );

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
      cleanup();
    };
  }, []);

  return (
    // pointer-events-none because the curtain turns transparent ~1s before the
    // root is removed; without it that gap silently swallows clicks.
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10001] overflow-hidden"
    >
      <div className="js-pl-curtain absolute inset-0 bg-[var(--bg)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
        <FlowerMark
          size={320}
          className="js-pl-flower h-[clamp(180px,30vmin,340px)] w-[clamp(180px,30vmin,340px)] text-[color:var(--fg)]"
        />
        {/* One masked span per letter so they can climb into view in sequence. */}
        <span className="js-pl-name flex [font-family:var(--font-display)] text-[clamp(1.8rem,5.5vw,3.6rem)] leading-none tracking-[0.16em] text-[color:var(--fg)] uppercase">
          {"Dauphinsss".split("").map((char, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static wordmark
              key={index}
              className="inline-block overflow-hidden py-[0.14em]"
            >
              <span className="js-pl-letter inline-block">{char}</span>
            </span>
          ))}
        </span>
      </div>

      {BEE_SIZES.slice(0, BEE_COUNT).map((size, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decorative list
          key={index}
          className="js-pl-bee invisible absolute top-0 left-0 will-change-transform"
        >
          {/* Three nested layers, one transform owner each: motion path on the
              wrapper, bob here, wing flutter on the image. */}
          <div className="js-pl-bee-bob">
            <img
              src="/bee.svg"
              alt=""
              width={size}
              height={size}
              className="js-pl-bee-body block -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      ))}

      <span className="js-pl-count absolute right-6 bottom-5 [font-family:var(--font-mono)] text-sm tracking-[0.2em] text-[color:var(--muted)]">
        000
      </span>
    </div>
  );
}
