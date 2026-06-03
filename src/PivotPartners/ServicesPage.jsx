import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel, StatCounter } from "./utils";

/* ─── Scroll-triggered fade/slide utility (mirrors AboutPage pattern) ─── */
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

/* Wipe-in image (clip-path reveal) */
function Wipe({ src, alt, style = {} }) {
  const [ref, vis] = useIO();
  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        clipPath: vis ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        transition: "clip-path 1.3s cubic-bezier(0.77,0,0.175,1)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: vis ? "scale(1)" : "scale(1.07)",
          transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

/* ─── Animated line that draws rightward on scroll ─── */
function DrawLine({ delay = 0 }) {
  const [ref, vis] = useIO();
  return (
    <div
      ref={ref}
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

/* ─── Radial SVG "differentiators" diagram ─── */
function RadialDiagram() {
  const [ref, vis] = useIO(0.1);
  const pillars = [
    { label: "Advisory\nOrientation", sub: "Strategic, not transactional" },
    { label: "Governance\nAware", sub: "Best-practice frameworks" },
    { label: "Senior\nNetworks", sub: "Deep sector access" },
    { label: "Research\nDriven", sub: "Structured methodology" },
    { label: "Long-term\nMindset", sub: "Sustained performance" },
  ];
  const cx = 300,
    cy = 300,
    r = 190;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <svg viewBox="0 0 600 600" style={{ width: "100%", overflow: "visible" }}>
        {/* Outer dashed ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 18}
          fill="none"
          stroke={T.gold}
          strokeWidth={0.8}
          strokeDasharray="6 10"
          opacity={0.25}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "spin-slow 30s linear infinite",
          }}
        />

        {/* Mid ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 40}
          fill="none"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth={1}
        />

        {/* Spoke lines */}
        {pillars.map((_, i) => {
          const angle = (i / pillars.length) * Math.PI * 2 - Math.PI / 2;
          const x2 = cx + r * Math.cos(angle);
          const y2 = cy + r * Math.sin(angle);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke={T.gold}
              strokeWidth={1}
              opacity={0.3}
              strokeDasharray="4 6"
              style={{
                opacity: vis ? 0.3 : 0,
                transition: `opacity 0.6s ease ${400 + i * 120}ms`,
              }}
            />
          );
        })}

        {/* Pillar nodes */}
        {pillars.map((p, i) => {
          const angle = (i / pillars.length) * Math.PI * 2 - Math.PI / 2;
          const nx = cx + r * Math.cos(angle);
          const ny = cy + r * Math.sin(angle);
          const lines = p.label.split("\n");
          return (
            <g
              key={i}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis
                  ? "none"
                  : `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px)`,
                transition: `opacity 0.7s ease ${500 + i * 130}ms, transform 0.7s ease ${500 + i * 130}ms`,
              }}
            >
              {/* Node circle */}
              <circle
                cx={nx}
                cy={ny}
                r={38}
                fill={T.teal}
                stroke={T.gold}
                strokeWidth={1.5}
              />
              <circle
                cx={nx}
                cy={ny}
                r={42}
                fill="none"
                stroke={T.gold}
                strokeWidth={0.5}
                opacity={0.4}
              />
              {/* Label */}
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={nx}
                  y={ny + (li - (lines.length - 1) / 2) * 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 13,
                    fill: T.white,
                    fontWeight: 400,
                  }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Centre core */}
        <circle
          cx={cx}
          cy={cy}
          r={72}
          fill={T.gold}
          opacity={0.12}
          style={{
            opacity: vis ? 0.12 : 0,
            transition: "opacity 0.8s ease 200ms",
          }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={56}
          fill={T.teal}
          style={{
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s ease 300ms",
          }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={56}
          fill="none"
          stroke={T.gold}
          strokeWidth={1.5}
          style={{
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s ease 300ms",
          }}
        />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15,
            fill: T.gold,
            fontWeight: 400,
          }}
        >
          PivotEdge
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12,
            fill: "rgba(245,240,232,0.6)",
            fontWeight: 300,
          }}
        >
          Advantage
        </text>
      </svg>
      <style>{`@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Immersive service panel (full-bleed photo + overlay content) ─── */
function ServicePanel({ num, name, desc, img, reverse = false }) {
  const [ref, vis] = useIO(0.05);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: 420,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        cursor: "default",
      }}
    >
      {/* Full-bleed photo */}
      <img
        src={img}
        alt={name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          filter: "brightness(0.55) saturate(0.75)",
        }}
      />
      {/* Directional gradient — text side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: reverse
            ? "linear-gradient(to left, rgba(13,61,78,0.88) 0%, rgba(13,61,78,0.55) 45%, transparent 100%)"
            : "linear-gradient(to right, rgba(13,61,78,0.88) 0%, rgba(13,61,78,0.55) 45%, transparent 100%)",
        }}
      />
      {/* Gold accent bar */}
      <div
        style={{
          position: "absolute",
          left: reverse ? "auto" : 0,
          right: reverse ? 0 : "auto",
          top: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(to bottom, transparent, ${T.gold}, transparent)`,
          opacity: 0.7,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 64px",
          width: "100%",
          display: "flex",
          justifyContent: reverse ? "flex-end" : "flex-start",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : `translateX(${reverse ? 40 : -40}px)`,
          transition:
            "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 200ms",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 56,
                fontWeight: 300,
                color: T.gold,
                opacity: 0.4,
                lineHeight: 1,
              }}
            >
              {num}
            </span>
            <div
              style={{ width: 40, height: 1, background: T.gold, opacity: 0.6 }}
            />
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 3vw, 42px)",
              fontWeight: 300,
              color: T.white,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(245,240,232,0.72)",
              maxWidth: 460,
            }}
          >
            {desc}
          </p>
          {/* Hover reveal tag */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "none" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div style={{ width: 24, height: 1, background: T.gold }} />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: T.gold,
              }}
            >
              Enquire About This Service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mosaic photo grid for Diversity section ─── */
