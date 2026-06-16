export function Introduction() {
  return (
    <section id="introduction" className="px-section">
      <p className="section-label">Introduction</p>

      <div className="intro-clean">
        <h2 className="intro-title">
          Project docs to issued bond, in seconds.
        </h2>

        <div>
          <p className="intro-support">
            Huddle analyzes project documents, asks the contractor a few quick
            questions, and generates the bond request and policy automatically —
            helping brokers improve customer delivery by replacing manual work
            with surety-trained intelligence.
          </p>

          <div className="intro-stats">
            <div className="intro-stat">
              <span className="val">10&times;</span>
              <span className="lbl">Faster turnaround</span>
            </div>
            <div className="intro-stat">
              <span className="val">90%</span>
              <span className="lbl">Less data entry</span>
            </div>
            <div className="intro-stat">
              <span className="val">&lt;5 min</span>
              <span className="lbl">Per bond processed</span>
            </div>
          </div>
        </div>
      </div>

      <IntroductionVisual />
    </section>
  );
}

function IntroductionVisual() {
  return (
    <div className="intro-visual" aria-hidden="true">
      <div className="iv-label">
        <span className="dot"></span>
        <span style={{ fontSize: 15 }}>BID PACKAGE TO BOND, IN SECONDS</span>
      </div>

      <div className="iv-stage">
        {/* Source: bid package */}
        <div className="iv-card">
          <div className="iv-card-title">
            <span>Bid Package</span>
            <span className="badge">.pdf</span>
          </div>
          <div className="iv-doc-lines">
            <div className="iv-line w-90"></div>
            <div className="iv-line w-80 hl hl-1"></div>
            <div className="iv-line w-70"></div>
            <div className="iv-line w-55 hl hl-2"></div>
            <div className="iv-line w-80"></div>
            <div className="iv-line w-70"></div>
            <div className="iv-line w-40 hl hl-3"></div>
            <div className="iv-line w-90"></div>
            <div className="iv-line w-55"></div>
            <div className="iv-line w-70"></div>
          </div>
          <div className="iv-scan"></div>
        </div>

        {/* Connector → Client Portal */}
        <div className="iv-connector">
          <div className="line"></div>
          <div className="iv-core">
            <div className="bar">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="body">
              <span className="label">Portal</span>
              <span className="name">Client&nbsp;Portal</span>
              <div className="upload"></div>
            </div>
          </div>
        </div>

        {/* Output: generated bond request */}
        <div className="iv-card">
          <div className="iv-card-title">
            <span>GENERATED BOND REQUEST</span>
            <span className="badge"></span>
          </div>
          <div className="iv-output">
            <div className="iv-field">
              <span className="k">Contractor</span>
              <span className="v">
                <span>ABC Construction</span>
              </span>
            </div>
            <div className="iv-field">
              <span className="k">Bond Type</span>
              <span className="v">
                <span>Bid Bond</span>
              </span>
            </div>
            <div className="iv-field">
              <span className="k">Project</span>
              <span className="v">
                <span>Riverfront Bridge</span>
              </span>
            </div>
            <div className="iv-field">
              <span className="k">Obligee</span>
              <span className="v">
                <span>City of Atlanta</span>
              </span>
            </div>
            <div className="iv-field">
              <span className="k">Bond Amount</span>
              <span className="v">
                <span>5% of Bid</span>
              </span>
            </div>
            <div className="iv-field">
              <span className="k">LIQUIDATED DAMAGES</span>
              <span className="v">
                <span>$100 per calendar day</span>
              </span>
            </div>
          </div>
        </div>

        {/* Connector → Huddle logo */}
        <div className="iv-connector">
          <div className="line" style={{ animationDelay: "-0.6s" }}></div>
          <div className="iv-logo" aria-hidden="true">
            <span className="ring"></span>
            <span className="ring r2"></span>
            <img
              src="https://brand.huddlesurety.co/logo/md-light-transparent.svg"
              alt=""
            />
          </div>
        </div>

        {/* Output: filled bond */}
        <div className="iv-card">
          <div className="iv-card-title">
            <span>COMPLETED BOND</span>
            <span className="badge"></span>
          </div>
          <div className="iv-form-doc">
            <div className="ff-title">Bid Bond</div>
            <div className="ff-grid">
              <div className="ff-row">
                <span className="lbl">Principal</span>
                <span className="blank">
                  <span>ABC Construction Co.</span>
                </span>
              </div>
              <div className="ff-row">
                <span className="lbl">Obligee</span>
                <span className="blank">
                  <span>City of Atlanta, GA</span>
                </span>
              </div>
              <div className="ff-row">
                <span className="lbl">Penal Sum</span>
                <span className="blank">
                  <span>5% of Total Bid</span>
                </span>
              </div>
              <div className="ff-row">
                <span className="lbl">Project</span>
                <span className="blank">
                  <span>Riverfront Bridge</span>
                </span>
              </div>
            </div>
            <div className="ff-sig">
              <div className="sig">Principal Signature</div>
              <div className="sig">Surety Signature</div>
            </div>
          </div>
          <div className="iv-stamp">Ready to issue</div>
        </div>
      </div>

      <div className="iv-caption">
        <div className="step">
          <span className="num">1</span>
          <span>Submit bid package</span>
        </div>
        <div className="step">
          <span className="num">2</span>
          <span>Generate request</span>
        </div>
        <div className="step">
          <span className="num">3</span>
          <span>Auto-fill bond</span>
        </div>
        <div className="step">
          <span className="num">4</span>
          <span>Ready to issue</span>
        </div>
      </div>
    </div>
  );
}
