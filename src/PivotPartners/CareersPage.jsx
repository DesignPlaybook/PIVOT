import React, { useState } from "react";
import { SectionLabel } from "./utils"; // Assuming your utils folder
import { T } from "./tokens"; // Assuming your design tokens
import { useRef, useEffect } from "react";

/* ─── Shared Intersection Observer (from your Domains ref) ─── */
function useIO(threshold = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
        transform: vis ? "translateY(28px)" : "translateY(0)", // Simple toggle for example
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const CAREERS_CSS = `
  .upload-zone {
    border: 1px dashed rgba(13,61,78,0.2);
    padding: 40px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background: rgba(245,240,232,0.5);
  }
  .upload-zone:hover {
    border-color: #B8962E;
    background: #EDE8DE;
  }
  .role-tag {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 10px 16px;
    border: 1px solid rgba(13,61,78,0.1);
    color: #0D3D4E;
    display: inline-block;
    margin: 4px;
    transition: all 0.3s ease;
  }
  .role-tag:hover {
    border-color: #B8962E;
    color: #B8962E;
  }
`;

export default function CareersPage({ setPage }) {
  return (
    <div style={{ background: "#F5F0E8" }}>
      <style>{CAREERS_CSS}</style>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85"
          alt="Office"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,61,78,0.97) 0%, rgba(13,61,78,0.65) 40%, rgba(13,61,78,0.2) 100%)",
          }}
        />

        {/* Side gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13,61,78,0.55) 0%, transparent 55%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            padding: "260px 64px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              textAlign: "center",
            }}
          >
            <Fade>
              <SectionLabel text="Careers & Opportunities" light />

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(60px,7.5vw,100px)",
                  fontWeight: 300,
                  lineHeight: 0.98,
                  color: "#FFFFFF",
                  margin: "16px 0 24px",
                  maxWidth: "900px",
                }}
              >
                Exceptional
                <br />
                Careers.
              </h1>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.04em",
                  maxWidth: "620px",
                  lineHeight: 1.8,
                }}
              >
                Whether you are an accomplished leader exploring your next
                chapter or a professional seeking to join our advisory team, we
                welcome the conversation.
              </p>
            </Fade>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 1,
              height: 56,
              background:
                "linear-gradient(to bottom, rgba(184,150,46,0.9), transparent)",
            }}
          />

          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── 2. FOR LEADERSHIP PROFESSIONALS (CANDIDATES) ── */}
      <section
        style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "100px",
          }}
        >
          <Fade>
            <SectionLabel text="For Leadership Professionals" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "38px",
                fontWeight: 300,
                color: "#0D3D4E",
                marginBottom: "32px",
              }}
            >
              Your Next Opportunity May Not Yet Be Advertised.
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#4A5568",
                marginBottom: "24px",
              }}
            >
              Many of the leadership assignments we undertake are conducted on a
              strictly confidential basis. As a result, some of the most
              compelling opportunities never appear on public job boards.
            </p>
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#4A5568",
                marginBottom: "32px",
              }}
            >
              We maintain ongoing relationships with senior executives across
              sectors. By sharing your profile, you become part of a trusted
              network we engage when relevant mandates arise.
            </p>

            <div style={{ marginTop: "40px" }}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B8962E",
                  marginBottom: "16px",
                }}
              >
                Typical Leadership Mandates
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginLeft: "-4px",
                }}
              >
                {[
                  "Board Directors",
                  "Chief Executive Officers",
                  "Chief Financial Officers",
                  "Chief Human Resources Officers",
                  "Business Unit Heads",
                  "AI & Digital Leaders",
                ].map((role) => (
                  <span key={role} className="role-tag">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={200}>
            <div
              style={{
                background: "#EDE8DE",
                padding: "60px",
                border: "1px solid rgba(13,61,78,0.05)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "24px",
                  color: "#0D3D4E",
                  marginBottom: "12px",
                }}
              >
                Submit Your Profile
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#7A8694",
                  marginBottom: "32px",
                }}
              >
                All profiles are handled with the highest degree of professional
                discretion.
              </p>

              <div className="upload-zone">
                <div
                  style={{
                    color: "#B8962E",
                    fontSize: "32px",
                    marginBottom: "12px",
                  }}
                >
                  ↑
                </div>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#0D3D4E",
                  }}
                >
                  Drop Resume / CV here
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#7A8694",
                    marginTop: "8px",
                  }}
                >
                  PDF or Word (Max 5MB)
                </p>
              </div>

              <button
                className="btn btn-teal"
                style={{ width: "100%", marginTop: "24px" }}
              >
                <span>Connect with a Consultant</span>
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 3. JOIN THE TEAM (INTERNAL) ── */}
      <section style={{ background: "#0D3D4E", padding: "120px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <SectionLabel text="Join the PivotEdge Team" light />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "42px",
                fontWeight: 300,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Collaborate with Purpose.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(245,240,232,0.6)",
                maxWidth: "700px",
                margin: "0 auto 60px",
                lineHeight: "1.8",
              }}
            >
              We are always interested in connecting with individuals who share
              our passion for leadership, market intelligence, and advisory
              excellence.
            </p>
          </Fade>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2px",
              background: "rgba(245,240,232,0.1)",
            }}
          >
            {[
              {
                title: "Executive Search",
                desc: "Consultative roles focusing on client mandates and candidate evaluation.",
              },
              {
                title: "Research & Intelligence",
                desc: "Data-driven roles mapping markets and identifying leadership trends.",
              },
              {
                title: "Operations",
                desc: "Crucial roles ensuring process precision and client service excellence.",
              },
            ].map((item, i) => (
              <Fade key={i} delay={i * 100}>
                <div
                  style={{
                    background: "#0D3D4E",
                    padding: "48px 32px",
                    height: "100%",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "22px",
                      color: "#B8962E",
                      marginBottom: "16px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "rgba(245,240,232,0.5)",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={400}>
            <div style={{ marginTop: "64px" }}>
              <button className="btn btn-outline-light">
                <span>View Internal Openings</span>
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 4. CONFIDENTIALITY COMMITMENT ── */}
      <section style={{ padding: "100px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#B8962E",
                margin: "0 auto 32px",
              }}
            />
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "28px",
                fontStyle: "italic",
                color: "#0D3D4E",
                marginBottom: "24px",
              }}
            >
              "Trust is fundamental to our profession."
            </h3>
            <p
              style={{ fontSize: "14px", lineHeight: "1.8", color: "#7A8694" }}
            >
              All information shared with PivotEdge Partners is treated with
              strict confidentiality. We never share candidate information with
              clients or third parties without prior explicit discussion and
              consent.
            </p>
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                justifyContent: "center",
                gap: "40px",
              }}
            >
              <a
                href="mailto:careers@pivotedgegroup.com"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px",
                  color: "#0D3D4E",
                  textDecoration: "none",
                  borderBottom: "1px solid #B8962E",
                  paddingBottom: "4px",
                }}
              >
                careers@pivotedgegroup.com
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* <input
        type="file"
        accept=".pdf"
        onChange={async (e) => {
          const file = e.target.files[0];

          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "Resumes");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/douvv01ya/auto/upload",
            {
              method: "POST",
              body: formData,
            },
          );

          const data = await response.json();

          console.log(data);
          alert(data.secure_url);
        }}
      /> */}
    </div>
  );
}
