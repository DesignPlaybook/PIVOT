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
    id: "agreement",
    num: "01",
    title: "Agreement to Terms",
    content: [
      "These Terms and Conditions ('Terms') govern the relationship between PivotEdge Partners ('we', 'us', or 'our') and our clients, candidates, and users of our website ('you'). By engaging our services, signing an engagement letter, or accessing our website, you agree to be bound by these Terms.",
      "PivotEdge Partners is an executive search and leadership advisory firm. Our services are provided on a professional, retained basis and are subject to the specific terms agreed in each engagement letter or service agreement. In the event of any conflict between these general Terms and an individual engagement letter, the engagement letter shall prevail.",
      "These Terms are governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales unless otherwise agreed in writing.",
    ],
  },
  {
    id: "services",
    num: "02",
    title: "Scope of Services",
    content: [
      "PivotEdge Partners provides executive search, board advisory, succession planning, interim management placement, and career transition services. The precise scope of services in any given engagement shall be defined in the relevant engagement letter or statement of work agreed between the parties.",
      "Our services are conducted on a retained basis. Engagement commences upon receipt of a signed engagement letter and applicable retainer payment. We commit the resources of our practice to each mandate on an exclusive basis and expect reciprocal commitment from our clients.",
      "We reserve the right to decline or withdraw from any engagement at our professional discretion, including where an instruction would create a conflict of interest, breach applicable professional standards, or require conduct inconsistent with our ethical obligations. In such cases, we will provide written notice and refund any unearned retainer on a pro-rata basis.",
      "Our obligation under a search assignment is to conduct a thorough, research-led process and to present a shortlist of evaluated candidates. We do not guarantee appointment, acceptance, or tenure of any candidate placed through our process.",
    ],
  },
  {
    id: "fees",
    num: "03",
    title: "Fees and Payment",
    content: [
      "Our fees are as set out in the relevant engagement letter. The standard fee structure for retained executive search is based on a percentage of the first year's total compensation (base salary plus target bonus) of the appointed candidate, payable in three equal instalments: one-third on commencement of the assignment, one-third at shortlist presentation, and one-third on acceptance of an offer.",
      "Expenses reasonably incurred in the delivery of the assignment — including candidate travel, psychometric assessments, background verification fees, and any agreed international market mapping costs — will be invoiced separately with supporting documentation.",
      "Payment is due within 30 days of invoice date. Late payment may attract interest at the rate of 4% per annum above the prevailing Bank of England base rate, calculated from the due date until the date of actual payment.",
      "Where a candidate placed by PivotEdge Partners leaves the client organisation within six months of their start date for reasons other than redundancy, we will conduct one replacement search at no additional professional fee, subject to reimbursement of reasonable out-of-pocket expenses. This guarantee applies to the same role and is conditional on the client having met all payment obligations.",
    ],
  },
  {
    id: "confidentiality",
    num: "04",
    title: "Confidentiality",
    content: [
      "Each party agrees to treat as strictly confidential all non-public information received from the other party in the course of an engagement ('Confidential Information'). Confidential Information includes, without limitation, business strategies, organisational matters, candidate identities and profiles, compensation structures, succession plans, and evaluation reports.",
      "We will not disclose any Confidential Information to third parties except: to members of our own team who need such information to perform the services; to professional advisors bound by equivalent confidentiality obligations; or as required by applicable law, regulatory authority, or court order, in which case we will provide advance notice where legally permissible.",
      "The confidentiality obligations set out in this clause shall survive the termination of any engagement for a period of three years. For candidate personal data, our data retention and confidentiality obligations are governed by our Privacy Policy.",
      "Client organisations agree not to approach, engage, or employ any member of the PivotEdge Partners team for a period of 24 months from the conclusion of any engagement without our prior written consent.",
    ],
  },
  {
    id: "ip",
    num: "05",
    title: "Intellectual Property",
    content: [
      "All methodologies, assessment frameworks, evaluation tools, reports, profiles, and other materials developed or produced by PivotEdge Partners in the course of an engagement remain the intellectual property of PivotEdge Partners. Client organisations are granted a limited, non-transferable licence to use such materials for internal purposes in connection with the relevant engagement.",
      "Client organisations may not reproduce, distribute, or share assessment reports, candidate profiles, or evaluation summaries beyond those individuals within the client organisation with a legitimate need to review them in connection with the appointment decision.",
      "The PivotEdge Partners name, logo, and associated branding are the registered intellectual property of PivotEdge Partners. Nothing in these Terms grants any licence to use our brand, trade marks, or other intellectual property.",
    ],
  },
  {
    id: "off-limits",
    num: "06",
    title: "Off-Limits Obligations",
    content: [
      "PivotEdge Partners maintains an off-limits policy to preserve the integrity of our client relationships. Individuals employed by, or recently placed with, a client organisation are not eligible for consideration in a search being conducted for a different client, without the prior written consent of the employing client.",
      "The standard off-limits period is 24 months from the conclusion of an engagement with the relevant client. Where an engagement letter specifies a different period, the engagement letter shall govern.",
      "This off-limits obligation is a core professional standard and is not negotiable. It applies equally to the transfer of candidates between different divisions or subsidiaries of the same client group.",
      "Clients acknowledge and accept that these off-limits obligations may limit the pool of candidates available for consideration on any given assignment.",
    ],
  },
  {
    id: "liability",
    num: "07",
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, PivotEdge Partners' total aggregate liability to a client in respect of any and all claims arising out of or in connection with an engagement, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the total professional fees paid by the client in respect of that specific engagement.",
      "PivotEdge Partners shall not be liable for any indirect, consequential, special, incidental, or punitive loss or damage, including without limitation loss of profit, loss of revenue, loss of business, or reputational damage, howsoever caused and regardless of whether we were advised of the possibility of such losses.",
      "Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by applicable law.",
      "We do not warrant that any candidate presented to a client will accept an offer of employment, will perform to expectations, or will remain in the role for any particular period. Our obligation is to conduct a diligent and professional search process.",
    ],
  },
  {
    id: "termination",
    num: "08",
    title: "Termination",
    content: [
      "Either party may terminate an engagement by giving 30 days' written notice. In the event of termination by the client, PivotEdge Partners shall be entitled to retain all fees paid to date and to invoice for a pro-rata proportion of the remaining instalment that reflects work completed to the date of termination.",
      "PivotEdge Partners may terminate an engagement immediately and without liability upon written notice if the client materially breaches these Terms or an engagement letter and fails to remedy such breach within 14 days of written notice; if the client becomes insolvent or subject to any insolvency proceedings; or if continuing the engagement would require us to act in breach of applicable law or professional standards.",
      "Termination shall not affect any rights or obligations that have accrued prior to the date of termination, including payment obligations, confidentiality obligations, and intellectual property rights.",
    ],
  },
  {
    id: "general",
    num: "09",
    title: "General Provisions",
    content: [
      "These Terms, together with any applicable engagement letter, constitute the entire agreement between the parties and supersede all prior representations, agreements, and understandings relating to the subject matter hereof.",
      "No waiver of any right or remedy under these Terms shall be effective unless in writing. A failure to exercise or delay in exercising any right shall not constitute a waiver of that right.",
      "If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.",
      "Neither party may assign its rights or obligations under these Terms without the prior written consent of the other party, except that PivotEdge Partners may assign its rights and obligations to a successor entity in connection with a reorganisation, merger, or acquisition of our business.",
      "These Terms may be updated periodically. The version in force at the time of an engagement shall govern that engagement. Material updates will be communicated to active clients.",
    ],
  },
];

