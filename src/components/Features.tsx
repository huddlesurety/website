"use client";

import { useEffect, useRef, useState } from "react";
import {
  PortalVisual,
  AutoVisual,
  TrackVisual,
  FillVisual,
  HighlightVisual,
  OversightVisual,
} from "./FeatureVisuals";

type Feature = {
  id: string;
  name: string;
  title: string;
  description: string;
  Visual: () => React.ReactElement;
};

const features: Feature[] = [
  {
    id: "01",
    name: "Client Portal",
    title: "Client Portal",
    description:
      "Provide your clients with a white-label, AI-driven portal to upload documents and request bonds.",
    Visual: PortalVisual,
  },
  {
    id: "02",
    name: "Request Automation",
    title: "Request Automation",
    description:
      "Accelerate your processing & execution speeds to increase bond servicing capacity with our surety-trained AI tools.",
    Visual: AutoVisual,
  },
  {
    id: "03",
    name: "Bond Finder",
    title: "Bond Finder",
    description:
      "Use Huddle's AI to find up-to-date obligee bond forms from project documents.",
    Visual: TrackVisual,
  },
  {
    id: "04",
    name: "Bond Filler",
    title: "Bond Filler",
    description:
      "After bond finder locates the bond or agent upload it, our AI completed bonds by analyzing the contractor details, their surety information, and the bond request.",
    Visual: FillVisual,
  },
  {
    id: "05",
    name: "Huddle Highlight\u2122",
    title: "Huddle Highlight\u2122",
    description:
      "Quickly review bond requests and streamline quality control to ensure accuracy of essential bond information.",
    Visual: HighlightVisual,
  },
  {
    id: "06",
    name: "Account management",
    title: "Account Management",
    description:
      "Assign multiple staff to specific client accounts so bond requests always go to the correct team members. Agencies can also re-assign accounts if someone is sick or out of office so your clients don't have to worry.",
    Visual: OversightVisual,
  },
];

const ROTATION_MS = 6000;

export function Features() {
  const [active, setActive] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Track mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // On mobile the panels render as an accordion inside each row, so the
  // default state should be "everything closed" — not "first item open."
  // Reset active to -1 once we detect mobile, unless the user has already
  // tapped something.
  useEffect(() => {
    if (isMobile && !userInteracted) setActive(-1);
  }, [isMobile, userInteracted]);

  // Reveal + auto-rotate while in view; pause when out of view
  useEffect(() => {
    const node = showcaseRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setRevealed(e.isIntersecting));
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || userInteracted || isMobile) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % features.length);
    }, ROTATION_MS);
    return () => clearTimeout(id);
  }, [revealed, userInteracted, isMobile, active]);

  const onSelect = (i: number) => {
    setUserInteracted(true);
    if (isMobile && i === active) {
      // Accordion behavior on mobile: tapping the active item collapses to none.
      setActive(-1);
      return;
    }
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent<HTMLLIElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(i);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % features.length;
      setUserInteracted(true);
      setActive(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + features.length) % features.length;
      setUserInteracted(true);
      setActive(prev);
      itemRefs.current[prev]?.focus();
    }
  };

  const coordLabel = `${String(Math.max(active, 0) + 1).padStart(2, "0")} / 0${features.length}`;

  return (
    <section id="features" className="px-section">
      <p className="section-label">Features</p>
      <h2 className="section-title">
        Everything you need
        <br />
        to streamline surety
      </h2>
      <p
        className="section-description features-intro"
        style={{ marginTop: "1.5rem" }}
      >
        Purpose-built tools that transform how contractors and agents handle
        bond requests. No more scattered documents or endless email chains.
      </p>

      <div
        ref={showcaseRef}
        className={`features-showcase${revealed ? " is-revealed" : ""}`}
      >
        <ol className="feat-index" role="tablist" aria-label="Features">
          {features.map((f, i) => {
            const isActive = i === active;
            return (
              <li
                key={f.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`feat-item${isActive ? " is-active" : ""}`}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`feat-panel-${i}`}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setUserInteracted(true);
                    setActive(i);
                  }
                }}
                onClick={() => onSelect(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="num">{f.id}</span>
                <span className="name">{f.name}</span>
                <span className="marker" aria-hidden="true" />
                <span className="chev-m" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
                {/* On mobile, the panel renders inside the item for accordion behavior */}
                {isMobile && (
                  <FeaturePanel
                    feature={f}
                    index={i}
                    isActive={isActive}
                    coordLabel={coordLabel}
                    showCoord={false}
                  />
                )}
              </li>
            );
          })}
        </ol>

        {/* Desktop: panels live in the stage column */}
        {!isMobile && (
          <div className="feat-stage" aria-live="polite">
            <span className="stage-coord">
              <span>Feature</span>
              <span className="pill">{coordLabel}</span>
            </span>
            {features.map((f, i) => (
              <FeaturePanel
                key={f.id}
                feature={f}
                index={i}
                isActive={i === active}
                coordLabel={coordLabel}
                showCoord={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturePanel({
  feature,
  index,
  isActive,
}: {
  feature: Feature;
  index: number;
  isActive: boolean;
  coordLabel: string;
  showCoord: boolean;
}) {
  const Visual = feature.Visual;
  return (
    <div
      id={`feat-panel-${index}`}
      className={`feat-panel${isActive ? " is-active" : ""}`}
      role="tabpanel"
    >
      <div className="feat-panel-visual">
        <Visual />
      </div>
      <div className="feat-panel-meta">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </div>
  );
}
