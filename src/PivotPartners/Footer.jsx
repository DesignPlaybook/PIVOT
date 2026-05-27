import { T } from "./tokens";

export default function Footer({ setPage }) {
  // Each link has an explicit target page so routing is unambiguous
  const cols = [
    {
      label: "Services",
      links: [
        { label: "Executive Search", page: "Services" },
        { label: "Succession Planning", page: "Services" },
        { label: "Board Advisory", page: "Services" },
        { label: "Interim Management", page: "Services" },
        { label: "Diversity", page: "Services" },
      ],
    },
    {
      label: "Domains",
      links: [
        { label: "Industrial", page: "Domains" },
        { label: "Real Estate & Infrastructure", page: "Domains" },
        { label: "Consumer", page: "Domains" },
        { label: "Healthcare & Life Sciences", page: "Domains" },
        { label: "Banking & Financial Services", page: "Domains" },
        { label: "TMT", page: "Domains" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About Us", page: "About Us" },
        { label: "Services", page: "Services" },
        { label: "Domains", page: "Domains" },
        { label: "Insights", page: "Insights" },
        { label: "Contact", page: "Contact" },
      ],
    },
  ];

  return (
    <footer>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Brand block */}
          <div>
            <div className="footer-brand">
              PivotEdge
              <br />
              Partners
            </div>
            <span className="footer-tagline">Advantage Starts Here</span>
            <p
              style={{
                marginTop: 24,
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(245,240,232,0.6)",
                maxWidth: 240,
              }}
            >
              Specialist executive search and leadership advisory for Boards and
              senior executives.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid rgba(245,240,232,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(245,240,232,0.6)",
                    fontFamily: "serif",
                  }}
                >
                  in
                </span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.label}>
              <span className="footer-label">{col.label}</span>
              {col.links.map((link) => (
                <button
                  key={link.label}
                  className="footer-link"
                  onClick={() => {
                    setPage(link.page);
                    window.scrollTo(0, 0);
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div
          className="divider"
          style={{
            borderColor: "rgba(245,240,232,0.1)",
            background: "rgba(245,240,232,0.1)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(245,240,232,0.4)",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            © 2025 PivotEdge Partners. All Rights Reserved. Engagements
            conducted with complete discretion.
          </p>
          <div style={{ display: "flex", gap: 32 }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <span
                key={l}
                style={{
                  fontSize: 11,
                  color: "rgba(245,240,232,0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