export default function TermsPage() {
  const [active, setActive] = useState("agreement");

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
          T&C
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
            Terms &amp;
            <br />
            Conditions
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
            The terms governing our engagement with clients, candidates, and all
            parties who interact with PivotEdge Partners and its services.
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

      {/* ── NOTICE BAND ── */}
      <div
        style={{
          background: T.creamAlt,
          borderBottom: `1px solid rgba(13,61,78,0.1)`,
          padding: "20px 64px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{ width: 3, height: 36, background: T.gold, flexShrink: 0 }}
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
              Important:
            </strong>{" "}
            These Terms are supplemented by individual engagement letters. By
            engaging our services, you confirm that you have read, understood,
            and agree to be bound by these Terms. If you have questions, please
            contact us before proceeding.
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
              Enquiries
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
              For questions about our terms or engagement structures, contact us
              directly.
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
                borderTop: `1px solid rgba(13,61,78,0.1)`,
                paddingTop: 40,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 40,
                }}
              >
                <div
                  style={{
                    padding: "28px 32px",
                    background: T.creamAlt,
                    borderTop: `3px solid ${T.gold}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T.gold,
                      marginBottom: 12,
                      fontFamily: "'Jost',sans-serif",
                    }}
                  >
                    Governing Law
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: T.textMid,
                      margin: 0,
                    }}
                  >
                    These Terms are governed by the laws of England and Wales.
                    Disputes shall be subject to the exclusive jurisdiction of
                    the courts of England and Wales.
                  </p>
                </div>
                <div style={{ padding: "28px 32px", background: T.teal }}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T.gold,
                      marginBottom: 12,
                      fontFamily: "'Jost',sans-serif",
                    }}
                  >
                    Contact
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(245,240,232,0.65)",
                      margin: 0,
                    }}
                  >
                    For all legal enquiries, please direct correspondence to:{" "}
                    <span style={{ color: T.gold }}>
                      legal@pivotedgegroup.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
