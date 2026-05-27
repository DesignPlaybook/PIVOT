import GoldDivider from "../components/GoldDivider";
import ClosingCTA from "../components/ClosingCTA";
export default function LegalPage({ title, label, children }) {
  return (
    <>
      <div className="page-hero" style={{ paddingBottom: "3rem" }}>
        <div className="page-hero-content">
          <p className="page-hero-label">{label}</p>
          <h1>{title}</h1>
        </div>
      </div>
      <GoldDivider />
      <section className="section" style={{ background: "var(--color-cream)" }}>
        <div className="section-inner">
          <div
            style={{ maxWidth: "800px", margin: "0 auto" }}
            className="legal-content"
          >
            {children}
          </div>
        </div>
      </section>
      <GoldDivider />
      <ClosingCTA />
    </>
  );
}
