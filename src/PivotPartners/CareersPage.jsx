import React, { useState } from "react";
import { SectionLabel } from "./utils"; // Assuming your utils folder
import { T } from "./tokens"; // Assuming your design tokens
import { useRef, useEffect } from "react";
import careersHero from "../assets/images/careershero.jpeg";

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
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Job openings data ───
   Update this array whenever your sheet changes — Posting ID
   should match the "Posting ID" column so applicants reference
   the right role. */
const JOB_OPENINGS = [
  {
    postingId: "CM-001",
    category: "Client Mandate",
    title: "VP / SBU Head - Sales & Marketing",
    sector: "Pharmaceuticals",
    status: "Open",
  },
  {
    postingId: "PE-001",
    category: "Careers at PivotEdge",
    title: "Associate Consultant - Executive Search",
    sector: "N/A",
    status: "Open",
  },
];

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
  .job-card {
    background: #fff;
    border: 1px solid rgba(13,61,78,0.08);
    padding: 32px;
    transition: all 0.3s ease;
  }
  .job-card:hover {
    border-color: #B8962E;
    box-shadow: 0 8px 24px rgba(13,61,78,0.06);
  }
  .job-apply-btn {
    background: none;
    border: none;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #B8962E;
    cursor: pointer;
    padding: 0;
    border-bottom: 1px solid #B8962E;
    padding-bottom: 2px;
  }
  .job-apply-btn:hover {
    color: #0D3D4E;
    border-color: #0D3D4E;
  }
`;

export default function CareersPage({ setPage }) {
  // ── Resume submission state ──
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [postingId, setPostingId] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const fileInputRef = useRef(null);
  const submitCardRef = useRef(null);

  const FORMINIT_ENDPOINT = "https://forminit.com/f/ulxmb700xwr";

  const handleApplyClick = (jobPostingId) => {
    setPostingId(jobPostingId);
    submitCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSubmitProfile = async () => {
    if (!fullName || !email || !resumeFile) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const formData = new FormData();
    formData.append("fi-sender-fullName", fullName);
    formData.append("fi-sender-email", email);
    formData.append("fi-file-resume", resumeFile);
    if (postingId) {
      formData.append("fi-text-postingId", postingId);
    }

    try {
      const res = await fetch(FORMINIT_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setFullName("");
        setEmail("");
        setPostingId("");
        setResumeFile(null);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

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
          src={careersHero}
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
                Careers
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

      {/* ── 2. CURRENT OPENINGS ── */}
      <section
        style={{ padding: "120px 64px 0", maxWidth: 1200, margin: "0 auto" }}
      >
        <Fade>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <SectionLabel text="Current Openings" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "38px",
                fontWeight: 300,
                color: "#0D3D4E",
                marginTop: "16px",
              }}
            >
              Roles We're Actively Hiring For
            </h2>
          </div>
        </Fade>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px",
          }}
        >
          {JOB_OPENINGS.map((job, i) => (
            <Fade key={job.postingId} delay={i * 100}>
              <div
                className="job-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div style={{ flex: "1 1 320px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#B8962E",
                        border: "1px solid rgba(184,150,46,0.4)",
                        padding: "4px 10px",
                      }}
                    >
                      {job.postingId}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#7A8694",
                      }}
                    >
                      {job.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#3E9B5C",
                      }}
                    >
                      ● {job.status}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "24px",
                      fontWeight: 400,
                      color: "#0D3D4E",
                      marginBottom: "6px",
                    }}
                  >
                    {job.title}
                  </h3>
                  {job.sector !== "N/A" && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#7A8694",
                        margin: 0,
                      }}
                    >
                      {job.sector}
                    </p>
                  )}
                </div>

                <button
                  className="job-apply-btn"
                  onClick={() => handleApplyClick(job.postingId)}
                >
                  Apply Now →
                </button>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ── 3. FOR LEADERSHIP PROFESSIONALS (CANDIDATES) ── */}
      <section
        className="submit-profile-section"
        style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}
      >
        <style>{`
          @media (max-width: 768px) {
            .submit-profile-section {
              padding: 72px 24px !important;
            }
            .submit-profile-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
            .submit-profile-card {
              padding: 36px 28px !important;
            }
          }
        `}</style>

        <div
          className="submit-profile-grid"
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
              Many of the leadership assignments we undertake are conducted on
              a strictly confidential basis. As a result, some of the most
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
              ref={submitCardRef}
              className="submit-profile-card"
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
                  color: "#010203",
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
                All profiles are handled with the highest degree of
                professional discretion.
              </p>

              {/* Name field */}
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  marginBottom: "12px",
                  border: "1px solid rgba(13,61,78,0.15)",
                  background: "#fff",
                  fontSize: "14px",
                  fontFamily: "'Jost', sans-serif",
                  boxSizing: "border-box",
                }}
              />

              {/* Email field */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  marginBottom: "12px",
                  border: "1px solid rgba(13,61,78,0.15)",
                  background: "#fff",
                  fontSize: "14px",
                  fontFamily: "'Jost', sans-serif",
                  boxSizing: "border-box",
                }}
              />

              {/* Posting ID field — optional, pre-filled by "Apply Now" */}
              <input
                type="text"
                placeholder="Posting ID (optional — e.g. CM-001)"
                value={postingId}
                onChange={(e) => setPostingId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  marginBottom: "24px",
                  border: postingId
                    ? "1px solid #B8962E"
                    : "1px solid rgba(13,61,78,0.15)",
                  background: "#fff",
                  fontSize: "14px",
                  fontFamily: "'Jost', sans-serif",
                  boxSizing: "border-box",
                }}
              />

              {/* Hidden native file input, triggered by the styled upload-zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={(e) => setResumeFile(e.target.files[0] || null)}
              />

              <div
                className="upload-zone"
                onClick={() => fileInputRef.current?.click()}
              >
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
                  {resumeFile ? resumeFile.name : "Drop Resume / CV here"}
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
                onClick={handleSubmitProfile}
                disabled={status === "submitting"}
              >
                <span>
                  {status === "submitting"
                    ? "Submitting..."
                    : "Connect with a Consultant"}
                </span>
              </button>

              {status === "success" && (
                <p
                  style={{
                    color: "#0D3D4E",
                    fontSize: "13px",
                    marginTop: "16px",
                  }}
                >
                  Thank you — your profile has been received.
                </p>
              )}
              {status === "error" && (
                <p
                  style={{
                    color: "#B8962E",
                    fontSize: "13px",
                    marginTop: "16px",
                  }}
                >
                  Please fill in your name, email, and attach a resume.
                </p>
              )}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 4. JOIN THE TEAM (INTERNAL) ── */}
      <section style={{ background: "#0D3D4E", padding: "120px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <SectionLabel text="Join the PivotEdge Team" light />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "42px",
                fontWeight: 300,
                color: "#dad4d4",
                marginBottom: "24px",
              }}
            >
              Collaborate with Purpose
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
              We are always interested in connecting with individuals who
              share our passion for leadership, market intelligence, and
              advisory excellence.
            </p>
          </Fade>

          <div
            className="career-roles-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2px",
              background: "rgba(245,240,232,0.1)",
            }}
          >
            <style>{`
              @media (max-width: 1024px) and (min-width: 769px) {
                .career-roles-grid {
                  grid-template-columns: 1fr 1fr !important;
                }
              }
              @media (max-width: 768px) {
                .career-roles-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

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

      {/* ── 5. CONFIDENTIALITY COMMITMENT ── */}
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
              strict confidentiality. We never share candidate information
              with clients or third parties without prior explicit discussion
              and consent.
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
    </div>
  );
}