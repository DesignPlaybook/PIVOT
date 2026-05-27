import { useState } from "react";
import { T } from "./tokens";
import { useReveal, SectionLabel } from "./utils";

export default function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", org: "", inquiry: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const hubs = [
    { city: "London", addr: "One Canada Square, Canary Wharf", postcode: "London E14 5AB, United Kingdom", phone: "+44 20 7946 0123" },
    { city: "New York", addr: "200 Park Avenue, MetLife Building", postcode: "New York, NY 10166, USA", phone: "+1 212 555 0198" },
    { city: "Singapore", addr: "Marina Bay Financial Centre, Tower 1", postcode: "8 Marina Blvd, Singapore 018981", phone: "+65 6555 1234" },
    { city: "Zurich", addr: "Bahnhofstrasse 10", postcode: "8001 Zürich, Switzerland", phone: "+41 44 211 55 66" },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="contact-hero-bg"
        style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: 96 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <SectionLabel text="Connect With Us" />
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.1, color: T.white, marginBottom: 24 }}>
              Strategic engagement begins with a conversation.
            </h1>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.7)" }}>
              We support the world's most influential boards and executive teams in navigating complex leadership transitions.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Offices */}
      <section style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96 }}>

          {/* Form */}
          <div className="reveal">
            <SectionLabel text="Executive Inquiry" />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: T.teal, marginBottom: 12 }}>
              Begin a Conversation
            </h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: T.textMid, marginBottom: 40 }}>
              Confidentiality is the cornerstone of our practice. A senior partner will reach out within 24 hours.
            </p>
            {submitted ? (
              <div style={{ padding: "60px 40px", background: T.creamAlt, textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: T.gold, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: T.teal, marginBottom: 12 }}>Inquiry Received</h3>
                <p style={{ fontSize: 14, color: T.textMid, fontWeight: 300 }}>A senior partner will be in touch within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label>Full Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                  </div>
                  <div>
                    <label>Professional Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@organisation.com" />
                  </div>
                </div>
                <div>
                  <label>Organisation</label>
                  <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="Your organisation" />
                </div>
                <div>
                  <label>Inquiry Type</label>
                  <select value={form.inquiry} onChange={(e) => setForm({ ...form, inquiry: e.target.value })}>
                    <option value="">Select inquiry type</option>
                    <option>Board Advisory</option>
                    <option>Executive Search</option>
                    <option>CEO Succession</option>
                    <option>Succession Planning</option>
                    <option>Interim Management</option>
                    <option>Strategic Partnership</option>
                  </select>
                </div>
                <div>
                  <label>Message</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we assist your organisation?" />
                </div>
                <div>
                  <button className="btn btn-teal" onClick={() => setSubmitted(true)}>
                    <span>Submit Inquiry</span>
                  </button>
                  <p style={{ marginTop: 16, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textMuted, fontFamily: "'Jost', sans-serif" }}>
                    Engagements conducted with complete discretion.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Offices */}
          <div className="reveal reveal-d2">
            <SectionLabel text="Global Network" />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: T.teal, marginBottom: 12 }}>
              Office Locations
            </h2>
            <div className="gold-rule" />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {hubs.map((h, i) => (
                <div key={i} style={{ padding: "32px 0", borderBottom: `1px solid rgba(13,61,78,0.1)` }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, fontFamily: "'Jost', sans-serif", marginBottom: 8 }}>{h.city}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: T.teal, marginBottom: 4 }}>{h.addr}</div>
                  <div style={{ fontSize: 13, fontWeight: 300, color: T.textMid, marginBottom: 8 }}>{h.postcode}</div>
                  <div style={{ fontSize: 13, fontWeight: 400, color: T.teal, fontFamily: "'Jost', sans-serif" }}>{h.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priority Line */}
      <section style={{ background: T.creamAlt, padding: "80px 64px", textAlign: "center", borderTop: `1px solid rgba(13,61,78,0.08)` }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="reveal">
            <SectionLabel text="Priority Service" />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: T.teal, marginBottom: 16 }}>
              Need Immediate Assistance?
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: T.textMid, lineHeight: 1.8, marginBottom: 40 }}>
              For time-sensitive board transitions or crisis leadership requirements, contact our executive priority desk.
            </p>
            <a href="mailto:executive@pivotedge.com" style={{ textDecoration: "none" }}>
              <button className="btn btn-outline">
                <span>executive@pivotedge.com</span>
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
