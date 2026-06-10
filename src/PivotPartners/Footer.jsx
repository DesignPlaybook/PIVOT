import { T } from "./tokens";
import logo from "../assets/PEPLogo.png";

const FOOTER_CSS = `
  .ft-root {
    background: var(--cream);
    border-top: 1px solid rgba(13,61,78,0.12);
    padding: 80px 64px 36px;
    font-family: 'Jost', sans-serif;
  }

  .ft-col-label {
    display: block;
    margin-bottom: 24px;
    padding-bottom: 14px;

    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;

    color: var(--gold);
    border-bottom: 1px solid rgba(184,150,46,0.25);
  }

  .ft-link {
    display: block;
    width: 100%;

    background: none;
    border: none;
    padding: 0;
    margin-bottom: 16px;

    text-align: left;
    cursor: pointer;

    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: rgba(13,61,78,0.82);

    transition: color .25s ease;
  }

  .ft-link:hover {
    color: var(--gold);
  }

  .ft-legal-link {
    background: none;
    border: none;
    cursor: pointer;

    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    color: rgba(13,61,78,0.7);

    transition: color .25s ease;
  }

  .ft-legal-link:hover {
    color: var(--gold);
  }

  .ft-divider {
    height: 1px;
    background: rgba(13,61,78,0.12);
    margin: 56px 0 28px;
  }

  @media (max-width: 992px) {
    .ft-grid {
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
  }

  @media (max-width: 768px) {
    .ft-root {
      padding: 48px 24px 24px;
    }

    .ft-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .ft-bottom {
      flex-direction: column;
      align-items: flex-start !important;
    }
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
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <div
            className="ft-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "260px 220px 220px 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Logo */}
            <div>
              <img
                src={logo}
                alt="PivotEdge Partners"
                onClick={() => handleNav("Home")}
                style={{
                  width: 133,
                  cursor: "pointer",
                  display: "block",
                }}
              />

              <p
                style={{
                  marginTop: 22,
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: "rgba(13,61,78,0.68)",
                  maxWidth: 220,
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

            {/* Conviction */}
            <div>
              <span className="ft-col-label">Our Conviction</span>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 30,
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.55,
                  color: T.teal,
                  maxWidth: 420,
                }}
              >
                “When leadership aligns with ambition, advantage begins.”
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 28,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 1,
                    background: T.gold,
                  }}
                />

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: T.gold,
                  }}
                >
                  PivotEdge Partners
                </span>
              </div>
            </div>
          </div>

          <div className="ft-divider" />

          <div
            className="ft-bottom"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(13,61,78,0.62)",
                margin: 0,
              }}
            >
              © 2025 PivotEdge Partners. All Rights Reserved.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              {legalLinks.map((l, i) => (
                <span
                  key={l.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: T.gold,
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
