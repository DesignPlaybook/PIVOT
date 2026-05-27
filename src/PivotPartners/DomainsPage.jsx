import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";

/* ─── IntersectionObserver hook ─── */
function useIO(threshold = 0, rootMargin = "0px 0px -40px 0px") {
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
      { threshold, rootMargin },
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

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useIO();
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1400;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [vis, target]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════
   HERO — atmospheric with floating labels
══════════════════════════════════════ */
const HERO_CSS = `
  @keyframes dm-float-1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes dm-float-2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes dm-float-3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-15px)} }
  @keyframes dm-fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes dm-line-draw { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
  @keyframes dm-node-pulse { 0%,100%{r:4;opacity:0.6} 50%{r:6;opacity:1} }
  @keyframes dm-hex-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes dm-neural-draw { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
  .dm-sector-tag {
    position:absolute; background:rgba(13,61,78,0.85); border:1px solid rgba(184,150,46,0.4);
    padding:8px 18px; backdrop-filter:blur(8px);
    font-family:"Jost",sans-serif; font-size:10px; letter-spacing:0.22em;
    text-transform:uppercase; color:rgba(245,240,232,0.8);
    white-space:nowrap; pointer-events:none;
  }
  .dm-sector-tag::before {
    content:""; position:absolute; left:-20px; top:50%; width:16px; height:1px;
    background:rgba(184,150,46,0.6); transform:translateY(-50%);
  }
  .acc-industry { overflow:hidden; transition:all 0.7s cubic-bezier(0.77,0,0.175,1); cursor:pointer; }
  .acc-industry.closed { height:72px; }
  .acc-industry.open { height:480px; }
  .hex-cell { transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); cursor:default; }
  .hex-cell:hover { transform:translateY(-6px); }
  .fn-glyph { transition:all 0.4s ease; }
  .hex-cell:hover .fn-glyph { opacity:1 !important; }
`;

/* ─── SVG World silhouette (simplified path for atmosphere) ─── */
function WorldSVG({ vis }) {
  return (
    <svg
      viewBox="0 0 900 400"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        opacity: 0.07,
      }}
    >
      {/* Simplified continental shapes */}
      {/* Americas */}
      <path
        d="M 120 80 Q 140 60 160 90 L 170 160 Q 155 200 140 240 Q 120 300 100 320 Q 80 300 90 260 L 80 180 Q 90 120 120 80 Z"
        fill="none"
        stroke={T.white}
        strokeWidth="1"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: vis ? 0 : 600,
          transition: "stroke-dashoffset 2.5s ease 0.5s",
        }}
      />
      {/* Europe/Africa */}
      <path
        d="M 380 60 Q 420 50 440 80 L 450 130 Q 440 150 420 160 L 430 200 Q 450 260 440 320 Q 410 340 390 310 L 370 240 Q 350 180 360 130 Q 365 90 380 60 Z"
        fill="none"
        stroke={T.white}
        strokeWidth="1"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: vis ? 0 : 600,
          transition: "stroke-dashoffset 2.5s ease 0.8s",
        }}
      />
      {/* Asia */}
      <path
        d="M 500 50 Q 580 40 640 70 L 680 100 Q 720 130 700 180 Q 660 220 620 210 L 560 230 Q 520 240 500 210 L 480 160 Q 470 110 500 50 Z"
        fill="none"
        stroke={T.white}
        strokeWidth="1"
        style={{
          strokeDasharray: 700,
          strokeDashoffset: vis ? 0 : 700,
          transition: "stroke-dashoffset 2.5s ease 1.1s",
        }}
      />
      {/* Australia */}
      <path
        d="M 680 270 Q 720 260 740 290 L 745 330 Q 730 355 700 350 Q 670 345 665 315 Q 660 285 680 270 Z"
        fill="none"
        stroke={T.white}
        strokeWidth="1"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: vis ? 0 : 300,
          transition: "stroke-dashoffset 2s ease 1.4s",
        }}
      />
      {/* Grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={100 * (i + 1)}
          x2="900"
          y2={100 * (i + 1)}
          stroke={T.white}
          strokeWidth="0.4"
          strokeDasharray="4 12"
          opacity={0.4}
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={`v${i}`}
          x1={112 * (i + 1)}
          y1="0"
          x2={112 * (i + 1)}
          y2="400"
          stroke={T.white}
          strokeWidth="0.4"
          strokeDasharray="4 12"
          opacity={0.4}
        />
      ))}
    </svg>
  );
}

/* ─── Accordion Industry strip ─── */
function IndustryAccordion({ industries }) {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ background: T.cream }}>
      {industries.map((ind, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`acc-industry ${isOpen ? "open" : "closed"}`}
            onClick={() => setOpen(i)}
            style={{
              position: "relative",
              borderBottom: `1px solid rgba(13,61,78,0.1)`,
            }}
          >
            {/* Closed state — thin strip */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 72,
                display: "flex",
                alignItems: "center",
                padding: "0 64px",
                justifyContent: "space-between",
                zIndex: 3,
                background: isOpen ? "transparent" : T.cream,
                transition: "background 0.5s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 13,
                    color: T.gold,
                    opacity: isOpen ? 0.9 : 0.5,
                    minWidth: 28,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isOpen
                      ? "clamp(22px,2.5vw,32px)"
                      : "clamp(20px,2vw,28px)",
                    fontWeight: 300,
                    color: isOpen ? T.white : T.teal,
                    transition: "all 0.5s ease",
                    letterSpacing: isOpen ? "-0.01em" : 0,
                  }}
                >
                  {ind.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isOpen ? T.gold : T.textMuted,
                    opacity: isOpen ? 1 : 0.7,
                    transition: "color 0.4s ease, opacity 0.4s ease",
                  }}
                >
                  {ind.fn}
                </span>
              </div>
              {/* Plus / minus indicator */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: `1px solid ${isOpen ? T.gold : "rgba(13,61,78,0.2)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 18,
                    lineHeight: 1,
                    color: isOpen ? T.gold : T.teal,
                    display: "inline-block",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition:
                      "transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s ease",
                  }}
                >
                  +
                </span>
              </div>
            </div>

            {/* Open state — full content band */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.5s ease 0.1s",
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              {/* Full-bleed photo */}
              <img
                src={ind.img}
                alt={ind.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: ind.pos || "center",
                  filter: "brightness(0.22) saturate(0.5)",
                }}
              />
              {/* Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, rgba(13,61,78,0.97) 0%, rgba(13,61,78,0.8) 45%, rgba(13,61,78,0.3) 100%)",
                }}
              />
              {/* Gold top edge */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, ${T.gold}, transparent 60%)`,
                  opacity: 0.8,
                }}
              />

              {/* Content — positioned below the 72px header */}
              <div
                style={{
                  position: "absolute",
                  top: 80,
                  left: 64,
                  right: 64,
                  bottom: 40,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 48,
                  alignItems: "start",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s",
                }}
              >
                {/* Description */}
                <div style={{ gridColumn: "1 / 3" }}>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: "rgba(245,240,232,0.78)",
                      marginBottom: 32,
                      maxWidth: 560,
                    }}
                  >
                    {ind.d}
                  </p>
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {ind.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 9,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: T.gold,
                          padding: "6px 14px",
                          border: "1px solid rgba(184,150,46,0.35)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stat box */}
                <div
                  style={{
                    borderLeft: `1px solid rgba(184,150,46,0.25)`,
                    paddingLeft: 40,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 64,
                      fontWeight: 300,
                      color: T.gold,
                      opacity: 0.35,
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 1,
                      background: T.gold,
                      marginBottom: 20,
                      opacity: 0.5,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(245,240,232,0.5)",
                      fontStyle: "italic",
                    }}
                  >
                    {ind.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Hexagonal function grid ─── */
const HEX_ICONS = {
  "Boards & Governance": (
    <g>
      <ellipse
        cx="50"
        cy="58"
        rx="28"
        ry="11"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="50" cy="44" r="5" fill={T.gold} opacity="0.8" />
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        const r = 20;
        return (
          <g key={i}>
            <circle
              cx={50 + r * Math.cos(a)}
              cy={58 + 11 * Math.sin(a)}
              r="3"
              fill={T.white}
              opacity="0.5"
            />
          </g>
        );
      })}
      <line
        x1="50"
        y1="49"
        x2="50"
        y2="47"
        stroke={T.gold}
        strokeWidth="1"
        opacity="0.6"
      />
    </g>
  ),
  "Chief Executive Officer": (
    <g>
      <circle
        cx="50"
        cy="46"
        r="14"
        stroke={T.white}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <polyline
        points="38,42 44,32 50,26 56,32 62,42"
        stroke={T.gold}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="38" y1="42" x2="62" y2="42" stroke={T.gold} strokeWidth="1.5" />
      <path
        d="M32 72 Q32 58 50 58 Q68 58 68 72"
        stroke={T.white}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </g>
  ),
  "Chief Financial Officer": (
    <g>
      <rect
        x="30"
        y="36"
        width="40"
        height="30"
        rx="2"
        stroke={T.white}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        style={{
          fontFamily: "serif",
          fontSize: 18,
          fill: T.gold,
          fontWeight: 300,
        }}
      >
        ₤
      </text>
      <line
        x1="30"
        y1="44"
        x2="70"
        y2="44"
        stroke={T.gold}
        strokeWidth="1"
        opacity="0.4"
      />
    </g>
  ),
  "Marketing & Sales": (
    <g>
      <polyline
        points="28,68 40,50 52,58 64,36 72,42"
        stroke={T.gold}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="40" cy="50" r="3" fill={T.gold} />
      <circle cx="52" cy="58" r="3" fill={T.gold} />
      <circle cx="64" cy="36" r="3" fill={T.gold} />
      <polyline
        points="60,36 64,36 64,40"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
  "Human Resources": (
    <g>
      <circle
        cx="43"
        cy="42"
        r="9"
        stroke={T.white}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <circle
        cx="57"
        cy="42"
        r="9"
        stroke={T.white}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M28 70 Q28 56 43 56 Q50 56 50 56 Q50 56 57 56 Q72 56 72 70"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      <line
        x1="50"
        y1="48"
        x2="50"
        y2="56"
        stroke={T.gold}
        strokeWidth="1"
        opacity="0.5"
      />
    </g>
  ),
  "Supply Chain": (
    <g>
      <rect
        x="26"
        y="52"
        width="16"
        height="14"
        rx="1"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="50"
        y="44"
        width="16"
        height="14"
        rx="1"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="74"
        y="52"
        width="16"
        height="14"
        rx="1"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <line
        x1="42"
        y1="59"
        x2="50"
        y2="52"
        stroke={T.white}
        strokeWidth="1.2"
        opacity="0.5"
      />
      <line
        x1="66"
        y1="52"
        x2="74"
        y2="58"
        stroke={T.white}
        strokeWidth="1.2"
        opacity="0.5"
      />
      <circle cx="46" cy="55" r="2" fill={T.gold} opacity="0.7" />
      <circle cx="70" cy="55" r="2" fill={T.gold} opacity="0.7" />
    </g>
  ),
  "CSR & Sustainability": (
    <g>
      <path
        d="M50 28 Q62 32 66 44 Q70 58 58 66 Q50 72 42 66 Q30 58 34 44 Q38 32 50 28Z"
        stroke={T.gold}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M50 36 Q38 48 50 60 Q62 48 50 36Z"
        stroke={T.white}
        strokeWidth="1"
        fill="rgba(184,150,46,0.15)"
        opacity="0.9"
      />
    </g>
  ),
  "Artificial Intelligence": (
    <g>
      <circle cx="50" cy="50" r="8" fill={T.gold} opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill={T.gold} opacity="0.8" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        const r1 = 16,
          r2 = 26;
        const x1 = 50 + r1 * Math.cos(a),
          y1 = 50 + r1 * Math.sin(a);
        const x2 = 50 + r2 * Math.cos(a),
          y2 = 50 + r2 * Math.sin(a);
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={T.gold}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle
              cx={x2}
              cy={y2}
              r="4"
              fill="none"
              stroke={T.white}
              strokeWidth="1.2"
              opacity="0.6"
            />
          </g>
        );
      })}
    </g>
  ),
};

