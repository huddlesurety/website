import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="contact px-section">
      <div className="contact-info">
        <p className="section-label">Get Started</p>
        <h2 className="section-title">
          Ready to transform
          <br />
          your workflow?
        </h2>
        <p className="section-description contact-description">
          Schedule a personalized demo to see how Huddle can streamline your
          surety bond operations.
        </p>
        <ul className="contact-benefits">
          <li>Free 30-minute demo</li>
          <li>Custom workflow analysis</li>
          <li>No commitment required</li>
        </ul>
      </div>

      <div className="contact-form-wrap">
        <ContactForm />
      </div>
    </section>
  );
}
