import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";

function useIO(threshold = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVis(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, vis] = useIO();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const ARTICLE_CSS = `
  @keyframes art-load { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  .art-l1 { animation: art-load 1s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
  .art-l2 { animation: art-load 1s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
  .art-l3 { animation: art-load 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .art-l4 { animation: art-load 1s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
  @keyframes art-scroll-line { from{height:0;opacity:0} to{height:64px;opacity:1} }
  .art-scroll-line { animation: art-scroll-line 1s cubic-bezier(0.16,1,0.3,1) 1.1s both; }

  .art-body p {
    font-family: 'Jost', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.95;
    color: #4A5568;
    margin-bottom: 28px;
  }
  .art-body h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 3vw, 38px);
    font-weight: 300;
    color: #0D3D4E;
    line-height: 1.15;
    margin: 56px 0 24px;
  }
  .art-body h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 400;
    color: #0D3D4E;
    line-height: 1.2;
    margin: 40px 0 18px;
  }
  .art-body blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.6vw, 30px);
    font-style: italic;
    font-weight: 300;
    color: #0D3D4E;
    line-height: 1.45;
    border-left: 2px solid #B8962E;
    padding: 8px 0 8px 32px;
    margin: 48px 0;
  }
  .art-body ul {
    list-style: none;
    padding: 0;
    margin: 0 0 28px;
  }
  .art-body ul li {
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
    color: #4A5568;
    padding: 10px 0;
    border-bottom: 1px solid rgba(13,61,78,0.07);
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .art-body ul li::before {
    content: '◆';
    color: #B8962E;
    font-size: 8px;
    flex-shrink: 0;
    margin-top: 7px;
  }
  .art-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.6);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.3s ease;
  }
  .art-back-btn:hover { color: #B8962E; }
  .art-back-btn .arrow {
    width: 28px;
    height: 1px;
    background: rgba(184,150,46,0.5);
    transition: width 0.3s ease;
  }
  .art-back-btn:hover .arrow { width: 44px; background: #B8962E; }
  .art-share-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #B8962E;
    background: none;
    border: 1px solid rgba(184,150,46,0.3);
    padding: 8px 18px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .art-share-btn:hover { background: rgba(184,150,46,0.08); border-color: #B8962E; }
  .art-related-card {
    border: 1px solid rgba(13,61,78,0.08);
    background: #F5F0E8;
    transition: transform 0.35s ease, border-color 0.35s ease;
    cursor: pointer;
  }
  .art-related-card:hover { transform: translateY(-4px); border-color: rgba(184,150,46,0.35); }
  .art-toc-link {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: rgba(13,61,78,0.5);
    display: block;
    padding: 8px 0;
    border-bottom: 1px solid rgba(13,61,78,0.07);
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    letter-spacing: 0.01em;
    line-height: 1.4;
    transition: color 0.25s ease;
  }
  .art-toc-link:hover { color: #B8962E; }
  .art-toc-link.active { color: #0D3D4E; font-weight: 400; }
`;

const ARTICLE = {
  tag: "Board Governance",
  title: "The 2025 Global Governance Mandate: Navigating Board Complexity",
  subtitle:
    "How the world's leading boards are recalibrating for geopolitical shifts, generative AI, and the evolution of stakeholder capitalism.",
  author: "PivotEdge Partners",
  date: "March 2025",
  readTime: "15 Min — White Paper",
  img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=80",
  sections: [
    {
      id: "executive-summary",
      heading: "Executive Summary",
      content: [
        "The governance landscape in 2025 is unlike anything boards have navigated before. Three simultaneous forces — geopolitical fracture, generative AI at scale, and the maturation of stakeholder capitalism — are converging to place extraordinary demands on board composition, capability, and process.",
        "This white paper, drawn from PivotEdge Partners' engagements with Boards across six markets and twenty-two sector verticals, presents a framework for understanding how governance must evolve to remain a genuine source of organisational advantage rather than a compliance mechanism.",
        "Our central finding is unambiguous: the boards that will perform most effectively through this period are those that invest in proactive composition reviews, accelerate their technology literacy, and establish governance structures that can accommodate ambiguity without sacrificing accountability.",
      ],
    },
    {
      id: "three-forces",
      heading: "Three Forces Reshaping the Boardroom",
      content: [
        "Governance does not change in isolation. It changes in response to the world that organisations must navigate. In 2025, boards face a convergence of pressures that, taken individually, would each constitute a significant challenge. Taken together, they represent a structural transformation in what boards are asked to do.",
      ],
      subsections: [
        {
          heading: "Geopolitical Complexity",
          body: "Supply chain realignment, regulatory divergence between jurisdictions, and the fragmentation of multilateral trade frameworks are placing new demands on board-level risk oversight. Directors who were once expected to provide strategic counsel on familiar terrain are increasingly asked to assess risk in markets and jurisdictions far removed from their direct experience. The governance implication is straightforward: boards need directors with broader geographic and regulatory exposure, and they need structured mechanisms to integrate geopolitical intelligence into board-level decision-making.",
        },
        {
          heading: "Generative AI at Scale",
          body: "The arrival of generative AI as a commercially deployable technology has moved faster than governance frameworks anticipated. Boards now face a dual challenge: overseeing the risks associated with AI deployment (data governance, regulatory compliance, reputational exposure) while simultaneously ensuring the organisation captures the competitive opportunity. The gap between organisations that are AI-enabled and those that are not is widening at a pace that makes board-level hesitancy operationally costly. Directors with genuine digital and AI literacy — not superficial familiarity — are becoming a governance necessity, not a differentiator.",
        },
        {
          heading: "The Maturation of Stakeholder Capitalism",
          body: "The ESG discourse has matured beyond its early adopter phase. What once appeared as a voluntary commitment to broader societal responsibility is now embedded in regulatory frameworks, investor mandates, and talent market expectations. Boards that treat sustainability and stakeholder accountability as a narrative exercise are increasingly exposed — both to regulatory risk and to the talent and capital consequences of authentic-governance discounts applied by sophisticated institutional investors.",
        },
      ],
    },
    {
      id: "composition",
      heading: "Board Composition: The Strategic Imperative",
      content: [
        "If governance is the mechanism through which organisations navigate complexity, board composition is the single most consequential input into that mechanism. The capability of a board is not an abstract property — it is the aggregate of the experience, judgement, and perspective that individual directors bring to the table.",
        "Our work across hundreds of board engagements has led us to a consistent finding: the majority of governance failures we encounter are not failures of process or structure. They are failures of composition. The right people, asking the right questions, with the right information, will navigate almost any challenge. The wrong composition will fail even within a perfect governance framework.",
      ],
      bullets: [
        "Technology and AI literacy is now a mainstream board competency requirement, not a specialist niche.",
        "Geographic diversity in board composition correlates with improved risk identification in multi-jurisdictional organisations.",
        "Succession planning at board level remains critically underdeveloped — the majority of boards have no structured pipeline for director succession.",
        "The average tenure of a Non-Executive Director has declined by 14 months since 2019, reflecting an accelerating pace of competency refresh.",
        "Boards that conduct structured composition reviews every two years demonstrate materially stronger alignment between board capability and organisational strategy.",
      ],
    },
    {
      id: "ai-governance",
      heading: "AI Governance: From Aspiration to Architecture",
      content: [
        "The question boards are asking about artificial intelligence has changed. The question is no longer 'should we engage with AI?' — it is 'how do we govern AI deployment responsibly while capturing its full commercial potential?'",
        "This is a governance question, not a technology question. It sits squarely in the domain of board oversight, and boards that delegate it entirely to management are abdicating a responsibility that will increasingly attract regulatory scrutiny.",
      ],
      pullQuote:
        '"Boards that treat AI governance as a technology matter rather than a strategic and fiduciary matter are misunderstanding both the opportunity and the risk."',
      content2: [
        "The governance architecture for AI requires three structural elements: a clear delineation of board-level versus management-level accountability for AI risk; a mechanism for the board to receive regular, structured reporting on AI deployment, incident management, and regulatory compliance; and a board-level capability — through director composition or external advisory — to evaluate the adequacy of that reporting with genuine technical understanding.",
        "Organisations that establish this architecture early are not simply managing risk — they are creating governance credibility that translates directly into competitive positioning with institutional capital, talent, and regulatory relationships.",
      ],
    },
    {
      id: "practical-framework",
      heading: "A Practical Framework for 2025",
      content: [
        "Drawing from our advisory practice, we propose a five-element framework for boards seeking to recalibrate their governance approach for the current environment. This is not a checklist — it is a structured approach to governance as a source of organisational advantage.",
      ],
      bullets: [
        "Conduct a structured board composition review against 2025 strategy — not against a generic competency framework.",
        "Establish a dedicated AI and technology literacy programme for the full board, not only the technology or audit committee.",
        "Develop a geopolitical risk briefing cadence at board level, supplementing management reporting with independent intelligence.",
        "Formalise board succession planning as a standing agenda item for the Nomination Committee, with documented pipeline development.",
        "Review ESG governance architecture to ensure it is integrated into core strategy and risk oversight rather than siloed in a separate committee.",
      ],
    },
    {
      id: "conclusion",
      heading: "Conclusion",
      content: [
        "The governance demands of 2025 are not temporary. The forces driving them — technological acceleration, geopolitical complexity, and the deepening expectations of stakeholder capitalism — are structural and enduring. Boards that treat the current period as an exceptional disruption to be managed will find themselves perpetually behind the curve.",
        "The boards that will define organisational success in the coming decade are those that treat governance as a strategic capability — investing in composition, process, and culture with the same discipline they apply to any other source of competitive advantage.",
        "At PivotEdge Partners, we believe that the quality of governance is ultimately determined by the quality of the people who provide it. When board composition is precisely aligned with strategic ambition, governance ceases to be a constraint and becomes, instead, where the advantage begins.",
      ],
    },
  ],
  relatedArticles: [
    {
      tag: "Leadership Trends",
      title: "The Chief AI Officer: Necessity or Strategic Fad?",
      date: "August 2024",
      img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    },
    {
      tag: "Succession Planning",
      title: "Global CEO Succession Index 2024",
      date: "July 2024",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    },
    {
      tag: "Board Governance",
      title: "ESG at a Crossroads: Redefining Value for 2025",
      date: "August 2024",
      img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
    },
  ],
};

export default function ArticlePage({ setPage }) {
  const [activeSection, setActiveSection] = useState("executive-summary");
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(Math.min(100, Math.round((scrollTop / docHeight) * 100)));

      // Update active TOC section
      ARTICLE.sections.forEach((s) => {
        const el = document.getElementById(`art-${s.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 200) setActiveSection(s.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(`art-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: T.cream, fontFamily: "'Jost', sans-serif" }}>
      <style>{ARTICLE_CSS}</style>

      {/* Reading progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${readProgress}%`,
          height: 2,
          background: T.gold,
          zIndex: 999,
          transition: "width 0.15s ease",
        }}
      />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <img
          src={ARTICLE.img}
          alt={ARTICLE.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />
        {/* Gradient layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,61,78,0.98) 0%, rgba(13,61,78,0.7) 45%, rgba(13,61,78,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13,61,78,0.5) 0%, transparent 60%)",
          }}
        />
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.035) 1px, transparent 0)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px 80px",
          }}
        >
          {/* Back button */}
          <div className="art-l1" style={{ marginBottom: 48 }}>
            <button
              className="art-back-btn"
              onClick={() => {
                setPage("Insights");
                window.scrollTo(0, 0);
              }}
            >
              <span className="arrow" />
              <span>Back to Insights</span>
            </button>
          </div>

          {/* Tag */}
          <div className="art-l1" style={{ marginBottom: 20 }}>
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: T.gold,
                padding: "5px 14px",
                border: "1px solid rgba(184,150,46,0.4)",
              }}
            >
              {ARTICLE.tag}
            </span>
          </div>

          {/* Title */}
          <h1
            className="art-l2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#FFFFFF",
              maxWidth: 900,
              marginBottom: 24,
            }}
          >
            {ARTICLE.title}
          </h1>

          {/* Subtitle */}
          <p
            className="art-l3"
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.6)",
              maxWidth: 620,
              marginBottom: 40,
              fontStyle: "italic",
            }}
          >
            {ARTICLE.subtitle}
          </p>

          {/* Meta strip */}
          <div
            className="art-l4"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Published", value: ARTICLE.date },
              { label: "Read Time", value: ARTICLE.readTime },
              { label: "Author", value: ARTICLE.author },
            ].map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(184,150,46,0.7)",
                    marginBottom: 4,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(245,240,232,0.65)",
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
            <div style={{ marginLeft: "auto" }}>
              <button className="art-share-btn">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
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
            className="art-scroll-line"
            style={{
              width: 1,
              background:
                "linear-gradient(to bottom, rgba(184,150,46,0.9), transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Read
          </span>
        </div>
      </section>

      {/* ── BODY: sidebar + article ── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 64px 120px",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Sticky sidebar */}
        <div style={{ position: "sticky", top: 100 }}>
          {/* Reading progress */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: T.textMuted,
                }}
              >
                Reading Progress
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 14,
                  color: T.gold,
                }}
              >
                {readProgress}%
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(13,61,78,0.1)" }}>
              <div
                style={{
                  height: "100%",
                  background: T.gold,
                  width: `${readProgress}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* TOC */}
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            Contents
          </div>
          {ARTICLE.sections.map((s) => (
            <button
              key={s.id}
              className={`art-toc-link${activeSection === s.id ? " active" : ""}`}
              onClick={() => scrollToSection(s.id)}
            >
              {s.heading}
            </button>
          ))}

          {/* Key Facts */}
          <div
            style={{
              marginTop: 36,
              padding: "24px",
              background: T.creamAlt,
              borderLeft: `2px solid ${T.gold}`,
            }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 16,
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Key Data
            </div>
            {[
              { n: "22", l: "Markets Studied" },
              { n: "500+", l: "Board Mandates" },
              { n: "14mo", l: "Avg Tenure Decline" },
            ].map((stat) => (
              <div key={stat.l} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: T.gold,
                    lineHeight: 1,
                  }}
                >
                  {stat.n}
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: T.textMuted,
                    marginTop: 4,
                  }}
                >
                  {stat.l}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 24, padding: "24px", background: T.teal }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 16,
                fontWeight: 300,
                color: T.white,
                lineHeight: 1.4,
                marginBottom: 16,
              }}
            >
              Discuss your board governance mandate with us.
            </div>
            <button
              className="btn btn-outline-light"
              style={{ fontSize: 10, padding: "10px 20px" }}
              onClick={() => {
                setPage("Contact");
                window.scrollTo(0, 0);
              }}
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Article body */}
        <div className="art-body">
          {ARTICLE.sections.map((section, si) => (
            <Fade key={section.id} delay={si * 60}>
              <div
                id={`art-${section.id}`}
                style={{ marginBottom: 72, scrollMarginTop: 120 }}
              >
                {/* Section number + heading */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 36,
                      fontWeight: 300,
                      color: T.gold,
                      opacity: 0.35,
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  >
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <h2 style={{ margin: 0 }}>{section.heading}</h2>
                </div>
                <div
                  style={{
                    width: 48,
                    height: 1,
                    background: T.gold,
                    opacity: 0.5,
                    marginBottom: 28,
                    marginLeft: 56,
                  }}
                />

                <div style={{ paddingLeft: 56 }}>
                  {/* Opening paragraphs */}
                  {section.content?.map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}

                  {/* Subsections */}
                  {section.subsections?.map((sub, si) => (
                    <div key={si} style={{ marginBottom: 32 }}>
                      <h3>{sub.heading}</h3>
                      <p>{sub.body}</p>
                    </div>
                  ))}

                  {/* Bullet list */}
                  {section.bullets && (
                    <ul style={{ marginTop: 8 }}>
                      {section.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {/* Pull quote */}
                  {section.pullQuote && (
                    <blockquote>{section.pullQuote}</blockquote>
                  )}

                  {/* Continuing paragraphs after pull quote */}
                  {section.content2?.map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Divider between sections */}
              {si < ARTICLE.sections.length - 1 && (
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    background: `linear-gradient(to right, rgba(184,150,46,0.3), transparent)`,
                    marginBottom: 72,
                    marginLeft: 56,
                  }}
                />
              )}
            </Fade>
          ))}

          {/* Download CTA */}
          <Fade>
            <div
              style={{
                background: T.teal,
                padding: "56px 48px",
                marginTop: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 40,
                  alignItems: "center",
                }}
              >
                <div>
                  <SectionLabel text="Full Report" light />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(24px, 2.8vw, 36px)",
                      fontWeight: 300,
                      color: T.white,
                      lineHeight: 1.15,
                      marginBottom: 12,
                    }}
                  >
                    Download the Complete White Paper
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.55)",
                      lineHeight: 1.75,
                    }}
                  >
                    The full report includes detailed case studies, governance
                    benchmarking data, and a complete board composition
                    assessment framework.
                  </p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <button className="btn btn-outline-light" onClick={() => {}}>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      <section
        style={{
          background: T.creamAlt,
          padding: "96px 64px",
          borderTop: "1px solid rgba(13,61,78,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ marginBottom: 56 }}>
            <SectionLabel text="Continue Reading" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 300,
                color: T.teal,
              }}
            >
              Related Perspectives
            </h2>
          </Fade>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
            }}
          >
            {ARTICLE.relatedArticles.map((a, i) => (
              <Fade key={i} delay={i * 80}>
                <div
                  className="art-related-card"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div style={{ height: 200, overflow: "hidden" }}>
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
                        (e.target.style.transform = "scale(1.06)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />
                  </div>
                  <div style={{ padding: "28px 24px 32px" }}>
                    <div
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: T.gold,
                        marginBottom: 12,
                      }}
                    >
                      {a.tag}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 20,
                        fontWeight: 400,
                        color: T.teal,
                        lineHeight: 1.3,
                        marginBottom: 16,
                      }}
                    >
                      {a.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(13,61,78,0.08)",
                        paddingTop: 14,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 10,
                          color: T.textMuted,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {a.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 11,
                          color: T.gold,
                          letterSpacing: "0.08em",
                        }}
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          <Fade style={{ textAlign: "center", marginTop: 64 }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                setPage("Insights");
                window.scrollTo(0, 0);
              }}
            >
              <span>All Insights</span>
            </button>
          </Fade>
        </div>
      </section>
    </div>
  );
}
