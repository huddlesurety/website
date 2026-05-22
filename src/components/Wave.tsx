"use client";

import { useEffect, useRef } from "react";

const NUM_BARS = 60;
const SVG_W = 1000;
const SVG_H = 200;
const PERIOD = 30_000; // 30s for one full phase cycle

function irregularSineWave(length: number, baseFreq: number, phase: number) {
  const out = new Array<number>(length);
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const sine = Math.sin(t * Math.PI * 2 * baseFreq + phase);
    const envelope = Math.sin(t * Math.PI) * 0.7 + 0.3;
    out[i] = Math.max(0, (sine * envelope + 1) / 2);
  }
  return out;
}

export function Wave() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const NS = "http://www.w3.org/2000/svg";
    const bars: SVGRectElement[] = [];

    // Build the bars imperatively (matches the prototype's reveal animation timing)
    for (let i = 0; i < NUM_BARS; i++) {
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("class", "wave-bar");
      rect.style.animationDelay = `${i * 20}ms`;
      svg.appendChild(rect);
      bars.push(rect);
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = (now - start) % PERIOD;
      const phase = (elapsed / PERIOD) * Math.PI * 2;
      const wave = irregularSineWave(NUM_BARS, 2, phase);
      const stepX = SVG_W / NUM_BARS;

      for (let i = 0; i < NUM_BARS; i++) {
        const v = wave[i];
        const h = v * SVG_H;
        const w = v * 8;
        const bar = bars[i];
        bar.setAttribute("x", String(i * stepX));
        bar.setAttribute("y", String(SVG_H - h));
        bar.setAttribute("width", String(w));
        bar.setAttribute("height", String(h));
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      // Clean up bars on unmount so StrictMode double-invoke doesn't duplicate them
      bars.forEach((b) => b.remove());
    };
  }, []);

  return (
    <div className="wave-container">
      <svg
        ref={svgRef}
        className="wave-svg"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      />
    </div>
  );
}
