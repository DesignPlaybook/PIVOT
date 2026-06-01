import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";

const ABOUT_CSS = `
  .ab-hero-img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%; }
  /* Fade + Wipe use fully inline styles — no CSS class conflicts */
  @keyframes ab-load-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  .ab-load-1 { animation:ab-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  .ab-load-2 { animation:ab-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .ab-load-3 { animation:ab-load-up 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
  @keyframes ab-scroll-line { from{height:0;opacity:0} to{height:56px;opacity:1} }
  .ab-scroll-line { animation:ab-scroll-line 1s cubic-bezier(0.16,1,0.3,1) 1s both; }
  .vm-tile img { transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  .vm-tile:hover img { transform:scale(1.06); }
  .acc-row { border-bottom:1px solid rgba(13,61,78,0.1); }
  .acc-btn { width:100%;display:flex;justify-content:space-between;align-items:center;padding:30px 0;background:none;border:none;cursor:pointer;text-align:left; }
  .acc-btn:hover .acc-title { color:#B8962E; }
  .acc-plus { font-size:22px;color:#B8962E;line-height:1;flex-shrink:0;margin-left:20px;display:inline-block; }
  .val-card { transition:background 0.35s ease,transform 0.35s ease; }
  .val-card:hover { background:rgba(255,255,255,0.05)!important;transform:translateY(-3px); }
`;

function useIO(threshold = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Check immediately in case already in viewport
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

function Acc({ title, index, children, openAcc, setOpenAcc }) {
  const open = openAcc === index;

  return (
    <div
      className="acc-row"
      style={{
        position: "relative",
        paddingBottom: open ? 180 : 0,
        transition: "padding-bottom 0.45s ease",
      }}
    >
      <button
        className="acc-btn"
        onClick={() => setOpenAcc(open ? null : index)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 13,
              color: T.gold,
              minWidth: 28,
              opacity: 0.6,
            }}
          >
            {String(index).padStart(2, "0")}
          </span>

          <span
            className="acc-title"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 24,
              fontWeight: 300,
              color: T.teal,
            }}
          >
            {title}
          </span>
        </div>

        <span
          className="acc-plus"
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          position: "absolute",
          left: 52,
          right: 0,
          top: 92,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.9,
            color: T.textMid,
            paddingBottom: 20,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LEADERSHIP PHILOSOPHY — Light cream, large bold illustrations
══════════════════════════════════════════════════════════ */

const BoardsIcon = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Large oval boardroom table */}
    <ellipse
      cx="80"
      cy="95"
      rx="52"
      ry="22"
      stroke="#0D3D4E"
      strokeWidth="2"
      fill="#EDE8DE"
    />
    {/* Table surface shine */}
    <ellipse cx="72" cy="90" rx="28" ry="9" fill="rgba(255,255,255,0.4)" />
    {/* 5 chair figures around table */}
    {[0, 1, 2, 3, 4].map((i) => {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const px = 80 + 68 * Math.cos(angle);
      const py = 95 + 32 * Math.sin(angle);
      return (
        <g key={i}>
          {/* Body */}
          <ellipse
            cx={px}
            cy={py}
            rx="7"
            ry="9"
            fill="#0D3D4E"
            opacity="0.15"
          />
          {/* Head */}
          <circle cx={px} cy={py - 14} r="6" fill="#0D3D4E" opacity="0.25" />
          {/* Connection line to table */}
          <line
            x1={px}
            y1={py - 5}
            x2={80 + 52 * Math.cos(angle) * 0.92}
            y2={95 + 22 * Math.sin(angle) * 0.92}
            stroke="#0D3D4E"
            strokeWidth="1"
            opacity="0.12"
          />
        </g>
      );
    })}
    {/* Gold center accent */}
    <circle cx="80" cy="95" r="7" fill="#B8962E" opacity="0.7" />
    <circle cx="80" cy="95" r="3" fill="#B8962E" />
    {/* Gold governance rays */}
    {[0, 1, 2, 3, 4].map((i) => {
      const angle = (i / 5) * Math.PI * 2;
      return (
        <line
          key={i}
          x1="80"
          y1="95"
          x2={80 + 22 * Math.cos(angle)}
          y2={95 + 10 * Math.sin(angle)}
          stroke="#B8962E"
          strokeWidth="1"
          opacity="0.35"
        />
      );
    })}
  </svg>
);

