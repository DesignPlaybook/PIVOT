import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";
import { Link } from "react-router-dom";

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
    id: "general",
    num: "01",
    title: "General Disclaimer",
    content: [
      "The information contained on this website and in any materials published by PivotEdge Partners is provided for general informational purposes only. While we endeavour to ensure that all content is accurate and current, we make no representations or warranties of any kind, express or implied, as to the completeness, accuracy, reliability, suitability, or availability of the information, services, or related graphics on this website for any purpose.",
      "Nothing on this website constitutes professional legal, financial, tax, investment, regulatory, or employment advice. The content presented is not a substitute for professional advice tailored to your specific circumstances. If you require advice in any of these areas, you should consult a suitably qualified professional.",
      "PivotEdge Partners accepts no liability for any loss or damage, including without limitation indirect or consequential loss, arising from reliance on information contained on this website or in any communications from us.",
    ],
  },
  {
    id: "professional-services",
    num: "02",
    title: "Professional Services",
    content: [
      "Information about our executive search and leadership advisory services on this website is intended to provide an overview of our capabilities and approach. It does not constitute an offer to provide services and does not create any contractual relationship. All professional engagements are subject to a signed engagement letter and our Terms and Conditions.",
      "Case studies, client references, sector expertise descriptions, and stated outcomes presented on this website are illustrative. Past performance in executing search assignments, candidate assessments, or advisory mandates is not indicative of future results. Each assignment involves unique variables including market conditions, candidate availability, organisational circumstances, and leadership requirements.",
      "PivotEdge Partners does not guarantee appointment outcomes, candidate acceptance rates, placement timelines, or post-appointment performance of any individual. Our obligation in any engagement is to conduct a professional, diligent, and research-led process.",
    ],
  },
  {
    id: "insights-content",
    num: "03",
    title: "Insights and Editorial Content",
    content: [
      "Articles, white papers, thought leadership pieces, research reports, and other editorial content published by PivotEdge Partners represent the views and perspectives of our firm and authors at the time of publication. They are intended to stimulate discussion and inform professional thinking on leadership, governance, and talent strategy topics.",
      "Such content is not exhaustive, does not constitute formal research or advisory opinion, and should not be relied upon as the sole basis for any business or talent decision. Views expressed may not reflect the most current legal, regulatory, or market developments.",
      "We reserve the right to update, amend, or remove editorial content without notice. Where articles reference specific data, statistics, or third-party sources, PivotEdge Partners does not warrant the accuracy, completeness, or timeliness of that underlying data.",
    ],
  },
  {
    id: "website-use",
    num: "04",
    title: "Website Use",
    content: [
      "PivotEdge Partners makes reasonable efforts to maintain the availability and functionality of this website. However, we do not warrant that access to the website will be uninterrupted, error-free, or free of viruses or other harmful components. We accept no liability for any disruption to, or unavailability of, the website.",
      "This website may contain links to third-party websites for the convenience of visitors. The inclusion of a link does not constitute an endorsement of the linked website or its content. PivotEdge Partners has no control over third-party websites and is not responsible for the accuracy, legality, or appropriateness of their content.",
      "Unauthorised use of this website may constitute a criminal offence under the Computer Misuse Act 1990 (UK) or equivalent legislation in other jurisdictions. You may not use this website in any manner that is unlawful, harmful, defamatory, or infringing of intellectual property rights.",
    ],
  },
  {
    id: "forward-looking",
    num: "05",
    title: "Forward-Looking Statements",
    content: [
      "Certain statements on this website and in our publications may constitute forward-looking statements, including statements about market trends, leadership dynamics, governance developments, and the future direction of executive search practices. These statements are based on our professional observations and judgements at the time of publication.",
      "Forward-looking statements involve inherent uncertainty and risk. Actual developments may differ materially from those anticipated in any such statements. PivotEdge Partners undertakes no obligation to update or revise any forward-looking statements to reflect subsequent events, changed circumstances, or new information.",
    ],
  },
  {
    id: "candidate-info",
    num: "06",
    title: "Candidate and Client Information",
    content: [
      "Information provided to PivotEdge Partners by candidates, clients, or third parties in the course of an engagement is processed in accordance with our Privacy Policy. We take all reasonable steps to verify the accuracy of information provided to us, but cannot guarantee the completeness or accuracy of information supplied by third parties.",
      "Reference checks, background verifications, and psychometric assessments conducted as part of our process are designed to support informed decision-making. They are advisory in nature and do not constitute definitive determinations of suitability, character, or performance potential.",
      "PivotEdge Partners is not responsible for any employment decisions made by client organisations on the basis of our evaluations, introductions, or recommendations. The ultimate responsibility for all hiring, board appointments, and leadership decisions rests with the client organisation.",
    ],
  },
  {
    id: "jurisdiction",
    num: "07",
    title: "Jurisdiction and Compliance",
    content: [
      "This website is operated from the United Kingdom. Information on this website is directed to professional audiences globally but may not be appropriate for all jurisdictions. If you access this website from outside the United Kingdom, you are responsible for ensuring compliance with applicable local laws.",
      "PivotEdge Partners operates in multiple jurisdictions and endeavours to comply with applicable laws and professional standards in each. Nothing in this disclaimer or on this website constitutes legal advice regarding compliance requirements in any specific jurisdiction.",
      "Where our services are provided internationally, additional jurisdictional terms may apply as set out in the relevant engagement letter. In all cases, PivotEdge Partners upholds the same standards of professional conduct, confidentiality, and integrity regardless of jurisdiction.",
    ],
  },
  {
    id: "changes",
    num: "08",
    title: "Amendments",
    content: [
      "PivotEdge Partners reserves the right to amend this disclaimer at any time without prior notice. The version published on this website at the time of your access shall apply. We encourage visitors to review this disclaimer periodically.",
      "By continuing to use this website following any amendment to this disclaimer, you confirm your acceptance of the revised terms.",
      "This disclaimer was last reviewed and updated in January 2025. For any questions regarding its contents, please contact us at legal@pivotedgegroup.com.",
    ],
  },
];

