"use client";

import { useEffect } from "react";

/**
 * Replicates the prototype's scroll-reveal behavior:
 *  - inserts a thin top rule into each <main> section (except hero/introduction)
 *  - tags section header pieces with .reveal + a stagger index var
 *  - uses IntersectionObserver to add .is-visible when they enter the viewport
 *
 * Mounted once at the page level. No render output.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = document.querySelectorAll<HTMLElement>("main > section");
    sections.forEach((section) => {
      if (section.classList.contains("hero")) return;

      // Insert a section rule at the very top (skip introduction — it sits right under nav).
      if (
        section.id !== "introduction" &&
        !section.querySelector(":scope > .section-rule")
      ) {
        const rule = document.createElement("div");
        rule.className = "section-rule";
        section.prepend(rule);
      }

      // Header pieces — main section, process sticky header, contact info, team header
      const targets = section.querySelectorAll<HTMLElement>(
        ":scope > .section-label, :scope > .section-title, :scope > .section-description, " +
          ":scope > .team-header, :scope > .process-sticky > div > .section-label, " +
          ":scope > .process-sticky > div > .section-title, " +
          ":scope .contact-info > .section-label, " +
          ":scope .contact-info > .section-title, " +
          ":scope .contact-info > .section-description",
      );
      let i = 0;
      targets.forEach((el) => {
        if (el.classList.contains("reveal")) return;
        el.classList.add("reveal");
        el.style.setProperty("--reveal-i", String(i++));
      });

      // Inside .team-header, stagger its inner items too
      const teamHeader = section.querySelector<HTMLElement>(
        ":scope > .team-header",
      );
      if (teamHeader) {
        let j = 0;
        teamHeader.querySelectorAll<HTMLElement>(":scope > *").forEach((el) => {
          el.classList.add("reveal");
          el.style.setProperty("--reveal-i", String(j++));
        });
        teamHeader.classList.remove("reveal");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    document
      .querySelectorAll(".reveal, .section-rule")
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
