import GoldDivider from "../components/GoldDivider";
import ClosingCTA from "../components/ClosingCTA";

import IndustrialIcon from "../assets/icons/IndustrialIcon";
import RealEstateIcon from "../assets/icons/RealEstateIcon";
import ConsumerIcon from "../assets/icons/ConsumerIcon";
import HealthcareIcon from "../assets/icons/HealthcareIcon";
import BankingIcon from "../assets/icons/BankingIcon";
import TMTIcon from "../assets/icons/TMTIcon";
export default function DomainsPage() {
  const domains = [
    {
      icon: <IndustrialIcon />,
      title: "Industrial",
      desc: "Industrial organisations operate within cyclical markets, cost pressures, and evolving technological landscapes. We support manufacturers and industrial enterprises in appointing leaders capable of modernising operations, improving productivity, and sustaining long-term competitiveness.",
    },
    {
      icon: <RealEstateIcon />,
      title: "Real Estate & Infrastructure",
      desc: "Capital-intensive and long-cycle in nature, this sector demands disciplined leadership with strong risk management and stakeholder alignment. We work with developers, operators, and infrastructure enterprises to identify executives who can drive scale, efficiency, and asset value.",
    },
    {
      icon: <ConsumerIcon />,
      title: "Consumer",
      desc: "Rapidly shifting customer behaviour and digital disruption require agile leadership. We support consumer-facing organisations in appointing executives who understand market dynamics, brand positioning, and growth strategy.",
    },
    {
      icon: <HealthcareIcon />,
      title: "Healthcare & Life Sciences",
      desc: "Innovation, regulation, and societal responsibility define this sector. We identify leaders with scientific credibility, regulatory awareness, and strategic foresight to guide organisations through complexity and transformation.",
    },
    {
      icon: <BankingIcon />,
      title: "Banking & Financial Services",
      desc: "Managing capital, risk, compliance, and technological change demands experienced leadership. We support financial institutions in appointing executives who can navigate regulatory landscapes while delivering sustainable performance.",
    },
    {
      icon: <TMTIcon />,
      title: "Technology, Media & Telecommunications",
      desc: "Continuous innovation and digital disruption shape this domain. We partner with organisations to identify leaders who can harness emerging technologies, scale platforms, and drive competitive differentiation.",
    },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-label">Industries & Sectors</p>
          <h1>
            Domains of
            <br />
            Deep Expertise
          </h1>
          <p>
            We bring genuine sector knowledge to every mandate — understanding
            the dynamics, pressures, and leadership requirements unique to each
            domain.
          </p>
        </div>
      </div>

      <GoldDivider />

      {/* Intro */}
      <section className="section" style={{ background: "var(--color-cream)" }}>
        <div className="section-inner">
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
            className="reveal"
          >
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
              Where We Operate
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-teal)",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Sector-Informed Leadership Advisory
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#5a5a5a",
                lineHeight: 1.9,
              }}
            >
              We serve clients across six primary sectors, with export default
              functional expertise spanning Boards and Governance, Chief
              Executive Officers, Chief Financial Officers, Marketing and Sales,
              Human Resources, Supply Chain, Sustainability, and Artificial
              Intelligence.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Domain tiles */}
      <section className="section" style={{ background: "var(--color-white)" }}>
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2px",
              background: "rgba(15,76,92,0.06)",
            }}
          >
            {domains.map((d, i) => (
              <div
                key={i}
                className={`domain-tile reveal reveal-delay-${(i % 3) + 1}`}
                style={{ padding: "3rem 2.5rem", minHeight: "280px" }}
              >
                <div className="domain-icon">{d.icon}</div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                  }}
                >
                  {d.title}
                </h4>
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.8,
                  }}
                >
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Brand statement */}
      <section className="section" style={{ background: "var(--color-cream)" }}>
        <div className="section-inner">
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
            className="reveal"
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "var(--color-teal)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.3,
                marginBottom: "2rem",
              }}
            >
              "We believe executive search is a strategic responsibility."
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#6b7280",
                lineHeight: 1.9,
                marginBottom: "0.75rem",
              }}
            >
              When leadership capability aligns precisely with organisational
              ambition, performance becomes sustainable and governance becomes
              stronger.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-gold)",
                fontSize: "1rem",
                fontStyle: "italic",
              }}
            >
              That is where the advantage begins.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />
      <ClosingCTA />
    </>
  );
}
