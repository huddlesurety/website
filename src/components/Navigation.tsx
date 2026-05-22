"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Navigation() {
  const innerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const updateNav = () => {
      const y = window.scrollY;
      const opacity = Math.min((y / 64) * 100, 90);
      const blur = Math.min(y / 20, 10);
      inner.style.background = `color-mix(in oklab, var(--background) ${opacity}%, transparent)`;
      inner.style.backdropFilter = `blur(${blur}px)`;
      // Safari < 18 still needs the prefix; not in lib.dom.d.ts so use indexed access
      (inner.style as unknown as Record<string, string>)["webkitBackdropFilter"] = `blur(${blur}px)`;
    };

    window.addEventListener("scroll", updateNav, { passive: true });
    updateNav();

    return () => {
      window.removeEventListener("scroll", updateNav);
    };
  }, []);

  return (
    <>
      <header className="nav">
        <nav className="inner" ref={innerRef}>
          <Logo />
          <div className="nav-links">
            <Link href="#introduction" className="nav-link">
              Introduction
            </Link>
            <Link href="#features" className="nav-link">
              Features
            </Link>
            <Link href="#process" className="nav-link">
              Process
            </Link>
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
          </div>
          <div className="nav-actions">
            <Link href="#" className="btn btn-ghost btn-lg">
              Sign In
            </Link>
            <Link href="#contact" className="btn btn-default btn-lg">
              Get Started
            </Link>
          </div>
        </nav>
      </header>
      <div className="nav-spacer" />
    </>
  );
}
