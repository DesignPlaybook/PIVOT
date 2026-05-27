export const methodSteps = [
  {
    num: "01",
    title: "Mandate",
    desc: "Strategic alignment on organisational objectives, leadership expectations, and long-term impact criteria.",
  },
  {
    num: "02",
    title: "Market Intelligence",
    desc: "Comprehensive talent mapping across relevant sectors and geographies.",
  },
  {
    num: "03",
    title: "Benchmark",
    desc: "Structured evaluation of capability, track record, judgement, and governance readiness.",
  },
  {
    num: "04",
    title: "Calibration",
    desc: "Ongoing stakeholder engagement ensuring alignment throughout the process.",
  },
  {
    num: "05",
    title: "Transition",
    desc: "Advisory guidance through offer, onboarding, and early-stage integration.",
  },
];

export default function MethodologyFlow({ bg = "var(--color-cream)" }) {
  return (
    <div style={{ background: bg }}>
      <div className="method-flow" style={{ alignItems: "stretch" }}>
        {methodSteps.map((s, i) => (
          <div
            key={s.num}
            style={{ display: "flex", flex: 1, alignItems: "center" }}
          >
            <div className="method-step" style={{ flex: 1 }}>
              <span className="method-step-num">{s.num}</span>
              <div className="method-step-title">{s.title}</div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  marginTop: "0.5rem",
                  lineHeight: "1.6",
                }}
              >
                {s.desc}
              </p>
            </div>
            {i < methodSteps.length - 1 && (
              <div className="method-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M14 7l5 5-5 5"
                    stroke="#C9A23F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
