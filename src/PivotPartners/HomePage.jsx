import { T } from "./tokens";
import { useReveal, SectionLabel, StatCounter } from "./utils";
import { useState, useEffect, useRef } from "react";

/* ─── Intersection Observer hook for scroll-triggered animations ─── */
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
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ILLUSTRATION 1 — "WHY LEADERSHIP MATTERS"
   Large editorial SVG: organisational pyramid with leadership tiers
   as architectural columns rising from a foundation
══════════════════════════════════════════════════════════════ */
const LEADERSHIP_ILLUS_CSS = `
  @keyframes lm-float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes lm-float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes lm-pulse  { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
  @keyframes lm-dash   { to{stroke-dashoffset:-24} }
  @keyframes lm-rise   { from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom} }
  @keyframes lm-glow   { 0%,100%{filter:drop-shadow(0 0 4px rgba(184,150,46,0.3))} 50%{filter:drop-shadow(0 0 12px rgba(184,150,46,0.7))} }
  .lm-col1 { animation: lm-float1 5s ease-in-out infinite 0s; transform-origin: center bottom; }
  .lm-col2 { animation: lm-float1 5s ease-in-out infinite 0.6s; transform-origin: center bottom; }
  .lm-col3 { animation: lm-float1 5s ease-in-out infinite 1.2s; transform-origin: center bottom; }
  .lm-col4 { animation: lm-float2 6s ease-in-out infinite 0.3s; transform-origin: center bottom; }
  .lm-star  { animation: lm-glow 3s ease-in-out infinite; }
  .lm-orbit { animation: lm-dash 4s linear infinite; }
`;

