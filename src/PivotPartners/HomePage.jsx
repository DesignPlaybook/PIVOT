import { T } from "./tokens";
import { useReveal, SectionLabel, StatCounter } from "./utils";

export default function HomePage({ setPage }) {
  useReveal();
  return (
    <div>
      {/* Hero */}
      <section
        className="hero-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 96 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <div style={{ maxWidth: 600 }}>
            <SectionLabel text="Executive Leadership Advisory" light />
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(64px, 8vw, 108px)",
                fontWeight: 300, lineHeight: 1.05,
                color: T.white, marginBottom: 32, letterSpacing: "-0.01em",
              }}
            >
              Leadership<br />That Defines<br />Direction.
            </h1>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 17, fontWeight: 300, lineHeight: 1.75,
                color: "rgba(255,255,255,0.75)", maxWidth: 480, marginBottom: 48,
              }}
            >
              PivotEdge Partners is a specialist executive search and leadership advisory firm
              partnering with Boards and senior executives to secure leadership that shapes
              strategy, governance, and long-term performance.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <button className="btn btn-teal" onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}>
                <span>Our Approach</span>
              </button>
              <button className="btn btn-outline-light" onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
                <span>Begin a Conversation</span>
              </button>
            </div>
            <div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 1, background: T.gold }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.22em", color: T.gold, textTransform: "uppercase" }}>
                Advantage Starts Here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section style={{ background: T.teal, padding: "64px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel text="By the Numbers" light />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            {[
              { v: "20", s: "+", l: "Years of Practice" },
              { v: "500", s: "+", l: "Leadership Mandates" },
              { v: "92", s: "%", l: "Retention Rate" },
              { v: "300", s: "+", l: "C-Suite Placements" },
              { v: "30", s: "+", l: "Countries" },
            ].map((s, i) => (
              <StatCounter key={i} value={s.v} suffix={s.s} label={s.l} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Leadership Matters */}
      <section className="texture" style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <div className="reveal">
            <SectionLabel text="Our Perspective" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 5vw, 62px)",
                fontWeight: 300, lineHeight: 1.15,
                color: T.teal, marginBottom: 32,
              }}
            >
              Why Leadership<br />Matters Most.
            </h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: T.textMid, marginBottom: 24, maxWidth: 500 }}>
              Leadership is the single most influential factor in organisational performance.
              Strategy, culture, governance quality, and execution discipline are all shaped at the top.
            </p>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: T.textMid, maxWidth: 500 }}>
              In complex and rapidly evolving markets, organisations require leaders who combine
              strategic judgement with operational clarity. Appointments at functional head level
              and above carry enterprise-wide consequences. We approach these decisions with the rigour they demand.
            </p>
            <div style={{ marginTop: 40 }}>
              <button className="btn btn-outline" onClick={() => { setPage("About Us"); window.scrollTo(0, 0); }}>
                <span>Our Philosophy</span>
              </button>
            </div>
          </div>
          <div className="reveal reveal-d2">
            <div style={{ position: "relative" }}>
              <div className="img-block" style={{ height: 480 }}>
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                  alt="Leadership"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85, display: "block" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: -24, left: -24, background: T.gold, padding: "32px 40px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: T.white, lineHeight: 1 }}>6</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginTop: 4 }}>
                  Industry Verticals
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section style={{ background: T.creamAlt, padding: "120px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <div>
              <SectionLabel text="Capabilities" />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: T.teal }}>
                What We Do
              </h2>
            </div>
            <button className="btn btn-outline" style={{ flexShrink: 0 }} onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}>
              <span>All Services</span>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 2 }}>
            {[
              { n: "Executive Search", d: "Retained search for Board, CEO, and senior functional leadership roles.", icon: "⟳" },
              { n: "Boards & Governance", d: "Advisory support for Board composition, Director appointments, and governance succession.", icon: "◇" },
              { n: "CEO Succession", d: "Identification and evaluation of enterprise leaders aligned to long-term strategy.", icon: "△" },
              { n: "AI Leadership", d: "Search for AI and digital leaders driving intelligent enterprise transformation.", icon: "◈" },
            ].map((s, i) => (
              <div
                key={i}
                className="service-card reveal"
                style={{ background: T.white, padding: "48px 32px", border: `1px solid rgba(13,61,78,0.08)`, position: "relative", overflow: "hidden" }}
                onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color: T.gold, marginBottom: 20, lineHeight: 1 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: T.teal, marginBottom: 16, lineHeight: 1.2 }}>{s.n}</h3>
                <div className="gold-rule" style={{ margin: "0 0 16px" }} />
                <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: T.textMid }}>{s.d}</p>
                <div style={{ marginTop: 32, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: T.gold, fontFamily: "'Jost', sans-serif" }}>
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
          <div className="reveal">
            <SectionLabel text="Methodology" />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 62px)", fontWeight: 300, lineHeight: 1.1, color: T.teal, marginBottom: 40 }}>
              Research-Led.<br />Structured.<br />Discreet.
            </h2>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: T.textMid, marginBottom: 40, maxWidth: 440 }}>
              Our work is grounded in governance awareness and long-term value creation.
              Every engagement begins with strategic mandate definition.
            </p>
            <button className="btn btn-outline" onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}>
              <span>Our Full Approach</span>
            </button>
          </div>
          <div>
            {["Strategic Mandate Definition", "Market Mapping", "Assessment & Benchmarking", "Stakeholder Calibration", "Confidential Execution", "Transition Support"].map((step, i) => (
              <div
                key={i}
                className="reveal"
                style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingBottom: 28, borderBottom: `1px solid rgba(13,61,78,0.08)`, marginBottom: 28, position: "relative" }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: T.gold, opacity: 0.4, lineHeight: 1, flexShrink: 0, minWidth: 52, textAlign: "right" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ paddingTop: 12 }}>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, fontWeight: 500, color: T.teal, letterSpacing: "0.04em" }}>{step}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote CTA */}
      <section style={{ background: T.teal, padding: "120px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="reveal" style={{ maxWidth: 900 }}>
            <SectionLabel text="Our Philosophy" light />
            <blockquote className="pull-quote pull-quote-light" style={{ marginBottom: 48 }}>
              "We believe executive search is a strategic responsibility. When leadership capability aligns precisely with organisational ambition, performance becomes sustainable and governance becomes stronger."
            </blockquote>
            <div style={{ height: 1, background: "rgba(184,150,46,0.4)", width: 160, marginBottom: 48 }} />
            <button className="btn btn-outline-light" onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
              <span>Begin a Conversation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section style={{ background: T.creamAlt, padding: "32px 0", borderTop: `1px solid rgba(13,61,78,0.08)`, borderBottom: `1px solid rgba(13,61,78,0.08)`, overflow: "hidden" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) =>
            ["Industrial", "Real Estate & Infrastructure", "Consumer", "Healthcare & Life Sciences", "Banking & Financial Services", "Technology, Media & Telecommunications"].map((ind, i) => (
              <span
                key={`${ri}-${i}`}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, color: T.teal, opacity: 0.5, marginRight: 64, flexShrink: 0 }}
              >
                {ind} <span style={{ color: T.gold, marginLeft: 32, marginRight: 32 }}>◆</span>
              </span>
            )),
          )}
        </div>
      </section>

      {/* Where We Operate */}
      <section style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80 }}>
          <div>
            <SectionLabel text="Coverage" />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: T.teal }}>Where We Operate</h2>
          </div>
          <button className="btn btn-outline" onClick={() => { setPage("Domains"); window.scrollTo(0, 0); }}>
            <span>All Domains</span>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {[
            { name: "Industrial", fn: "Manufacturing & Operations" },
            { name: "Real Estate & Infrastructure", fn: "Capital Markets & Development" },
            { name: "Consumer", fn: "Brand & Retail Strategy" },
            { name: "Healthcare & Life Sciences", fn: "Clinical & Commercial" },
            { name: "Banking & Financial Services", fn: "Risk, Compliance & Capital" },
            { name: "Technology, Media & Telecom", fn: "Digital & Platform" },
          ].map((d, i) => (
            <div
              key={i}
              className="reveal underline-draw"
              style={{ padding: "40px 32px", borderBottom: `1px solid rgba(13,61,78,0.1)`, borderRight: i % 3 !== 2 ? `1px solid rgba(13,61,78,0.1)` : "none", cursor: "pointer" }}
              onClick={() => { setPage("Domains"); window.scrollTo(0, 0); }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: T.teal, marginBottom: 8 }}>{d.name}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.gold, fontFamily: "'Jost', sans-serif" }}>{d.fn}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
