import { T } from "./tokens";
import logo from "../assets/PEPLogo.png";

const FOOTER_CSS = `
  .ft-root {
    background: var(--teal);
    padding: 48px 64px 28px;
    font-family: 'Jost', sans-serif;
  }

  .ft-link {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: rgba(245,240,232,0.55);
    display: block;
    margin-bottom: 8px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    transition: color 0.25s ease;
    letter-spacing: 0.01em;
    width: 100%;
  }
  .ft-link:hover { color: var(--gold); }

  .ft-col-label {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgba(184,150,46,0.7);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(184,150,46,0.12);
  }

  .ft-legal-link {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.28);
    cursor: pointer;
    transition: color 0.25s ease;
    background: none;
    border: none;
    padding: 0;
  }
  .ft-legal-link:hover { color: var(--gold); }

  .ft-divider {
    height: 1px;
    background: rgba(245,240,232,0.07);
    margin: 32px 0 20px;
  }

  @media (max-width: 768px) {
    .ft-root { padding: 36px 24px 20px; }
  }
`;

export default function Footer({ setPage }) {
  const navLinks = [
    { label: "Home", page: "Home" },
    { label: "About Us", page: "About Us" },
    { label: "Services", page: "Services" },
    { label: "Domains", page: "Domains" },
    { label: "Insights", page: "Insights" },
    { label: "Contact Us", page: "Contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", page: "Privacy" },
    { label: "Terms of Service", page: "Terms" },
    { label: "Disclaimer", page: "Disclaimer" },
  ];

  const handleNav = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style>{FOOTER_CSS}</style>
      <footer className="ft-root">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* ── MAIN ROW ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr 1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* Logo */}
            <div>
              <img
                src={logo}
                alt="PivotEdge Partners"
                style={{
                  height: 44,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  cursor: "pointer",
                  opacity: 0.9,
                }}
                onClick={() => handleNav("Home")}
              />
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "rgba(245,240,232,0.35)",
                  marginTop: 16,
                  maxWidth: 180,
                }}
              >
                Specialist executive search and leadership advisory.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <span className="ft-col-label">Navigation</span>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className="ft-link"
                  onClick={() => handleNav(link.page)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Legal */}
            <div>
              <span className="ft-col-label">Legal</span>
              {legalLinks.map((link) => (
                <button
                  key={link.label}
                  className="ft-link"
                  onClick={() => handleNav(link.page)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Tagline / conviction */}
            <div>
              <span className="ft-col-label">Our Conviction</span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16,
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.45)",
                  lineHeight: 1.65,
                }}
              >
                "When leadership aligns with ambition, advantage begins."
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: T.gold,
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(184,150,46,0.55)",
                  }}
                >
                  PivotEdge Partners
                </span>
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="ft-divider" />

          {/* ── BOTTOM BAR ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                color: "rgba(245,240,232,0.22)",
                fontWeight: 300,
                letterSpacing: "0.02em",
              }}
            >
              © 2025 PivotEdge Partners. All Rights Reserved.
            </p>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {legalLinks.map((l, i) => (
                <span
                  key={l.label}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "rgba(184,150,46,0.3)",
                        display: "inline-block",
                      }}
                    />
                  )}
                  <button
                    className="ft-legal-link"
                    onClick={() => handleNav(l.page)}
                  >
                    {l.label}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