const CEOIcon = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Person silhouette */}
    <circle cx="80" cy="54" r="22" fill="#0D3D4E" opacity="0.12" />
    <circle
      cx="80"
      cy="54"
      r="22"
      stroke="#0D3D4E"
      strokeWidth="2"
      fill="none"
    />
    {/* Body */}
    <path
      d="M46 130 Q46 100 80 100 Q114 100 114 130"
      stroke="#0D3D4E"
      strokeWidth="2"
      fill="#EDE8DE"
    />
    {/* Gold crown above head */}
    <polyline
      points="56,36 63,20 72,30 80,14 88,30 97,20 104,36"
      stroke="#B8962E"
      strokeWidth="2.5"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <line x1="56" y1="36" x2="104" y2="36" stroke="#B8962E" strokeWidth="2" />
    {/* Crown gems */}
    <circle cx="63" cy="20" r="3" fill="#B8962E" />
    <circle cx="80" cy="14" r="4" fill="#B8962E" />
    <circle cx="97" cy="20" r="3" fill="#B8962E" />
    {/* Direction arrow */}
    <line
      x1="80"
      y1="136"
      x2="80"
      y2="148"
      stroke="#B8962E"
      strokeWidth="1.5"
      strokeDasharray="3 2"
    />
    <polyline
      points="74,143 80,149 86,143"
      stroke="#B8962E"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const FunctionalIcon = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Strategy arrow pointing right — large */}
    <rect
      x="18"
      y="68"
      width="88"
      height="24"
      rx="4"
      fill="#0D3D4E"
      opacity="0.1"
      stroke="#0D3D4E"
      strokeWidth="1.5"
    />
    <polygon
      points="106,56 130,80 106,104"
      fill="#0D3D4E"
      opacity="0.15"
      stroke="#0D3D4E"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* "Strategy" label inside arrow */}
    {/* Three execution blocks below */}
    <rect
      x="18"
      y="118"
      width="34"
      height="26"
      rx="3"
      fill="#B8962E"
      opacity="0.2"
      stroke="#B8962E"
      strokeWidth="1.5"
    />
    <rect
      x="63"
      y="118"
      width="34"
      height="26"
      rx="3"
      fill="#B8962E"
      opacity="0.35"
      stroke="#B8962E"
      strokeWidth="1.5"
    />
    <rect
      x="108"
      y="118"
      width="34"
      height="26"
      rx="3"
      fill="#B8962E"
      opacity="0.55"
      stroke="#B8962E"
      strokeWidth="1.5"
    />
    {/* Connector lines from arrow to blocks */}
    <line
      x1="35"
      y1="92"
      x2="35"
      y2="118"
      stroke="#0D3D4E"
      strokeWidth="1.2"
      opacity="0.3"
    />
    <line
      x1="80"
      y1="92"
      x2="80"
      y2="118"
      stroke="#0D3D4E"
      strokeWidth="1.2"
      opacity="0.3"
    />
    <line
      x1="125"
      y1="104"
      x2="125"
      y2="118"
      stroke="#0D3D4E"
      strokeWidth="1.2"
      opacity="0.3"
    />
    {/* Top source block */}
    <rect
      x="55"
      y="28"
      width="50"
      height="28"
      rx="4"
      fill="#0D3D4E"
      opacity="0.12"
      stroke="#0D3D4E"
      strokeWidth="1.8"
    />
    <line
      x1="80"
      y1="56"
      x2="80"
      y2="68"
      stroke="#0D3D4E"
      strokeWidth="1.5"
      opacity="0.4"
    />
    {/* Gold accent dots */}
    <circle cx="35" cy="131" r="4" fill="#B8962E" opacity="0.7" />
    <circle cx="80" cy="131" r="4" fill="#B8962E" />
    <circle cx="125" cy="131" r="4" fill="#B8962E" opacity="0.5" />
  </svg>
);

const AIIcon = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central brain/circuit hexagon */}
    <polygon
      points="80,28 110,46 110,82 80,100 50,82 50,46"
      stroke="#0D3D4E"
      strokeWidth="2"
      fill="#EDE8DE"
    />
    {/* Inner grid lines — circuit board feel */}
    <line
      x1="50"
      y1="64"
      x2="110"
      y2="64"
      stroke="#0D3D4E"
      strokeWidth="1"
      opacity="0.18"
    />
    <line
      x1="50"
      y1="82"
      x2="110"
      y2="82"
      stroke="#0D3D4E"
      strokeWidth="1"
      opacity="0.18"
    />
    <line
      x1="65"
      y1="46"
      x2="65"
      y2="100"
      stroke="#0D3D4E"
      strokeWidth="1"
      opacity="0.18"
    />
    <line
      x1="95"
      y1="46"
      x2="95"
      y2="100"
      stroke="#0D3D4E"
      strokeWidth="1"
      opacity="0.18"
    />
    {/* Center pulsing core */}
    <circle cx="80" cy="64" r="12" fill="#B8962E" opacity="0.2" />
    <circle cx="80" cy="64" r="7" fill="#B8962E" opacity="0.5" />
    <circle cx="80" cy="64" r="3.5" fill="#B8962E" />
    {/* 6 external nodes with connection lines */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const r1 = 58,
        r2 = 74;
      const x1 = 80 + r1 * Math.cos(angle);
      const y1 = 64 + r1 * Math.sin(angle);
      const x2 = 80 + r2 * Math.cos(angle);
      const y2 = 64 + r2 * Math.sin(angle);
      return (
        <g key={i}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#B8962E"
            strokeWidth="1.5"
            opacity="0.6"
            strokeDasharray={i % 2 === 0 ? "none" : "3 2"}
          />
          <circle
            cx={x2}
            cy={y2}
            r="5"
            fill="none"
            stroke="#B8962E"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx={x2} cy={y2} r="2" fill="#B8962E" opacity="0.6" />
        </g>
      );
    })}
    {/* Outer ring hint */}
    <circle
      cx="80"
      cy="64"
      r="76"
      stroke="#B8962E"
      strokeWidth="0.8"
      opacity="0.1"
      strokeDasharray="4 6"
    />
  </svg>
);

