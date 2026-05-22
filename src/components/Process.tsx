"use client";

import { useEffect, useRef, useState } from "react";
import {
  FormAutofillMock,
  HighlightEvidenceMock,
  InboxMock,
} from "./ProcessMocks";

type Step = {
  id: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: "01",
    title: "Auto-Generate Bond Requests",
    description:
      "Provide your clients with a modern, AI-driven portal that automates bond requests while ensuring completion of request forms.",
  },
  {
    id: "02",
    title: "Streamline Quality Control",
    description:
      "Verify underwriting information with Huddle Highlight\u2122, providing evidence for generated fields and enabling faster reviews.",
  },
  {
    id: "03",
    title: "Centralize Incoming Bond Requests",
    description:
      "View and manage all incoming bond requests from your contractors in one place.",
  },
];

const visuals = [<FormAutofillMock key="0" />, <HighlightEvidenceMock key="1" />, <InboxMock key="2" />];

const NUM_STEPS = steps.length;
const VISUAL_GAP_PX = 16;

export function Process() {
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const activeStepFloat = progress * (NUM_STEPS - 1);
      const next = Math.round(activeStepFloat);

      setActive((prev) => (prev === next ? prev : next));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="process"
      ref={wrapRef}
      className="process-wrap px-section"
      style={{ height: `${NUM_STEPS * 100}vh` }}
    >
      <div className="process-sticky">
        <div style={{ paddingBottom: "3rem" }}>
          <p className="section-label">Process</p>
          <h2 className="section-title">
            A Seamless AI Journey
            <br />
            to Bond Requests
          </h2>
        </div>

        <div className="process-body">
          <div className="process-text-col">
            <div className="process-step-content">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`process-step${i === active ? " active" : ""}`}
                  data-step={i}
                >
                  <span className="id">{step.id}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>

            <div className="process-indicators">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`process-indicator${i === active ? " active" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="process-visual-col">
            {visuals.map((visual, i) => {
              const offset = i - active;
              const distance = Math.abs(offset);
              const isActive = distance === 0;
              const opacity = isActive ? 1 : Math.max(0.2, 1 - distance * 0.4);
              const scale = isActive ? 1 : 0.95;

              return (
                <div
                  key={i}
                  className="process-visual"
                  data-visual={i}
                  style={{
                    transform: `translateY(calc(${offset} * (100% + ${VISUAL_GAP_PX}px))) scale(${scale})`,
                    opacity,
                  }}
                >
                  {visual}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
