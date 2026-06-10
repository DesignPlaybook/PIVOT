import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";
import GlobalPresence from "./GlobalPresence";

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
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeXJvdv1X5wQV5OB_I4pdIhrBr424TlriUjPucIAFWJEmP5aA/formResponse";
const ENTRY = {
  firstName: "entry.1691488305",
  lastName: "entry.469759994",
  company: "entry.1790880522",
  jobTitle: "entry.1970432674",
  email: "entry.918071452",
  phone: "entry.584228645",
  country: "entry.902959798",
  message: "entry.1728949981",
};

/* ── Location Cards ── */
function LocationCard({ city, country, region, timezone, index }) {
  const [ref, vis] = useIO(0.05);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
        borderTop: `1px solid rgba(245,240,232,0.1)`,
        padding: "28px 0",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: T.gold,
            marginTop: 8,
            flexShrink: 0,
            boxShadow: `0 0 8px rgba(184,150,46,0.6)`,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {city}
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(184,150,46,0.7)",
            }}
          >
            {country} · {region}
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "rgba(245,240,232,0.25)",
          textTransform: "uppercase",
          paddingTop: 8,
        }}
      >
        {timezone}
      </div>
    </div>
  );
}

const CMD_CSS = `
  .cmd-label {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #b8962e;
    font-weight: 700;
    display: block;
    margin-bottom: 8px;
  }

  .cmd-input {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #0D3D4E;
    background: transparent;
    border: none;
    border-bottom: 1px solid #0d3d4e59;
    padding: 10px 0;
    outline: none;
    width: 100%;
    transition: border-color 0.3s ease;
    letter-spacing: 0.01em;
  }
  .cmd-input::placeholder { color: rgba(13,61,78,0.25); }
  .cmd-input:focus { border-bottom-color: #B8962E; }
  .cmd-input-err { border-bottom-color: rgba(180,40,40,0.5) !important; }

  .cmd-select {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #0D3D4E;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(13,61,78,0.18);
    padding: 10px 0;
    outline: none;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.3s ease;
    appearance: none;
  }
  .cmd-select:focus { border-bottom-color: #B8962E; }

  .cmd-err {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    color: rgba(180,40,40,0.7);
    letter-spacing: 0.06em;
    margin-top: 4px;
    display: block;
  }

  .cmd-field { display: flex; flex-direction: column; }

  .cmd-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(13,61,78,0.6); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
    animation: cmd-fade-in 0.3s ease;
  }
  @keyframes cmd-fade-in { from{opacity:0} to{opacity:1} }
  .cmd-modal {
    background: var(--cream); max-width: 500px; width: 100%; padding: 52px 48px;
    position: relative; animation: cmd-slide-up 0.4s cubic-bezier(0.16,1,0.3,1);
    border-top: 2px solid var(--gold);
  }
  @keyframes cmd-slide-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .cmd-checkbox {
    width: 16px; height: 16px;
    border: 1px solid rgba(13,61,78,0.3);
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    margin-top: 2px; transition: all 0.2s ease; cursor: pointer;
  }
  .cmd-checkbox.checked { background: var(--teal); border-color: var(--teal); }
  .cmd-checkbox.checked::after {
    content: ''; display: block; width: 8px; height: 5px;
    border-left: 1.5px solid white; border-bottom: 1.5px solid white;
    transform: rotate(-45deg) translateY(-1px);
  }
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "",
    enquiryType: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showConsent, setShowConsent] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim()) e.lastName = "Required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Valid email required";
    if (!formData.phone.match(/^[0-9+\-\s]{7,}$/))
      e.phone = "Valid phone required";
    if (!formData.message.trim()) e.message = "Please include a message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitClick = () => {
    if (validate()) setShowConsent(true);
  };

  const handleConfirm = () => {
    if (!accepted) return;
    const url =
      FORM_ACTION +
      "?" +
      Object.entries(ENTRY)
        .map(([k, v]) => `${v}=${encodeURIComponent(formData[k] || "")}`)
        .join("&");
    fetch(url, { method: "POST", mode: "no-cors" });
    setShowConsent(false);
    setSubmitted(true);
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
      email: "",
      phone: "",
      country: "",
      enquiryType: "",
      message: "",
    });
    setAccepted(false);
  };

  const filledFields = [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phone,
    formData.company,
    formData.message,
  ].filter((v) => v.trim()).length;
  const progress = Math.round((filledFields / 6) * 100);

  return (
    <div style={{ background: T.cream, fontFamily: "'Jost', sans-serif" }}>
      <style>{CMD_CSS}</style>

      {/* ══ FULL-HEIGHT SPLIT OPENING ══ */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}
      >
        {/* LEFT — dark teal, editorial heading */}
        <div
          style={{
            background: T.teal,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "140px 72px 72px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dot texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 2px 2px,rgba(255,255,255,0.03) 1px,transparent 0)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />
          {/* Large decorative number */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: -20,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 320,
              fontWeight: 300,
              lineHeight: 1,
              color: "rgba(184,150,46,0.04)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            01
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <SectionLabel text="Get in Touch" light />
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(52px, 6vw, 84px)",
                fontWeight: 300,
                lineHeight: 1.02,
                color: "#FFFFFF",
                marginTop: 20,
              }}
            >
              Every
              <br />
              Consequential
              <br />
              Decision
              <br />
              Begins With
              <br />a Conversation.
            </h1>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                width: 48,
                height: 1,
                background: T.gold,
                opacity: 0.6,
                marginBottom: 40,
              }}
            />

            {[
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(184,150,46,0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "Email",
                value: "info@pivotedgegroup.com",
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(184,150,46,0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.06 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
                label: "Phone",
                value: "+91 98765 43210",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid rgba(245,240,232,0.1)",
                  padding: "24px 0",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                }}
              >
                <div style={{ marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(184,150,46,0.6)",
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.75)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                borderTop: "1px solid rgba(245,240,232,0.1)",
                paddingTop: 24,
                marginTop: 4,
              }}
            >
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "rgba(245,240,232,0.3)",
                  maxWidth: 320,
                }}
              >
                All enquiries are handled with complete discretion.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — cream, form */}
        <div
          style={{
            background: T.cream,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "140px 72px 72px",
            position: "relative",
          }}
        >
          {/* Gold top border accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(to right, ${T.gold}, transparent)`,
              opacity: 0.4,
            }}
          />

          {submitted ? (
            <Fade>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    border: `1px solid ${T.gold}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="none"
                    stroke={T.gold}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 48,
                    fontWeight: 300,
                    color: T.teal,
                    lineHeight: 1.05,
                  }}
                >
                  Inquiry Received
                </h2>
                <div style={{ width: 48, height: 1, background: T.gold }} />
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: T.textMid,
                    maxWidth: 380,
                  }}
                >
                  A senior partner will be in touch within 24 hours. We
                  appreciate your confidence in PivotEdge Partners.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ alignSelf: "flex-start", marginTop: 8 }}
                  onClick={() => setSubmitted(false)}
                >
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            </Fade>
          ) : (
            <Fade>
              <div style={{ marginBottom: 48 }}>
                <SectionLabel text="Inquiry Form" />
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(32px, 3vw, 44px)",
                    fontWeight: 300,
                    color: T.teal,
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  Begin a Conversation
                </h2>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 40 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T.textMuted,
                    }}
                  >
                    Form Completion
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 15,
                      color: T.gold,
                      transition: "all 0.4s ease",
                    }}
                  >
                    {progress}%
                  </span>
                </div>
                <div style={{ height: 1, background: "rgba(13,61,78,0.1)" }}>
                  <div
                    style={{
                      height: "100%",
                      background: T.gold,
                      width: `${progress}%`,
                      transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
              >
                {/* Name row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 32,
                  }}
                >
                  {[
                    {
                      name: "firstName",
                      label: "First Name",
                      placeholder: "Your first name",
                    },
                    {
                      name: "lastName",
                      label: "Last Name",
                      placeholder: "Your last name",
                    },
                  ].map((f) => (
                    <div key={f.name} className="cmd-field">
                      <label className="cmd-label">{f.label}</label>
                      <input
                        type="text"
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className={`cmd-input${errors[f.name] ? " cmd-input-err" : ""}`}
                      />
                      {errors[f.name] && (
                        <span className="cmd-err">{errors[f.name]}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Org + Role */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 32,
                  }}
                >
                  {[
                    {
                      name: "company",
                      label: "Organisation",
                      placeholder: "Your organisation",
                    },
                    {
                      name: "jobTitle",
                      label: "Your Title",
                      placeholder: "Current role",
                    },
                  ].map((f) => (
                    <div key={f.name} className="cmd-field">
                      <label className="cmd-label">{f.label}</label>
                      <input
                        type="text"
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="cmd-input"
                      />
                    </div>
                  ))}
                </div>

                {/* Email + Phone */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 32,
                  }}
                >
                  {[
                    {
                      name: "email",
                      label: "Email Address",
                      placeholder: "you@organisation.com",
                      type: "email",
                    },
                    {
                      name: "phone",
                      label: "Phone Number",
                      placeholder: "+91 / +971 …",
                      type: "text",
                    },
                  ].map((f) => (
                    <div key={f.name} className="cmd-field">
                      <label className="cmd-label">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className={`cmd-input${errors[f.name] ? " cmd-input-err" : ""}`}
                      />
                      {errors[f.name] && (
                        <span className="cmd-err">{errors[f.name]}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Country + Enquiry */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 32,
                  }}
                >
                  <div className="cmd-field">
                    <label className="cmd-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className="cmd-input"
                    />
                  </div>
                  <div className="cmd-field">
                    <label className="cmd-label">Nature of Enquiry</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className="cmd-select"
                      >
                        <option value="">Select…</option>
                        <option>Executive Search</option>
                        <option>Board &amp; Governance</option>
                        <option>Succession Planning</option>
                        <option>Interim Management</option>
                        <option>Career Transition</option>
                        <option>General Enquiry</option>
                      </select>
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke={T.gold}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="cmd-field">
                  <label
                    className="cmd-label"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>How Can We Help</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your mandate, requirement, or how we can assist…"
                    className={`cmd-input${errors.message ? " cmd-input-err" : ""}`}
                    style={{ resize: "none", lineHeight: 1.7 }}
                  />
                  {errors.message && (
                    <span className="cmd-err">{errors.message}</span>
                  )}
                </div>

                {/* Submit */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(13,61,78,0.08)",
                  }}
                >
                  <button
                    className="btn btn-teal"
                    style={{ padding: "15px 48px", fontSize: 11 }}
                    onClick={handleSubmitClick}
                  >
                    <span>Submit Inquiry</span>
                  </button>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Jost',sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: T.textMuted,
                        marginBottom: 3,
                      }}
                    >
                      Complete discretion guaranteed
                    </p>
                    <p
                      style={{
                        fontFamily: "'Jost',sans-serif",
                        fontSize: 10,
                        color: "rgba(13,61,78,0.3)",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </Fade>
          )}
        </div>
      </section>

      {/* ══ CLOSING CONVICTION BAND ══ */}
      <section
        style={{
          background: T.creamAlt,
          borderTop: "1px solid rgba(13,61,78,0.08)",
          padding: "56px 72px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 64,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontStyle: "italic",
              fontWeight: 300,
              color: T.teal,
              lineHeight: 1.55,
              maxWidth: 560,
            }}
          >
            "We operate with integrity, confidentiality, and professional
            discipline — across every engagement, without exception."
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexShrink: 0,
            }}
          >
            <div
              style={{ width: 40, height: 1, background: T.gold, opacity: 0.5 }}
            />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: T.gold,
              }}
            >
              PivotEdge Partners
            </span>
          </div>
        </div>
      </section>

      {/* MAP */}
      <GlobalPresence />

      {/* ══ CONSENT MODAL ══ */}
      {showConsent && (
        <div
          className="cmd-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConsent(false);
          }}
        >
          <div className="cmd-modal">
            <button
              onClick={() => setShowConsent(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: T.textMuted,
                fontSize: 22,
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <SectionLabel text="Data Notice" />
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 32,
                fontWeight: 300,
                color: T.teal,
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Confidentiality &<br />
              Data Consent
            </h3>
            <div
              style={{
                width: 40,
                height: 1,
                background: T.gold,
                marginBottom: 24,
              }}
            />
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.85,
                color: T.textMid,
                marginBottom: 24,
              }}
            >
              By submitting this inquiry, you consent to your information being
              processed securely by PivotEdge Partners in accordance with our
              Privacy Policy. Your data will never be shared with third parties
              without your explicit consent.
            </p>
            <div
              style={{
                background: "rgba(13,61,78,0.03)",
                border: "1px solid rgba(13,61,78,0.08)",
                padding: "16px 20px",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: T.textMid,
                }}
              >
                All communications are handled with strict confidentiality. We
                will only contact you in relation to your submitted inquiry.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 28,
                cursor: "pointer",
              }}
              onClick={() => setAccepted(!accepted)}
            >
              <div className={`cmd-checkbox${accepted ? " checked" : ""}`} />
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: T.textMid,
                  lineHeight: 1.7,
                  cursor: "pointer",
                }}
              >
                I agree to the{" "}
                <span
                  style={{
                    color: T.gold,
                    borderBottom: `1px solid rgba(184,150,46,0.4)`,
                  }}
                >
                  Privacy Policy
                </span>{" "}
                and consent to PivotEdge Partners processing my information.
              </p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button
                onClick={handleConfirm}
                disabled={!accepted}
                className="btn btn-teal"
                style={{
                  opacity: accepted ? 1 : 0.35,
                  cursor: accepted ? "pointer" : "not-allowed",
                  padding: "14px 36px",
                }}
              >
                <span>Accept &amp; Submit</span>
              </button>
              <button
                onClick={() => setShowConsent(false)}
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.textMuted,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
