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

function useViewportWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, vis] = useIO();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const SECTIONS = [
  {
    id: "introduction",
    num: "01",
    title: "Introduction",
    content: [
      'PivotEdge Partners ("PivotEdge", "we", "us" or "our") is an executive search and leadership advisory firm. We respect the privacy of our clients, candidates, website visitors and other individuals whose personal data we process, and we are committed to protecting it wherever in the world it is collected or used. This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and the rights available to you.',
      'Because our clients and candidates are located around the world, this Policy is designed to meet the expectations of multiple data protection frameworks, including the European Union and United Kingdom General Data Protection Regulation ("GDPR"), India\'s Digital Personal Data Protection Act, 2023 ("DPDP Act"), and other applicable data protection and privacy laws. Where a specific law grants you rights beyond what is described below, those rights apply in addition to this Policy.',
    ],
  },
  {
    id: "scope",
    num: "02",
    title: "Scope of this Policy",
    content: [
      "This Policy applies to personal data we collect through our website, by email or telephone, through professional networking platforms, at events, or in the course of providing executive search and advisory services to clients and candidates worldwide. It applies regardless of where you are located or where our engagement with you takes place.",
    ],
  },
  {
    id: "information-we-collect",
    num: "03",
    title: "Information We Collect",
    content: [
      "We do not knowingly collect special category data (such as health information, religious beliefs or trade union membership) unless you volunteer it, it is relevant to a specific mandate, and its collection is permitted under applicable law.",
    ],
    list: [
      "Candidates and prospective candidates: name, contact details, curriculum vitae, employment history, qualifications, compensation expectations, references, interview notes and assessment records, and any other information you or your referees provide during a search assignment.",
      "Clients and client representatives: name, job title, employer, contact details, and information relating to search mandates and engagements.",
      "Website visitors: technical data such as IP address, browser type, device information, and usage data collected through cookies and similar technologies (see Section 11).",
      "Business contacts: information shared with us through LinkedIn, referrals, conferences and industry networking.",
    ],
    listBefore: true,
  },
  {
    id: "how-we-use",
    num: "04",
    title: "How We Use Your Information",
    content: [],
    list: [
      "To identify, assess and present candidates for executive search mandates.",
      "To manage our relationships with clients and candidates and deliver our advisory services.",
      "To communicate with you about mandates, opportunities and our services.",
      "To maintain our candidate and client database for current and future search assignments.",
      "To comply with legal, regulatory and contractual obligations.",
      "To operate, secure and improve our website.",
      "For internal record-keeping, reporting and business analysis.",
    ],
  },
  {
    id: "legal-basis",
    num: "05",
    title: "Legal Basis for Processing (GDPR)",
    content: [
      "Where the GDPR applies, we rely on one or more of the following legal bases to process your personal data: performance of a contract (for example, delivering a search mandate); our legitimate interests (for example, maintaining a candidate database or improving our services), provided these interests are not overridden by your rights; compliance with a legal obligation; and, where required, your consent, which you may withdraw at any time.",
    ],
  },
  {
    id: "candidate-client-data",
    num: "06",
    title: "Candidate and Client Data",
    content: [
      "As an executive search firm, we process candidate data to evaluate suitability for specific roles and to build long-term talent relationships. We may retain candidate profiles beyond a single mandate so that we can consider you for future opportunities, unless you ask us not to. We share candidate information with client organisations only to the extent necessary to progress a specific mandate, and we take reasonable steps to ensure candidates are informed before their profile is shared with a named client.",
    ],
  },
  {
    id: "disclosure-sharing",
    num: "07",
    title: "Disclosure and Sharing of Information",
    content: ["We do not sell personal data. We may share personal data with:"],
    list: [
      "Client organisations, in connection with a specific search mandate.",
      "Service providers who support our operations, such as IT hosting, email and database providers, under appropriate confidentiality and data protection terms.",
      "Professional advisers, including legal, tax and audit advisers, where necessary.",
      "Regulators, courts or law enforcement, where required by law.",
      "A successor entity, in the event of a merger, acquisition or restructuring of our business.",
    ],
  },
  {
    id: "international-transfers",
    num: "08",
    title: "International Data Transfers",
    content: [
      "Given the global nature of our client and candidate base, personal data may be transferred to, stored, and processed in countries other than the country in which it was originally collected, including countries that may not have data protection laws equivalent to those in your home jurisdiction. Where we transfer personal data internationally, we use appropriate safeguards, such as standard contractual clauses or equivalent mechanisms recognised under applicable law, to protect that data.",
    ],
  },
  {
    id: "retention",
    num: "09",
    title: "Data Retention",
    content: [
      "We retain personal data for as long as necessary to fulfil the purposes described in this Policy, including maintaining an active candidate pipeline, complying with legal and regulatory obligations, and resolving disputes. Retention periods vary depending on the nature of the data and the requirements of applicable law. You may ask us to review or delete your data at any time, as described in Section 9 — Your Rights.",
    ],
  },
  {
    id: "your-rights",
    num: "10",
    title: "Your Rights",
    content: [
      "Depending on where you are located, you may have some or all of the following rights in relation to your personal data:",
    ],
    list: [
      "Access – to obtain a copy of the personal data we hold about you.",
      "Correction – to request that inaccurate or incomplete data be corrected.",
      "Erasure – to request deletion of your personal data, subject to legal and contractual limits.",
      "Restriction or objection – to restrict or object to certain processing of your data.",
      "Portability – to receive your data in a structured, commonly used format.",
      "Withdrawal of consent – where processing is based on consent, to withdraw it at any time.",
      "Grievance redressal – for individuals in India, the right to lodge a complaint with our Grievance Officer and, thereafter, with the Data Protection Board of India under the DPDP Act.",
      "Complaint to a supervisory authority – for individuals in the EU/UK, the right to lodge a complaint with your local data protection authority.",
    ],
    after:
      "To exercise any of these rights, please contact us using the details in Section 14 — Contact Us. We will respond within the timeframe required by applicable law.",
  },
  {
    id: "security",
    num: "11",
    title: "Data Security",
    content: [
      "We maintain appropriate technical and organisational measures designed to protect personal data against unauthorised access, alteration, disclosure or destruction. These include access controls, encryption where appropriate, and confidentiality obligations for our personnel and service providers. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "cookies",
    num: "12",
    title: "Cookies and Tracking Technologies",
    content: [
      "Our website may use cookies and similar technologies to operate the site, remember your preferences, and understand how visitors use our website. You can control cookies through your browser settings. Disabling cookies may affect the functionality of our website.",
    ],
  },
  {
    id: "childrens-privacy",
    num: "13",
    title: "Children's Privacy",
    content: [
      "Our services are directed at working professionals and organisations. We do not knowingly collect personal data from children, and our website is not intended for use by individuals under the age of 18.",
    ],
  },
  {
    id: "changes",
    num: "14",
    title: "Changes to this Policy",
    content: [
      'We may update this Policy from time to time to reflect changes in our practices or legal requirements. The "Effective date" at the top of this Policy indicates when it was last revised. We encourage you to review this Policy periodically.',
    ],
  },
  {
    id: "contact",
    num: "15",
    title: "Contact Us",
    content: [
      "If you have questions about this Policy, wish to exercise your data protection rights, or have a complaint about how we handle your personal data, please contact us at:",
    ],
    list: [
      "PivotEdge Partners",
      "Email: info@pivotedgegroup.com",
      "Attention: Data Protection / Grievance Officer",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState("introduction");
  const width = useViewportWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: T.cream }}>
      {/* ── HERO ── */}
      <section
        style={{
          background: T.teal,
          padding: isMobile ? "112px 24px 64px" : "160px 64px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px,rgba(255,255,255,0.035) 1px,transparent 0)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "8%",
              transform: "translateY(-50%)",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 280,
              fontWeight: 300,
              color: T.white,
              opacity: 0.03,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            PP
          </div>
        )}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <SectionLabel text="Legal Documentation" light />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(52px,7vw,88px)",
              fontWeight: 300,
              color: T.white,
              lineHeight: 1.05,
              marginBottom: 28,
            }}
          >
            Privacy
            <br />
            Policy
          </h1>
          <div
            style={{
              width: 48,
              height: 1,
              background: T.gold,
              marginBottom: 24,
            }}
          />
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(245,240,232,0.65)",
              maxWidth: 520,
            }}
          >
            How PivotEdge Partners collects, uses, and protects your personal
            information in connection with our executive search and leadership
            advisory services.
          </p>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: isMobile ? 20 : 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Effective Date", value: "25 July 2026" },
              { label: "Jurisdiction", value: "Global" },
              { label: "Frameworks", value: "GDPR · DPDP Act" },
            ].map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: T.gold,
                    opacity: 0.8,
                    marginBottom: 4,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(245,240,232,0.6)",
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY: sidebar nav + content ── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "56px 20px 72px" : "80px 64px 120px",
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "260px 1fr",
          gap: isMobile ? 40 : isTablet ? 56 : 80,
          alignItems: "start",
        }}
      >
        {/* Sticky sidebar */}
        <div style={isTablet ? undefined : { position: "sticky", top: 100 }}>
          <div
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Contents
          </div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s.id);
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                width: "100%",
                background: "none",
                border: "none",
                padding: "10px 0",
                cursor: "pointer",
                textAlign: "left",
                borderBottom: "1px solid rgba(13,61,78,0.08)",
                transition: "all 0.25s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 12,
                  color: T.gold,
                  opacity: active === s.id ? 1 : 0.4,
                  minWidth: 20,
                  marginTop: 2,
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: active === s.id ? 400 : 300,
                  color: active === s.id ? T.teal : "rgba(13,61,78,0.55)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.4,
                  transition: "color 0.25s ease",
                }}
              >
                {s.title}
              </span>
            </button>
          ))}
          <div
            style={{
              marginTop: 32,
              padding: "20px",
              background: T.creamAlt,
              borderLeft: `2px solid ${T.gold}`,
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 8,
              }}
            >
              Questions?
            </div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 300,
                lineHeight: 1.7,
                color: T.textMid,
                marginBottom: 10,
              }}
            >
              Contact our data protection team for any privacy-related
              enquiries.
            </p>
            <div style={{ fontSize: 11, color: T.teal, fontWeight: 400 }}>
              info@pivotedgegroup.com
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {SECTIONS.map((s, si) => (
            <Fade key={s.id} delay={si * 40}>
              <div
                id={s.id}
                style={{ marginBottom: 72, scrollMarginTop: 120 }}
                ref={(el) => {
                  if (el) {
                    const io = new IntersectionObserver(
                      ([e]) => {
                        if (e.isIntersecting) setActive(s.id);
                      },
                      { threshold: 0.3 },
                    );
                    io.observe(el);
                  }
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? 12 : 20,
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: isMobile ? 22 : 32,
                      fontWeight: 300,
                      color: T.gold,
                      opacity: 0.4,
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  >
                    {s.num}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "clamp(22px,2.8vw,36px)",
                      fontWeight: 300,
                      color: T.teal,
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h2>
                </div>
                <div
                  style={{
                    width: 48,
                    height: 1,
                    background: T.gold,
                    opacity: 0.5,
                    marginBottom: 24,
                    marginLeft: isMobile ? 34 : 52,
                  }}
                />
                <div style={{ paddingLeft: isMobile ? 34 : 52 }}>
                  {s.listBefore && s.list && (
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        marginBottom: s.content.length ? 18 : 0,
                      }}
                    >
                      {s.list.map((item, li) => (
                        <li
                          key={li}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            fontSize: 14,
                            fontWeight: 300,
                            lineHeight: 1.9,
                            color: T.textMid,
                            marginBottom: li < s.list.length - 1 ? 14 : 0,
                          }}
                        >
                          <span
                            style={{
                              color: T.gold,
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.content.map((para, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontSize: 14,
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: T.textMid,
                        marginBottom:
                          pi < s.content.length - 1 || (s.list && !s.listBefore)
                            ? 18
                            : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                  {!s.listBefore && s.list && (
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        marginBottom: s.after ? 18 : 0,
                      }}
                    >
                      {s.list.map((item, li) => (
                        <li
                          key={li}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            fontSize: 14,
                            fontWeight: 300,
                            lineHeight: 1.9,
                            color: T.textMid,
                            marginBottom: li < s.list.length - 1 ? 14 : 0,
                          }}
                        >
                          <span
                            style={{
                              color: T.gold,
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after && (
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: T.textMid,
                        margin: 0,
                      }}
                    >
                      {s.after}
                    </p>
                  )}
                </div>
              </div>
            </Fade>
          ))}

          {/* Footer note */}
          <Fade>
            <div
              style={{
                padding: isMobile ? "24px 20px" : "32px 40px",
                background: T.teal,
                borderLeft: `3px solid ${T.gold}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ width: 20, height: 1, background: T.gold }} />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: T.gold,
                  }}
                >
                  Our Commitment
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: isMobile ? 16 : 18,
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.85)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                "We operate with integrity, confidentiality, and professional
                discipline in everything we do — including how we handle your
                personal information."
              </p>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.4)",
                  fontFamily: "'Jost',sans-serif",
                  letterSpacing: "0.12em",
                }}
              >
                — PivotEdge Partners
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