export default function DisclaimerPage() {
  const [active, setActive] = useState("general");

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
            fontSize: 260,
            fontWeight: 300,
            color: T.white,
            opacity: 0.03,
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          DSC
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
            Disclaimer
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
            Important information regarding the use of this website, our
            published content, professional services, and the limitations of
            information provided by PivotEdge Partners.
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
              { label: "Governing Law", value: "England & Wales" },
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

      {/* ── ALERT BAND ── */}
      <div
        style={{
          background: "#fff9ef",
          borderBottom: `1px solid rgba(184,150,46,0.2)`,
          borderTop: `1px solid rgba(184,150,46,0.2)`,
          padding: "20px 64px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 3,
              minHeight: 36,
              background: T.gold,
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.7,
              color: T.textMid,
              margin: 0,
            }}
          >
            <strong style={{ fontWeight: 500, color: T.teal }}>
              Please read carefully:
            </strong>{" "}
            The information on this website is provided for general
            informational purposes only and does not constitute professional
            legal, financial, or advisory guidance. Nothing herein creates a
            contractual relationship between you and PivotEdge Partners unless
            formalised in a signed engagement letter.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
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

          {/* Related docs */}
          <div style={{ marginTop: 32 }}>
            <div
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 16,
                opacity: 0.8,
              }}
            >
              Related
            </div>
            {[
              { label: "Privacy Policy", page: "Privacy" },
              { label: "Terms & Conditions", page: "Terms" },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(13,61,78,0.08)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: T.teal,
                    letterSpacing: "0.04em",
                  }}
                >
                  → {d.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
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
              Contact
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
              For legal enquiries or questions about this disclaimer.
            </p>
            <div style={{ fontSize: 11, color: T.teal, fontWeight: 400 }}>
              legal@pivotedgegroup.com
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

          {/* Footer trio */}
          <Fade>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 2,
                marginTop: 16,
              }}
            >
              {[
                {
                  icon: "◈",
                  label: "No Legal Advice",
                  text: "Nothing on this website constitutes legal, financial, or professional advice.",
                },
                {
                  icon: "◈",
                  label: "No Guarantees",
                  text: "We cannot guarantee outcomes in any engagement, mandate, or advisory service.",
                },
                {
                  icon: "◈",
                  label: "Subject to Change",
                  text: "This disclaimer may be updated periodically without prior notice.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: T.creamAlt,
                    padding: "28px 24px",
                    borderTop: `2px solid ${T.gold}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 28,
                      color: T.gold,
                      opacity: 0.4,
                      marginBottom: 12,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: T.teal,
                      marginBottom: 8,
                      fontFamily: "'Jost',sans-serif",
                    }}
                  >
                    {item.label}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: T.textMid,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
