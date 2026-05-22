"use client";

import { useState } from "react";

type TeamFact = { k: string; v: React.ReactNode };
type Member = {
  slug: string;
  name: string;
  role?: string;
  badge: "Co-founder" | "Team";
  linkedin: string;
  image: string; // path under /public — drop files at /public/assets/<name>.png
  size?: "smaller" | "larger";
  facts: TeamFact[];
};

const team: Member[] = [
  {
    slug: "hunter",
    name: "Hunter",
    role: "CEO",
    badge: "Co-founder",
    linkedin: "https://www.linkedin.com/in/hunterdecristo/",
    image: "/assets/hunter.png",
    facts: [
      {
        k: "Education",
        v: (
          <>
            Economics, <em>Emory University</em> &mdash; class of 2026.
          </>
        ),
      },
      {
        k: "Background",
        v: (
          <>
            Family has worked in surety for the last <em>30 years</em>. Hunter
            is the third generation building in the space.
          </>
        ),
      },
      { k: "Off-hours", v: "Soccer on the pitch, chess at the board." },
    ],
  },
  {
    slug: "ethan",
    name: "Ethan",
    role: "CTO",
    badge: "Co-founder",
    linkedin: "https://www.linkedin.com/in/ethantlee/",
    image: "/assets/ethan.png",
    facts: [
      {
        k: "Education",
        v: (
          <>
            M.S. Computer Science, <em>Carnegie Mellon</em> &mdash; class of
            2028.
          </>
        ),
      },
      {
        k: "Background",
        v: "Lead engineer behind Huddle's AI-driven bond pipeline.",
      },
      { k: "Off-hours", v: "Plays guitar; performs concerts with his band." },
    ],
  },
  {
    slug: "nate",
    name: "Nate",
    badge: "Team",
    linkedin: "https://www.linkedin.com/in/xinyuanhu03204/",
    image: "/assets/nate.png",
    size: "smaller",
    facts: [
      {
        k: "Education",
        v: (
          <>
            M.S. Data Science, <em>Harvard University</em>.
          </>
        ),
      },
      {
        k: "Background",
        v: (
          <>
            Machine&#8209;learning engineer with research experience at{" "}
            <em>Tsinghua University</em>.
          </>
        ),
      },
    ],
  },
  {
    slug: "taeeun",
    name: "Taeeun",
    badge: "Team",
    linkedin: "https://www.linkedin.com/in/taeeunnkim/",
    image: "/assets/taeeun.png",
    facts: [
      {
        k: "Education",
        v: (
          <>
            B.A. Computer Science, <em>Emory University</em> &mdash; class of
            2027.
          </>
        ),
      },
      {
        k: "Background",
        v: (
          <>
            Currently at <em>LinkedIn</em>, where she supports technical
            operations &mdash; the same craft she brings to Huddle.
          </>
        ),
      },
    ],
  },
  {
    slug: "andrew",
    name: "Andrew",
    badge: "Team",
    linkedin: "https://www.linkedin.com/in/andrew-lin3/",
    image: "/assets/andrew.png",
    size: "larger",
    facts: [
      {
        k: "Education",
        v: (
          <>
            B.A. Computer Science, <em>Emory University</em> &mdash; class of
            2027.
          </>
        ),
      },
      {
        k: "Background",
        v: (
          <>
            Previously built AI solutions for the insurance industry at{" "}
            <em>MagMutual</em>.
          </>
        ),
      },
      { k: "Off-hours", v: "Skateboarding and board games." },
    ],
  },
];

export function Team() {
  return (
    <section id="team" className="px-section">
      <div className="team-header">
        <p className="section-label">About</p>
        <h2 className="section-title">Our Team</h2>
        <p className="section-description">
          A founding team that brings generational experience in
          surety together with full-stack AI engineering.
        </p>
      </div>

      <div className="team-grid">
        {team.map((member) => (
          <TeamCard key={member.slug} member={member} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);

  const sizeClass =
    member.size === "smaller"
      ? " is-smaller"
      : member.size === "larger"
        ? " is-larger"
        : "";

  // Card-wide toggle, but suppress when the click originates on the LinkedIn pill.
  const onCardClick = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest(".team-linkedin")) return;
    setOpen((o) => !o);
  };

  return (
    <article
      className={`team-card${sizeClass}${open ? " is-open" : ""}`}
      data-team
      onClick={onCardClick}
    >
      <div className="team-portrait">
        <span className="team-badge">
          <span className="dot"></span>
          {member.badge}
        </span>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="team-linkedin"
          aria-label={`${member.name} on LinkedIn`}
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
        <img src={member.image} alt={member.name} />
      </div>
      <div className="team-body">
        <h3 className="team-name">
          {member.name}
          {member.role && <span className="role"> {member.role}</span>}
        </h3>
        <p className="team-tagline"></p>

        <button
          type="button"
          className="team-toggle"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          <span className="label">
            {open
              ? `Less about ${member.name}`
              : `More about ${member.name}`}
          </span>
          <span className="chev">
            <svg
              width="12"
              height="12"
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
        </button>

        <div className="team-details">
          <div className="team-details-inner">
            <div className="team-details-content">
              {member.facts.map((fact) => (
                <div key={fact.k} className="team-fact">
                  <span className="k">{fact.k}</span>
                  <span className="v">{fact.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
