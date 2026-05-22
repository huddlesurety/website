import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container-x border-x footer-inner px-section">
        <div className="footer-top">
          <div>
            <Logo />
            <p className="footer-blurb">
              AI-powered surety bond solutions for modern contractors and
              agents.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#process">How it Works</Link>
                </li>
                <li>
                  <Link href="#">Pricing</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link href="#">Privacy</Link>
                </li>
                <li>
                  <Link href="#">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Huddle</p>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
