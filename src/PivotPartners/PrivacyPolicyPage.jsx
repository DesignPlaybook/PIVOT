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
      "PivotEdge Partners ('we', 'us', or 'our') is committed to protecting the privacy and confidentiality of all personal information entrusted to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data in connection with our executive search and leadership advisory services.",
      "This policy applies to all individuals who interact with PivotEdge Partners, including candidates, clients, board members, referees, website visitors, and any other individuals whose personal data we process in the course of our business.",
      "We process personal data in accordance with applicable data protection legislation, including the General Data Protection Regulation (GDPR), the UK Data Protection Act 2018, and other relevant national laws where applicable. By engaging with our services or our website, you acknowledge the terms set out in this policy.",
    ],
  },
  {
    id: "data-collected",
    num: "02",
    title: "Personal Data We Collect",
    content: [
      "We collect and process personal data that is necessary to fulfil our executive search and advisory mandates. The categories of personal data we may collect include:",
      "Identity and contact information: full name, date of birth, nationality, postal address, telephone number, and email address. Professional information: current and previous employment history, job titles, responsibilities, achievements, compensation details, educational qualifications, professional certifications, and memberships. Assessment data: competency profiles, psychometric and leadership assessment results, reference reports, and our own evaluation notes prepared during the course of a mandate. Publicly available information: data obtained from publicly accessible sources including LinkedIn, company websites, press releases, published interviews, and regulatory filings. Communications: correspondence, meeting notes, and records of our interactions with you.",
      "We collect this information directly from you, from client organisations, from referees and professional contacts you provide, and from publicly available sources. We will always aim to inform you when we begin processing your personal data.",
    ],
  },
  {
    id: "legal-basis",
    num: "03",
    title: "Legal Basis for Processing",
    content: [
      "We rely on the following legal bases to process your personal data, depending on the nature of our relationship with you:",
      "Legitimate interests: The majority of our processing is carried out on the basis of our legitimate interests as an executive search firm, and the legitimate interests of our clients, in identifying and evaluating senior leadership talent. We balance these interests carefully against your right to privacy and will not rely on this basis where your interests or rights override ours.",
      "Contractual necessity: Where you have engaged us directly — for example as a candidate using our outplacement or career transition services — we process your data to fulfil our contractual obligations to you.",
      "Consent: In certain circumstances, we will seek your explicit consent before processing particularly sensitive data, or before including you in a specific search process.",
      "Legal obligation: We may be required to process certain data to comply with applicable laws, court orders, or regulatory requirements.",
    ],
  },
  {
    id: "how-we-use",
    num: "04",
    title: "How We Use Your Personal Data",
    content: [
      "We use personal data for the following purposes: to identify, assess, and evaluate candidates for executive and board-level roles on behalf of our clients; to maintain a professional network and talent database for current and future search mandates; to conduct due diligence, reference checks, and background verifications as appropriate; to provide career transition, succession planning, and leadership advisory services; to communicate with you regarding opportunities, mandates, or our services; and to comply with our legal and regulatory obligations.",
      "We do not use personal data for automated decision-making or profiling in a manner that produces legal or similarly significant effects. All assessments involve human judgement.",
      "We do not sell, rent, or trade personal data to third parties for marketing purposes.",
    ],
  },
  {
    id: "data-sharing",
    num: "05",
    title: "Disclosure and Data Sharing",
    content: [
      "We share personal data only on a strictly need-to-know basis and with appropriate safeguards in place. We may disclose your data to: client organisations for whom we are conducting a specific search mandate, but only with your knowledge and agreement prior to submission; assessment providers and professional advisors engaged in the delivery of a mandate, bound by confidentiality obligations; regulatory authorities, law enforcement bodies, or courts where required by applicable law; and successors or acquirers of our business, in the event of a merger, acquisition, or restructuring.",
      "We do not disclose personal data to clients or third parties without your prior awareness. Where you are a candidate being considered for a position, we will inform you before presenting your details to a client.",
      "Third-party service providers acting as data processors on our behalf are subject to binding contractual obligations to process data only on our instructions and in accordance with applicable data protection law.",
    ],
  },
  {
    id: "retention",
    num: "06",
    title: "Data Retention",
    content: [
      "We retain personal data for as long as is reasonably necessary to fulfil the purposes for which it was collected, and in accordance with our legitimate interests as an executive search firm.",
      "Candidate profiles and professional records are typically retained for a period of seven years from the date of last meaningful engagement, unless you request earlier deletion. This retention period reflects the long-term, relationship-based nature of executive search, where individuals may be considered for multiple mandates over time.",
      "Where data is held solely on the basis of consent, we will delete or anonymise it promptly upon withdrawal of that consent. Where we have a legal obligation to retain records (such as financial records or records relating to completed contracts), we will retain them for the period prescribed by applicable law.",
      "We periodically review our data holdings and remove or anonymise records that are no longer necessary.",
    ],
  },
  {
    id: "your-rights",
    num: "07",
    title: "Your Rights",
    content: [
      "Subject to applicable data protection law, you have the following rights in respect of your personal data held by us:",
      "Right of access: to request a copy of the personal data we hold about you. Right to rectification: to request correction of inaccurate or incomplete data. Right to erasure: to request deletion of your personal data in certain circumstances. Right to restriction: to request that we limit the processing of your data in certain circumstances. Right to object: to object to processing carried out on the basis of our legitimate interests. Right to data portability: to receive your personal data in a structured, commonly used, and machine-readable format. Right to withdraw consent: where processing is based on consent, to withdraw that consent at any time.",
      "To exercise any of these rights, please contact us at privacy@pivotedgegroup.com. We will respond within 30 days. We may ask you to verify your identity before acting on a request. You also have the right to lodge a complaint with the relevant supervisory authority in your jurisdiction.",
    ],
  },
  {
    id: "security",
    num: "08",
    title: "Data Security",
    content: [
      "We take the security of personal data seriously and implement appropriate technical and organisational measures to protect against unauthorised access, disclosure, alteration, or destruction. These measures include access controls and authentication requirements, encryption of data in transit and at rest, regular security reviews and staff training, and confidentiality obligations binding all staff and partners.",
      "Notwithstanding these measures, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security and encourage you to take appropriate steps to protect any personal data you share with us.",
    ],
  },
  {
    id: "changes",
    num: "09",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the services we offer. Material changes will be communicated to individuals with whom we have an active relationship. The current version of this policy is always available on our website.",
      "This policy was last updated in January 2025.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState("introduction");

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: T.cream }}>
      {/* ── HERO ── */}
      <section
        style={{
          background: T.teal,
          padding: "160px 64px 96px",
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
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Effective Date", value: "January 2025" },
              { label: "Jurisdiction", value: "Global" },
              { label: "Last Reviewed", value: "January 2025" },
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
          padding: "80px 64px 120px",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Sticky sidebar */}
        <div style={{ position: "sticky", top: 100 }}>
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
              privacy@pivotedgegroup.com
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
                    gap: 20,
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 32,
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
                      fontSize: "clamp(24px,2.8vw,36px)",
                      fontWeight: 300,
                      color: T.teal,
                      lineHeight: 1.1,
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
                    marginLeft: 52,
                  }}
                />
                <div style={{ paddingLeft: 52 }}>
                  {s.content.map((para, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontSize: 14,
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: T.textMid,
                        marginBottom: pi < s.content.length - 1 ? 18 : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Fade>
          ))}

          {/* Footer note */}
          <Fade>
            <div
              style={{
                padding: "32px 40px",
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
                  fontSize: 18,
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
