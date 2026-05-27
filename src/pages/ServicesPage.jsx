import GoldDivider from "../components/GoldDivider";
import ClosingCTA from "../components/ClosingCTA";

import { methodSteps } from "../components/MethodologyFlow";

import SearchIcon from "../assets/icons/SearchIcon";
import BoardIcon from "../assets/icons/BoardIcon";
import SuccessionIcon from "../assets/icons/SuccessionIcon";
import InterimIcon from "../assets/icons/InterimIcon";
import TransitionIcon from "../assets/icons/TransitionIcon";
import DiversityIcon from "../assets/icons/DiversityIcon";
export default function ServicesPage() {
  const services = [
    {
      icon: <SearchIcon />,
      title: "Executive Search",
      desc: "We deliver retained executive search for senior leadership and board-level roles across industries and growth stages. Each mandate begins with a deep understanding of organisational strategy, culture, governance context, and performance objectives. Our research-led and consultative approach evaluates not only experience and track record, but judgement, leadership style, cultural alignment, and long-term impact. We operate with independence, discretion, and rigour — focusing on sustained value rather than transactional placements.",
    },
    {
      icon: <BoardIcon />,
      title: "Boards & Governance",
      desc: "We advise on board composition, governance effectiveness, and director appointments. Our work supports boards in strengthening oversight, strategic guidance, and leadership succession at the highest levels. Boards today operate in an environment defined by regulatory scrutiny, investor expectations, stakeholder activism, and strategic complexity. The composition and effectiveness of the Board directly influence enterprise resilience, risk oversight, and long-term value creation.",
    },
    {
      icon: <SuccessionIcon />,
      title: "Succession Planning",
      desc: "Leadership continuity is a strategic imperative. We partner with Boards and executive teams to design succession strategies that strengthen bench strength, reduce risk, and preserve institutional knowledge. Our approach identifies critical roles, evaluates internal readiness, assesses vulnerabilities, and builds structured leadership pipelines aligned to long-term organisational priorities.",
    },
    {
      icon: <InterimIcon />,
      title: "Interim Management",
      desc: "When leadership gaps arise or specialised expertise is required, interim management provides rapid access to experienced executives. We identify seasoned leaders who can step into complex environments, stabilise operations, drive transformation, or deliver specific outcomes within defined timeframes. Interim leadership offers flexibility without compromising on capability.",
    },
    {
      icon: <TransitionIcon />,
      title: "Career Transition",
      desc: "Organisational evolution often requires difficult leadership decisions. We support organisations in managing transitions with integrity and professionalism. Our career transition services provide structured guidance, leadership coaching, capability alignment, and strategic repositioning support — helping individuals move forward with clarity while protecting organisational reputation.",
    },
    {
      icon: <DiversityIcon />,
      title: "Diversity",
      desc: "Diverse leadership strengthens governance, innovation, and performance. We integrate diversity and inclusion considerations into every search and advisory engagement. Our approach ensures leadership appointments reflect broader perspectives, varied experiences, and alignment with organisational values — supporting stronger decision-making and long-term sustainability.",
    },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-label">Our Practice</p>
          <h1>
            Executive Search &<br />
            Leadership Advisory
          </h1>
          <p>
            We approach executive search as a strategic advisory engagement —
            not a transactional placement exercise. Every mandate is executed
            with rigour, discretion, and a long-term mindset.
          </p>
        </div>
      </div>

      <GoldDivider />

      {/* Services Grid */}
      <section className="section" style={{ background: "var(--color-cream)" }}>
        <div className="section-inner">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
              }}
            >
              Services
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
              }}
            >
              What We Offer
            </h2>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div
                key={i}
                className={`service-tile reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* export default functions */}
      <section className="section" style={{ background: "var(--color-white)" }}>
        <div className="section-inner">
          <div className="reveal" style={{ marginBottom: "3.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
              }}
            >
              export default functional Expertise
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
              }}
            >
              export default functions We Cover
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginTop: "1rem",
                fontSize: "0.9375rem",
                lineHeight: 1.8,
                maxWidth: "600px",
              }}
            >
              Our focus is on export default functional heads and above, where
              leadership impact directly influences enterprise performance and
              strategic direction.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
            }}
          >
            {[
              {
                title: "Boards & Governance",
                desc: "Independent Directors, Non-Executive Directors, Committee Chairs, and Chairpersons.",
              },
              {
                title: "Chief Executive Officer",
                desc: "Group CEOs, Managing Directors, Country Heads, Business Line CEOs, and Founder Successors.",
              },
              {
                title: "Chief Financial Officer",
                desc: "Finance leaders combining financial stewardship with enterprise-level thinking and governance credibility.",
              },
              {
                title: "Marketing & Sales",
                desc: "Commercial leaders who translate strategy into measurable revenue impact across markets.",
              },
              {
                title: "Human Resources",
                desc: "HR leaders across talent strategy, organisational effectiveness, succession, and change management.",
              },
              {
                title: "Supply Chain",
                desc: "Leaders driving operational excellence while managing global complexity and resilience.",
              },
              {
                title: "CSR & Sustainability",
                desc: "Leaders integrating economic performance with environmental stewardship and stakeholder accountability.",
              },
              {
                title: "Artificial Intelligence",
                desc: "AI and digital leaders who bridge technology and strategy to embed responsible innovation at enterprise scale.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1}`}
                style={{
                  padding: "2rem",
                  background: "var(--color-cream)",
                  borderLeft: "2px solid var(--color-gold)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    color: "var(--color-teal)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    lineHeight: 1.8,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Methodology */}
      <section className="section" style={{ background: "var(--color-teal)" }}>
        <div className="section-inner">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
              }}
            >
              Our Process
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-white)",
                fontWeight: 400,
              }}
            >
              A Structured Methodology
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                marginTop: "1rem",
                maxWidth: "560px",
                lineHeight: 1.8,
              }}
            >
              Every engagement follows a disciplined, research-led process
              ensuring precision, stakeholder alignment, and long-term outcomes.
            </p>
          </div>
          <div
            className="reveal reveal-delay-2"
            style={{ background: "rgba(255,255,255,0.06)", padding: "2rem" }}
          >
            {methodSteps.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "2rem",
                  paddingBottom: i < methodSteps.length - 1 ? "2rem" : 0,
                  marginBottom: i < methodSteps.length - 1 ? "2rem" : 0,
                  borderBottom:
                    i < methodSteps.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                }}
              >
                <div style={{ width: "56px", flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2rem",
                      color: "var(--color-gold)",
                      opacity: 0.7,
                    }}
                  >
                    {s.num}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.2rem",
                      color: "var(--color-white)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.8,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />
      <ClosingCTA />
    </>
  );
}
