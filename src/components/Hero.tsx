import Link from "next/link";
import { Wave } from "./Wave";

export function Hero() {
  return (
    <section className="hero px-section">
      <div className="hero-content">
        <h1>
          The New Era of
          <br />
          Surety Bonds
        </h1>
        <p>
          Move beyond the limitations of antiquated systems.
          <br />
          Huddle streamlines the entire request-to-execution journey,
          <br />
          allowing brokers to focus on high-value advisory
          <br />
          and client relationships.
        </p>
        <div className="hero-cta">
          <Link href="#contact" className="btn btn-default btn-xl">
            Request Demo
          </Link>
          <Link href="#process" className="btn btn-outline btn-xl">
            Learn More
          </Link>
        </div>
      </div>
      <Wave />
    </section>
  );
}