function LeadershipIllustration({ vis }) {
  return (
    <svg
      viewBox="0 0 900 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 900 }}
    >
      <style>{LEADERSHIP_ILLUS_CSS}</style>

      {/* Sky gradient backdrop */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D3D4E" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0D3D4E" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8962E" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#B8962E" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="foundGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0D3D4E" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#0D3D4E" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0D3D4E" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pillarL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EDE8DE" />
          <stop offset="40%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4CFC6" />
        </linearGradient>
      </defs>

      {/* Ground / foundation plane */}
      <rect
        x="60"
        y="460"
        width="780"
        height="12"
        rx="2"
        fill="url(#foundGrad)"
      />
      <rect
        x="100"
        y="468"
        width="700"
        height="4"
        rx="1"
        fill="rgba(13,61,78,0.06)"
      />

      {/* Distant horizon grid lines */}
      {[1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={60 + i * 130}
          y1="460"
          x2={200 + i * 80}
          y2="380"
          stroke="rgba(184,150,46,0.08)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
        />
      ))}

      {/* ── COLUMN 1: BOARDS — tallest, left ── */}
      <g
        className="lm-col1"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}
      >
        {/* Shaft */}
        <rect
          x="108"
          y="168"
          width="54"
          height="292"
          fill="url(#pillarL)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        {/* Fluting lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={117 + i * 10}
            y1="172"
            x2={117 + i * 10}
            y2="456"
            stroke="rgba(13,61,78,0.08)"
            strokeWidth="0.8"
          />
        ))}
        {/* Capital top */}
        <rect
          x="96"
          y="152"
          width="78"
          height="18"
          rx="1"
          fill="#EDE8DE"
          stroke="rgba(13,61,78,0.15)"
          strokeWidth="1"
        />
        <rect
          x="103"
          y="144"
          width="64"
          height="10"
          rx="1"
          fill="#F5F0E8"
          stroke="rgba(13,61,78,0.1)"
          strokeWidth="1"
        />
        {/* Base */}
        <rect x="96" y="456" width="78" height="10" rx="1" fill="#D4CFC6" />
        {/* Gold crown accent */}
        <rect
          x="96"
          y="148"
          width="78"
          height="2"
          fill="#B8962E"
          opacity="0.7"
        />
        {/* Label */}
        <text
          x="135"
          y="136"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 9,
            fill: "#B8962E",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Boards
        </text>
        {/* Floating figure above */}
        <circle
          cx="135"
          cy="110"
          r="11"
          fill="none"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle cx="135" cy="106" r="5.5" fill="#0D3D4E" opacity="0.35" />
        <ellipse cx="135" cy="120" rx="8" ry="5" fill="#0D3D4E" opacity="0.2" />
        {/* Crown */}
        <polyline
          points="126,94 129,86 133,91 135,82 137,91 141,86 144,94"
          stroke="#B8962E"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <line
          x1="126"
          y1="94"
          x2="144"
          y2="94"
          stroke="#B8962E"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </g>

      {/* ── COLUMN 2: CEO — slightly shorter ── */}
      <g
        className="lm-col2"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.35s" }}
      >
        <rect
          x="232"
          y="185"
          width="54"
          height="292"
          fill="url(#pillarL)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={241 + i * 10}
            y1="214"
            x2={241 + i * 10}
            y2="456"
            stroke="rgba(13,61,78,0.08)"
            strokeWidth="0.8"
          />
        ))}
        <rect
          x="220"
          y="194"
          width="78"
          height="18"
          rx="1"
          fill="#EDE8DE"
          stroke="rgba(13,61,78,0.15)"
          strokeWidth="1"
        />
        <rect
          x="227"
          y="186"
          width="64"
          height="10"
          rx="1"
          fill="#F5F0E8"
          stroke="rgba(13,61,78,0.1)"
          strokeWidth="1"
        />
        <rect x="220" y="456" width="78" height="10" rx="1" fill="#D4CFC6" />
        <rect
          x="220"
          y="190"
          width="78"
          height="2"
          fill="#B8962E"
          opacity="0.7"
        />
        <text
          x="259"
          y="178"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 9,
            fill: "#B8962E",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          CEO
        </text>
        <circle
          cx="259"
          cy="155"
          r="11"
          fill="none"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle cx="259" cy="151" r="5.5" fill="#0D3D4E" opacity="0.35" />
        <ellipse cx="259" cy="165" rx="8" ry="5" fill="#0D3D4E" opacity="0.2" />
        {/* Direction arrow */}
        <polyline
          points="254,138 259,131 264,138"
          stroke="#B8962E"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <line
          x1="259"
          y1="131"
          x2="259"
          y2="142"
          stroke="#B8962E"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </g>

      {/* ── COLUMN 3: Functional — medium ── */}
      <g
        className="lm-col3"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}
      >
        <rect
          x="424"
          y="250"
          width="54"
          height="210"
          fill="url(#pillarL)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={433 + i * 10}
            y1="254"
            x2={433 + i * 10}
            y2="456"
            stroke="rgba(13,61,78,0.08)"
            strokeWidth="0.8"
          />
        ))}
        <rect
          x="412"
          y="234"
          width="78"
          height="18"
          rx="1"
          fill="#EDE8DE"
          stroke="rgba(13,61,78,0.15)"
          strokeWidth="1"
        />
        <rect
          x="419"
          y="226"
          width="64"
          height="10"
          rx="1"
          fill="#F5F0E8"
          stroke="rgba(13,61,78,0.1)"
          strokeWidth="1"
        />
        <rect x="412" y="456" width="78" height="10" rx="1" fill="#D4CFC6" />
        <rect
          x="412"
          y="230"
          width="78"
          height="2"
          fill="#B8962E"
          opacity="0.7"
        />
        <text
          x="451"
          y="218"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 9,
            fill: "#B8962E",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Functions
        </text>
        {/* Three small figures */}
        {[-14, 0, 14].map((ox, i) => (
          <g key={i} style={{ opacity: 0.3 + i * 0.05 }}>
            <circle cx={451 + ox} cy={196} r={4} fill="#0D3D4E" />
            <ellipse cx={451 + ox} cy={207} rx={3.5} ry={4.5} fill="#0D3D4E" />
          </g>
        ))}
        {/* Org chart lines */}
        <line
          x1="451"
          y1="210"
          x2="437"
          y2="220"
          stroke="#B8962E"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="3 2"
        />
        <line
          x1="451"
          y1="210"
          x2="451"
          y2="220"
          stroke="#B8962E"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="3 2"
        />
        <line
          x1="451"
          y1="210"
          x2="465"
          y2="220"
          stroke="#B8962E"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="3 2"
        />
      </g>

      {/* ── COLUMN 4: AI — tallest on the right ── */}
      <g
        className="lm-col4"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.65s" }}
      >
        <rect
          x="616"
          y="180"
          width="54"
          height="280"
          fill="url(#pillarL)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={625 + i * 10}
            y1="184"
            x2={625 + i * 10}
            y2="456"
            stroke="rgba(13,61,78,0.08)"
            strokeWidth="0.8"
          />
        ))}
        <rect
          x="604"
          y="164"
          width="78"
          height="18"
          rx="1"
          fill="#EDE8DE"
          stroke="rgba(13,61,78,0.15)"
          strokeWidth="1"
        />
        <rect
          x="611"
          y="156"
          width="64"
          height="10"
          rx="1"
          fill="#F5F0E8"
          stroke="rgba(13,61,78,0.1)"
          strokeWidth="1"
        />
        <rect x="604" y="456" width="78" height="10" rx="1" fill="#D4CFC6" />
        <rect
          x="604"
          y="160"
          width="78"
          height="2"
          fill="#B8962E"
          opacity="0.7"
        />
        <text
          x="643"
          y="148"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 9,
            fill: "#B8962E",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          AI & Digital
        </text>
        {/* AI neural net icon */}
        <circle
          cx="643"
          cy="122"
          r="10"
          fill="rgba(184,150,46,0.15)"
          stroke="#B8962E"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <circle cx="643" cy="122" r="4" fill="#B8962E" opacity="0.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={643 + 10 * Math.cos(a)}
              y1={122 + 10 * Math.sin(a)}
              x2={643 + 16 * Math.cos(a)}
              y2={122 + 16 * Math.sin(a)}
              stroke="#B8962E"
              strokeWidth="1.2"
              opacity="0.5"
            />
          );
        })}
        {/* Orbit ring */}
        <circle
          cx="643"
          cy="122"
          r="22"
          fill="none"
          stroke="#B8962E"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.3"
          className="lm-orbit"
        />
      </g>

      {/* ── CONNECTING ARCHITRAVE / PEDIMENT spanning all columns ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.9s ease 0.8s" }}>
        {/* Main horizontal beam */}
        <rect
          x="96"
          y="144"
          width="586"
          height="6"
          fill="rgba(13,61,78,0.08)"
        />
        {/* Gold accent line on beam */}
        <rect
          x="96"
          y="144"
          width="586"
          height="1.5"
          fill="#B8962E"
          opacity="0.35"
        />
        <rect
          x="96"
          y="148"
          width="586"
          height="1"
          fill="#B8962E"
          opacity="0.15"
        />
        {/* Dashed connection line between column tops */}
        <line
          x1="135"
          y1="152"
          x2="259"
          y2="194"
          stroke="rgba(184,150,46,0.25)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <line
          x1="259"
          y1="194"
          x2="451"
          y2="234"
          stroke="rgba(184,150,46,0.25)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <line
          x1="451"
          y1="234"
          x2="643"
          y2="164"
          stroke="rgba(184,150,46,0.25)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </g>

      {/* ── CENTRAL PEDIMENT / TRIANGLE — the apex ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.9s ease 1s" }}>
        <polygon
          points="450,48 300,144 600,144"
          fill="rgba(13,61,78,0.05)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1.5"
        />
        {/* Gold star at apex */}
        <g className="lm-star">
          <polygon
            points="450,38 453,48 463,48 455,54 458,64 450,58 442,64 445,54 437,48 447,48"
            fill="#B8962E"
            opacity="0.85"
          />
        </g>
        {/* PivotEdge label in pediment */}
        <text
          x="450"
          y="108"
          textAnchor="middle"
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 11,
            fill: "rgba(13,61,78,0.45)",
            letterSpacing: "0.16em",
          }}
        >
          PIVOTEDGE PARTNERS
        </text>
        <text
          x="450"
          y="124"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(184,150,46,0.5)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Leadership Architecture
        </text>
      </g>

      {/* ── GROUND LEVEL: small silhouette organisation ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 1.1s" }}>
        {/* The organisation below — many small figures */}
        {[
          [190, 490],
          [220, 486],
          [250, 492],
          [290, 488],
          [330, 494],
          [380, 486],
          [430, 490],
          [480, 487],
          [530, 492],
          [570, 486],
          [620, 490],
          [660, 488],
          [700, 493],
          [740, 486],
          [780, 490],
        ].map(([x, y], i) => (
          <g key={i} opacity={0.12 + (i % 3) * 0.06}>
            <circle cx={x} cy={y - 8} r={4} fill="#0D3D4E" />
            <ellipse cx={x} cy={y + 1} rx={3.5} ry={4} fill="#0D3D4E" />
          </g>
        ))}
        {/* Label */}
        <text
          x="450"
          y="520"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 9,
            fill: "rgba(13,61,78,0.3)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          The Organisation
        </text>
      </g>

      {/* ── FLOATING DATA POINTS on sides ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 1.3s" }}>
        {/* Left side annotation */}
        <line
          x1="60"
          y1="300"
          x2="100"
          y2="300"
          stroke="rgba(184,150,46,0.3)"
          strokeWidth="0.8"
        />
        <circle cx="58" cy="300" r="3" fill="#B8962E" opacity="0.5" />
        <text
          x="55"
          y="280"
          textAnchor="end"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Strategy
        </text>
        <text
          x="55"
          y="292"
          textAnchor="end"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Governance
        </text>
        <text
          x="55"
          y="304"
          textAnchor="end"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Culture
        </text>
        <text
          x="55"
          y="316"
          textAnchor="end"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Execution
        </text>
        {/* Right side annotation */}
        <line
          x1="840"
          y1="300"
          x2="800"
          y2="300"
          stroke="rgba(184,150,46,0.3)"
          strokeWidth="0.8"
        />
        <circle cx="842" cy="300" r="3" fill="#B8962E" opacity="0.5" />
        <text
          x="846"
          y="280"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Performance
        </text>
        <text
          x="846"
          y="292"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Innovation
        </text>
        <text
          x="846"
          y="304"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Resilience
        </text>
        <text
          x="846"
          y="316"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(13,61,78,0.4)",
            letterSpacing: "0.12em",
          }}
        >
          Growth
        </text>
      </g>

      {/* Subtle background grid */}
      <g opacity="0.04">
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={60 + i * 110}
            y1="60"
            x2={60 + i * 110}
            y2="460"
            stroke="#0D3D4E"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1="60"
            y1={100 + i * 70}
            x2="840"
            y2={100 + i * 70}
            stroke="#0D3D4E"
            strokeWidth="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   ILLUSTRATION 2 — "HOW WE WORK" Process Compass
   A large compass/dial illustration showing the 4 process pillars
   arranged around a central point