const ICONS = [<BoardsIcon />, <CEOIcon />, <FunctionalIcon />, <AIIcon />];

function LeadershipPhilosophy() {
  const tiers = [
    {
      num: "01",
      label: "Boards",
      desc: "Shape oversight and strategic direction. Governance begins here — and cascades through every layer of the enterprise.",
    },
    {
      num: "02",
      label: "Chief Executives",
      desc: "Set vision, performance standards, and define the culture and capability of the organisation.",
    },
    {
      num: "03",
      label: "Functional Leaders",
      desc: "Translate strategy into execution across Finance, HR, Operations, Technology, and Growth.",
    },
    {
      num: "04",
      label: "AI & Emerging",
      desc: "Redefine how value is created in an era of intelligent enterprise transformation.",
    },
  ];

  return (
    <section
      style={{ background: T.cream, overflow: "hidden", position: "relative" }}
    >
      {/* Header — teal text on cream */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 64px 0" }}
      >
        <Fade>
          <SectionLabel text="Our Leadership Philosophy" />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: 16,
              gap: 40,
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(38px,5vw,64px)",
                fontWeight: 300,
                color: T.teal,
                lineHeight: 1.0,
                maxWidth: 580,
              }}
            >
              The Quality of Leadership
              <br />
              Determines the Quality
              <br />
              of Outcomes.
            </h2>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.9,
                color: T.textMid,
                maxWidth: 300,
                flexShrink: 0,
                paddingBottom: 8,
              }}
            >
              We approach every mandate with structured evaluation, market
              intelligence, and governance awareness — considering not only
              experience but judgement and cultural fit.
            </p>
          </div>
          {/* Gold rule full width */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: `linear-gradient(to right, ${T.gold}, rgba(184,150,46,0.15) 60%, transparent)`,
              marginTop: 56,
              opacity: 0.6,
            }}
          />
        </Fade>
      </div>

      {/* Four illustrated tiers */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 64px 100px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 0,
          }}
        >
          {tiers.map((tier, i) => (
            <Fade key={i} delay={i * 110}>
              <div
                style={{
                  padding: "52px 32px 52px",
                  position: "relative",
                  borderRight: i < 3 ? "1px solid rgba(13,61,78,0.08)" : "none",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Large illustration — centered, fully visible */}
                <div style={{ marginBottom: 28, flexShrink: 0 }}>
                  {ICONS[i]}
                </div>

                {/* Gold number — teal text, visible */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 13,
                    letterSpacing: "0.22em",
                    color: T.gold,
                    textTransform: "uppercase",
                    fontFamily: "'Jost',sans-serif",
                    marginBottom: 12,
                  }}
                >
                  {tier.num}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: T.teal,
                    marginBottom: 16,
                    lineHeight: 1.1,
                  }}
                >
                  {tier.label}
                </div>

                {/* Short gold rule */}
                <div
                  style={{
                    width: 28,
                    height: 1,
                    background: T.gold,
                    marginBottom: 18,
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: T.textMid,
                    maxWidth: 200,
                  }}
                >
                  {tier.desc}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* Bottom quote — on a narrow teal band */}
      <div style={{ background: T.teal, padding: "52px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade delay={400}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(18px,2.2vw,26px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "rgba(245,240,232,0.65)",
                lineHeight: 1.6,
                maxWidth: 820,
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              "Our role is to ensure that leadership capability aligns precisely
              with strategic ambition — considering not only experience, but
              judgement, adaptability, cultural alignment, and long-term
              enterprise impact."
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VisionMission — drop-in replacement component
   Animated SVG illustrations: Compass (Vision) + Leaders (Mission)
   Staggered cards: dark teal / light cream, offset vertically
   Usage: replace the <VisionMission /> call in AboutPage.jsx
═══════════════════════════════════════════════════════════════ */

const VM_CSS = `
  @keyframes vm-float-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes vm-float-med  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes vm-pulse      { 0%,100%{opacity:0.15} 50%{opacity:0.4} }
  @keyframes vm-rotate     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes vm-dash       { to{stroke-dashoffset:-40} }
  @keyframes vm-beam       { 0%,100%{opacity:0.08} 50%{opacity:0.22} }
  @keyframes vm-bob        { 0%,100%{transform:translateY(0)} 33%{transform:translateY(-3px)} 66%{transform:translateY(-1px)} }
  @keyframes vm-shimmer    { 0%,100%{opacity:0.55} 50%{opacity:1} }

  .vm-card-v { background:#0D3D4E; margin-top:0; box-shadow:0 8px 40px rgba(13,61,78,0.18); }
  .vm-card-v:hover { box-shadow:0 28px 64px rgba(13,61,78,0.32); }
  .vm-card-m { background:#F5F0E8; border:1px solid rgba(13,61,78,0.1); margin-top:0px; box-shadow:0 8px 32px rgba(13,61,78,0.06); }
  .vm-card-m:hover { box-shadow:0 28px 64px rgba(13,61,78,0.14); }

  .vm-needle { animation:vm-float-slow 3.5s ease-in-out infinite; transform-origin:260px 148px; }
  .vm-star   { animation:vm-shimmer 2.8s ease-in-out infinite; transform-origin:260px 48px; }
  .vm-ring1  { animation:vm-rotate 18s linear infinite; transform-origin:260px 148px; }
  .vm-ring2  { animation:vm-rotate 18s linear infinite reverse; transform-origin:260px 148px; }
  .vm-pulse  { animation:vm-pulse 2.8s ease-in-out infinite; }
  .vm-beam1  { animation:vm-beam 3.2s ease-in-out infinite 0s; }
  .vm-beam2  { animation:vm-beam 3.2s ease-in-out infinite 0.5s; }

  .vm-dash   { stroke-dasharray:170; animation:vm-dash 2s linear infinite; }
  .vm-cdash  { stroke-dasharray:6 4; animation:vm-dash 3s linear infinite; }

  .vm-p1 { animation:vm-bob 2.8s ease-in-out infinite 0s;   transform-origin:240px 130px; }
  .vm-p2 { animation:vm-bob 2.8s ease-in-out infinite 0.4s; transform-origin:190px 140px; }
  .vm-p3 { animation:vm-bob 2.8s ease-in-out infinite 0.7s; transform-origin:270px 144px; }
  .vm-p4 { animation:vm-bob 2.8s ease-in-out infinite 1.1s; transform-origin:155px 152px; }

  .vm-doc1   { animation:vm-float-med 4s ease-in-out infinite 0s; }
  .vm-doc2   { animation:vm-float-med 4s ease-in-out infinite 0.8s; }
  .vm-cpulse { animation:vm-pulse 2.2s ease-in-out infinite; }
`;

function VisionMission() {
  const [hoverV, setHoverV] = useState(false);
  const [hoverM, setHoverM] = useState(false);

  return (
    <section
      style={{
        background: T.creamAlt,
        padding: "120px 64px",
        overflow: "hidden",
      }}
    >
      <style>{VM_CSS}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <Fade>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 72,
              paddingBottom: 36,
              borderBottom: "1px solid rgba(13,61,78,0.08)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div style={{ width: 28, height: 1, background: T.gold }} />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: T.gold,
                  }}
                >
                  Our Foundation
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(40px,5vw,64px)",
                  fontWeight: 300,
                  color: T.teal,
                  lineHeight: 1.0,
                  margin: 0,
                }}
              >
                Vision &amp; Mission
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.85,
                color: T.textMid,
                maxWidth: 260,
                textAlign: "right",
              }}
            >
              Two commitments that define how we think, how we work, and what we
              stand for — at every engagement.
            </p>
          </div>
        </Fade>

        {/* Staggered cards */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "stretch",
          }}
        >
          {/* Gold spine */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 32,
              bottom: 64,
              width: 1,
              background: `linear-gradient(to bottom, transparent, ${T.gold} 15%, ${T.gold} 85%, transparent)`,
              opacity: 0.18,
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 32,
              width: 7,
              height: 7,
              background: T.gold,
              borderRadius: "50%",
              transform: "translateX(-50%)",
              opacity: 0.35,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 64,
              width: 7,
              height: 7,
              background: T.gold,
              borderRadius: "50%",
              transform: "translateX(-50%)",
              opacity: 0.35,
            }}
          />

          {/* ── VISION ── */}
          <Fade delay={0}>
            <div
              className="vm-card-v"
              onMouseEnter={() => setHoverV(true)}
              onMouseLeave={() => setHoverV(false)}
              style={{
                overflow: "hidden",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
                transform: hoverV ? "translateY(-8px)" : "translateY(0)",
              }}
            >
              {/* Compass illustration */}
              <div
                style={{
                  height: 220,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <svg
                  viewBox="0 0 520 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", height: "100%" }}
                >
                  <rect width="520" height="220" fill="#0b3244" />
                  <line
                    x1="0"
                    y1="148"
                    x2="520"
                    y2="148"
                    stroke="rgba(184,150,46,0.15)"
                    strokeWidth="1"
                  />
                  <g className="vm-beam1">
                    <line
                      x1="260"
                      y1="148"
                      x2="100"
                      y2="20"
                      stroke="rgba(184,150,46,0.1)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="260"
                      y1="148"
                      x2="420"
                      y2="20"
                      stroke="rgba(184,150,46,0.1)"
                      strokeWidth="1.5"
                    />
                  </g>
                  <g className="vm-beam2">
                    <line
                      x1="260"
                      y1="148"
                      x2="170"
                      y2="20"
                      stroke="rgba(184,150,46,0.06)"
                      strokeWidth="1"
                    />
                    <line
                      x1="260"
                      y1="148"
                      x2="350"
                      y2="20"
                      stroke="rgba(184,150,46,0.06)"
                      strokeWidth="1"
                    />
                  </g>
                  <circle
                    className="vm-ring1"
                    cx="260"
                    cy="148"
                    r="52"
                    stroke="rgba(184,150,46,0.18)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    className="vm-ring2"
                    cx="260"
                    cy="148"
                    r="52"
                    stroke="rgba(184,150,46,0.1)"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    fill="none"
                  />
                  <circle
                    cx="260"
                    cy="148"
                    r="38"
                    fill="rgba(13,61,78,0.85)"
                    stroke="rgba(184,150,46,0.45)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="260"
                    cy="148"
                    r="26"
                    fill="rgba(13,61,78,0.6)"
                    stroke="rgba(184,150,46,0.2)"
                    strokeWidth="0.8"
                  />
                  <g className="vm-needle">
                    <polygon
                      points="260,105 255,148 260,142 265,148"
                      fill="#B8962E"
                      opacity="0.9"
                    />
                    <polygon
                      points="260,191 255,148 260,154 265,148"
                      fill="rgba(184,150,46,0.3)"
                    />
                  </g>
                  <circle cx="260" cy="148" r="5" fill="#B8962E" />
                  <circle
                    cx="260"
                    cy="148"
                    r="2.5"
                    fill="rgba(255,255,255,0.8)"
                  />
                  <line
                    x1="260"
                    y1="112"
                    x2="260"
                    y2="118"
                    stroke="rgba(184,150,46,0.7)"
                    strokeWidth="2"
                  />
                  <line
                    x1="296"
                    y1="148"
                    x2="290"
                    y2="148"
                    stroke="rgba(184,150,46,0.4)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="260"
                    y1="184"
                    x2="260"
                    y2="178"
                    stroke="rgba(184,150,46,0.4)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="224"
                    y1="148"
                    x2="230"
                    y2="148"
                    stroke="rgba(184,150,46,0.4)"
                    strokeWidth="1.5"
                  />
                  <g className="vm-star">
                    <polygon
                      points="260,34 263,44 273,44 265,50 268,60 260,54 252,60 255,50 247,44 257,44"
                      fill="#B8962E"
                      opacity="0.9"
                    />
                  </g>
                  <circle
                    className="vm-pulse"
                    cx="260"
                    cy="48"
                    r="20"
                    fill="none"
                    stroke="rgba(184,150,46,0.3)"
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="260"
                    cy="162"
                    rx="75"
                    ry="7"
                    fill="rgba(184,150,46,0.05)"
                  />
                  <text
                    x="490"
                    y="215"
                    fontFamily="Georgia,serif"
                    fontSize="150"
                    fontWeight="300"
                    fill="rgba(184,150,46,0.04)"
                    textAnchor="end"
                  >
                    V
                  </text>
                </svg>
              </div>
              {/* Text */}
              <div style={{ padding: "36px 40px 44px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ width: 20, height: 1, background: T.gold }} />
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: T.gold,
                    }}
                  >
                    Vision — 01
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(26px,2.6vw,38px)",
                    fontWeight: 300,
                    color: T.white,
                    lineHeight: 1.15,
                    marginBottom: 24,
                  }}
                >
                  Defined by Clarity.
                  <br />
                  Trusted Where
                  <br />
                  It Matters.
                </h3>
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: T.gold,
                    opacity: 0.5,
                    marginBottom: 20,
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "rgba(245,240,232,0.58)",
                    margin: 0,
                  }}
                >
                  To grow into a company defined by clarity, disciplined
                  judgement, and purposeful action — a company that thinks
                  deeply, acts with conviction, and stands trusted where
                  decisions carry weight.
                </p>
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 20,
                    borderTop: "1px solid rgba(245,240,232,0.07)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.25)",
                    }}
                  >
                    Core principle
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 17,
                      fontStyle: "italic",
                      color: T.gold,
                      opacity: 0.8,
                    }}
                  >
                    Clarity
                  </span>
                </div>
              </div>
            </div>
          </Fade>

          {/* ── MISSION ── */}
          <Fade delay={200}>
            <div
              className="vm-card-m"
              onMouseEnter={() => setHoverM(true)}
              onMouseLeave={() => setHoverM(false)}
              style={{
                overflow: "hidden",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
                transform: hoverM ? "translateY(-8px)" : "translateY(0)",
                height: "100%",
              }}
            >
              {/* Leaders illustration */}
              <div
                style={{
                  height: 220,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <svg
                  viewBox="0 0 520 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", height: "100%" }}
                >
                  <rect width="520" height="220" fill="#EDE8DE" />
                  <g className="vm-cdash">
                    <line
                      x1="60"
                      y1="60"
                      x2="285"
                      y2="150"
                      stroke="rgba(13,61,78,0.12)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="75"
                      y1="178"
                      x2="285"
                      y2="150"
                      stroke="rgba(13,61,78,0.12)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="28"
                      y1="118"
                      x2="285"
                      y2="150"
                      stroke="rgba(13,61,78,0.08)"
                      strokeWidth="1"
                    />
                  </g>
                  <line
                    className="vm-dash"
                    x1="290"
                    y1="150"
                    x2="468"
                    y2="150"
                    stroke="#B8962E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="455,140 468,150 455,160"
                    stroke="#B8962E"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Person 1 — lead */}
                  <g className="vm-p1">
                    <circle
                      cx="240"
                      cy="102"
                      r="14"
                      fill="#0D3D4E"
                      opacity="0.75"
                    />
                    <ellipse
                      cx="240"
                      cy="135"
                      rx="12"
                      ry="18"
                      fill="#0D3D4E"
                      opacity="0.65"
                    />
                    <line
                      x1="240"
                      y1="118"
                      x2="240"
                      y2="133"
                      stroke="#B8962E"
                      strokeWidth="2.5"
                      opacity="0.85"
                    />
                  </g>
                  {/* Person 2 */}
                  <g className="vm-p2">
                    <circle
                      cx="190"
                      cy="116"
                      r="11"
                      fill="#0D3D4E"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="190"
                      cy="144"
                      rx="9"
                      ry="14"
                      fill="#0D3D4E"
                      opacity="0.45"
                    />
                  </g>
                  {/* Person 3 */}
                  <g className="vm-p3">
                    <circle
                      cx="272"
                      cy="119"
                      r="10"
                      fill="#0D3D4E"
                      opacity="0.45"
                    />
                    <ellipse
                      cx="272"
                      cy="147"
                      rx="8"
                      ry="13"
                      fill="#0D3D4E"
                      opacity="0.4"
                    />
                  </g>
                  {/* Person 4 */}
                  <g className="vm-p4">
                    <circle
                      cx="152"
                      cy="132"
                      r="9"
                      fill="#0D3D4E"
                      opacity="0.28"
                    />
                    <ellipse
                      cx="152"
                      cy="157"
                      rx="7"
                      ry="11"
                      fill="#0D3D4E"
                      opacity="0.25"
                    />
                  </g>
                  <ellipse
                    cx="230"
                    cy="162"
                    rx="65"
                    ry="5"
                    fill="rgba(13,61,78,0.05)"
                  />
                  <circle
                    className="vm-cpulse"
                    cx="290"
                    cy="150"
                    r="14"
                    fill="rgba(184,150,46,0.12)"
                    stroke="none"
                  />
                  <circle cx="290" cy="150" r="6" fill="rgba(184,150,46,0.3)" />
                  <circle cx="290" cy="150" r="3" fill="#B8962E" />
                  {/* Complexity docs */}
                  <g className="vm-doc1" opacity="0.22">
                    <rect
                      x="28"
                      y="46"
                      width="34"
                      height="22"
                      rx="3"
                      stroke="#0D3D4E"
                      strokeWidth="1"
                      fill="none"
                    />
                    <line
                      x1="36"
                      y1="54"
                      x2="54"
                      y2="54"
                      stroke="#0D3D4E"
                      strokeWidth="1"
                    />
                    <line
                      x1="36"
                      y1="59"
                      x2="50"
                      y2="59"
                      stroke="#0D3D4E"
                      strokeWidth="1"
                    />
                  </g>
                  <g className="vm-doc2" opacity="0.18">
                    <rect
                      x="24"
                      y="162"
                      width="36"
                      height="22"
                      rx="3"
                      stroke="#0D3D4E"
                      strokeWidth="1"
                      fill="none"
                    />
                    <line
                      x1="32"
                      y1="170"
                      x2="52"
                      y2="170"
                      stroke="#0D3D4E"
                      strokeWidth="1"
                    />
                    <line
                      x1="32"
                      y1="175"
                      x2="46"
                      y2="175"
                      stroke="#0D3D4E"
                      strokeWidth="1"
                    />
                  </g>
                  <text
                    x="490"
                    y="215"
                    fontFamily="Georgia,serif"
                    fontSize="150"
                    fontWeight="300"
                    fill="rgba(13,61,78,0.045)"
                    textAnchor="end"
                  >
                    M
                  </text>
                </svg>
              </div>
              {/* Text */}
              <div style={{ padding: "36px 40px 44px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ width: 20, height: 1, background: T.gold }} />
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: T.gold,
                    }}
                  >
                    Mission — 02
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(26px,2.6vw,38px)",
                    fontWeight: 300,
                    color: T.teal,
                    lineHeight: 1.15,
                    marginBottom: 24,
                  }}
                >
                  Strengthening
                  <br />
                  Leadership
                  <br />
                  Decisions.
                </h3>
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: T.gold,
                    marginBottom: 20,
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: T.textMid,
                    margin: 0,
                  }}
                >
                  To strengthen leadership decisions by delivering deep
                  evaluation, strategic clarity, and discreet guidance that
                  converts complexity into confident, forward-moving action.
                </p>
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 20,
                    borderTop: "1px solid rgba(13,61,78,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: T.textMuted,
                    }}
                  >
                    Core principle
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 17,
                      fontStyle: "italic",
                      color: T.gold,
                    }}
                  >
                    Conviction
                  </span>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ setPage }) {
  const [openAcc, setOpenAcc] = useState(null);
  const values = [
    {
      name: "Clarity Over Noise",
      desc: "We cut through complexity to reach what is true and essential.",
    },
    {
      name: "Depth Before Decisions",
      desc: "We evaluate rigorously and think beyond the obvious.",
    },
    {
      name: "Discretion in Everything",
      desc: "We safeguard trust through silence, restraint, and confidentiality.",
    },
    {
      name: "Integrity Without Compromise",
      desc: "We honour our word, uphold our standards, and choose principles over convenience.",
    },
    {
      name: "Influence Through Insight",
      desc: "We shape decisions through judgement, not volume — impact through understanding, not force.",
    },
    {
      name: "Purposeful Action",
      desc: "We move with intention, discipline, and a commitment to meaningful outcomes.",
    },
  ];

  return (
    <div>
      <style>{ABOUT_CSS}</style>

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
          className="ab-hero-img"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85"
          alt="Advisory boardroom"
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
              "linear-gradient(to right, rgba(13,61,78,0.5) 0%, transparent 55%)",
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
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 80,
            alignItems: "flex-end",
          }}
        >
          <div>
            <div className="ab-load-1">
              <SectionLabel text="About PivotEdge Partners" light />
            </div>
            <h1
              className="ab-load-2"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(60px,7.5vw,100px)",
                fontWeight: 300,
                lineHeight: 0.98,
                color: T.white,
                margin: "16px 0 0",
              }}
            >
              Advisors to
              <br />
              Consequential
              <br />
              Decisions.
            </h1>
          </div>
          <div className="ab-load-3" style={{ paddingBottom: 6 }}>
            <div
              style={{
                width: 48,
                height: 1,
                background: T.gold,
                marginBottom: 28,
              }}
            />
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.75)",
                marginBottom: 20,
              }}
            >
              Leadership decisions shape the trajectory of organisations. The
              right appointment strengthens governance, sharpens execution, and
              positions the enterprise for sustained growth.
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              The wrong one creates friction, delay, and strategic drift. We
              exist to ensure that never happens.
            </p>
          </div>
        </div>

        {/* scroll cue */}
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
            className="ab-scroll-line"
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

      {/* ══════ 2. VISION & MISSION — staggered offset cards ══════ */}
      <VisionMission />

      {/* ══════ 3. PULL QUOTE ══════ */}
      <section
        style={{
          background: T.teal,
          padding: "96px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            left: 20,
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 500,
            fontWeight: 300,
            lineHeight: 1,
            color: T.white,
            opacity: 0.025,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          "
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px,rgba(255,255,255,0.03) 1px,transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Fade>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(36px,5.5vw,72px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: T.white,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              "Leadership is not defined
              <br />
              by title. It is defined by impact."
            </blockquote>
          </Fade>
        </div>
      </section>

      {/* ══════ 4. WHO WE ARE — wipe image + text ══════ */}
      <section
        style={{
          background: T.cream,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 680,
        }}
      >
        <Wipe
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80"
          alt="Advisory team"
          style={{ minHeight: 680 }}
        />
        <Fade
          delay={200}
          style={{
            padding: "96px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SectionLabel text="Who We Are" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(36px,4vw,56px)",
              fontWeight: 300,
              color: T.teal,
              lineHeight: 1.1,
              marginBottom: 36,
            }}
          >
            A Different Kind
            <br />
            of Advisory Firm.
          </h2>
          <div
            style={{
              width: 48,
              height: 1,
              background: T.gold,
              marginBottom: 32,
            }}
          />
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.9,
              color: T.textMid,
              marginBottom: 24,
            }}
          >
            We are advisors entrusted with consequential decisions. Our work
            spans Executive Search, Board and Governance appointments, CEO
            succession, and emerging leadership domains such as Artificial
            Intelligence.
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.9,
              color: T.textMid,
              marginBottom: 40,
            }}
          >
            We combine market intelligence, rigorous assessment, and governance
            awareness to identify leaders who align with both strategic ambition
            and organisational culture.
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 19,
              fontWeight: 300,
              fontStyle: "italic",
              color: T.teal,
              lineHeight: 1.55,
              paddingLeft: 24,
              borderLeft: `2px solid ${T.gold}`,
            }}
          >
            "Executive search is not a transactional activity. It is a long-term
            partnership grounded in trust, judgement, and accountability."
          </p>
        </Fade>
      </section>

      {/* ══════ 5. LEADERSHIP PHILOSOPHY — illustrated horizontal strip ══════ */}
      <LeadershipPhilosophy />

      {/* ══════ 6. HOW WE WORK — image with floating block + accordions ══════ */}
      <section style={{ background: T.cream, padding: "130px 64px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 100,
            alignItems: "center",
          }}
        >
          {/* image col */}
          <Fade style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              <Wipe
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=900&q=80"
                alt="Our methodology"
                style={{ height: 580, width: "100%" }}
              />
              {/* floating teal accent — overlapping bottom-right */}
              <div
                style={{
                  position: "absolute",
                  bottom: -32,
                  right: -32,
                  background: T.teal,
                  padding: "40px 48px",
                  zIndex: 2,
                  boxShadow: "0 0 0 1px rgba(184,150,46,0.2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(184,150,46,0.7)",
                    marginBottom: 12,
                  }}
                >
                  Our Methodology
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 34,
                    fontWeight: 300,
                    color: T.white,
                    lineHeight: 1.2,
                  }}
                >
                  Depth.
                  <br />
                  Precision.
                  <br />
                  Fit.
                </div>
              </div>
            </div>
          </Fade>

          {/* accordions col */}
          <Fade delay={200} style={{ paddingBottom: 32 }}>
            <SectionLabel text="Our Practice" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(34px,4vw,54px)",
                fontWeight: 300,
                color: T.teal,
                lineHeight: 1.1,
                marginBottom: 48,
              }}
            >
              How We Think.
              <br />
              How We Work.
            </h2>

            <Acc
              title="How We Work"
              index={1}
              openAcc={openAcc}
              setOpenAcc={setOpenAcc}
            >
              <p style={{ marginBottom: 14 }}>
                Every engagement begins with clarity. We seek to understand the
                organisation's strategic direction, operational realities,
                cultural dynamics, and governance expectations before defining
                the leadership mandate.
              </p>
              <p>
                Our methodology emphasises depth over speed, precision over
                volume, and fit over familiarity.
              </p>
            </Acc>
            <Acc
              title="Our Perspective on Leadership"
              index={2}
              openAcc={openAcc}
              setOpenAcc={setOpenAcc}
            >
              <p style={{ marginBottom: 14 }}>
                Leadership effectiveness extends beyond functional competence.
                It requires strategic judgement, adaptability, ethical
                grounding, and the ability to mobilise teams in complex
                environments.
              </p>
              <p>
                We assess leaders not only for what they have achieved, but for
                how they think, how they decide, and how they build sustainable
                performance.
              </p>
            </Acc>
            <Acc
              title="Our Commitment"
              index={3}
              openAcc={openAcc}
              setOpenAcc={setOpenAcc}
            >
              <p style={{ marginBottom: 14 }}>
                We operate with integrity, confidentiality, and professional
                discipline across every engagement.
              </p>
              <p>
                Our objective is not merely to fill positions, but to strengthen
                organisations through leadership alignment. When leadership is
                right, organisations move with confidence.
              </p>
            </Acc>
            <Acc
              title="What We Work On"
              index={4}
              openAcc={openAcc}
              setOpenAcc={setOpenAcc}
            >
              <p>
                Our work spans Executive Search, Board and Governance
                appointments, CEO succession, Interim Management, Career
                Transition advisory, and AI leadership — treated as a horizontal
                capability across industries.
              </p>
            </Acc>
          </Fade>
        </div>
      </section>

      {/* ══════ 7. CORE VALUES — teal with image header ══════ */}
      <section style={{ background: T.teal, overflow: "hidden" }}>
        {/* full-bleed image fading into teal */}
        <div style={{ position: "relative", height: 360, overflow: "hidden" }}>
          <Wipe
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=80"
            alt="Core values"
            style={{ height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(13,61,78,0.15) 0%, rgba(13,61,78,0.7) 60%, rgba(13,61,78,1) 100%)",
            }}
          />
          {/* heading overlaid on image */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 64px 44px",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <Fade>
              <SectionLabel text="Core Values" light />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(36px,4.5vw,62px)",
                  fontWeight: 300,
                  color: T.white,
                  lineHeight: 1.05,
                }}
              >
                Six Principles That Define Our Practice.
              </h2>
            </Fade>
          </div>
        </div>

        {/* values grid */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px 112px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
          }}
        >
          {values.map((v, i) => (
            <Fade key={i} delay={i * 70}>
              <div
                className="val-card"
                style={{
                  padding: "52px 44px",
                  borderRight:
                    (i + 1) % 3 !== 0
                      ? "1px solid rgba(245,240,232,0.07)"
                      : "none",
                  borderBottom:
                    i < 3 ? "1px solid rgba(245,240,232,0.07)" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 20,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 110,
                    fontWeight: 300,
                    color: T.gold,
                    opacity: 0.045,
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    width: 28,
                    height: 1,
                    background: T.gold,
                    marginBottom: 28,
                    opacity: 0.65,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: T.white,
                    marginBottom: 14,
                    lineHeight: 1.2,
                  }}
                >
                  {v.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "rgba(245,240,232,0.5)",
                  }}
                >
                  {v.desc}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}