function DiversityMosaic({ setPage }) {
  const [ref, vis] = useIO(0.05);
  return (
    <section
      style={{ background: T.cream, padding: "0 0 0 0", overflow: "hidden" }}
    >
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "260px 260px",
          gap: 3,
          maxWidth: "100%",
        }}
      >
        {/* Photo 1 — tall left */}
        <div
          style={{
            gridRow: "1 / 3",
            overflow: "hidden",
            position: "relative",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease 0ms, transform 0.8s ease 0ms",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
            alt="Diverse leadership"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.85) saturate(0.8)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,61,78,0.15)",
            }}
          />
        </div>
        {/* Photo 2 — top centre */}
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease 120ms, transform 0.8s ease 120ms",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
            alt="Board meeting"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.82) saturate(0.78)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,61,78,0.15)",
            }}
          />
        </div>
        {/* Content block — top right (cream) */}
        <div
          style={{
            background: T.cream,
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderTop: `3px solid ${T.gold}`,
            border: `1px solid rgba(13,61,78,0.08)`,
            borderTop: `3px solid ${T.gold}`,
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease 200ms, transform 0.8s ease 200ms",
          }}
        >
          <SectionLabel text="Diversity & Inclusion" />
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 2.5vw, 34px)",
              fontWeight: 300,
              color: T.teal,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Stronger Governance Through Diverse Leadership
          </h3>
          <div
            style={{
              width: 32,
              height: 1,
              background: T.gold,
              marginBottom: 20,
              opacity: 0.7,
            }}
          />
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.8,
              color: T.textMid,
            }}
          >
            Diverse leadership strengthens governance, innovation, and
            performance. We integrate D&I considerations into every search and
            advisory engagement.
          </p>
        </div>
        {/* Photo 3 — bottom centre */}
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease 280ms, transform 0.8s ease 280ms",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80"
            alt="Inclusive leadership"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.6) saturate(0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,61,78,0.4)",
            }}
          />
        </div>
        {/* Gold CTA block — bottom right */}
        <div
          style={{
            background: T.creamAlt,
            padding: "44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: `3px solid ${T.gold}`,
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease 360ms, transform 0.8s ease 360ms",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontStyle: "italic",
              fontWeight: 300,
              color: T.teal,
              lineHeight: 1.55,
            }}
          >
            "Leadership appointments that reflect broader perspectives, varied
            experiences, and organisational values."
          </p>
          <button
            className="btn btn-outline"
            style={{ alignSelf: "flex-start", marginTop: 24 }}
            onClick={() => {
              setPage("Contact");
              window.scrollTo(0, 0);
            }}
          >
            <span>Discuss Your Mandate</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const HERO_CSS = `
  .sv-hero-img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%; }
  @keyframes sv-load-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  .sv-load-1 { animation:sv-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  .sv-load-2 { animation:sv-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .sv-load-3 { animation:sv-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
  @keyframes sv-scroll-line { from{height:0;opacity:0} to{height:56px;opacity:1} }
  .sv-scroll-line { animation:sv-scroll-line 1s cubic-bezier(0.16,1,0.3,1) 1s both; }
  .svc-step:hover .svc-step-num { color: #B8962E !important; opacity: 0.7 !important; }
  .svc-step:hover .svc-step-label { color: #B8962E !important; }
`;

