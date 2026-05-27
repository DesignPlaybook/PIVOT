import { Link } from "react-router-dom";

import MailIcon from "../../assets/icons/MailIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LocationPinIcon from "../../assets/icons/LocationPinIcon";

import logo from "../../assets/PEPLogo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <img
              src={logo}
              alt="PivotEdge Partners"
              className="footer-logo"
              style={{ filter: "none" }}
            />
            <p className="footer-tagline">Advantage Starts Here</p>
            <p className="footer-desc">
              A specialist executive search and leadership advisory firm
              partnering with Boards and senior executives.
            </p>
          </div>
          <div>
            <p className="footer-heading">Navigation</p>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/insights">Insights</Link>
              </li>
              <li>
                <Link to="/domains">Domains</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Legal</p>
            <ul className="footer-links">
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
            <p className="footer-heading" style={{ marginTop: "2rem" }}>
              Global Presence
            </p>
            <ul className="footer-links">
              <li>
                <span style={{ color: "#0F4C5C", fontWeight: 500 }}>
                  Mumbai
                </span>{" "}
                — South Asia & India
              </li>
              <li>
                <span style={{ color: "#0F4C5C", fontWeight: 500 }}>Dubai</span>{" "}
                — Middle East & GCC
              </li>
              <li>
                <span style={{ color: "#0F4C5C", fontWeight: 500 }}>
                  Sydney
                </span>{" "}
                — Asia-Pacific
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Contact</p>
            <div className="footer-contact-item">
              <span style={{ marginTop: "2px" }}>
                <MailIcon />
              </span>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#0F4C5C",
                    fontSize: "0.875rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  Swapna Amin
                </div>
                <a
                  href="mailto:swapna.amin@pivotedgegroup.com"
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    wordBreak: "break-all",
                  }}
                >
                  swapna.amin@pivotedgegroup.com
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <span style={{ marginTop: "2px" }}>
                <PhoneIcon />
              </span>
              <a href="tel:+919820779053" style={{ color: "#6b7280" }}>
                +91 98207 79053
              </a>
            </div>
            <div className="footer-contact-item">
              <span style={{ marginTop: "2px" }}>
                <LocationPinIcon />
              </span>
              <span>PivotEdgeGroup.com</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 PivotEdge Partners · PivotEdgeGroup.com · All rights
            reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/terms" style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
              Terms
            </Link>
            <Link
              to="/disclaimer"
              style={{ fontSize: "0.8rem", color: "#9ca3af" }}
            >
              Disclaimer
            </Link>
            <Link
              to="/privacy"
              style={{ fontSize: "0.8rem", color: "#9ca3af" }}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
