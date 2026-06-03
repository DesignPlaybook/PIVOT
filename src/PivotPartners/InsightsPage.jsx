import { useState } from "react";
import { T } from "./tokens";
import { useReveal, SectionLabel } from "./utils";

export default function InsightsPage({ setPage }) {
  useReveal();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Board Governance",
    "Leadership Trends",
    "Talent Strategy",
    "Succession Planning",
  ];

  const articles = [
    {
      tag: "Board Governance",
      title: "The 2025 Global Governance Mandate: Navigating Board Complexity",
      excerpt:
        "How the world's leading boards are recalibrating for geopolitical shifts, generative AI, and the evolution of stakeholder capitalism.",
      read: "15 Min — White Paper",
      date: "March 2025",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      featured: true,
    },
    {
      tag: "Leadership Trends",
      title: "The Chief AI Officer: Necessity or Strategic Fad?",
      excerpt:
        "We analyse whether the creation of a CAO role is essential for governance or simply a temporary organisational response to AI.",
      read: "8 Min",
      date: "August 2024",
      img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    },
    {
      tag: "Board Governance",
      title: "ESG at a Crossroads: Redefining Value for 2025",
      excerpt:
        "Exploring the tension between social impact and fiduciary duty. How top-tier boards navigate shifting regulatory landscapes.",
      read: "10 Min",
      date: "August 2024",
      img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
    },
    {
      tag: "Succession Planning",
      title: "Global CEO Succession Index 2024",
      excerpt:
        "Exclusive analysis of 500+ CEO transitions across the FTSE 100 and Fortune 500, revealing new archetypes of successful leadership.",
      read: "18 Min — Special Report",
      date: "July 2024",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
      special: true,
    },
    {
      tag: "Talent Strategy",
      title: "The High-Performance Hybrid: 18 Months Later",
      excerpt:
        "The data is in. Long-term impact of hybrid working models on executive leadership culture and team innovation.",
      read: "7 Min",
      date: "July 2024",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    },
    {
      tag: "Leadership Trends",
      title: "Quiet Confidence: The Rise of the Introverted Leader",
      excerpt:
        "Why the next generation of effective CEOs is moving away from the spotlight and what that means for executive search.",
      read: "8 Min",
      date: "June 2024",
      img: "https://images.unsplash.com/photo-1454923634634-bd1614719a7b?w=800&q=80",
    },
  ];

  const filtered =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => a.tag === activeFilter);
  const featured = articles.find((a) => a.featured);

  // Navigate to the article page (all articles link to the same demo article)
  const openArticle = () => {
    setPage("Article");
    window.scrollTo(0, 0);
  };

  const INSIGHTS_HERO_CSS = `
  @keyframes in-load-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  .in-load-1 { animation:in-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  .in-load-2 { animation:in-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .in-load-3 { animation:in-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
  @keyframes in-scroll-line { from{height:0;opacity:0} to{height:56px;opacity:1} }
  .in-scroll-line { animation:in-scroll-line 1s cubic-bezier(0.16,1,0.3,1) 1s both; }
`;

  return (
    <div>
      {/* Hero */}
      <style>{INSIGHTS_HERO_CSS}</style>
      <section
        className="insights-hero-bg"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,61,78,0.97) 0%, rgba(13,61,78,0.65) 40%, rgba(13,61,78,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13,61,78,0.5) 0%, transparent 55%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "260px 64px 0",
          }}
        >
          <div className="in-load-1">
            <SectionLabel text="The Edge Digest" light />
          </div>
          <h1
            className="in-load-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(60px,7.5vw,100px)",
              fontWeight: 300,
              lineHeight: 0.98,
              color: T.white,
              margin: "16px 0 24px",
            }}
          >
            Strategic
            <br />
            Insights.
          </h1>
          <p
            className="in-load-3"
            style={{
              fontSize: 14,
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            Perspectives on leadership, governance, and the forces shaping
            organisations.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            className="in-scroll-line"
            style={{
              width: 1,
              background:
                "linear-gradient(to bottom,rgba(184,150,46,0.9),transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section style={{ background: T.creamAlt, padding: "80px 64px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                alignItems: "center",
              }}
            >
              <div>
                <SectionLabel text="Featured Analysis" />
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 300,
                    color: T.teal,
                    marginBottom: 20,
                    lineHeight: 1.2,
                  }}
                >
                  {featured.title}
                </h2>
                <div className="gold-rule" />
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: T.textMid,
                    marginBottom: 32,
                  }}
                >
                  {featured.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    marginBottom: 32,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: T.textMuted,
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {featured.date}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: T.gold,
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {featured.read}
                  </span>
                </div>
                <button className="btn btn-teal" onClick={openArticle}>
                  <span>Read Full Report</span>
                </button>
              </div>
              <div
                style={{ height: 400, overflow: "hidden", cursor: "pointer" }}
                onClick={openArticle}
              >
                <img
                  src={featured.img}
                  alt={featured.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section
        style={{ padding: "80px 64px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 56,
            flexWrap: "wrap",
            borderBottom: `1px solid rgba(13,61,78,0.1)`,
            paddingBottom: 24,
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "8px 20px",
                background: activeFilter === f ? T.teal : "transparent",
                color: activeFilter === f ? T.white : T.textMid,
                border: `1px solid ${activeFilter === f ? T.teal : "rgba(13,61,78,0.2)"}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 48,
          }}
        >
          {filtered
            .filter((a) => !a.featured)
            .map((a, i) => (
              <div
                key={i}
                className="reveal service-card"
                style={{ cursor: "pointer" }}
                onClick={openArticle}
              >
                {a.special ? (
                  <div
                    style={{
                      background: T.teal,
                      padding: 40,
                      height: "100%",
                      minHeight: 360,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        color: T.gold,
                        textTransform: "uppercase",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      Special Report
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 30,
                        fontWeight: 300,
                        color: T.white,
                        margin: "20px 0",
                        lineHeight: 1.2,
                      }}
                    >
                      {a.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: "rgba(245,240,232,0.7)",
                        marginBottom: 32,
                      }}
                    >
                      {a.excerpt}
                    </p>
                    <button
                      className="btn btn-outline-light"
                      style={{ padding: "10px 24px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openArticle();
                      }}
                    >
                      <span>Read Report</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        height: 220,
                        overflow: "hidden",
                        marginBottom: 24,
                      }}
                    >
                      <img
                        src={a.img}
                        alt={a.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.6s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.07)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        color: T.gold,
                        textTransform: "uppercase",
                        fontFamily: "'Jost', sans-serif",
                        marginBottom: 12,
                      }}
                    >
                      {a.tag}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 24,
                        fontWeight: 400,
                        color: T.teal,
                        marginBottom: 12,
                        lineHeight: 1.3,
                      }}
                    >
                      {a.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 300,
                        lineHeight: 1.75,
                        color: T.textMid,
                        marginBottom: 20,
                      }}
                    >
                      {a.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: `1px solid rgba(13,61,78,0.08)`,
                        paddingTop: 16,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          color: T.textMuted,
                          textTransform: "uppercase",
                          fontFamily: "'Jost', sans-serif",
                        }}
                      >
                        {a.date}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: T.gold,
                          fontFamily: "'Jost', sans-serif",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Read More →
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Reports Archive */}
      <section style={{ background: T.creamAlt, padding: "100px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
            }}
          >
            <div>
              <SectionLabel text="Research Archive" />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 300,
                  color: T.teal,
                }}
              >
                White Papers & Global Reports
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            {[
              {
                title: "2024 Board Diversity Report",
                d: "Progress, challenges, and the future of inclusive governance.",
              },
              {
                title: "The Digital CEO Playbook",
                d: "How tech literacy is becoming a prerequisite for the top job.",
              },
              {
                title: "Succession Strategy 2.0",
                d: "Moving beyond the emergency plan to long-term talent cultivation.",
              },
              {
                title: "Geopolitical Risk in 2025",
                d: "Strategic implications of global shifts for enterprise leaders.",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="reveal service-card"
                style={{
                  background: T.white,
                  padding: "40px 28px",
                  border: `1px solid rgba(13,61,78,0.06)`,
                  cursor: "pointer",
                }}
                onClick={openArticle}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 40,
                    color: T.gold,
                    opacity: 0.3,
                    marginBottom: 20,
                  }}
                >
                  ◈
                </div>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: T.teal,
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {r.title}
                </h4>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: T.textMid,
                    marginBottom: 24,
                  }}
                >
                  {r.d}
                </p>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: T.gold,
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  Read Report →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        style={{
          background: T.teal,
          padding: "100px 64px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <SectionLabel text="The Edge Briefing" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 300,
              color: T.white,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Critical insights for global leaders, delivered monthly.
          </h2>
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(245,240,232,0.65)",
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            Join our community of board directors and C-suite executives who
            rely on our proprietary research.
          </p>
          <div style={{ display: "flex", gap: 0 }}>
            <input
              type="email"
              placeholder="Professional Email Address"
              style={{
                flex: 1,
                height: 52,
                borderColor: "rgba(245,240,232,0.2)",
                background: "rgba(245,240,232,0.1)",
                color: T.white,
                borderRight: "none",
              }}
            />
            <button
              className="btn btn-teal"
              style={{
                height: 52,
                padding: "0 32px",
                whiteSpace: "nowrap",
                borderRadius: 0,
              }}
            >
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