export default function ServicesPage({ setPage }) {
  const [activeFunction, setActiveFunction] = useState(null);

  const functions = [
    {
      n: "Boards & Governance",
      d: "We advise on board composition, governance effectiveness, and director appointments. Our work supports boards in strengthening oversight, strategic guidance, and leadership succession at the highest levels.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <ellipse
            cx="80"
            cy="72"
            rx="52"
            ry="20"
            fill="#EDE8DE"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            opacity=".4"
          />
          <ellipse
            cx="74"
            cy="68"
            rx="26"
            ry="8"
            fill="rgba(255,255,255,0.45)"
          />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return (
              <g key={i}>
                <circle
                  cx={80 + 64 * Math.cos(a)}
                  cy={72 + 28 * Math.sin(a)}
                  r="7"
                  fill="#0D3D4E"
                  opacity=".18"
                />
                <circle
                  cx={80 + 64 * Math.cos(a)}
                  cy={72 + 28 * Math.sin(a) - 14}
                  r="6"
                  fill="#0D3D4E"
                  opacity=".25"
                />
              </g>
            );
          })}
          <circle cx="80" cy="72" r="8" fill="rgba(184,150,46,0.15)" />
          <circle cx="80" cy="72" r="4" fill="#B8962E" opacity=".8" />
          {[
            [80, 63, 80, 58],
            [88, 67, 92, 63],
            [88, 77, 92, 81],
            [80, 81, 80, 86],
            [72, 77, 68, 81],
            [72, 67, 68, 63],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#B8962E"
              strokeWidth="1.2"
              opacity=".5"
            />
          ))}
          <polyline
            points="112,18 120,6 126,13 132,4 138,13 144,6 152,18"
            stroke="#0D3D4E"
            strokeWidth="1.8"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity=".35"
          />
          <line
            x1="112"
            y1="18"
            x2="152"
            y2="18"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            opacity=".3"
          />
          <text
            x="80"
            y="108"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Governance
          </text>
        </svg>
      ),
    },
    {
      n: "Chief Executive Officer",
      d: "The CEO defines direction, culture, and performance expectations. We support organisations in identifying leaders capable of aligning strategy with execution, building strong management teams, and sustaining long-term growth.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="80"
            cy="56"
            r="20"
            fill="#0D3D4E"
            opacity=".1"
            stroke="#0D3D4E"
            strokeWidth="1.5"
          />
          <path
            d="M52 105 Q52 80 80 80 Q108 80 108 105"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="#EDE8DE"
          />
          <polyline
            points="58,42 65,26 72,34 80,18 88,34 95,26 102,42"
            stroke="#B8962E"
            strokeWidth="2.2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <line
            x1="58"
            y1="42"
            x2="102"
            y2="42"
            stroke="#B8962E"
            strokeWidth="2"
          />
          <circle cx="65" cy="26" r="3" fill="#B8962E" />
          <circle cx="80" cy="18" r="4" fill="#B8962E" />
          <circle cx="95" cy="26" r="3" fill="#B8962E" />
          <line
            x1="40"
            y1="56"
            x2="62"
            y2="56"
            stroke="#B8962E"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity=".5"
          />
          <line
            x1="98"
            y1="56"
            x2="120"
            y2="56"
            stroke="#B8962E"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity=".5"
          />
          <text
            x="80"
            y="115"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            CEO
          </text>
        </svg>
      ),
    },
    {
      n: "Chief Financial Officer",
      d: "The CFO has evolved into a strategic partner to the CEO and Board. We identify finance leaders who combine financial stewardship with enterprise-level thinking, transformation capability, and governance credibility.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <rect
            x="28"
            y="22"
            width="104"
            height="76"
            rx="2"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="none"
            opacity=".25"
          />
          <line
            x1="28"
            y1="36"
            x2="132"
            y2="36"
            stroke="#B8962E"
            strokeWidth="1"
            opacity=".5"
          />
          <rect
            x="36"
            y="44"
            width="18"
            height="46"
            rx="1"
            fill="#B8962E"
            opacity=".2"
          />
          <rect
            x="62"
            y="34"
            width="18"
            height="56"
            rx="1"
            fill="#B8962E"
            opacity=".35"
          />
          <rect
            x="88"
            y="52"
            width="18"
            height="38"
            rx="1"
            fill="#B8962E"
            opacity=".25"
          />
          <rect
            x="114"
            y="28"
            width="8"
            height="62"
            rx="1"
            fill="#0D3D4E"
            opacity=".08"
          />
          <polyline
            points="45,60 71,44 97,64 123,36"
            stroke="#B8962E"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="45" cy="60" r="3" fill="#B8962E" />
          <circle cx="71" cy="44" r="3" fill="#B8962E" />
          <circle cx="97" cy="64" r="3" fill="#B8962E" />
          <circle cx="123" cy="36" r="4" fill="#B8962E" />
          <text
            x="80"
            y="112"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Finance
          </text>
        </svg>
      ),
    },
    {
      n: "Marketing & Sales",
      d: "Growth leadership demands commercial acumen, customer insight, and execution discipline. We support organisations in appointing leaders who translate strategy into measurable revenue impact.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="54"
            cy="60"
            r="28"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            fill="none"
            opacity=".15"
            strokeDasharray="4 6"
          />
          <circle
            cx="54"
            cy="60"
            r="18"
            stroke="#0D3D4E"
            strokeWidth="1"
            fill="none"
            opacity=".12"
            strokeDasharray="3 5"
          />
          <circle
            cx="54"
            cy="60"
            r="8"
            fill="#0D3D4E"
            opacity=".12"
            stroke="#0D3D4E"
            strokeWidth="1.2"
          />
          <circle cx="54" cy="60" r="3.5" fill="#B8962E" opacity=".8" />
          <polyline
            points="88,88 100,70 112,58 124,38 138,24"
            stroke="#B8962E"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="70" r="3.5" fill="#B8962E" />
          <circle cx="112" cy="58" r="3.5" fill="#B8962E" />
          <circle cx="124" cy="38" r="3.5" fill="#B8962E" />
          <circle cx="138" cy="24" r="4.5" fill="#B8962E" />
          <polyline
            points="130,24 138,24 138,32"
            stroke="#B8962E"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="80"
            y="112"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Growth
          </text>
        </svg>
      ),
    },
    {
      n: "Human Resources",
      d: "Human capital strategy is central to organisational performance. We recruit and advise HR leaders across talent strategy, organisational effectiveness, succession planning, change management, and rewards.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="52"
            cy="44"
            r="13"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="none"
            opacity=".4"
          />
          <circle
            cx="108"
            cy="44"
            r="13"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="none"
            opacity=".4"
          />
          <circle
            cx="80"
            cy="36"
            r="16"
            stroke="#0D3D4E"
            strokeWidth="1.8"
            fill="none"
            opacity=".5"
          />
          <circle cx="80" cy="36" r="8" fill="#0D3D4E" opacity=".15" />
          <path
            d="M30 98 Q30 76 52 76"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="none"
            opacity=".3"
          />
          <path
            d="M108 76 Q130 76 130 98"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="none"
            opacity=".3"
          />
          <path
            d="M52 76 Q66 68 80 68 Q94 68 108 76"
            stroke="#B8962E"
            strokeWidth="2"
            fill="none"
            opacity=".8"
          />
          <circle
            cx="80"
            cy="74"
            r="10"
            stroke="#B8962E"
            strokeWidth="1.5"
            fill="none"
            opacity=".5"
          />
          <circle cx="80" cy="74" r="4" fill="#B8962E" opacity=".7" />
          <text
            x="80"
            y="112"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            People
          </text>
        </svg>
      ),
    },
    {
      n: "Supply Chain",
      d: "Supply chain leadership is increasingly strategic, balancing efficiency, resilience, risk management, and global complexity. We identify leaders capable of driving operational excellence while adapting to evolving market demands.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <rect
            x="12"
            y="46"
            width="28"
            height="22"
            rx="2"
            stroke="#B8962E"
            strokeWidth="1.5"
            fill="none"
            opacity=".7"
          />
          <rect
            x="52"
            y="38"
            width="28"
            height="22"
            rx="2"
            stroke="#B8962E"
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="92"
            y="46"
            width="28"
            height="22"
            rx="2"
            stroke="#B8962E"
            strokeWidth="1.5"
            fill="none"
            opacity=".7"
          />
          <rect
            x="130"
            y="38"
            width="20"
            height="22"
            rx="2"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            fill="none"
            opacity=".3"
          />
          <line
            x1="40"
            y1="57"
            x2="52"
            y2="50"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            opacity=".4"
          />
          <line
            x1="80"
            y1="50"
            x2="92"
            y2="57"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            opacity=".4"
          />
          <line
            x1="120"
            y1="57"
            x2="130"
            y2="50"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".3"
          />
          <circle
            cx="26"
            cy="76"
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".35"
          />
          <circle
            cx="34"
            cy="76"
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".35"
          />
          <circle
            cx="66"
            cy="68"
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".35"
          />
          <circle
            cx="74"
            cy="68"
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".35"
          />
          <circle
            cx="106"
            cy="76"
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".35"
          />
          <circle
            cx="114"
            cy="76"
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity=".35"
          />
          <text
            x="80"
            y="105"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Operations
          </text>
        </svg>
      ),
    },
    {
      n: "CSR & Sustainability",
      d: "Sustainability and responsible business practices are now integral to strategy. We support organisations in appointing leaders who integrate economic performance with environmental stewardship and stakeholder accountability.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M80 18 Q96 26 100 44 Q104 62 90 74 Q80 82 70 74 Q56 62 60 44 Q64 26 80 18Z"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            fill="none"
            opacity=".3"
          />
          <path
            d="M80 28 Q66 42 80 62 Q94 42 80 28Z"
            fill="#B8962E"
            opacity=".18"
            stroke="#B8962E"
            strokeWidth="1.2"
          />
          <path
            d="M60 44 Q44 50 42 66 Q56 72 70 66"
            stroke="#0D3D4E"
            strokeWidth="1"
            fill="none"
            opacity=".2"
            strokeDasharray="3 4"
          />
          <path
            d="M100 44 Q116 50 118 66 Q104 72 90 66"
            stroke="#0D3D4E"
            strokeWidth="1"
            fill="none"
            opacity=".2"
            strokeDasharray="3 4"
          />
          <line
            x1="80"
            y1="74"
            x2="80"
            y2="96"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            opacity=".3"
            strokeLinecap="round"
          />
          <line
            x1="64"
            y1="92"
            x2="96"
            y2="92"
            stroke="#0D3D4E"
            strokeWidth="1.5"
            opacity=".3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="44" r="5" fill="#B8962E" opacity=".8" />
          <text
            x="80"
            y="112"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            ESG
          </text>
        </svg>
      ),
    },
    {
      n: "Artificial Intelligence",
      d: "AI leadership is treated as a horizontal capability — integrated across functions and industries. We identify leaders who can bridge technology and strategy, embed responsible innovation, and translate digital capability into commercial advantage.",
      illus: (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="80"
            cy="60"
            r="16"
            fill="rgba(184,150,46,0.12)"
            stroke="#B8962E"
            strokeWidth="1.5"
          />
          <circle cx="80" cy="60" r="6" fill="#B8962E" opacity=".8" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <g key={i}>
                <line
                  x1={80 + 18 * Math.cos(a)}
                  y1={60 + 18 * Math.sin(a)}
                  x2={80 + 32 * Math.cos(a)}
                  y2={60 + 32 * Math.sin(a)}
                  stroke="#B8962E"
                  strokeWidth="1.2"
                  opacity=".5"
                />
                <circle
                  cx={80 + 36 * Math.cos(a)}
                  cy={60 + 36 * Math.sin(a)}
                  r="5"
                  fill="none"
                  stroke="#0D3D4E"
                  strokeWidth="1.2"
                  opacity=".5"
                />
                <circle
                  cx={80 + 36 * Math.cos(a)}
                  cy={60 + 36 * Math.sin(a)}
                  r="2"
                  fill="#B8962E"
                  opacity=".6"
                />
              </g>
            );
          })}
          <circle
            cx="80"
            cy="60"
            r="48"
            stroke="#B8962E"
            strokeWidth="0.7"
            opacity=".12"
            strokeDasharray="3 8"
          />
          <circle
            cx="80"
            cy="60"
            r="28"
            stroke="#0D3D4E"
            strokeWidth="0.7"
            opacity=".12"
            strokeDasharray="2 6"
          />
          <text
            x="80"
            y="115"
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "#B8962E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            AI & Digital
          </text>
        </svg>
      ),
    },
  ];

  const coreServices = [
    {
      num: "01",
      name: "Executive Search",
      img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=80",
      desc: "Retained executive search for senior leadership and board-level roles. Each mandate begins with deep understanding of organisational strategy, culture, governance context, and performance objectives. Research-led evaluation of experience, judgement, cultural alignment, and long-term impact. We are not intermediaries — we are advisors entrusted with decisions that influence the direction of the enterprise.",
    },
    {
      num: "02",
      name: "Succession Planning",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
      desc: "Leadership continuity is a strategic imperative. We partner with Boards and executive teams to design succession strategies that strengthen bench strength, reduce risk, and preserve institutional knowledge. Our approach identifies critical roles, evaluates internal readiness, assesses vulnerabilities, and builds structured leadership pipelines aligned to long-term organisational priorities.",
    },
    {
      num: "03",
      name: "Career Transition",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
      desc: "Organisational evolution often requires difficult leadership decisions. We support organisations in managing transitions with integrity and professionalism. Our career transition services provide structured guidance, leadership coaching, capability alignment, and strategic repositioning support — helping individuals move forward with clarity while protecting organisational reputation.",
    },
    {
      num: "04",
      name: "Interim Management",
      img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
      desc: "When leadership gaps arise or specialised expertise is required, interim management provides rapid access to experienced executives. We identify seasoned leaders who can step into complex environments, stabilise operations, drive transformation, or deliver specific outcomes within defined timeframes. Interim leadership offers flexibility without compromising on capability.",
    },
  ];

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
    <div>
      <style>{HERO_CSS}</style>

      {/* ══════ 1. HERO — About-style full-viewport ══════ */}
      {/* ══════ 1. HERO ══════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <img
          className="sv-hero-img"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85"
          alt="Services — leadership advisory"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,61,78,0.97) 0%, rgba(13,61,78,0.65) 40%, rgba(13,61,78,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13,61,78,0.38) 0%, transparent 55%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px 96px",
          }}
        >
          <div className="sv-load-1">
            <SectionLabel text="Advisory Services" light />
          </div>
          <h1
            className="sv-load-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(60px, 7.5vw, 100px)",
              fontWeight: 300,
              lineHeight: 0.98,
              color: T.white,
              margin: "16px 0 24px",
            }}
          >
            Architecting
            <br />
            the Modern
            <br />
            Boardroom.
          </h1>
          <p
            className="sv-load-3"
            style={{
              fontSize: 14,
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            Research-led search and advisory, delivered with governance
            awareness and complete discretion.
          </p>
        </div>

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
            className="sv-scroll-line"
            style={{
              width: 1,
              background:
                "linear-gradient(to bottom,rgba(184,150,46,0.9),transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Scroll
          </span>
        </div>
      </section>
      {/* ══════ 2. PROCESS FRAMEWORK — timeline with animated draw-line ══════ */}
      <section
        style={{
          background: T.cream,
          padding: "100px 64px",
          overflow: "hidden",
          borderBottom: `1px solid rgba(13,61,78,0.08)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SectionLabel text="Our Approach" />
            <div
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
                Six structured stages that underpin every engagement — from
                first brief to successful integration.
              </p>
            </div>
          </Fade>

          {/* Steps grid */}
          <div
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
                    cursor: "default",
                  }}
                >
                  {/* Node dot */}
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
                    className="svc-step-num"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 44,
                      fontWeight: 300,
                      color: T.teal,
                      opacity: 0.18,
                      lineHeight: 1,
                      marginBottom: 12,
                      transition: "opacity 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="svc-step-label"
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: T.teal,
                      lineHeight: 1.5,
                      marginBottom: 10,
                      transition: "color 0.3s ease",
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

      {/* ══════ 3. CORE 4 SERVICES — immersive full-bleed panels ══════ */}
      <section style={{ background: T.cream }}>
        <Fade
          style={{
            padding: "80px 64px 56px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <SectionLabel text="Core Advisory" />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
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
              Our Advisory Pillars
            </h2>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                maxWidth: 320,
                paddingBottom: 4,
              }}
            >
              Four service lines that form the foundation of every leadership
              engagement.
            </p>
          </div>
        </Fade>
        {coreServices.map((svc, i) => (
          <ServicePanel key={i} {...svc} reverse={i % 2 !== 0} />
        ))}
        <div
          style={{
            height: 0,
            borderBottom: `1px solid rgba(13,61,78,0.08)`,
          }}
        />
      </section>

      {/* ══════ 4. WHAT DIFFERENTIATES — radial SVG diagram ══════ */}
      <section
        style={{
          background: T.creamAlt,
          padding: "120px 64px",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: 80 }}>
            <SectionLabel text="Our Difference" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px,4vw,52px)",
                fontWeight: 300,
                color: T.teal,
                lineHeight: 1.1,
              }}
            >
              What Differentiates PivotEdge
            </h2>
            <p
              style={{
                fontSize: 15,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                maxWidth: 520,
                margin: "24px auto 0",
              }}
            >
              Advisory orientation rather than transactional placement — five
              principles that define our practice across every engagement.
            </p>
          </Fade>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <RadialDiagram />

            {/* Differentiator list */}
            <div>
              {[
                {
                  n: "Advisory Orientation",
                  d: "We approach every mandate as strategic advisors — evaluating fit, impact, and governance readiness, not merely filling a vacancy.",
                },
                {
                  n: "Governance-Aware Frameworks",
                  d: "Our evaluation process is informed by board governance best practice, risk management, and enterprise performance expectations.",
                },
                {
                  n: "Deep Senior Networks",
                  d: "Decades of relationship-building give us direct access to senior leadership talent that simply isn't visible to general search firms.",
                },
                {
                  n: "Research-Driven Methodology",
                  d: "Every engagement is anchored in comprehensive market mapping, structured benchmarking, and evidence-based candidate evaluation.",
                },
                {
                  n: "Long-term Partnership Mindset",
                  d: "We measure success not at appointment but at 24-month retention and sustained performance — our 92% retention rate reflects this.",
                },
              ].map((item, i) => (
                <Fade key={i} delay={i * 80}>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      padding: "20px 0",
                      borderBottom: `1px solid rgba(13,61,78,0.08)`,
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        border: `1px solid ${T.gold}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 3,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 13,
                          color: T.gold,
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 20,
                          fontWeight: 400,
                          color: T.teal,
                          marginBottom: 6,
                        }}
                      >
                        {item.n}
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 300,
                          lineHeight: 1.7,
                          color: T.textMid,
                        }}
                      >
                        {item.d}
                      </p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ 5. FUNCTIONAL EXPERTISE — hover list on light background ══════ */}
      <section
        style={{
          background: T.creamAlt,
          padding: "120px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large decorative background text */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: 40,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 320,
            fontWeight: 300,
            lineHeight: 1,
            color: T.teal,
            opacity: 0.03,
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-0.04em",
          }}
        >
          FX
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Fade
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 64,
            }}
          >
            <div>
              <SectionLabel text="Functional Expertise" />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px,4vw,52px)",
                  fontWeight: 300,
                  color: T.teal,
                }}
              >
                Where We Place
              </h2>
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                maxWidth: 280,
                textAlign: "right",
              }}
            >
              Hover a function to explore our capability and perspective in that
              domain.
            </p>
          </Fade>

          <div>
            {functions.map((fn, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "28px 0",
                  borderBottom: `1px solid rgba(13,61,78,0.1)`,
                  cursor: "default",
                  paddingLeft: activeFunction === i ? 16 : 0,
                  borderLeft:
                    activeFunction === i
                      ? `2px solid ${T.gold}`
                      : "2px solid transparent",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={() => setActiveFunction(i)}
                onMouseLeave={() => setActiveFunction(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18,
                      color: T.gold,
                      opacity: activeFunction === i ? 0.9 : 0.4,
                      minWidth: 32,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(22px,2.5vw,32px)",
                      fontWeight: activeFunction === i ? 400 : 300,
                      color: activeFunction === i ? T.gold : T.teal,
                      transition: "all 0.35s ease",
                    }}
                  >
                    {fn.n}
                  </span>
                </div>
                <div
                  style={{
                    maxWidth: 440,
                    opacity: activeFunction === i ? 1 : 0,
                    transform:
                      activeFunction === i
                        ? "translateX(0)"
                        : "translateX(24px)",
                    transition: "all 0.4s ease",
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: T.textMid,
                  }}
                >
                  {fn.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 6. MANDATES + OUTCOMES — side by side on cream ══════ */}
      <section
        style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}
        >
          <Fade>
            <SectionLabel text="Typical Mandates" />
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 36,
                fontWeight: 300,
                color: T.teal,
                marginBottom: 32,
              }}
            >
              Where We Place
            </h3>
            <div
              style={{
                width: 48,
                height: 1,
                background: T.gold,
                marginBottom: 28,
              }}
            />
            {[
              "Chief Executive Officers",
              "Chief Financial Officers",
              "Functional Heads — Finance, HR, Sales & Marketing, Operations, Supply Chain, Technology, Sustainability",
              "Business Unit Heads",
              "Transformation & Digital Leaders",
              "Board Directors & Committee Chairs",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderBottom: `1px solid rgba(13,61,78,0.07)`,
                }}
              >
                <span
                  style={{
                    color: T.gold,
                    fontSize: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                >
                  ◆
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: T.textMid,
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
            <p
              style={{
                marginTop: 20,
                fontSize: 12,
                fontWeight: 300,
                fontStyle: "italic",
                color: T.textMuted,
                lineHeight: 1.7,
              }}
            >
              Our focus is on functional heads and above, where leadership
              impact directly influences enterprise performance and strategic
              direction.
            </p>
          </Fade>

          <Fade delay={200}>
            <SectionLabel text="Outcomes" />
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 36,
                fontWeight: 300,
                color: T.teal,
                marginBottom: 32,
              }}
            >
              What We Deliver
            </h3>
            <div
              style={{
                width: 48,
                height: 1,
                background: T.gold,
                marginBottom: 28,
              }}
            />
            {[
              {
                label: "Stronger alignment between leadership and strategy",
                icon: "◈",
              },
              { label: "Reduced succession and governance risk", icon: "◈" },
              { label: "Accelerated executive integration", icon: "◈" },
              { label: "Sustained performance impact", icon: "◈" },
            ].map((item, i) => (
              <Fade key={i} delay={300 + i * 80}>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    padding: "14px 0",
                    borderBottom: `1px solid rgba(13,61,78,0.07)`,
                  }}
                >
                  <span
                    style={{
                      color: T.gold,
                      fontSize: 12,
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  >
                    ◆
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 300,
                      color: T.textMid,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </Fade>
            ))}

            {/* Mini stat strip */}
            <div
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 0,
                borderTop: `1px solid rgba(13,61,78,0.1)`,
                paddingTop: 36,
              }}
            >
              {[
                { v: "92%", l: "Retention Rate" },
                { v: "500+", l: "Mandates" },
                { v: "30+", l: "Countries" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    borderRight:
                      i < 2 ? `1px solid rgba(13,61,78,0.1)` : "none",
                    padding: "0 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 36,
                      fontWeight: 600,
                      color: T.gold,
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T.textMuted,
                      marginTop: 8,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ══════ 7. DIVERSITY — mosaic photo grid ══════ */}
      <DiversityMosaic setPage={setPage} />
    </div>
  );
}