function HexGrid() {
  const [ref, vis] = useIO(0.05);
  const functions = [
    { n: "Boards & Governance", sub: "Director & Committee Appointments" },
    { n: "Chief Executive Officer", sub: "Group CEO · MD · Country Head" },
    { n: "Chief Financial Officer", sub: "CFO · Finance Transformation" },
    { n: "Marketing & Sales", sub: "CMO · CCO · Growth Leaders" },
    { n: "Human Resources", sub: "CHRO · Talent & OD Leaders" },
    { n: "Supply Chain", sub: "Operations · Logistics · Procurement" },
    { n: "CSR & Sustainability", sub: "ESG · Responsible Business" },
    { n: "Artificial Intelligence", sub: "CAIO · CDO · Data Science" },
  ];

  // Two rows: 4 + 4, offset second row
  const row1 = functions.slice(0, 4);
  const row2 = functions.slice(4, 8);
  const hexW = 200,
    hexH = 190,
    offsetX = hexW * 0.5;

  return (
    <div ref={ref} style={{ overflowX: "auto", paddingBottom: 20 }}>
      <div
        style={{
          position: "relative",
          width: hexW * 4 + 80,
          height: hexH * 2 + 60,
          minWidth: 860,
          margin: "0 auto",
        }}
      >
        {row1.map((fn, i) => (
          <HexCell
            key={i}
            fn={fn}
            x={i * hexW + 20}
            y={0}
            delay={i * 90}
            vis={vis}
          />
        ))}
        {row2.map((fn, i) => (
          <HexCell
            key={i + 4}
            fn={fn}
            x={i * hexW + offsetX + 20}
            y={hexH * 0.82}
            delay={(i + 4) * 90}
            vis={vis}
          />
        ))}
      </div>
    </div>
  );
}

