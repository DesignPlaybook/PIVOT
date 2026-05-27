import { useNavigate } from "react-router-dom";

export default function ClosingCTA({
  headline = "Begin a Confidential Conversation",
  sub = "We welcome enquiries from Boards, Chief Executives, and senior leadership teams seeking trusted advisory partnership.",
  btnLabel = "Get in Touch",
  to = "/contact",
}) {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: "var(--color-teal)",
        padding: "6rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "300px",
          height: "300px",
          border: "1px solid rgba(201,162,63,0.12)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "250px",
          height: "250px",
          border: "1px solid rgba(201,162,63,0.1)",
          borderRadius: "50%",
        }}
      />
      <div
        className="section-inner"
        style={{ position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: "1rem",
          }}
        >
          PivotEdge Partners
        </p>
        <h2
          style={{
            color: "var(--color-white)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 400,
            maxWidth: "700px",
            margin: "0 auto 1.5rem",
            fontFamily: "var(--font-serif)",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1rem",
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
            lineHeight: "1.8",
          }}
        >
          {sub}
        </p>
        <button className="btn-gold" onClick={() => navigate(to)}>
          {btnLabel}
        </button>
      </div>
    </section>
  );
}