══════════════════════════════════════════════════════════════ */
const PROCESS_CSS = `
  @keyframes pr-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pr-pulse  { 0%,100%{opacity:0.2} 50%{opacity:0.5} }
  @keyframes pr-dash   { to{stroke-dashoffset:-32} }
  .pr-ring-outer { animation: pr-rotate 40s linear infinite; transform-origin: 340px 280px; }
  .pr-ring-mid   { animation: pr-rotate 25s linear infinite reverse; transform-origin: 340px 280px; }
  .pr-pulse-ring { animation: pr-pulse 3s ease-in-out infinite; }
  .pr-orbit-dash { animation: pr-dash 3s linear infinite; }
`;

function ProcessCompassIllustration({ vis }) {
  const cx = 340,
    cy = 280;
  const steps = [
    { label: "Strategic\nMandate", sub: "Define", angle: -90, r: 160 },
    { label: "Market\nMapping", sub: "Research", angle: 0, r: 160 },
    { label: "Assessment\n& Fit", sub: "Evaluate", angle: 90, r: 160 },
    { label: "Stakeholder\nAlignment", sub: "Calibrate", angle: 180, r: 160 },
  ];

  const toXY = (angle, r) => ({
    x: cx + r * Math.cos((angle * Math.PI) / 180),
    y: cy + r * Math.sin((angle * Math.PI) / 180),
  });

  return (
    <svg
      viewBox="0 0 680 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%" }}
    >
      <style>{PROCESS_CSS}</style>
      <defs>
        <radialGradient id="compGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B8962E" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#B8962E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer decorative rotating ring */}
      <circle
        className="pr-ring-outer"
        cx={cx}
        cy={cy}
        r={195}
        fill="none"
        stroke="#B8962E"
        strokeWidth="0.6"
        strokeDasharray="4 16"
        opacity={vis ? 0.25 : 0}
        style={{ transition: "opacity 0.6s ease 0.3s" }}
      />

      {/* Mid ring */}
      <circle
        className="pr-ring-mid"
        cx={cx}
        cy={cy}
        r={130}
        fill="none"
        stroke="rgba(13,61,78,0.12)"
        strokeWidth="1"
        strokeDasharray="3 9"
        opacity={vis ? 1 : 0}
        style={{ transition: "opacity 0.6s ease 0.4s" }}
      />

      {/* Glow background */}
      <circle
        cx={cx}
        cy={cy}
        r={180}
        fill="url(#compGrad)"
        opacity={vis ? 0.8 : 0}
        style={{ transition: "opacity 1s ease 0.2s" }}
      />

      {/* Cross hairs */}
      <line
        x1={cx}
        y1={cy - 190}
        x2={cx}
        y2={cy + 190}
        stroke="rgba(184,150,46,0.12)"
        strokeWidth="1"
        opacity={vis ? 1 : 0}
        style={{ transition: "opacity 0.6s ease 0.5s" }}
      />
      <line
        x1={cx - 190}
        y1={cy}
        x2={cx + 190}
        y2={cy}
        stroke="rgba(184,150,46,0.12)"
        strokeWidth="1"
        opacity={vis ? 1 : 0}
        style={{ transition: "opacity 0.6s ease 0.5s" }}
      />

      {/* Step nodes + spokes */}
      {steps.map((s, i) => {
        const { x, y } = toXY(s.angle, s.r);
        const lines = s.label.split("\n");
        const isRight = x > cx + 20;
        const isLeft = x < cx - 20;
        const isBottom = y > cy + 20;
        return (
          <g
            key={i}
            style={{
              opacity: vis ? 1 : 0,
              transition: `opacity 0.7s ease ${0.6 + i * 0.15}s`,
            }}
          >
            {/* Spoke */}
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#B8962E"
              strokeWidth="1"
              opacity="0.25"
              strokeDasharray="4 5"
              className="pr-orbit-dash"
            />
            {/* Node outer glow */}
            <circle
              cx={x}
              cy={y}
              r={44}
              fill="rgba(13,61,78,0.06)"
              stroke="rgba(13,61,78,0.08)"
              strokeWidth="1"
            />
            {/* Node */}
            <circle
              cx={x}
              cy={y}
              r={34}
              fill="#F5F0E8"
              stroke="#0D3D4E"
              strokeWidth="1.2"
            />
            <circle
              cx={x}
              cy={y}
              r={34}
              fill="none"
              stroke="#B8962E"
              strokeWidth="0.8"
              opacity="0.4"
            />
            {/* Step number */}
            <text
              x={x}
              y={y - 8}
              textAnchor="middle"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 22,
                fill: "#B8962E",
                fontWeight: 300,
                opacity: 0.7,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
            {/* Label lines */}
            {lines.map((ln, li) => (
              <text
                key={li}
                x={x}
                y={y + 6 + li * 11}
                textAnchor="middle"
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 7,
                  fill: "#0D3D4E",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {ln}
              </text>
            ))}
            {/* Sub label placed outside node */}
            <text
              x={isLeft ? x - 52 : isRight ? x + 52 : x}
              y={isBottom ? y + 58 : y - 52}
              textAnchor={isLeft ? "end" : isRight ? "start" : "middle"}
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 13,
                fill: "#B8962E",
                fontStyle: "italic",
                opacity: 0.7,
              }}
            >
              {s.sub}
            </text>
          </g>
        );
      })}

      {/* Centre core */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}>
        <circle cx={cx} cy={cy} r={52} fill="rgba(184,150,46,0.08)" />
        <circle
          cx={cx}
          cy={cy}
          r={42}
          fill="#0D3D4E"
          stroke="#B8962E"
          strokeWidth="1.5"
        />
        <circle
          cx={cx}
          cy={cy}
          r={28}
          fill="#0A2E3A"
          stroke="rgba(184,150,46,0.3)"
          strokeWidth="1"
        />
        {/* Compass needle */}
        <polygon
          points={`${cx},${cy - 22} ${cx - 3},${cy} ${cx},${cy + 10} ${cx + 3},${cy}`}
          fill="#B8962E"
          opacity="0.9"
        />
        <polygon
          points={`${cx},${cy + 22} ${cx - 3},${cy} ${cx},${cy + 10} ${cx + 3},${cy}`}
          fill="rgba(184,150,46,0.3)"
        />
        <circle cx={cx} cy={cy} r={4} fill="#B8962E" />
        <text
          x={cx}
          y={cy + 60}
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(184,150,46,0.7)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Precision
        </text>
      </g>

      {/* Decorative corner marks */}
      {[
        [80, 60],
        [600, 60],
        [80, 500],
        [600, 500],
      ].map(([x, y], i) => (
        <g key={i} opacity="0.15">
          <line
            x1={x}
            y1={y}
            x2={x + 20}
            y2={y}
            stroke="#B8962E"
            strokeWidth="1"
          />
          <line
            x1={x}
            y1={y}
            x2={x}
            y2={y + 20}
            stroke="#B8962E"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   ILLUSTRATION 3 — Closing Positioning
   "The Advantage" — an abstract staircase ascending to a pinnacle
   representing the journey from leadership alignment to advantage
══════════════════════════════════════════════════════════════ */
const CLOSING_CSS = `
  @keyframes cl-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes cl-dash  { to{stroke-dashoffset:-20} }
  @keyframes cl-glow  { 0%,100%{opacity:0.5} 50%{opacity:1} }
  .cl-figure { animation: cl-float 4s ease-in-out infinite; }
  .cl-trail  { animation: cl-dash 2.5s linear infinite; }
  .cl-crown  { animation: cl-glow 2.5s ease-in-out infinite; }
`;

function ClosingIllustration({ vis }) {
  return (
    <svg
      viewBox="0 0 560 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 560 }}
    >
      <style>{CLOSING_CSS}</style>
      <defs>
        <linearGradient id="stairGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0D3D4E" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0D3D4E" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8962E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B8962E" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background subtle grid */}
      <g opacity="0.04">
        {[...Array(7)].map((_, i) => (
          <line
            key={i}
            x1={40 + i * 72}
            y1="20"
            x2={40 + i * 72}
            y2="360"
            stroke="#0D3D4E"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="40"
            y1={60 + i * 64}
            x2="520"
            y2={60 + i * 64}
            stroke="#0D3D4E"
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* ── ASCENDING STAIRCASE ── */}
      {/* Step 1 — bottom left, widest */}
      {[
        {
          x: 60,
          y: 300,
          w: 400,
          h: 20,
          label: "Leadership Alignment",
          labelY: 315,
        },
        {
          x: 100,
          y: 260,
          w: 340,
          h: 20,
          label: "Strategic Clarity",
          labelY: 275,
        },
        {
          x: 140,
          y: 220,
          w: 280,
          h: 20,
          label: "Governance Strength",
          labelY: 235,
        },
        {
          x: 180,
          y: 180,
          w: 220,
          h: 20,
          label: "Execution Discipline",
          labelY: 195,
        },
        {
          x: 220,
          y: 140,
          w: 160,
          h: 20,
          label: "Sustained Performance",
          labelY: 155,
        },
      ].map((s, i) => (
        <g
          key={i}
          style={{
            opacity: vis ? 1 : 0,
            transition: `opacity 0.7s ease ${0.2 + i * 0.15}s`,
          }}
        >
          {/* Step riser */}
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            fill={`rgba(13,61,78,${0.07 + i * 0.025})`}
            stroke="rgba(13,61,78,0.1)"
            strokeWidth="0.8"
          />
          {/* Gold front edge */}
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height="2"
            fill="#B8962E"
            opacity={0.3 + i * 0.08}
          />
          {/* Step label */}
          <text
            x={s.x + 12}
            y={s.labelY}
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 8,
              fill: "rgba(13,61,78,0.4)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </text>
          {/* Step number at right */}
          <text
            x={s.x + s.w - 12}
            y={s.labelY}
            textAnchor="end"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 11,
              fill: "rgba(184,150,46,0.5)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}

      {/* ── ASCENDING PATH / TRAIL ── */}
      <polyline
        points="60,300 60,260 100,260 100,220 140,220 140,180 180,180 180,140 220,140 220,100 300,100"
        stroke="#B8962E"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
        opacity="0.4"
        className="cl-trail"
        style={{ opacity: vis ? 0.4 : 0, transition: "opacity 0.6s ease 1.1s" }}
      />

      {/* ── PINNACLE / PEAK ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 1.2s" }}>
        {/* Pedestal */}
        <rect
          x="252"
          y="80"
          width="96"
          height="24"
          rx="2"
          fill="rgba(13,61,78,0.1)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        <rect
          x="252"
          y="80"
          width="96"
          height="3"
          fill="#B8962E"
          opacity="0.6"
        />
        {/* Pillar */}
        <rect
          x="284"
          y="36"
          width="32"
          height="46"
          fill="rgba(13,61,78,0.08)"
          stroke="rgba(13,61,78,0.1)"
          strokeWidth="0.8"
        />
        {/* Capital */}
        <rect
          x="276"
          y="28"
          width="48"
          height="10"
          rx="1"
          fill="rgba(13,61,78,0.1)"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        <rect
          x="276"
          y="28"
          width="48"
          height="2"
          fill="#B8962E"
          opacity="0.5"
        />
        {/* Star / Crown at top */}
        <g className="cl-crown">
          <polygon
            points="300,8 303,18 313,18 305,24 308,34 300,28 292,34 295,24 287,18 297,18"
            fill="#B8962E"
            opacity="0.9"
          />
        </g>
        {/* Glow */}
        <circle cx="300" cy="20" r="20" fill="rgba(184,150,46,0.1)" />
        <text
          x="300"
          y="50"
          textAnchor="middle"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 7,
            fill: "rgba(184,150,46,0.6)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Advantage
        </text>
      </g>

      {/* ── ASCENDING FIGURE ── */}
      <g
        className="cl-figure"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 1.4s" }}
      >
        <circle cx="214" cy="118" r="8" fill="#0D3D4E" opacity="0.5" />
        <ellipse cx="214" cy="132" rx="6" ry="8" fill="#0D3D4E" opacity="0.4" />
        {/* Direction arrow */}
        <polyline
          points="209,106 214,98 219,106"
          stroke="#B8962E"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* ── RIGHT SIDE: abstract performance curve ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 1.0s" }}>
        <polyline
          points="420,320 440,280 460,240 475,190 488,150 498,110 508,80 515,60"
          stroke="#B8962E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        <circle cx="515" cy="60" r="5" fill="#B8962E" opacity="0.6" />
        <polyline
          points="506,60 515,60 515,70"
          stroke="#B8962E"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <text
          x="520"
          y="58"
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 8,
            fill: "rgba(184,150,46,0.6)",
            letterSpacing: "0.12em",
          }}
        >
          Performance
        </text>
        {/* Y axis */}
        <line
          x1="415"
          y1="60"
          x2="415"
          y2="330"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        <line
          x1="415"
          y1="330"
          x2="530"
          y2="330"
          stroke="rgba(13,61,78,0.12)"
          strokeWidth="1"
        />
        {/* Data point markers */}
        {[
          [440, 280],
          [460, 240],
          [475, 190],
          [488, 150],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="#B8962E" opacity="0.25" />
        ))}
      </g>

      {/* ── BOTTOM TEXT / CAPTION ── */}
      <g style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 1.6s" }}>
        <line
          x1="60"
          y1="348"
          x2="490"
          y2="348"
          stroke="rgba(184,150,46,0.15)"
          strokeWidth="0.8"
        />
        <text
          x="280"
          y="365"
          textAnchor="middle"
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 12,
            fill: "rgba(13,61,78,0.35)",
            fontStyle: "italic",
            letterSpacing: "0.06em",
          }}
        >
          The architecture of sustained organisational advantage
        </text>
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN HOME PAGE
══════════════════════════════════════════════════════════════ */
export default function HomePage({ setPage }) {
  useReveal();
  const [illusRef1, illusVis1] = useIO(0.05);
  const [illusRef2, illusVis2] = useIO(0.05);
  const [illusRef3, illusVis3] = useIO(0.05);

  return (
    <div>
      {/* ══ 1. HERO ══ */}
      <section
        className="hero-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 96,
          paddingBottom: 80,
          position: "relative",
          zIndex: 0,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <SectionLabel text="Executive Leadership Advisory" light />
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(64px, 8vw, 108px)",
                fontWeight: 300,
                lineHeight: 1.05,
                color: T.white,
                marginBottom: 32,
                letterSpacing: "-0.01em",
              }}
            >
              Leadership
              <br />
              That Defines
              <br />
              Direction.
            </h1>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 480,
                marginBottom: 48,
              }}
            >
              PivotEdge Partners is a specialist executive search and leadership
              advisory firm partnering with Boards and senior executives to
              secure leadership that shapes strategy, governance, and long-term
              performance.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <button
                className="btn btn-teal"
                onClick={() => {
                  setPage("Services");
                  window.scrollTo(0, 0);
                }}
              >
                <span>Explore Services</span>
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  setPage("About Us");
                  window.scrollTo(0, 0);
                }}
              >
                <span>How We Work</span>
              </button>
            </div>
            <div
              style={{
                marginTop: 80,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ width: 48, height: 1, background: T.gold }} />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: T.gold,
                  textTransform: "uppercase",
                }}
              >
                Advantage Starts Here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. WHY LEADERSHIP MATTERS — Full-width editorial illustration ══ */}
      <section
        style={{ padding: "120px 64px 80px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          <SectionLabel text="Our Perspective" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 5vw, 62px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: T.teal,
              marginBottom: 24,
            }}
          >
            Why Leadership
            <br />
            Matters Most.
          </h2>
          <div className="gold-rule" style={{ margin: "0 auto 32px" }} />
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.8,
              color: T.textMid,
              maxWidth: 620,
              margin: "0 auto 16px",
            }}
          >
            Leadership is the single most influential factor in organisational
            performance. Strategy, culture, governance quality, and execution
            discipline are all shaped at the top.
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.8,
              color: T.textMid,
              maxWidth: 580,
              margin: "0 auto 48px",
            }}
          >
            In complex and rapidly evolving markets, organisations require
            leaders who combine strategic judgement with operational clarity.
            Appointments at functional head level and above carry
            enterprise-wide consequences. We approach these decisions with the
            rigour they demand.
          </p>
        </div>

        {/* ── LARGE EDITORIAL ILLUSTRATION — Leadership Architecture ── */}
        <div
          ref={illusRef1}
          style={{
            background: T.creamAlt,
            border: `1px solid rgba(13,61,78,0.07)`,
            padding: "60px 40px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner label */}
          <div
            style={{
              position: "absolute",
              top: 28,
              left: 40,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 20, height: 1, background: T.gold }} />
            <span
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 9,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: T.gold,
              }}
            >
              Leadership Architecture
            </span>
          </div>
          <div style={{ position: "absolute", top: 28, right: 40 }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 11,
                color: "rgba(13,61,78,0.25)",
                letterSpacing: "0.08em",
              }}
            >
              Board · CEO · Functional · AI & Digital
            </span>
          </div>
          <LeadershipIllustration vis={illusVis1} />
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage("About Us");
              window.scrollTo(0, 0);
            }}
          >
            <span>Our Philosophy</span>
          </button>
        </div>
      </section>

      {/* ══ 3. STATS BAND ══ */}
      <section
        style={{
          background: T.teal,
          padding: "64px 0",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel text="By the Numbers" light />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 0,
            }}
          >
            {[
              { v: "20", s: "+", l: "Years of Practice" },
              { v: "500", s: "+", l: "Leadership Mandates" },
              { v: "92", s: "%", l: "Retention Rate" },
              { v: "300", s: "+", l: "C-Suite Placements" },
              { v: "30", s: "+", l: "Countries" },
            ].map((s, i, arr) => (
              <StatCounter
                key={i}
                value={s.v}
                suffix={s.s}
                label={s.l}
                last={i === arr.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. WHAT WE DO — 4 Tiles ══ */}
      {/* ══ 4. WHAT WE DO — 4 Tiles ══ */}
      <section style={{ background: T.creamAlt, padding: "120px 64px" }}>
        <style>{`
    @keyframes lens-scan {
      0%,100%{transform:translate(0,0)} 33%{transform:translate(6px,-4px)} 66%{transform:translate(-4px,6px)}
    }
    @keyframes gavel-tap {
      0%,80%,100%{transform:rotate(-15deg) translate(0,0)} 90%{transform:rotate(5deg) translate(3px,3px)}
    }
    @keyframes crown-glow {
      0%,100%{opacity:.85} 50%{opacity:1;filter:drop-shadow(0 0 5px rgba(184,150,46,.9))}
    }
    @keyframes rise-step {
      from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom}
    }
    @keyframes node-pulse {
      0%,100%{r:3} 50%{r:5.5}
    }
    @keyframes dash-travel { to { stroke-dashoffset: -32; } }
    .lens-anim { animation: lens-scan 4s ease-in-out infinite; }
    .gavel-anim { animation: gavel-tap 3s ease-in-out infinite; transform-origin: 130px 28px; }
    .crown-anim { animation: crown-glow 2.5s ease-in-out infinite; }
    .step1 { animation: rise-step .6s cubic-bezier(.16,1,.3,1) .1s both; }
    .step2 { animation: rise-step .6s cubic-bezier(.16,1,.3,1) .25s both; }
    .step3 { animation: rise-step .6s cubic-bezier(.16,1,.3,1) .4s both; }
    .node-a { animation: node-pulse 2s ease-in-out infinite 0s; }
    .node-b { animation: node-pulse 2s ease-in-out infinite .4s; }
    .node-c { animation: node-pulse 2s ease-in-out infinite .8s; }
    .node-d { animation: node-pulse 2s ease-in-out infinite 1.2s; }
    .node-e { animation: node-pulse 2s ease-in-out infinite 1.6s; }
    .dash-a { animation: dash-travel 3s linear infinite; }
    .dash-b { animation: dash-travel 3s linear infinite .6s; }
    .dash-c { animation: dash-travel 3s linear infinite 1.2s; }
    .what-card:hover { transform: translateY(-4px); border-color: rgba(184,150,46,0.3) !important; }
    .what-card:hover .what-card-explore { color: #B8962E; }
    .what-card:hover .what-card-illus svg { transform: scale(1.03); }
    .what-card-illus svg { transition: transform .6s cubic-bezier(0.16,1,0.3,1); }
  `}</style>

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 64,
            }}
          >
            <div>
              <SectionLabel text="Capabilities" />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 300,
                  color: T.teal,
                }}
              >
                What We Do
              </h2>
            </div>
            <button
              className="btn btn-outline"
              style={{ flexShrink: 0 }}
              onClick={() => {
                setPage("Services");
                window.scrollTo(0, 0);
              }}
            >
              <span>All Services</span>
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 2,
            }}
          >
            {/* ── Card 1: Executive Search ── */}
            {[
              {
                title: "Executive Search",
                desc: "Retained search for Board, CEO, and senior functional leadership roles.",
                illus: (
                  <svg
                    width="160"
                    height="150"
                    viewBox="0 0 160 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background grid */}
                    {[30, 60, 90, 120].map((y) => (
                      <line
                        key={y}
                        x1="20"
                        y1={y}
                        x2="140"
                        y2={y}
                        stroke="#0D3D4E"
                        strokeWidth=".5"
                        opacity=".08"
                      />
                    ))}
                    {[40, 80, 120].map((x) => (
                      <line
                        key={x}
                        x1={x}
                        y1="20"
                        x2={x}
                        y2="135"
                        stroke="#0D3D4E"
                        strokeWidth=".5"
                        opacity=".08"
                      />
                    ))}
                    {/* Candidate dots */}
                    {[
                      [38, 42],
                      [62, 28],
                      [100, 48],
                      [128, 32],
                      [45, 82],
                      [118, 95],
                      [72, 108],
                      [135, 118],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="#0D3D4E"
                        opacity=".18"
                      />
                    ))}
                    {/* Animated magnifying glass */}
                    <g className="lens-anim">
                      <circle
                        cx="80"
                        cy="68"
                        r="28"
                        fill="rgba(184,150,46,0.07)"
                        stroke="#B8962E"
                        strokeWidth="2"
                      />
                      <line
                        x1="80"
                        y1="52"
                        x2="80"
                        y2="84"
                        stroke="#B8962E"
                        strokeWidth=".8"
                        opacity=".4"
                      />
                      <line
                        x1="64"
                        y1="68"
                        x2="96"
                        y2="68"
                        stroke="#B8962E"
                        strokeWidth=".8"
                        opacity=".4"
                      />
                      <circle
                        cx="80"
                        cy="68"
                        r="6"
                        fill="#B8962E"
                        opacity=".7"
                      />
                      <circle
                        cx="80"
                        cy="62"
                        r="3.5"
                        fill="#0D3D4E"
                        opacity=".5"
                      />
                      <ellipse
                        cx="80"
                        cy="72"
                        rx="4.5"
                        ry="3"
                        fill="#0D3D4E"
                        opacity=".35"
                      />
                    </g>
                    {/* Handle */}
                    <line
                      x1="101"
                      y1="89"
                      x2="122"
                      y2="113"
                      stroke="#B8962E"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity=".75"
                    />
                    <line
                      x1="99"
                      y1="91"
                      x2="120"
                      y2="115"
                      stroke="rgba(184,150,46,0.25)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                title: "Boards & Governance",
                desc: "Advisory support for Board composition, Director appointments, and governance succession.",
                illus: (
                  <svg
                    width="160"
                    height="150"
                    viewBox="0 0 160 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Table */}
                    <ellipse
                      cx="80"
                      cy="88"
                      rx="54"
                      ry="24"
                      fill="#EDE8DE"
                      stroke="#0D3D4E"
                      strokeWidth="1.5"
                      opacity=".3"
                    />
                    <ellipse
                      cx="74"
                      cy="83"
                      rx="28"
                      ry="10"
                      fill="rgba(255,255,255,0.45)"
                    />
                    {/* Board members */}
                    {[
                      [44, 64, 75],
                      [80, 56, 67],
                      [116, 64, 75],
                      [44, 112, 101],
                      [116, 112, 101],
                    ].map(([cx, cy, ey], i) => (
                      <g key={i}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="7"
                          fill="#0D3D4E"
                          opacity=".2"
                        />
                        <ellipse
                          cx={cx}
                          cy={ey}
                          rx="6"
                          ry="5"
                          fill="#0D3D4E"
                          opacity=".14"
                        />
                      </g>
                    ))}
                    {/* Gold governance star */}
                    <circle
                      cx="80"
                      cy="88"
                      r="9"
                      fill="rgba(184,150,46,0.15)"
                    />
                    <circle
                      cx="80"
                      cy="88"
                      r="4.5"
                      fill="#B8962E"
                      opacity=".8"
                    />
                    {[
                      [80, 79, 80, 74],
                      [88, 82, 92, 78],
                      [88, 94, 92, 98],
                      [80, 97, 80, 102],
                      [72, 94, 68, 98],
                      [72, 82, 68, 78],
                    ].map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#B8962E"
                        strokeWidth="1.2"
                        opacity=".55"
                      />
                    ))}
                    {/* Gavel */}
                    <g className="gavel-anim">
                      <rect
                        x="122"
                        y="16"
                        width="22"
                        height="10"
                        rx="2"
                        fill="#0D3D4E"
                        opacity=".55"
                        transform="rotate(-15,133,21)"
                      />
                      <line
                        x1="133"
                        y1="26"
                        x2="120"
                        y2="44"
                        stroke="#0D3D4E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity=".4"
                      />
                      <rect
                        x="122"
                        y="16"
                        width="22"
                        height="10"
                        rx="2"
                        fill="none"
                        stroke="#B8962E"
                        strokeWidth=".8"
                        opacity=".6"
                        transform="rotate(-15,133,21)"
                      />
                    </g>
                  </svg>
                ),
              },
              {
                title: "CEO Succession",
                desc: "Identification and evaluation of enterprise leaders aligned to long-term strategy.",
                illus: (
                  <svg
                    width="160"
                    height="150"
                    viewBox="0 0 160 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Arc trajectory */}
                    <path
                      d="M 22 130 Q 80 20 138 60"
                      fill="none"
                      stroke="rgba(184,150,46,0.22)"
                      strokeWidth="1.2"
                      strokeDasharray="5 5"
                    />
                    {/* Ascending steps */}
                    <g className="step1">
                      <rect
                        x="18"
                        y="106"
                        width="40"
                        height="24"
                        fill="rgba(13,61,78,0.08)"
                        stroke="#0D3D4E"
                        strokeWidth="1"
                        opacity=".35"
                      />
                      <rect
                        x="18"
                        y="106"
                        width="40"
                        height="2"
                        fill="#B8962E"
                        opacity=".3"
                      />
                    </g>
                    <g className="step2">
                      <rect
                        x="58"
                        y="90"
                        width="44"
                        height="40"
                        fill="rgba(13,61,78,0.11)"
                        stroke="#0D3D4E"
                        strokeWidth="1"
                        opacity=".4"
                      />
                      <rect
                        x="58"
                        y="90"
                        width="44"
                        height="2"
                        fill="#B8962E"
                        opacity=".4"
                      />
                    </g>
                    <g className="step3">
                      <rect
                        x="102"
                        y="72"
                        width="46"
                        height="58"
                        fill="rgba(13,61,78,0.15)"
                        stroke="#0D3D4E"
                        strokeWidth="1.2"
                        opacity=".45"
                      />
                      <rect
                        x="102"
                        y="72"
                        width="46"
                        height="2"
                        fill="#B8962E"
                        opacity=".55"
                      />
                    </g>
                    {/* CEO figure */}
                    <circle
                      cx="125"
                      cy="54"
                      r="10"
                      fill="none"
                      stroke="#0D3D4E"
                      strokeWidth="1.5"
                      opacity=".45"
                    />
                    <circle
                      cx="125"
                      cy="51"
                      r="5"
                      fill="#0D3D4E"
                      opacity=".38"
                    />
                    <path
                      d="M 113 72 Q 113 64 125 64 Q 137 64 137 72"
                      fill="rgba(13,61,78,0.13)"
                      stroke="#0D3D4E"
                      strokeWidth="1.2"
                      opacity=".45"
                    />
                    {/* Crown */}
                    <g className="crown-anim">
                      <polyline
                        points="112,40 116,28 121,35 125,22 129,35 134,28 138,40"
                        stroke="#B8962E"
                        strokeWidth="2.2"
                        fill="none"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <line
                        x1="112"
                        y1="40"
                        x2="138"
                        y2="40"
                        stroke="#B8962E"
                        strokeWidth="2"
                      />
                      <circle cx="116" cy="28" r="2.5" fill="#B8962E" />
                      <circle cx="125" cy="22" r="3.5" fill="#B8962E" />
                      <circle cx="134" cy="28" r="2.5" fill="#B8962E" />
                    </g>
                    {/* Lower figures */}
                    <circle cx="38" cy="98" r="6" fill="#0D3D4E" opacity=".2" />
                    <ellipse
                      cx="38"
                      cy="107"
                      rx="4"
                      ry="4"
                      fill="#0D3D4E"
                      opacity=".15"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="7"
                      fill="#0D3D4E"
                      opacity=".25"
                    />
                    <ellipse
                      cx="80"
                      cy="90"
                      rx="5"
                      ry="4.5"
                      fill="#0D3D4E"
                      opacity=".18"
                    />
                    {/* Step labels */}
                    {[
                      ["01", 30, 122, 0.5],
                      ["02", 80, 122, 0.5],
                      ["03", 125, 122, 0.7],
                    ].map(([t, x, y, o]) => (
                      <text
                        key={t}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        fontFamily="sans-serif"
                        fontSize="7"
                        fill="#B8962E"
                        opacity={o}
                        letterSpacing="1"
                      >
                        {t}
                      </text>
                    ))}
                  </svg>
                ),
              },
              {
                title: "AI Leadership",
                desc: "Search for AI and digital leaders driving intelligent enterprise transformation.",
                illus: (
                  <svg
                    width="160"
                    height="150"
                    viewBox="0 0 160 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Orbit rings */}
                    <circle
                      cx="80"
                      cy="78"
                      r="56"
                      fill="none"
                      stroke="#B8962E"
                      strokeWidth=".7"
                      strokeDasharray="3 9"
                      opacity=".2"
                    />
                    <circle
                      cx="80"
                      cy="78"
                      r="38"
                      fill="none"
                      stroke="rgba(13,61,78,0.12)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                    />
                    {/* Spokes + outer nodes */}
                    {[
                      [80, 22, "node-a", "dash-a"],
                      [131, 46, "node-b", "dash-b"],
                      [120, 122, "node-c", "dash-c"],
                      [40, 122, "node-d", "dash-a"],
                      [29, 46, "node-e", "dash-b"],
                    ].map(([nx, ny, nc, dc]) => (
                      <g key={`${nx}-${ny}`}>
                        <line
                          x1="80"
                          y1="78"
                          x2={nx}
                          y2={ny}
                          stroke="#B8962E"
                          strokeWidth=".9"
                          strokeDasharray="4 4"
                          opacity=".35"
                          className={dc}
                        />
                        <circle
                          cx={nx}
                          cy={ny}
                          r="7"
                          fill="#0D3D4E"
                          stroke="#B8962E"
                          strokeWidth="1.2"
                          opacity=".85"
                        />
                        <circle
                          cx={nx}
                          cy={ny}
                          r="3"
                          fill="#B8962E"
                          opacity=".85"
                          className={nc}
                        />
                      </g>
                    ))}
                    {/* Cross-connections */}
                    <line
                      x1="80"
                      y1="22"
                      x2="131"
                      y2="46"
                      stroke="#B8962E"
                      strokeWidth=".6"
                      opacity=".12"
                    />
                    <line
                      x1="131"
                      y1="46"
                      x2="120"
                      y2="122"
                      stroke="#B8962E"
                      strokeWidth=".6"
                      opacity=".12"
                    />
                    <line
                      x1="40"
                      y1="122"
                      x2="29"
                      y2="46"
                      stroke="#B8962E"
                      strokeWidth=".6"
                      opacity=".12"
                    />
                    {/* Pulse ring */}
                    <circle
                      cx="80"
                      cy="78"
                      r="18"
                      fill="rgba(184,150,46,0.08)"
                      stroke="none"
                    >
                      <animate
                        attributeName="r"
                        values="18;26;18"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0.05;0.3"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Core */}
                    <circle
                      cx="80"
                      cy="78"
                      r="16"
                      fill="#0D3D4E"
                      stroke="#B8962E"
                      strokeWidth="1.5"
                    />
                    <text
                      x="80"
                      y="76"
                      textAnchor="middle"
                      fontFamily="serif"
                      fontSize="9"
                      fill="#B8962E"
                      fontWeight="400"
                    >
                      AI
                    </text>
                    <text
                      x="80"
                      y="86"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                      fontSize="5"
                      fill="rgba(184,150,46,0.6)"
                      letterSpacing="2"
                    >
                      CORE
                    </text>
                  </svg>
                ),
              },
            ].map((s, i) => (
              <div
                key={i}
                className="what-card service-card reveal"
                style={{
                  background: T.white,
                  border: `1px solid rgba(13,61,78,0.08)`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.4s ease, border-color 0.4s ease",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPage("Services");
                  window.scrollTo(0, 0);
                }}
              >
                {/* Illustration area */}
                <div
                  className="what-card-illus"
                  style={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: T.creamAlt,
                    borderBottom: `1px solid rgba(13,61,78,0.06)`,
                    overflow: "hidden",
                  }}
                >
                  {s.illus}
                </div>

                {/* Card body */}
                <div style={{ padding: "32px 28px 36px" }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 22,
                      fontWeight: 400,
                      color: T.teal,
                      marginBottom: 14,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h3>
                  <div className="gold-rule" style={{ margin: "0 0 14px" }} />
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.8,
                      color: T.textMid,
                      marginBottom: 24,
                    }}
                  >
                    {s.desc}
                  </p>
                  <div
                    className="what-card-explore"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: T.gold,
                      fontFamily: "'Jost', sans-serif",
                      transition: "color 0.3s",
                    }}
                  >
                    Explore →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. HOW WE WORK — Process Compass Illustration ══ */}
      <section
        style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Text col */}
          <Fade>
            <SectionLabel text="Methodology" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 5vw, 62px)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: T.teal,
                marginBottom: 32,
              }}
            >
              Research-Led.
              <br />
              Structured.
              <br />
              Discreet.
            </h2>
            <div className="gold-rule" />
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                marginBottom: 24,
                maxWidth: 440,
              }}
            >
              Our process is research-driven, structured, and discreet. We begin
              with strategic mandate definition, conduct comprehensive market
              mapping, apply rigorous evaluation frameworks, and maintain close
              stakeholder alignment throughout the engagement.
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1.8,
                color: T.textMid,
                marginBottom: 40,
                maxWidth: 440,
              }}
            >
              Our methodology emphasises depth over speed, precision over
              volume, and fit over familiarity.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setPage("Services");
                window.scrollTo(0, 0);
              }}
            >
              <span>Our Full Approach</span>
            </button>
          </Fade>

          {/* Compass illustration col */}
          <div
            ref={illusRef2}
            style={{
              background: T.creamAlt,
              border: `1px solid rgba(13,61,78,0.07)`,
              padding: "40px 32px",
            }}
          >
            <ProcessCompassIllustration vis={illusVis2} />
          </div>
        </div>
      </section>

      {/* ══ 6. PULL QUOTE CTA ══ */}
      <section
        style={{
          background: T.teal,
          padding: "120px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="reveal" style={{ maxWidth: 900 }}>
            <SectionLabel text="Our Philosophy" light />
            <blockquote
              className="pull-quote pull-quote-light"
              style={{ marginBottom: 48 }}
            >
              "We believe executive search is a strategic responsibility. When
              leadership capability aligns precisely with organisational
              ambition, performance becomes sustainable and governance becomes
              stronger."
            </blockquote>
            <div
              style={{
                height: 1,
                background: "rgba(184,150,46,0.4)",
                width: 160,
                marginBottom: 48,
              }}
            />
            <button
              className="btn btn-outline-light"
              onClick={() => {
                setPage("Contact");
                window.scrollTo(0, 0);
              }}
            >
              <span>Begin a Conversation</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══ 7. MARQUEE ══ */}
      <section
        style={{
          background: T.creamAlt,
          padding: "32px 0",
          borderTop: `1px solid rgba(13,61,78,0.08)`,
          borderBottom: `1px solid rgba(13,61,78,0.08)`,
          overflow: "hidden",
        }}
      >
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) =>
            [
              "Industrial",
              "Real Estate & Infrastructure",
              "Consumer",
              "Healthcare & Life Sciences",
              "Banking & Financial Services",
              "Technology, Media & Telecommunications",
            ].map((ind, i) => (
              <span
                key={`${ri}-${i}`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 300,
                  color: T.teal,
                  opacity: 0.5,
                  marginRight: 64,
                  flexShrink: 0,
                }}
              >
                {ind}{" "}
                <span
                  style={{ color: T.gold, marginLeft: 32, marginRight: 32 }}
                >
                  ◆
                </span>
              </span>
            )),
          )}
        </div>
      </section>

      {/* ══ 8. WHERE WE OPERATE ══ */}
      <section
        style={{ padding: "120px 64px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 80,
          }}
        >
          <div>
            <SectionLabel text="Coverage" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
                color: T.teal,
              }}
            >
              Where We Operate
            </h2>
          </div>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage("Domains");
              window.scrollTo(0, 0);
            }}
          >
            <span>All Domains</span>
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
          }}
        >
          {[
            { name: "Industrial", fn: "Manufacturing & Operations" },
            {
              name: "Real Estate & Infrastructure",
              fn: "Capital Markets & Development",
            },
            { name: "Consumer", fn: "Brand & Retail Strategy" },
            { name: "Healthcare & Life Sciences", fn: "Clinical & Commercial" },
            {
              name: "Banking & Financial Services",
              fn: "Risk, Compliance & Capital",
            },
            { name: "Technology, Media & Telecom", fn: "Digital & Platform" },
          ].map((d, i) => (
            <div
              key={i}
              className="reveal underline-draw"
              style={{
                padding: "40px 32px",
                borderBottom: `1px solid rgba(13,61,78,0.1)`,
                borderRight:
                  i % 3 !== 2 ? `1px solid rgba(13,61,78,0.1)` : "none",
                cursor: "pointer",
              }}
              onClick={() => {
                setPage("Domains");
                window.scrollTo(0, 0);
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: T.teal,
                  marginBottom: 8,
                }}
              >
                {d.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.gold,
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {d.fn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 9. CLOSING POSITIONING — full content from content file ══ */}
      <section
        style={{
          background: T.creamAlt,
          padding: "120px 64px",
          borderTop: `1px solid rgba(13,61,78,0.08)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header centred */}
          <Fade style={{ textAlign: "center", marginBottom: 80 }}>
            <SectionLabel text="Our Conviction" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 300,
                color: T.teal,
                lineHeight: 1.1,
                maxWidth: 680,
                margin: "0 auto 28px",
              }}
            >
              Where Leadership Aligns,
              <br />
              Advantage Begins.
            </h2>
            <div className="gold-rule" style={{ margin: "0 auto" }} />
          </Fade>

          {/* Three-column content arrangement (not left-right split) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap: 0,
              alignItems: "start",
              marginBottom: 80,
            }}
          >
            {/* Left pillar — decorative vertical stat */}
            <Fade delay={100}>
              <div
                style={{
                  padding: "0 48px 0 0",
                  borderRight: `1px solid rgba(13,61,78,0.1)`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 72,
                    fontWeight: 600,
                    color: T.gold,
                    lineHeight: 1,
                    opacity: 0.35,
                  }}
                >
                  I
                </div>
                <div
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: T.textMuted,
                    marginTop: 12,
                    marginBottom: 32,
                  }}
                >
                  Executive Search
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: T.textMid,
                  }}
                >
                  A strategic responsibility — not a transactional activity.
                  Every mandate carries enterprise-wide consequences.
                </p>
              </div>
            </Fade>

            {/* Centre — main positioning text + illustration */}
            <Fade delay={200}>
              <div style={{ padding: "0 64px" }}>
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: T.textMid,
                    marginBottom: 28,
                    fontStyle: "italic",
                    fontFamily: "'Cormorant Garamond',serif",
                  }}
                >
                  "We believe executive search is a strategic responsibility."
                </p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: T.textMid,
                    marginBottom: 24,
                  }}
                >
                  When leadership capability aligns precisely with
                  organisational ambition, performance becomes sustainable and
                  governance becomes stronger.
                </p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: T.textMid,
                    marginBottom: 40,
                  }}
                >
                  That is where the advantage begins — not at the appointment,
                  but at the alignment. At PivotEdge Partners, we exist to
                  ensure that alignment is achieved with rigour, discretion, and
                  long-term purpose.
                </p>
                <button
                  className="btn btn-teal"
                  onClick={() => {
                    setPage("Contact");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span>Begin a Conversation</span>
                </button>
              </div>
            </Fade>

            {/* Right pillar — decorative vertical stat */}
            <Fade delay={300}>
              <div
                style={{
                  padding: "0 0 0 48px",
                  borderLeft: `1px solid rgba(13,61,78,0.1)`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 72,
                    fontWeight: 600,
                    color: T.gold,
                    lineHeight: 1,
                    opacity: 0.35,
                  }}
                >
                  II
                </div>
                <div
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: T.textMuted,
                    marginTop: 12,
                    marginBottom: 32,
                  }}
                >
                  Leadership Advisory
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: T.textMid,
                  }}
                >
                  Governance, performance, and strategic clarity — delivered
                  through long-term partnership grounded in trust and judgement.
                </p>
              </div>
            </Fade>
          </div>

          {/* ── LARGE CLOSING ILLUSTRATION ── */}
          <div
            ref={illusRef3}
            style={{
              position: "relative",
              background: T.white,
              border: `1px solid rgba(13,61,78,0.07)`,
              padding: "56px 48px 48px",
              overflow: "hidden",
            }}
          >
            {/* Top label */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 48,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ width: 20, height: 1, background: T.gold }} />
              <span
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: T.gold,
                }}
              >
                The Architecture of Advantage
              </span>
            </div>
            <div style={{ position: "absolute", top: 28, right: 48 }}>
              <span
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: T.textMuted,
                }}
              >
                Alignment → Performance → Advantage
              </span>
            </div>
            <ClosingIllustration vis={illusVis3} />

            {/* Bottom tagline overlay */}
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 1,
                    background: T.gold,
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    color: T.gold,
                    textTransform: "uppercase",
                  }}
                >
                  Advantage Starts Here
                </span>
                <div
                  style={{
                    width: 48,
                    height: 1,
                    background: T.gold,
                    opacity: 0.5,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
