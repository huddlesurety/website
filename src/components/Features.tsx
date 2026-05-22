type Feature = {
  id: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    id: "01",
    title: "Client Portal",
    description:
      "Provide your clients with a modern, AI-driven portal that automates bond requests while ensuring completion of forms.",
  },
  {
    id: "02",
    title: "Bonding Automation",
    description:
      "Accelerate your processing & execution speeds to increase bond servicing capacity with our surety-trained AI tools.",
  },
  {
    id: "03",
    title: "Real-time Status Tracking",
    description:
      "Gain visibility into the live status of every bond request across your agency to share with your clients\u2014no more follow-up calls or emails to check on progress.",
  },
  {
    id: "04",
    title: "Enhanced Communication",
    description:
      "Centralize collaboration between contractors and agents in one platform, replacing fragmented email chains and phone calls.",
  },
  {
    id: "05",
    title: "Huddle Highlight\u2122",
    description:
      "Quickly review bond requests and streamline quality control to ensure accuracy of essential bond information.",
  },
  {
    id: "06",
    title: "Intelligent Account Oversight",
    description:
      "Set custom parameters and automated triggers for requesting additional information for every client account, allowing your team to focus on high-value advisory rather than data entry.",
  },
];

export function Features() {
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

      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <span className="id">{feature.id}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
