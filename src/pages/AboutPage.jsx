import { useNavigate } from "react-router-dom";

import GoldDivider from "../components/GoldDivider";
import ClosingCTA from "../components/ClosingCTA";

import AdvisoryIcon from "../assets/icons/AdvisoryIcon";
import ResearchIcon from "../assets/icons/ResearchIcon";
import AccessIcon from "../assets/icons/AccessIcon";
import TrustIcon from "../assets/icons/TrustIcon";

import MailIcon from "../assets/icons/MailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
export default function AboutPage() {
  const navigate = useNavigate();
  const advantages = [
    {
      icon: <AdvisoryIcon />,
      title: "Advisory First",
      desc: "Strategic advisors entrusted with consequential decisions. We are not intermediaries — we are partners in leadership strategy.",
    },
    {
      icon: <ResearchIcon />,
      title: "Research-Driven",
      desc: "Comprehensive market mapping and talent intelligence inform every mandate. We combine depth with precision.",
    },
    {
      icon: <AccessIcon />,
      title: "Senior Access",
      desc: "Deep, established access to executive and board-level talent pools across global markets and industry verticals.",
    },
    {
      icon: <TrustIcon />,
      title: "Long-Term Trust",
      desc: "Accountability, discretion, and partnership across the full engagement lifecycle — and well beyond it.",
    },
  ];

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target === "how-we-work") {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        document
          .getElementById("how-we-work")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-label">About PivotEdge Partners</p>
          <h1>Advantage Starts Here</h1>
          <p>
            Leadership decisions shape the trajectory of organisations. The
            right appointment strengthens governance, sharpens execution, and
            positions the enterprise for sustained growth.
          </p>
        </div>
      </div>

      <GoldDivider />

      {/* Philosophy */}
      <section className="section" style={{ background: "var(--color-cream)" }}>
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            <div className="reveal">
              <div
                style={{
                  height: "520px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=900&q=80"
                  alt="Leadership"
                  style={{ height: "100%", objectFit: "cover" }}
                />
                {/* Replace: executive in a glass-walled office or boardroom */}
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  marginBottom: "1.5rem",
                }}
              >
                Our Philosophy
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "var(--color-teal)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                }}
              >
                Leadership is not defined by title.
                <br />
                <span style={{ fontStyle: "italic" }}>
                  It is defined by impact.
                </span>
              </h2>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "#4a4a4a",
                  lineHeight: 1.9,
                  marginBottom: "1.25rem",
                }}
              >
                At PivotEdge Partners, we believe the quality of leadership
                determines the quality of organisational outcomes. Boards shape
                oversight and direction. Chief Executives set vision and
                performance standards. Functional leaders translate strategy
                into execution.
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "#4a4a4a",
                  lineHeight: 1.9,
                  marginBottom: "1.25rem",
                }}
              >
                Our role is to ensure that leadership capability aligns
                precisely with strategic ambition. We approach every mandate
                with structured evaluation, market intelligence, and governance
                awareness. We consider not only experience, but judgement,
                adaptability, cultural alignment, and long-term enterprise
                impact.
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-teal)",
                  lineHeight: 1.9,
                  fontWeight: 500,
                }}
              >
                That is where meaningful advantage begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Who We Are */}
      <section className="section" style={{ background: "var(--color-white)" }}>
        <div className="section-inner">
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
                Who We Are
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  color: "var(--color-teal)",
                  fontWeight: 400,
                }}
              >
                Advisors Entrusted With Consequential Decisions
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
              }}
            >
              {[
                {
                  title: "Who We Are",
                  body: "We are advisors entrusted with consequential decisions. Our work spans Executive Search, Board and Governance appointments, CEO succession, and emerging leadership domains such as Artificial Intelligence. Our approach is research-driven, structured, and discreet. We combine market intelligence, rigorous assessment, and governance awareness to identify leaders who align with both strategic ambition and organisational culture.",
                },
                {
                  title: "How We Work",
                  body: "Every engagement begins with clarity. We seek to understand the organisations strategic direction, operational realities, cultural dynamics, and governance expectations before defining the leadership mandate. We conduct comprehensive market mapping, evaluate candidates against clearly defined criteria, and maintain ongoing stakeholder alignment. Our methodology emphasises depth over speed, precision over volume, and fit over familiarity.",
                },
                {
                  title: "Our Perspective on Leadership",
                  body: "Leadership effectiveness extends beyond functional competence. It requires strategic judgement, adaptability, ethical grounding, and the ability to mobilise teams in complex environments. In a world defined by technological acceleration, regulatory scrutiny, and shifting stakeholder expectations, organisations need leaders who can navigate uncertainty with discipline and clarity.",
                },
                {
                  title: "Our Commitment",
                  body: "We operate with integrity, confidentiality, and professional discipline. We provide clear communication, structured documentation, and accountability throughout the engagement. Our objective is not merely to fill positions, but to strengthen organisations through leadership alignment. When leadership is right, organisations move with confidence. That is where advantage begins.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${(i % 2) + 1}`}
                  style={{
                    paddingTop: "2rem",
                    borderTop: "1px solid rgba(15,76,92,0.1)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      color: "var(--color-teal)",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#5a5a5a",
                      lineHeight: 1.9,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Competitive Advantage */}
      <section className="section" style={{ background: "var(--color-cream)" }}>
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
              What Sets Us Apart
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
              }}
            >
              Our Competitive Advantage
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {advantages.map((a, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 2) + 1}`}
                style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "2.5rem",
                  background: "var(--color-white)",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "64px",
                    height: "64px",
                    background: "rgba(201,162,63,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {a.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.3rem",
                      color: "var(--color-teal)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      lineHeight: 1.8,
                    }}
                  >
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Global Offices */}
      <section className="section" style={{ background: "var(--color-white)" }}>
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
              Global Reach
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
              }}
            >
              Global Offices
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[
              {
                city: "Mumbai",
                region: "South Asia & India",
                role: "Registered Office",
                desc: "Our founding office serving the Indian subcontinent and South Asian markets. A hub for industrial, financial, and consumer sector mandates.",
                img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80",
              },
              {
                city: "Dubai",
                region: "Middle East & GCC",
                role: "Regional Office",
                desc: "Serving the Gulf Cooperation Council region, with a focus on real estate, banking, and infrastructure leadership across MENA markets.",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
              },
              {
                city: "Sydney",
                region: "Asia-Pacific",
                role: "Regional Office",
                desc: "Our Asia-Pacific hub, covering Australia and broader regional markets with a focus on technology, healthcare, and governance mandates.",
                img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
              },
            ].map((loc, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{ background: "var(--color-cream)" }}
              >
                <div style={{ height: "240px", overflow: "hidden" }}>
                  <img
                    src={loc.img}
                    alt={loc.city}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    padding: "2rem",
                    borderTop: "2px solid var(--color-gold)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-teal)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {loc.city}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginBottom: "1rem",
                    }}
                  >
                    {loc.region} · {loc.role}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      lineHeight: 1.8,
                    }}
                  >
                    {loc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Leadership */}
      <section className="section" style={{ background: "var(--color-teal)" }}>
        <div className="section-inner">
          <div className="reveal" style={{ maxWidth: "700px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1.5rem",
              }}
            >
              Leadership
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-white)",
                fontWeight: 400,
                marginBottom: "3rem",
              }}
            >
              The Person Behind the Practice
            </h2>
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  background: "rgba(201,162,63,0.2)",
                  border: "2px solid var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.5rem",
                    color: "var(--color-gold)",
                    fontWeight: 300,
                  }}
                >
                  SA
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem",
                    color: "var(--color-white)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Swapna Amin
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Principal & Advisor
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.9,
                    marginBottom: "1.5rem",
                  }}
                >
                  Swapna Amin leads PivotEdge Partners as Principal and Advisor,
                  bringing deep expertise in executive search, leadership
                  assessment, and board advisory across industries and global
                  markets.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <a
                    href="mailto:swapna.amin@pivotedgegroup.com"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                    }
                  >
                    <MailIcon /> swapna.amin@pivotedgegroup.com
                  </a>
                  <a
                    href="tel:+919820779053"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                    }
                  >
                    <PhoneIcon /> +91 98207 79053
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />
      <ClosingCTA />
    </>
  );
}
