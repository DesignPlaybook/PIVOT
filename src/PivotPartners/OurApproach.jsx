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
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DrawLine({ delay = 0 }) {
  const [ref, vis] = useIO();

  return (
    <div
      ref={ref}
      className="approach-drawline"
      style={{
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(to right, ${T.gold}, rgba(184,150,46,0.15) 80%, transparent)`,
        opacity: 0.5,
        transformOrigin: "left",
        transform: vis ? "scaleX(1)" : "scaleX(0)",
        transition: `transform 1.4s cubic-bezier(0.77,0,0.175,1) ${delay}ms`,
      }}
    />
  );
}

export default function OurApproach() {
  const processSteps = [
    {
      n: "01",
      label: "Strategic Mandate Definition",
      sub: "Align with stakeholders to define success parameters and long-term impact criteria.",
    },
    {
      n: "02",
      label: "Market Mapping & Research",
      sub: "Comprehensive talent mapping across relevant sectors and geographies.",
    },
    {
      n: "03",
      label: "Assessment & Benchmarking",
      sub: "Structured evaluation of capability, track record, judgement, and cultural alignment.",
    },
    {
      n: "04",
      label: "Stakeholder Calibration",
      sub: "Ongoing engagement with Boards and executive teams throughout the process.",
    },
    {
      n: "05",
      label: "Confidential Execution",
      sub: "Independent and discreet management of candidate engagement.",
    },
    {
      n: "06",
      label: "Transition Support",
      sub: "Advisory guidance through offer, onboarding, and early-stage integration.",
    },
  ];

  return (
    <section
      id="our-approach"
      className="approach-section"
      style={{
        background: T.cream,
        padding: "100px 64px",
        overflow: "hidden",
        borderBottom: `1px solid rgba(13,61,78,0.08)`,
      }}
    >
      <style>{`
        @media (max-width: 1024px) and (min-width: 769px) {
          .approach-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            row-gap: 48px !important;
          }
          .approach-drawline {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .approach-section {
            padding: 64px 24px !important;
          }
          .approach-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
            margin-bottom: 48px !important;
          }
          .approach-header p {
            max-width: 100% !important;
          }
          .approach-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 40px !important;
          }
          .approach-drawline {
            display: none !important;
          }
          .svc-step {
            padding: 0 16px 0 0 !important;
          }
        }
        @media (max-width: 480px) {
          .approach-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <SectionLabel text="Our Approach" />

          <div
            className="approach-header"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 72,
              gap: 40,
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px,4vw,52px)",
                fontWeight: 300,
                color: T.teal,
                lineHeight: 1.1,
              }}
            >
              The Precision
              <br />
              Matching Framework
            </h2>

            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                maxWidth: 300,
                paddingBottom: 6,
              }}
            >
              Six structured stages that underpin every engagement — from first
              brief to successful integration.
            </p>
          </div>
        </Fade>

        <div
          className="approach-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 0,
            position: "relative",
          }}
        >
          <DrawLine delay={200} />

          {processSteps.map((s, i) => (
            <Fade key={i} delay={i * 100}>
              <div
                className="svc-step"
                style={{
                  padding: "48px 20px 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    background: T.gold,
                    borderRadius: "50%",
                    marginBottom: 24,
                    position: "relative",
                    zIndex: 1,
                    border: "2px solid #F5F0E8",
                    boxShadow: `0 0 0 4px rgba(184,150,46,0.15)`,
                  }}
                />

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 44,
                    fontWeight: 300,
                    color: T.teal,
                    opacity: 0.18,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {s.n}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: T.teal,
                    lineHeight: 1.5,
                    marginBottom: 10,
                  }}
                >
                  {s.label}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: T.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {s.sub}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}