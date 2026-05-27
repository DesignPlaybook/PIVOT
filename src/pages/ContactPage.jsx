import { useState } from "react";
import { Link } from "react-router-dom";

import MailIcon from "../assets/icons/MailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import ShieldIcon from "../assets/icons/ShieldIcon";
export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.company.trim()) e.company = "Company is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email address is required.";
    if (!form.message.trim())
      e.message = "Please share your enquiry or requirement.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setShowModal(true);
  };

  const handleAccept = () => {
    if (!consent) return;
    setShowModal(false);
    setSubmitted(true);
    setForm({
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    });
    setConsent(false);
  };

  const field = (name, label, type = "text", required = false) => (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && " *"}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`form-input ${errors[name] ? "error" : ""}`}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          rows={4}
          style={{ resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          className={`form-input ${errors[name] ? "error" : ""}`}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        />
      )}
      {errors[name] && <span className="form-error">{errors[name]}</span>}
    </div>
  );

  return (
    <>
      <div style={{ paddingTop: "76px" }}>
        <div className="contact-split">
          {/* Left panel */}
          <div className="contact-left">
            <div className="contact-left-geo" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  marginBottom: "2rem",
                }}
              >
                PivotEdge Partners
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "var(--color-white)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                }}
              >
                Every great partnership begins with a single conversation.
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.85,
                  marginBottom: "3rem",
                }}
              >
                We work with Boards, Chief Executives, and senior leadership
                teams seeking advisory partnership on executive search,
                governance, and succession. We welcome confidential enquiries
                from organisations at any stage of their leadership journey.
              </p>

              <div style={{ marginBottom: "2.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "1rem",
                  }}
                >
                  Principal Contact
                </p>
                <p
                  style={{
                    color: "var(--color-white)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Swapna Amin
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "1.25rem",
                  }}
                >
                  Principal & Advisor
                </p>
                <a
                  href="mailto:swapna.amin@pivotedgegroup.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.9rem",
                    marginBottom: "0.75rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                  }
                >
                  <MailIcon /> swapna.amin@pivotedgegroup.com
                </a>
                <a
                  href="tel:+919820779053"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                  }
                >
                  <PhoneIcon /> +91 98207 79053
                </a>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Offices
                </p>
                <div className="location-mini">
                  <p className="location-mini-city">Mumbai</p>
                  <p className="location-mini-region">
                    South Asia & India · Registered Office
                  </p>
                </div>
                <div className="location-mini">
                  <p className="location-mini-city">Dubai</p>
                  <p className="location-mini-region">
                    Middle East & GCC · Regional Office
                  </p>
                </div>
                <div className="location-mini">
                  <p className="location-mini-city">Sydney</p>
                  <p className="location-mini-region">
                    Asia-Pacific · Regional Office
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-right">
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    background: "rgba(201,162,63,0.1)",
                    border: "1.5px solid var(--color-gold)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M6 14l6 6L22 8"
                      stroke="#C9A23F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2rem",
                    color: "var(--color-teal)",
                    marginBottom: "1rem",
                  }}
                >
                  Thank You
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.9375rem",
                    lineHeight: 1.8,
                    maxWidth: "380px",
                  }}
                >
                  Your enquiry has been received. We will be in touch shortly,
                  with the discretion and care your message deserves.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "2.5rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Enquiry
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "var(--color-teal)",
                      fontWeight: 400,
                    }}
                  >
                    Send a Confidential Enquiry
                  </h2>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {field("firstName", "First Name", "text", true)}
                    {field("lastName", "Last Name", "text", true)}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {field("company", "Company / Organisation", "text", true)}
                    {field("jobTitle", "Job Title / Role", "text")}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {field("email", "Email Address", "email", true)}
                    {field("phone", "Phone Number", "tel")}
                  </div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    {field("country", "Country", "text")}
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                    {field(
                      "message",
                      "Message / Requirement",
                      "textarea",
                      true,
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Submit Enquiry
                  </button>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "#9ca3af",
                      marginTop: "1rem",
                      textAlign: "center",
                      lineHeight: 1.6,
                    }}
                  >
                    All communications are handled with complete confidentiality
                    and discretion.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-notice-label">
                <ShieldIcon />
                <span>Confidentiality Notice</span>
              </div>
              <h3>Data & Privacy Consent</h3>
            </div>
            <div className="modal-body">
              <p>
                By submitting this enquiry, you acknowledge that PivotEdge
                Partners will collect and process the personal information
                provided. Your data is handled with the highest standards of
                confidentiality and discretion, in full compliance with
                applicable data protection laws.
              </p>
              <p>
                Your information will be used solely to respond to your enquiry
                and to provide relevant leadership advisory services. We do not
                share, sell, or distribute your personal information to third
                parties without your explicit consent, except as required by
                law. For full details, please refer to our{" "}
                <Link
                  to="/privacy"
                  style={{ color: "var(--color-teal)", fontWeight: 500 }}
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="/terms"
                  style={{ color: "var(--color-teal)", fontWeight: 500 }}
                >
                  Terms & Conditions
                </Link>
                .
              </p>
              <label className="modal-checkbox">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span className="modal-checkbox-label">
                  I confirm that I have read and understand PivotEdge Partners'
                  Privacy Policy and Terms & Conditions, and I consent to the
                  collection and processing of my personal information as
                  described above.
                </span>
              </label>
              <div className="modal-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-gold"
                  onClick={handleAccept}
                  style={{
                    opacity: consent ? 1 : 0.5,
                    cursor: consent ? "pointer" : "not-allowed",
                  }}
                >
                  Accept & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
