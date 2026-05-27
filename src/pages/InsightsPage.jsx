import { useState } from "react";

import GoldDivider from "../components/GoldDivider";
import ClosingCTA from "../components/ClosingCTA";

import ArrowRightIcon from "../assets/icons/ArrowRightIcon";
export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = [
    "All",
    "Executive Search",
    "Governance",
    "Leadership",
    "Strategy",
    "AI & Digital",
  ];

  const articles = [
    {
      tag: "Executive Search",
      title: "The Strategic Imperative of Executive Search",
      excerpt:
        "Leadership appointments are among the most consequential decisions an organisation makes. We examine why the right approach to executive search is fundamentally different from recruitment.",
      img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=700&q=80",
      featured: true,
    },
    /* Replace: corporate strategy or boardroom photography */
    {
      tag: "Governance",
      title: "Strengthening Board Effectiveness in a Complex World",
      excerpt:
        "The composition and dynamics of the Board have never been more strategically critical. Boards that get this right gain a measurable governance advantage.",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&q=80",
    },
    /* Replace: board meeting or governance imagery */
    {
      tag: "Leadership",
      title: "CEO Succession: Reducing Transition Risk",
      excerpt:
        "CEO transitions remain one of the highest-risk moments in an organisations lifecycle. A disciplined succession framework transforms risk into strategic continuity.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
    },
    /* Replace: executive portrait or leadership imagery */
    {
      tag: "AI & Digital",
      title: "AI Leadership: Beyond the Technology export default function",
      excerpt:
        "Artificial Intelligence is reshaping industries, operating models, and competitive dynamics. The leaders who succeed treat AI as a strategic lever, not a technology project.",
      img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80",
    },
    /* Replace: technology leadership or digital transformation imagery */
    {
      tag: "Strategy",
      title: "Why Diversity in Leadership Strengthens Governance",
      excerpt:
        "Diverse leadership teams make better decisions. The organisations that have embedded diversity into their appointment philosophy are seeing measurable governance improvements.",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=80",
    },
    /* Replace: diverse leadership team imagery */
    {
      tag: "Executive Search",
      title: "The CFO as Strategic Partner: Evolving Expectations",
      excerpt:
        "The role of the Chief Financial Officer has fundamentally evolved. Todays CFO must be a strategic partner to the CEO and Board, not merely a financial steward.",
      img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=700&q=80",
    },
    /* Replace: finance leadership or strategy imagery */
  ];

  const filtered =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => a.tag === activeFilter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-label">Perspectives</p>
          <h1>
            Insights &<br />
            Leadership Intelligence
          </h1>
          <p>
            Perspectives on executive leadership, board governance, succession
            strategy, and the forces shaping organisations.
          </p>
        </div>
      </div>

      <GoldDivider />

      {/* Filter strip */}
      <section
        style={{
          background: "var(--color-cream)",
          padding: "2rem",
          borderBottom: "1px solid rgba(15,76,92,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            gap: "2rem",
            overflowX: "auto",
            flexWrap: "wrap",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: activeFilter === f ? "var(--color-teal)" : "#9ca3af",
                paddingBottom: "0.4rem",
                borderBottom:
                  activeFilter === f
                    ? "2px solid var(--color-gold)"
                    : "2px solid transparent",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section
          className="section"
          style={{ background: "var(--color-cream)", paddingBottom: "3rem" }}
        >
          <div className="section-inner">
            <div
              className="reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr",
                gap: "3rem",
                background: "var(--color-white)",
                overflow: "hidden",
              }}
            >
              <div style={{ height: "480px", overflow: "hidden" }}>
                <img
                  src={featured.img}
                  alt={featured.title}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "3rem 2.5rem 3rem 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-white)",
                      background: "var(--color-gold)",
                      padding: "0.3rem 0.7rem",
                    }}
                  >
                    Featured
                  </span>
                  <span className="insight-tag" style={{ marginBottom: 0 }}>
                    {featured.tag}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    color: "var(--color-teal)",
                    marginBottom: "1.25rem",
                    lineHeight: 1.2,
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "#6b7280",
                    lineHeight: 1.8,
                    marginBottom: "2rem",
                  }}
                >
                  {featured.excerpt}
                </p>
                <a href="#" className="insight-link">
                  Read the Perspective <ArrowRightIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section
          className="section"
          style={{ background: "var(--color-cream)", paddingTop: "2rem" }}
        >
          <div className="section-inner">
            <div className="insights-grid">
              {rest.map((a, i) => (
                <div
                  key={i}
                  className={`insight-card reveal reveal-delay-${(i % 3) + 1}`}
                >
                  <div className="insight-img">
                    <img src={a.img} alt={a.title} />
                  </div>
                  <div className="insight-body">
                    <p className="insight-tag">{a.tag}</p>
                    <h3 className="insight-title">{a.title}</h3>
                    <p className="insight-excerpt">{a.excerpt}</p>
                    <a href="#" className="insight-link">
                      Read More <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <GoldDivider />
      <ClosingCTA
        headline="Explore a Mandate With Us"
        sub="Every great leadership outcome starts with a precise and considered conversation."
        btnLabel="Contact PivotEdge"
      />
    </>
  );
}
