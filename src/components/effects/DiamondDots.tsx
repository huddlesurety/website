"use client";

import { useEffect } from "react";

/**
 * Scales/fades the small diamond dots inside the intro visual label and each
 * team-card badge based on the dot's distance from the viewport center.
 * The CSS uses var(--dot-scale) and var(--dot-opacity).
 */
export function DiamondDots() {
  useEffect(() => {
    const collect = () => {
      const pairs: { anchor: HTMLElement; dot: HTMLElement }[] = [];
      const introLabel = document.querySelector<HTMLElement>(
        ".intro-visual .iv-label",
      );
      if (introLabel) {
        const d = introLabel.querySelector<HTMLElement>(".dot");
        if (d) pairs.push({ anchor: introLabel, dot: d });
      }
      document
        .querySelectorAll<HTMLElement>(".team-card .team-badge .dot")
        .forEach((d) => {
          const anchor =
            d.closest<HTMLElement>(".team-card") ||
            d.closest<HTMLElement>(".team-badge") ||
            d;
          pairs.push({ anchor, dot: d });
        });
      return pairs;
    };

    let pairs = collect();
    if (!pairs.length) {
      // Try again after one frame; team cards mount after Team component renders
      requestAnimationFrame(() => {
        pairs = collect();
      });
    }

    const MIN_SCALE = 0.6;
    const MAX_SCALE = 2.2;
    const MIN_OPACITY = 0.15;
    const MAX_OPACITY = 1;

    let ticking = false;
    const update = () => {
      ticking = false;
      if (!pairs.length) pairs = collect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vpCenter = vh / 2;
      for (const { anchor, dot } of pairs) {
        const rect = anchor.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - vpCenter);
        const t = Math.max(0, Math.min(1, 1 - dist / (vh * 0.6)));
        const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * t;
        const opacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * t;
        dot.style.setProperty("--dot-scale", scale.toFixed(3));
        dot.style.setProperty("--dot-opacity", opacity.toFixed(3));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
