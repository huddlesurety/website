export function Introduction() {
  return (
    <section id="introduction" className="px-section">
      <div className="section-header">
        <p className="section-label">Introduction</p>
        <h2 className="section-title">What is Surety?</h2>
      </div>

      <div className="intro-grid">
        <div>
          <p className="intro-lead">
            A multi-billion dollar industry still running on manual data entry,
            fragmented emails, and antiquated systems.
          </p>
          <p className="text-muted" style={{ lineHeight: 1.65 }}>
            Surety bonding is the backbone of the construction industry,
            providing the financial guarantees necessary for infrastructure and
            development. Yet, the process has barely changed in decades.
          </p>
        </div>

        <div className="intro-body">
          <p>
            Today, contractors and agents are forced to navigate a labyrinth of
            PDFs, phone calls, and slow turnaround times. This inefficiency
            doesn&rsquo;t just waste time&mdash;it limits bonding capacity and
            slows down the entire project lifecycle.
          </p>
          <p className="intro-quote">
            Huddle was built to bridge this gap, bringing modern AI and seamless
            collaboration to the world of surety.
          </p>
        </div>
      </div>
    </section>
  );
}
