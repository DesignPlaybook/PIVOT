import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import GoldDivider from "../components/GoldDivider";
import MethodologyFlow from "../components/MethodologyFlow";
import ClosingCTA from "../components/ClosingCTA";

import SearchIcon from "../assets/icons/SearchIcon";
import BoardIcon from "../assets/icons/BoardIcon";
import SuccessionIcon from "../assets/icons/SuccessionIcon";
import TMTIcon from "../assets/icons/TMTIcon";

import AdvisoryIcon from "../assets/icons/AdvisoryIcon";
import ResearchIcon from "../assets/icons/ResearchIcon";
import AccessIcon from "../assets/icons/AccessIcon";
import TrustIcon from "../assets/icons/TrustIcon";

import IndustrialIcon from "../assets/icons/IndustrialIcon";
import RealEstateIcon from "../assets/icons/RealEstateIcon";
import ConsumerIcon from "../assets/icons/ConsumerIcon";
import HealthcareIcon from "../assets/icons/HealthcareIcon";
import BankingIcon from "../assets/icons/BankingIcon";

import ArrowRightIcon from "../assets/icons/ArrowRightIcon";
export default function HomePage() {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  const services = [
    {
      icon: <SearchIcon />,
      title: "Executive Search",
      desc: "Retained search for Board, CEO, and senior export default functional leadership roles across industries and growth stages.",
      to: "/services",
    },
    {
      icon: <BoardIcon />,
      title: "Boards & Governance",
      desc: "Advisory support for Board composition, Director appointments, and governance succession at the highest levels.",
      to: "/services",
    },
    {
      icon: <SuccessionIcon />,
      title: "CEO & Enterprise Leadership",
      desc: "Identification and evaluation of enterprise leaders aligned to long-term strategy, culture, and governance.",
      to: "/services",
    },
    {
      icon: <TMTIcon />,
      title: "AI & Emerging Leadership",
      desc: "Search for AI and digital leaders driving intelligent enterprise transformation and responsible innovation.",
      to: "/services",
    },
  ];

  const advantages = [
    {
      icon: <AdvisoryIcon />,
      title: "Advisory First",
      desc: "Strategic advisors entrusted with consequential decisions — not transactional intermediaries focused on speed.",
    },
    {
      icon: <ResearchIcon />,
      title: "Research-Driven",
      desc: "Comprehensive market mapping, talent intelligence, and rigorous evaluation frameworks inform every recommendation.",
    },
    {
      icon: <AccessIcon />,
      title: "Senior Access",
      desc: "Deep, established access to executive and board-level talent pools across global markets and industries.",
    },
    {
      icon: <TrustIcon />,
      title: "Long-Term Trust",
      desc: "Accountability, discretion, and partnership across the full engagement lifecycle and beyond.",
    },
  ];

  const domains = [
    { icon: <IndustrialIcon />, title: "Industrial" },
    { icon: <RealEstateIcon />, title: "Real Estate" },
    { icon: <ConsumerIcon />, title: "Consumer" },
    { icon: <HealthcareIcon />, title: "Healthcare" },
    { icon: <BankingIcon />, title: "Banking & Financial" },
    { icon: <TMTIcon />, title: "TMT" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div
          className={`hero-bg ${heroLoaded ? "loaded" : ""}`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80')`,
          }}
          /* Replace: aerial view of a modern financial district / executive boardroom with city skyline */
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div style={{ maxWidth: "700px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "2rem",
                opacity: 0.9,
              }}
            >
              Executive Search · Leadership Advisory
            </p>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                color: "var(--color-white)",
                lineHeight: 1.08,
                marginBottom: "2rem",
                letterSpacing: "-0.02em",
              }}
            >
              Leadership That
              <br />
              <span
                style={{ fontStyle: "italic", color: "rgba(255,255,255,0.9)" }}
              >
                Defines Direction
              </span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                lineHeight: 1.85,
                marginBottom: "1rem",
                maxWidth: "580px",
              }}
            >
              PivotEdge Partners is a specialist executive search and leadership
              advisory firm partnering with Boards and senior executives to
              secure leadership that shapes strategy, governance, and long-term
              performance.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--color-gold)",
                fontSize: "1.1rem",
                marginBottom: "2.5rem",
                opacity: 0.9,
              }}
            >
              Advantage starts here.
            </p>
            <button className="btn-gold" onClick={() => navigate("/contact")}>
              Begin a Conversation
            </button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Why Leadership Matters */}
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
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  marginBottom: "1.25rem",
                }}
              >
                Why Leadership Matters
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--color-teal)",
                  marginBottom: "2rem",
                  lineHeight: 1.2,
                }}
              >
                The quality of leadership determines the quality of outcomes.
              </h2>
              <p
                style={{
                  color: "#4a4a4a",
                  lineHeight: 1.9,
                  marginBottom: "1.25rem",
                  fontSize: "0.9375rem",
                }}
              >
                Leadership is the single most influential factor in
                organisational performance. Strategy, culture, governance
                quality, and execution discipline are all shaped at the top.
              </p>
              <p
                style={{
                  color: "#4a4a4a",
                  lineHeight: 1.9,
                  marginBottom: "1.25rem",
                  fontSize: "0.9375rem",
                }}
              >
                In complex and rapidly evolving markets, organisations require
                leaders who combine strategic judgement with operational
                clarity. Appointments at export default functional head level
                and above carry enterprise-wide consequences.
              </p>
              <p
                style={{
                  color: "var(--color-teal)",
                  lineHeight: 1.9,
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                }}
              >
                We approach these decisions with the rigour they demand.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <div
                style={{
                  height: "480px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80"
                  alt="Executive boardroom"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                {/* Replace: senior executive in a boardroom or strategy meeting */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "-1.5rem",
                    background: "var(--color-teal)",
                    padding: "1.5rem 2rem",
                    maxWidth: "260px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      color: "var(--color-white)",
                      lineHeight: 1.5,
                      fontStyle: "italic",
                    }}
                  >
                    "When leadership is right, organisations move with
                    confidence."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Services */}
      <section className="section" style={{ background: "var(--color-white)" }}>
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
              Our Practice
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
              }}
            >
              What We Do
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5px",
              background: "rgba(15,76,92,0.06)",
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  background:
                    i % 2 === 0 ? "var(--color-white)" : "var(--color-cream)",
                  padding: "3rem",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onClick={() => navigate(s.to)}
              >
                <div style={{ marginBottom: "1.5rem" }}>{s.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.4rem",
                    color: "var(--color-teal)",
                    marginBottom: "1rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: 1.8,
                    fontSize: "0.9rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {s.desc}
                </p>
                <Link
                  to={s.to}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-teal)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  Learn More <ArrowRightIcon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Methodology */}
      <section className="section" style={{ background: "var(--color-cream)" }}>
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
              Our Approach
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
                maxWidth: "500px",
              }}
            >
              How We Work
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
              Our process is research-driven, structured, and discreet. Grounded
              in governance awareness and long-term value creation.
            </p>
          </div>
          <div className="reveal reveal-delay-2">
            <MethodologyFlow bg="transparent" />
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Domains */}
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
              Sectors We Serve
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
              }}
            >
              Where We Operate
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "1px",
              background: "rgba(15,76,92,0.08)",
            }}
          >
            {domains.map((d, i) => (
              <div
                key={i}
                className={`domain-tile reveal reveal-delay-${i % 4}`}
                style={{
                  minHeight: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => navigate("/domains")}
              >
                <div className="domain-icon">{d.icon}</div>
                <h4
                  style={{
                    fontSize: "0.875rem",
                    textAlign: "center",
                    marginTop: "0.75rem",
                  }}
                >
                  {d.title}
                </h4>
              </div>
            ))}
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
              Differentiated Practice
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
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
            }}
          >
            {advantages.map((a, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  padding: "2.5rem 2rem",
                  background: "var(--color-white)",
                  borderTop: "2px solid var(--color-gold)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(15,76,92,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ marginBottom: "1.5rem" }}>{a.icon}</div>
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
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    lineHeight: 1.8,
                  }}
                >
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Global Presence */}
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
              Three Cities. One Standard.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {[
              {
                city: "Mumbai",
                region: "South Asia & India",
                role: "Registered Office",
                img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80",
              },
              /* Replace: Mumbai skyline / Marine Drive */
              {
                city: "Dubai",
                region: "Middle East & GCC",
                role: "Regional Office",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
              },
              /* Replace: Dubai skyline / Burj Khalifa */
              {
                city: "Sydney",
                region: "Asia-Pacific",
                role: "Regional Office",
                img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
              },
              /* Replace: Sydney Opera House / harbour */
            ].map((loc, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{ overflow: "hidden", position: "relative" }}
              >
                <div style={{ height: "280px", overflow: "hidden" }}>
                  <img
                    src={loc.img}
                    alt={loc.city}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.04)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  />
                </div>
                <div
                  style={{
                    padding: "2rem",
                    background: "var(--color-cream)",
                    borderTop: "2px solid var(--color-gold)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.6rem",
                      color: "var(--color-teal)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {loc.city}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {loc.region}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginTop: "0.5rem",
                    }}
                  >
                    {loc.role}
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
