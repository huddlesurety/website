// The three "screenshot" mocks that animate as the user scrolls through the
// Process section. All pure CSS — no interactivity inside.

export function FormAutofillMock() {
  return (
    <div className="mock">
      <div className="mock-bar">
        <div className="mock-dot" />
        <div className="mock-dot" />
        <div className="mock-dot" />
        <span className="mock-bar-label">Bid Bond Request</span>
      </div>
      <div className="mock-body">
        <div className="mock-col">
          <span className="mock-label">Contractor</span>
          <div className="mock-input filled">ABC Construction</div>
          <span className="mock-label">Address</span>
          <div className="mock-input filled">212 Briarvista Way NE</div>
          <span className="mock-label">Project Name</span>
          <div className="mock-input typing">Riverfront Bridge Project</div>
        </div>
        <div className="mock-col">
          <span className="mock-label">Surety</span>
          <div className="mock-input filled">Liberty Mutual</div>
          <span className="mock-label">Bond Amount</span>
          <div className="mock-input filled">Five percent (5%) of Bid</div>
          <span className="mock-label">Date</span>
          <div className="mock-input filled">May 16, 2026</div>
        </div>
      </div>
    </div>
  );
}

export function HighlightEvidenceMock() {
  return (
    <div className="mock">
      <div className="mock-bar">
        <div className="mock-dot" />
        <div className="mock-dot" />
        <div className="mock-dot" />
        <span className="mock-bar-label">Huddle Highlight&trade;</span>
      </div>
      <div className="mock-body">
        <div className="mock-highlight">
          <div className="mock-line w-90" />
          <div className="mock-line w-75" />
          <div className="mock-line w-90 highlighted" />
          <div className="mock-line w-60" />
          <div className="mock-line w-75" />
          <div className="mock-line w-40 highlighted" />
          <div className="mock-line w-90" />
          <div className="mock-line w-60" />
        </div>
        <div className="mock-highlight mock-highlight-aside">
          <span className="mock-label">Field Evidence</span>
          <div className="mock-evidence-field">Bond Amount</div>
          <div className="mock-evidence-detail">
            Sourced from page 3, paragraph 2 of contractor&rsquo;s bid
            documentation.
          </div>
          <div className="mock-evidence-tags">
            <div className="mock-tag-verified">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}

type InboxRow = {
  initials: string;
  name: string;
  meta: string;
  status: string;
  live?: boolean;
};

const inboxRows: InboxRow[] = [
  {
    initials: "AB",
    name: "ABC Construction",
    meta: "Bid Bond \u00B7 $1.2M",
    status: "New",
    live: true,
  },
  {
    initials: "RC",
    name: "Riverstone Contractors",
    meta: "Performance \u00B7 $850K",
    status: "In Review",
  },
  {
    initials: "ME",
    name: "Meridian Engineering",
    meta: "Payment \u00B7 $2.4M",
    status: "Pending",
  },
  {
    initials: "SP",
    name: "Summit Partners",
    meta: "Bid Bond \u00B7 $450K",
    status: "Approved",
  },
];

export function InboxMock() {
  return (
    <div className="mock">
      <div className="mock-bar">
        <div className="mock-dot" />
        <div className="mock-dot" />
        <div className="mock-dot" />
        <span className="mock-bar-label">Bond Request Inbox</span>
      </div>
      <div className="mock-list">
        {inboxRows.map((row) => (
          <div key={row.initials} className="mock-list-item">
            <div className="mock-avatar">{row.initials}</div>
            <span className="name">{row.name}</span>
            <span className="meta">{row.meta}</span>
            <span className={`status${row.live ? " live" : ""}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