function HexCell({ fn, x, y, delay, vis }) {
  const [hovered, setHovered] = useState(false);
  const w = 160,
    h = 148;
  // Flat-top hexagon points
  const pts = [
    [w * 0.25, 0],
    [w * 0.75, 0],
    [w, h * 0.5],
    [w * 0.75, h],
    [w * 0.25, h],
    [0, h * 0.5],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(" ");

  return (
    <div
      className="hex-cell"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        opacity: vis ? 1 : 0,
        transform: vis
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform ${hovered ? "0.35s cubic-bezier(0.16,1,0.3,1)" : `0.6s ease ${delay}ms`}`,
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* Hex fill */}
        <polygon
          points={pts}
          fill={hovered ? T.teal : T.creamAlt}
          stroke={hovered ? T.gold : "rgba(13,61,78,0.15)"}
          strokeWidth={hovered ? 1.5 : 1}
          style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
        />
        {/* Icon */}
        <g className="fn-glyph" style={{ opacity: hovered ? 1 : 0.55 }}>
          {HEX_ICONS[fn.n]}
        </g>
      </svg>
      {/* Label below hex */}
      <div
        style={{
          position: "absolute",
          bottom: -44,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            fontWeight: 400,
            color: hovered ? T.gold : T.teal,
            lineHeight: 1.2,
            transition: "color 0.3s ease",
            marginBottom: 4,
          }}
        >
          {fn.n}
        </div>
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 9,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: T.textMuted,
            lineHeight: 1.4,
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.3s ease",
          }}
        >
          {fn.sub}
        </div>
      </div>
    </div>
  );
}

/* ─── Animated Neural Network SVG for AI section ─── */
function NeuralNetwork({ vis }) {
  const nodes = [
    // Input layer
    { x: 80, y: 120 },
    { x: 80, y: 200 },
    { x: 80, y: 280 },
    { x: 80, y: 360 },
    // Hidden 1
    { x: 240, y: 100 },
    { x: 240, y: 180 },
    { x: 240, y: 260 },
    { x: 240, y: 340 },
    { x: 240, y: 420 },
    // Hidden 2
    { x: 400, y: 140 },
    { x: 400, y: 220 },
    { x: 400, y: 300 },
    { x: 400, y: 380 },
    // Output
    { x: 560, y: 160 },
    { x: 560, y: 240 },
    { x: 560, y: 320 },
  ];

  const connections = [];
  // Input → H1
  for (let i = 0; i < 4; i++)
    for (let j = 4; j < 9; j++) connections.push([i, j]);
  // H1 → H2
  for (let i = 4; i < 9; i++)
    for (let j = 9; j < 13; j++) connections.push([i, j]);
  // H2 → Output
  for (let i = 9; i < 13; i++)
    for (let j = 13; j < 16; j++) connections.push([i, j]);

  const layerLabels = [
    { x: 80, y: 80, label: "Market\nIntelligence" },
    { x: 240, y: 60, label: "Evaluation\nFramework" },
    { x: 400, y: 100, label: "Governance\nAssessment" },
    { x: 560, y: 120, label: "Leadership\nOutcome" },
  ];

  return (
    <svg
      viewBox="0 0 640 480"
      style={{
        width: "100%",
        maxWidth: 640,
        opacity: vis ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Connections */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={T.gold}
          strokeWidth="0.6"
          opacity="0.2"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: vis ? 0 : 200,
            transition: `stroke-dashoffset 1.2s ease ${200 + i * 8}ms`,
          }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={10}
            fill="rgba(13,61,78,0.9)"
            stroke={T.gold}
            strokeWidth="1.2"
            style={{
              opacity: vis ? 1 : 0,
              transition: `opacity 0.5s ease ${300 + i * 40}ms`,
            }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={4}
            fill={T.gold}
            opacity="0.7"
            style={{
              opacity: vis ? 0.7 : 0,
              transition: `opacity 0.4s ease ${400 + i * 40}ms`,
            }}
          />
        </g>
      ))}
      {/* Layer labels */}
      {layerLabels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 8,
            fill: "rgba(184,150,46,0.6)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: vis ? 1 : 0,
            transition: `opacity 0.5s ease ${800 + i * 100}ms`,
          }}
        >
          {l.label.split("\n").map((line, li) => (
            <tspan key={li} x={l.x} dy={li === 0 ? 0 : 12}>
              {line}
            </tspan>
          ))}
        </text>
      ))}
      {/* Vertical layer separators */}
      {[160, 320, 480].map((lx, i) => (
        <line
          key={i}
          x1={lx}
          y1="60"
          x2={lx}
          y2="440"
          stroke={T.gold}
          strokeWidth="0.5"
          strokeDasharray="3 8"
          opacity="0.2"
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function DomainsPage({ setPage }) {
  const [heroRef, heroVis] = useIO(0, "0px");

  const industries = [
    {
      name: "Industrial",
      fn: "Manufacturing & Operations Leadership",
      d: "Industrial organisations operate within cyclical markets, cost pressures, and evolving technological landscapes. We support manufacturers and industrial enterprises in appointing leaders capable of modernising operations, improving productivity, and sustaining long-term competitiveness.",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
      pos: "center 40%",
      tags: ["Manufacturing", "Operations", "Industrials", "Capital Equipment"],
      quote:
        "Operational excellence and transformation leadership for complex industrial environments.",
    },
    {
      name: "Real Estate & Infrastructure",
      fn: "Capital Markets & Asset Development",
      d: "Capital-intensive and long-cycle in nature, this sector demands disciplined leadership with strong risk management and stakeholder alignment. We work with developers, operators, and infrastructure enterprises to identify executives who can drive scale, efficiency, and asset value.",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
      pos: "center 30%",
      tags: [
        "Real Estate",
        "Infrastructure",
        "Asset Management",
        "Development",
      ],
      quote:
        "Long-cycle thinking and capital discipline for asset-intensive organisations.",
    },
    {
      name: "Consumer",
      fn: "Brand, Retail & Growth Strategy",
      d: "Rapidly shifting customer behaviour and digital disruption require agile leadership. We support consumer-facing organisations in appointing executives who understand market dynamics, brand positioning, and growth strategy across digital and physical channels.",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
      pos: "center 50%",
      tags: ["FMCG", "Retail", "E-commerce", "Brand Strategy"],
      quote:
        "Agile leaders who translate consumer insight into competitive advantage.",
    },
    {
      name: "Healthcare & Life Sciences",
      fn: "Clinical, Commercial & Regulatory",
      d: "Innovation, regulation, and societal responsibility define this sector. We identify leaders with scientific credibility, regulatory awareness, and strategic foresight to guide organisations through complexity and transformation across pharma, medtech, and healthcare services.",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80",
      pos: "center 40%",
      tags: ["Pharma", "MedTech", "Healthcare Services", "Life Sciences"],
      quote:
        "Scientific credibility paired with commercial and regulatory acumen.",
    },
    {
      name: "Banking & Financial Services",
      fn: "Risk, Compliance & Capital Performance",
      d: "Managing capital, risk, compliance, and technological change demands experienced leadership. We support financial institutions in appointing executives who can navigate regulatory landscapes while delivering sustainable performance across banking, insurance, and asset management.",
      img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1600&q=80",
      pos: "center 35%",
      tags: ["Banking", "Insurance", "Asset Management", "FinTech"],
      quote:
        "Governance discipline and strategic acumen in a demanding regulatory environment.",
    },
    {
      name: "Technology, Media & Telecom",
      fn: "Digital, Platform & Innovation",
      d: "Continuous innovation and digital disruption shape this domain. We partner with organisations to identify leaders who can harness emerging technologies, scale platforms, drive competitive differentiation, and lead transformation in an era of rapid technological change.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
      pos: "center 45%",
      tags: ["Technology", "Media", "Telecom", "Digital Platforms"],
      quote:
        "Visionary leaders who convert digital disruption into sustainable competitive advantage.",
    },
  ];

  const [aiRef, aiVis] = useIO(0.1);

  return (
    <div>
      <style>{HERO_CSS}</style>

      {/* ══════ 1. HERO — atmospheric world silhouette + floating tags ══════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          background: T.teal,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: 96,
        }}
      >
        {/* World SVG backdrop */}
        <WorldSVG vis={heroVis} />

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px,rgba(255,255,255,0.04) 1px,transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to bottom, transparent, rgba(13,61,78,0.95))",
          }}
        />

        {/* Floating sector tags */}
        {[
          {
            label: "Industrial",
            style: {
              top: "22%",
              right: "18%",
              animation: "dm-float-1 6s ease-in-out infinite",
            },
          },
          {
            label: "Financial Services",
            style: {
              top: "38%",
              right: "28%",
              animation: "dm-float-2 7.5s ease-in-out infinite 1s",
            },
          },
          {
            label: "Healthcare",
            style: {
              top: "58%",
              right: "14%",
              animation: "dm-float-3 5.5s ease-in-out infinite 0.5s",
            },
          },
          {
            label: "Technology",
            style: {
              top: "30%",
              right: "44%",
              animation: "dm-float-1 8s ease-in-out infinite 2s",
            },
          },
          {
            label: "Consumer",
            style: {
              top: "65%",
              right: "38%",
              animation: "dm-float-2 6.5s ease-in-out infinite 1.5s",
            },
          },
          {
            label: "Real Estate",
            style: {
              top: "45%",
              right: "55%",
              animation: "dm-float-3 7s ease-in-out infinite 0.8s",
            },
          },
        ].map((tag, i) => (
          <div
            key={i}
            className="dm-sector-tag"
            style={{
              ...tag.style,
              opacity: heroVis ? 1 : 0,
              transition: `opacity 0.6s ease ${600 + i * 120}ms`,
            }}
          >
            {tag.label}
          </div>
        ))}

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px",
            width: "100%",
          }}
        >
          <div
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(40px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            }}
          >
            <SectionLabel text="Industry Domains" light />
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(64px, 8.5vw, 116px)",
              fontWeight: 300,
              lineHeight: 0.95,
              color: T.white,
              margin: "20px 0 0",
              maxWidth: 700,
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(50px)",
              transition: "opacity 1s ease 0.35s, transform 1s ease 0.35s",
            }}
          >
            Six Sectors.
            <br />
            <span style={{ color: T.gold, fontStyle: "italic" }}>One</span>{" "}
            Standard.
          </h1>

          <div
            style={{
              marginTop: 56,
              display: "flex",
              alignItems: "flex-start",
              gap: 64,
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(30px)",
              transition: "opacity 1s ease 0.55s, transform 1s ease 0.55s",
            }}
          >
            <div
              style={{
                width: 1,
                height: 80,
                background: `linear-gradient(to bottom, ${T.gold}, transparent)`,
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 480,
              }}
            >
              We operate at the intersection of industry nuance and leadership
              dynamics, delivering bespoke advisory across six critical global
              markets — with the same rigour, discretion, and governance
              awareness in each.
            </p>
          </div>

          {/* Stat row */}
          <div
            style={{
              marginTop: 80,
              display: "flex",
              gap: 0,
              opacity: heroVis ? 1 : 0,
              transition: "opacity 0.8s ease 0.75s",
            }}
          >
            {[
              { v: "6", s: "", l: "Industry Sectors" },
              { v: "30", s: "+", l: "Countries" },
              { v: "500", s: "+", l: "Mandates Delivered" },
              { v: "92", s: "%", l: "Retention Rate" },
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  paddingRight: 48,
                  marginRight: 48,
                  borderRight:
                    i < 3 ? "1px solid rgba(245,240,232,0.1)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 44,
                    fontWeight: 600,
                    color: T.gold,
                    lineHeight: 1,
                  }}
                >
                  <Counter target={st.v} suffix={st.s} />
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.4)",
                    marginTop: 6,
                  }}
                >
                  {st.l}
                </div>
              </div>
            ))}
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
              background: `linear-gradient(to bottom,rgba(184,150,46,0.9),transparent)`,
              opacity: heroVis ? 1 : 0,
              transition: "opacity 0.8s ease 1.2s",
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
            Explore
          </span>
        </div>
      </section>

      {/* ══════ 2. INDUSTRY ACCORDION ══════ */}
      <section>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 64px 40px",
          }}
        >
          <Fade>
            <SectionLabel text="Six Sectors" />
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
                  fontSize: "clamp(36px,4vw,54px)",
                  fontWeight: 300,
                  color: T.teal,
                  lineHeight: 1.1,
                }}
              >
                Where We Operate
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
                Select a sector to explore our capability, focus areas, and
                leadership perspective.
              </p>
            </div>
          </Fade>
        </div>
        <IndustryAccordion industries={industries} />
      </section>

      {/* ══════ 3. FUNCTIONS — hexagonal grid ══════ */}
      <section
        style={{
          background: T.cream,
          padding: "120px 64px 160px",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ marginBottom: 72, textAlign: "center" }}>
            <SectionLabel text="Functional Expertise" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px,4vw,54px)",
                fontWeight: 300,
                color: T.teal,
                lineHeight: 1.1,
              }}
            >
              Every Function. Every Level.
            </h2>
            <p
              style={{
                fontSize: 15,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                maxWidth: 560,
                margin: "20px auto 0",
              }}
            >
              Our functional capability spans the full C-suite and board. Hover
              each discipline to explore our depth.
            </p>
          </Fade>
          <HexGrid />
        </div>
      </section>

      {/* ══════ 4. AI LEADERSHIP — full-bleed dark, neural network illustration ══════ */}
      <section
        ref={aiRef}
        style={{
          background: "#050e14",
          padding: "0",
          overflow: "hidden",
          position: "relative",
          minHeight: 600,
        }}
      >
        {/* Noise texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            opacity: 0.6,
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 64px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            {/* Neural network illustration */}
            <Fade>
              <div style={{ position: "relative" }}>
                <NeuralNetwork vis={aiVis} />
                {/* Glow under network */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: 60,
                    background: T.gold,
                    filter: "blur(40px)",
                    opacity: 0.08,
                    borderRadius: "50%",
                  }}
                />
              </div>
            </Fade>

            {/* Content */}
            <Fade delay={200}>
              <div
                style={{
                  opacity: aiVis ? 1 : 0,
                  transition: "opacity 0.8s ease 300ms",
                }}
              >
                <SectionLabel text="Emerging Domain" light />
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(34px,3.8vw,52px)",
                    fontWeight: 300,
                    color: T.white,
                    lineHeight: 1.12,
                    marginBottom: 8,
                  }}
                >
                  Leadership for
                  <br />
                  Intelligent Enterprise
                  <br />
                  Transformation.
                </h2>
                <div
                  style={{
                    width: 48,
                    height: 1,
                    background: T.gold,
                    margin: "24px 0",
                    opacity: 0.7,
                  }}
                />

                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "rgba(245,240,232,0.65)",
                    marginBottom: 20,
                  }}
                >
                  Artificial Intelligence and advanced analytics are reshaping
                  industries, operating models, and competitive dynamics. The
                  question is no longer whether to adopt AI, but how to embed it
                  responsibly, strategically, and at scale.
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "rgba(245,240,232,0.65)",
                    marginBottom: 20,
                  }}
                >
                  AI leadership demands commercial judgement, governance
                  awareness, change leadership, and the ability to translate
                  digital capability into measurable business impact.
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "rgba(245,240,232,0.65)",
                    marginBottom: 36,
                  }}
                >
                  PivotEdge Partners treats AI as a horizontal leadership
                  capability — cutting across industries and functions. We
                  identify leaders who move AI from experimentation to
                  enterprise integration.
                </p>

                {/* Typical mandates */}
                <div style={{ marginBottom: 36 }}>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: T.gold,
                      marginBottom: 16,
                      opacity: 0.8,
                    }}
                  >
                    Typical Mandates
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      "Chief AI Officers",
                      "Chief Digital Officers",
                      "Heads of Data Science",
                      "AI Strategy Leaders",
                      "Intelligent Automation",
                      "Responsible AI & Governance",
                    ].map((m, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 10,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          background: "rgba(184,150,46,0.1)",
                          border: "1px solid rgba(184,150,46,0.25)",
                          color: "rgba(245,240,232,0.6)",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    setPage("Contact");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span>Discuss AI Leadership</span>
                </button>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ══════ 5. CLOSING PULL QUOTE ══════ */}
      <section
        style={{
          background: T.creamAlt,
          padding: "100px 64px",
          borderTop: `1px solid rgba(13,61,78,0.06)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 100,
                alignItems: "center",
              }}
            >
              <div>
                <blockquote
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px, 3.5vw, 46px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: T.teal,
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  "Industry nuance and leadership dynamics are inseparable. We
                  understand both."
                </blockquote>
                <div
                  style={{
                    marginTop: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ width: 48, height: 1, background: T.gold }} />
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  borderLeft: `1px solid rgba(13,61,78,0.1)`,
                  paddingLeft: 80,
                }}
              >
                <SectionLabel text="Begin a Conversation" />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px,2.8vw,36px)",
                    fontWeight: 300,
                    color: T.teal,
                    marginBottom: 24,
                    lineHeight: 1.2,
                  }}
                >
                  Looking for leadership expertise within your sector?
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: T.textMid,
                    marginBottom: 36,
                  }}
                >
                  Our senior partners bring deep domain expertise to every
                  mandate. A confidential conversation costs nothing.
                </p>
                <div>
                  <button
                    className="btn btn-teal"
                    onClick={() => {
                      setPage("Contact");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <span>Arrange a Discussion</span>
                  </button>
                </div>
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: T.textMuted,
                  }}
                >
                  Engagements conducted with complete discretion.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
