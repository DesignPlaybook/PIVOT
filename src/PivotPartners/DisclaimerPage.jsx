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
    id: "acceptance",
    num: "01",
    title: "Acceptance of Terms",
    content: [
      'This page states the Terms and Conditions under which you may use PIVOTEDGEGROUP.COM ("Web Site", "PivotEdge Partners Web Site" or "PivotEdge Site"). Please read this page carefully. If you do not accept the Terms and Conditions stated here, do not use this Web Site and service. By using this Web Site, you are indicating your acceptance to be bound by the terms of these Terms and Conditions.',
      'PivotEdge Partners ("PivotEdge" and "the Company") may revise these Terms and Conditions at any time by updating this posting. You should visit this page periodically to review the Terms and Conditions, as they are binding on you.',
      'The terms "You" and "User" as used herein refer to all individuals and/or entities accessing this Web Site for any reason.',
    ],
  },
  {
    id: "web-site-content",
    num: "02",
    title: "Use of Web Site Content",
    content: [
      "The Company authorises You to view and access a single copy of the content available on or from the PivotEdge Partners Web Site solely for your personal, non-commercial use.",
      'The contents of this Web Site, and of all other websites under the Company\'s control, such as text, graphics, images, logos, button icons, software and other Web Site content (collectively, "Web Site Content"), are protected under Indian and foreign copyright, trademark and other laws. All Web Site Content is the property of the Company or its content suppliers or clients. The compilation (meaning the collection, arrangement and assembly) of all content on this Web Site is the exclusive property of the Company and is protected by Indian and international copyright laws.',
      "Unauthorised use of the Web Site Content may violate copyright, trademark and other laws. You may not sell or modify the Web Site Content or reproduce, display, publicly perform, distribute, or otherwise use the Web Site Content in any way for any public or commercial purpose. The use of the Web Site Content on any other website or in a networked computer environment for any purpose is prohibited.",
    ],
  },
  {
    id: "security-rules",
    num: "03",
    title: "PivotEdge Partners Web Site Security Rules",
    content: [
      'Users are prohibited from violating or attempting to violate the security of the PivotEdge Partners Site, including, without limitation: (a) accessing data not intended for such user or logging into a server or account which the user is not authorised to access; (b) attempting to probe, scan or test the vulnerability of a system or network, or to breach security or authentication measures, without proper authorisation; (c) attempting to interfere with service to any user, host or network, including, without limitation, via submitting a virus to any PivotEdge Partners Site, or by overloading, "flooding", "spamming", "mailbombing" or "crashing" it; or (d) forging any TCP/IP packet header or any part of the header information in any e-mail or newsgroup posting.',
      "Violations of system or network security may result in civil or criminal liability. The Company will investigate occurrences which may involve such violations and may involve, and cooperate with, law enforcement authorities in prosecuting users who are involved in such violations.",
    ],
  },
  {
    id: "prohibited-uses",
    num: "04",
    title: "Specific Prohibited Uses",
    content: [
      "The PivotEdge Partners Web Site may be used only for lawful purposes by individuals and organisations seeking executive search, leadership advisory, and related career and talent information. The Company specifically prohibits any use of the Web Site, and all users agree not to use the Web Site, for any of the following:",
    ],
    list: [
      "Posting any incomplete, false or inaccurate biographical information, or information which is not your own accurate curriculum vitae (in the case of a living individual seeking employment or advisory engagement on his or her own behalf).",
      "Deleting or revising any material posted by any other person or entity.",
      "Using any device, software or routine to interfere, or attempt to interfere, with the proper working of the PivotEdge Partners Site or any activity conducted on this site.",
      "Aggregating, copying or duplicating in any manner any of the Web Site Content or information available from any PivotEdge Partners Site.",
      "Framing of, or linking to, any of the Web Site Content or information available from the PivotEdge Partners Site without the Company's prior written consent.",
    ],
  },
  {
    id: "contact",
    num: "05",
    title: "Contact Us",
    content: [
      "If you have questions about these Terms and Conditions, please contact us at:",
    ],
    list: [
      "PivotEdge Partners",
      "Website: pivotedgegroup.com",
      "Email: info@pivotedgegroup.com",
    ],
  },
];

export default function TermsPage() {
  const [active, setActive] = useState("acceptance");
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
              fontSize: 260,
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
            Terms & Conditions
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
            The terms under which you may access and use this website and the
            services provided by PivotEdge Partners.
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
              { label: "Website", value: "pivotedgegroup.com" },
              { label: "Contact", value: "info@pivotedgegroup.com" },
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
          padding: isMobile ? "16px 20px" : "20px 64px",
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
            By using this website, you are indicating your acceptance to be
            bound by the terms of these Terms and Conditions. PivotEdge Partners
            may revise these Terms and Conditions at any time by updating this
            posting.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
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

          {/* Related docs */}
          {/* <div style={{ marginTop: 32 }}>
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
            {[{ label: "Privacy Policy", page: "Privacy" }].map((d) => (
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
          </div> */}

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
              For questions about these Terms and Conditions.
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
                  {s.content.map((para, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontSize: 14,
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: T.textMid,
                        marginBottom:
                          pi < s.content.length - 1 || s.list ? 18 : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                  {s.list && (
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
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
                </div>
              </div>
            </Fade>
          ))}

          {/* Footer trio */}
          {/* <Fade>
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
                  label: "Personal Use Only",
                  text: "Web Site Content is licensed for personal, non-commercial use only.",
                },
                {
                  icon: "◈",
                  label: "No Security Breaches",
                  text: "Attempting to compromise the security of this site may result in civil or criminal liability.",
                },
                {
                  icon: "◈",
                  label: "Subject to Change",
                  text: "These Terms and Conditions may be updated periodically without prior notice.",
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
          </Fade> */}
        </div>
      </section>
    </div>
  );
}
