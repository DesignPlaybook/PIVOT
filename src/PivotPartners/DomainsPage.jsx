import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";
import AI from "./AI.svg";

/* ─── Shared IntersectionObserver hook ─── */
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

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useIO();
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const end = parseInt(target);
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else setVal(start);
    }, 22);
    return () => clearInterval(timer);
  }, [vis, target]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION ILLUSTRATIONS — clean SVG, teal + gold palette
══════════════════════════════════════════════════════ */

/* Industry card illustration: abstract shapes per sector */
const IndustryIllustration = ({ index }) => {
  const illustrations = [
    /* 0 — Industrial: gear + bar chart */
    <svg
      key={0}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="48"
        cy="48"
        r="22"
        stroke="#0D3D4E"
        strokeWidth="2"
        opacity="0.15"
      />
      <circle
        cx="48"
        cy="48"
        r="14"
        stroke="#B8962E"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="48" cy="48" r="5" fill="#B8962E" opacity="0.8" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 48 + 17 * Math.cos(a),
          y1 = 48 + 17 * Math.sin(a);
        const x2 = 48 + 22 * Math.cos(a),
          y2 = 48 + 22 * Math.sin(a);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#0D3D4E"
            strokeWidth="4"
            opacity="0.18"
            strokeLinecap="round"
          />
        );
      })}
      <rect x="78" y="72" width="8" height="22" fill="#B8962E" opacity="0.5" />
      <rect x="90" y="62" width="8" height="32" fill="#B8962E" opacity="0.7" />
      <rect x="102" y="54" width="8" height="40" fill="#B8962E" opacity="0.4" />
      <line
        x1="75"
        y1="94"
        x2="114"
        y2="94"
        stroke="#0D3D4E"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>,
    /* 1 — Real Estate: building skyline */
    <svg
      key={1}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="50"
        width="20"
        height="44"
        fill="#0D3D4E"
        opacity="0.12"
        stroke="#0D3D4E"
        strokeWidth="1.2"
      />
      <rect
        x="44"
        y="30"
        width="28"
        height="64"
        fill="#0D3D4E"
        opacity="0.18"
        stroke="#0D3D4E"
        strokeWidth="1.2"
      />
      <rect
        x="76"
        y="42"
        width="22"
        height="52"
        fill="#0D3D4E"
        opacity="0.12"
        stroke="#0D3D4E"
        strokeWidth="1.2"
      />
      <rect x="50" y="24" width="6" height="6" fill="#B8962E" opacity="0.8" />
      {[
        [26, 58],
        [30, 58],
        [26, 68],
        [30, 68],
        [49, 40],
        [49, 50],
        [57, 40],
        [57, 50],
        [81, 52],
        [85, 52],
        [81, 62],
        [85, 62],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="4"
          height="4"
          fill="#B8962E"
          opacity="0.35"
        />
      ))}
      <line
        x1="15"
        y1="94"
        x2="105"
        y2="94"
        stroke="#B8962E"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>,
    /* 2 — Consumer: shopping bag + trend arrow */
    <svg
      key={2}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35 42 L30 88 L90 88 L85 42 Z"
        stroke="#0D3D4E"
        strokeWidth="1.5"
        fill="#0D3D4E"
        opacity="0.08"
      />
      <path
        d="M42 42 Q42 28 60 28 Q78 28 78 42"
        stroke="#0D3D4E"
        strokeWidth="1.8"
        fill="none"
        opacity="0.3"
      />
      <circle cx="45" cy="88" r="4" fill="#B8962E" opacity="0.7" />
      <circle cx="75" cy="88" r="4" fill="#B8962E" opacity="0.7" />
      <polyline
        points="22,72 40,52 56,62 72,38 90,28"
        stroke="#B8962E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx="90" cy="28" r="4" fill="#B8962E" opacity="0.9" />
      <polyline
        points="82,28 90,28 90,36"
        stroke="#B8962E"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>,
    /* 3 — Healthcare: cross + pulse line */
    <svg
      key={3}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="60"
        cy="50"
        r="36"
        stroke="#0D3D4E"
        strokeWidth="1"
        opacity="0.1"
        strokeDasharray="4 6"
      />
      <rect
        x="50"
        y="26"
        width="20"
        height="48"
        rx="2"
        fill="#0D3D4E"
        opacity="0.1"
        stroke="#0D3D4E"
        strokeWidth="1.5"
      />
      <rect
        x="36"
        y="40"
        width="48"
        height="20"
        rx="2"
        fill="#0D3D4E"
        opacity="0.1"
        stroke="#0D3D4E"
        strokeWidth="1.5"
      />
      <rect
        x="53"
        y="32"
        width="14"
        height="36"
        rx="1"
        fill="#B8962E"
        opacity="0.25"
      />
      <rect
        x="39"
        y="43"
        width="42"
        height="14"
        rx="1"
        fill="#B8962E"
        opacity="0.25"
      />
      <polyline
        points="20,78 32,78 40,58 50,88 60,68 70,78 80,68 90,78 100,78"
        stroke="#B8962E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>,
    /* 4 — Banking: columns + coin stack */
    <svg
      key={4}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="22" y="40" width="76" height="4" fill="#0D3D4E" opacity="0.2" />
      <rect x="22" y="84" width="76" height="4" fill="#0D3D4E" opacity="0.2" />
      <rect
        x="22"
        y="30"
        width="76"
        height="10"
        fill="#0D3D4E"
        opacity="0.12"
        stroke="#0D3D4E"
        strokeWidth="1"
      />
      {[30, 46, 62, 78].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={44}
          width="8"
          height="40"
          fill="#0D3D4E"
          opacity="0.1"
          stroke="#0D3D4E"
          strokeWidth="1"
        />
      ))}
      <ellipse
        cx="88"
        cy="70"
        rx="16"
        ry="6"
        fill="none"
        stroke="#B8962E"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <ellipse
        cx="88"
        cy="64"
        rx="16"
        ry="6"
        fill="#EDE8DE"
        stroke="#B8962E"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <ellipse
        cx="88"
        cy="58"
        rx="16"
        ry="6"
        fill="#EDE8DE"
        stroke="#B8962E"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <text
        x="88"
        y="62"
        textAnchor="middle"
        style={{
          fontFamily: "serif",
          fontSize: 9,
          fill: "#B8962E",
          opacity: 0.9,
        }}
      >
        ₤
      </text>
    </svg>,
    /* 5 — TMT: signal waves + nodes */
    <svg
      key={5}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="54" r="8" fill="#B8962E" opacity="0.8" />
      <circle
        cx="60"
        cy="54"
        r="18"
        fill="none"
        stroke="#B8962E"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="3 4"
      />
      <circle
        cx="60"
        cy="54"
        r="30"
        fill="none"
        stroke="#0D3D4E"
        strokeWidth="1"
        opacity="0.15"
        strokeDasharray="3 6"
      />
      <circle
        cx="60"
        cy="54"
        r="42"
        fill="none"
        stroke="#0D3D4E"
        strokeWidth="1"
        opacity="0.08"
        strokeDasharray="2 8"
      />
      {[
        [20, 30],
        [95, 25],
        [15, 75],
        [100, 72],
        [55, 12],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r="5"
            fill="none"
            stroke="#0D3D4E"
            strokeWidth="1.2"
            opacity="0.3"
          />
          <circle cx={x} cy={y} r="2" fill="#B8962E" opacity="0.5" />
          <line
            x1={x}
            y1={y}
            x2={60}
            y2={54}
            stroke="#B8962E"
            strokeWidth="0.8"
            opacity="0.2"
            strokeDasharray="3 4"
          />
        </g>
      ))}
    </svg>,
  ];
  return illustrations[index] || illustrations[0];
};

/* Function role illustrations */
const FunctionIllustration = ({ name }) => {
  const map = {
    "Boards & Governance": (
      <svg viewBox="0 0 80 80" fill="none">
        <ellipse
          cx="40"
          cy="52"
          rx="28"
          ry="10"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="#EDE8DE"
          opacity="0.9"
        />
        <ellipse cx="36" cy="48" rx="14" ry="5" fill="white" opacity="0.5" />
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          return (
            <g key={i}>
              <circle
                cx={40 + 32 * Math.cos(a)}
                cy={52 + 14 * Math.sin(a)}
                r="6"
                fill="#0D3D4E"
                opacity="0.15"
              />
              <circle
                cx={40 + 32 * Math.cos(a)}
                cy={52 + 14 * Math.sin(a) - 12}
                r="5"
                fill="#0D3D4E"
                opacity="0.2"
              />
            </g>
          );
        })}
        <circle cx="40" cy="52" r="5" fill="#B8962E" opacity="0.8" />
      </svg>
    ),
    "Chief Executive Officer": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle
          cx="40"
          cy="34"
          r="14"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <polyline
          points="26,30 30,20 36,26 40,16 44,26 50,20 54,30"
          stroke="#B8962E"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <line
          x1="26"
          y1="30"
          x2="54"
          y2="30"
          stroke="#B8962E"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <path
          d="M22 66 Q22 50 40 50 Q58 50 58 66"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.35"
        />
      </svg>
    ),
    "Chief Financial Officer": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect
          x="16"
          y="22"
          width="48"
          height="38"
          rx="2"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <line
          x1="16"
          y1="32"
          x2="64"
          y2="32"
          stroke="#B8962E"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x="40"
          y="56"
          textAnchor="middle"
          style={{
            fontFamily: "serif",
            fontSize: 22,
            fill: "#B8962E",
            opacity: 0.8,
            fontWeight: 300,
          }}
        >
          ₤
        </text>
        <rect
          x="22"
          y="36"
          width="12"
          height="3"
          rx="1"
          fill="#0D3D4E"
          opacity="0.2"
        />
        <rect
          x="22"
          y="42"
          width="20"
          height="3"
          rx="1"
          fill="#0D3D4E"
          opacity="0.15"
        />
      </svg>
    ),
    "Marketing & Sales": (
      <svg viewBox="0 0 80 80" fill="none">
        <polyline
          points="14,62 26,44 38,52 52,30 66,22"
          stroke="#B8962E"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="44" r="3.5" fill="#B8962E" opacity="0.8" />
        <circle cx="38" cy="52" r="3.5" fill="#B8962E" opacity="0.8" />
        <circle cx="52" cy="30" r="3.5" fill="#B8962E" opacity="0.8" />
        <circle cx="66" cy="22" r="3.5" fill="#B8962E" opacity="0.8" />
        <polyline
          points="58,22 66,22 66,30"
          stroke="#B8962E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Human Resources": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle
          cx="30"
          cy="28"
          r="10"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <circle
          cx="50"
          cy="28"
          r="10"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M14 66 Q14 50 30 50"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M50 50 Q66 50 66 66"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M30 50 Q40 44 50 50"
          stroke="#B8962E"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <circle
          cx="40"
          cy="54"
          r="8"
          stroke="#B8962E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
      </svg>
    ),
    "Supply Chain": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect
          x="8"
          y="34"
          width="18"
          height="14"
          rx="1"
          stroke="#B8962E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <rect
          x="31"
          y="28"
          width="18"
          height="14"
          rx="1"
          stroke="#B8962E"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="54"
          y="34"
          width="18"
          height="14"
          rx="1"
          stroke="#B8962E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <line
          x1="26"
          y1="41"
          x2="31"
          y2="36"
          stroke="#0D3D4E"
          strokeWidth="1.2"
          opacity="0.4"
        />
        <line
          x1="49"
          y1="36"
          x2="54"
          y2="41"
          stroke="#0D3D4E"
          strokeWidth="1.2"
          opacity="0.4"
        />
        <circle
          cx="34"
          cy="51"
          r="4"
          fill="none"
          stroke="#0D3D4E"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="46"
          cy="51"
          r="4"
          fill="none"
          stroke="#0D3D4E"
          strokeWidth="1"
          opacity="0.3"
        />
        <line
          x1="38"
          y1="51"
          x2="42"
          y2="51"
          stroke="#0D3D4E"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    ),
    "CSR & Sustainability": (
      <svg viewBox="0 0 80 80" fill="none">
        <path
          d="M40 16 Q54 20 58 34 Q62 50 48 58 Q40 64 32 58 Q18 50 22 34 Q26 20 40 16Z"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M40 24 Q28 36 40 52 Q52 36 40 24Z"
          fill="#B8962E"
          opacity="0.2"
          stroke="#B8962E"
          strokeWidth="1.2"
        />
        <line
          x1="40"
          y1="52"
          x2="40"
          y2="68"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          opacity="0.3"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="64"
          x2="48"
          y2="64"
          stroke="#0D3D4E"
          strokeWidth="1.5"
          opacity="0.3"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Artificial Intelligence": (
      // <svg viewBox="0 0 80 80" fill="none">
      //   <circle cx="40" cy="40" r="10" fill="#B8962E" opacity="0.25" />
      //   <circle cx="40" cy="40" r="5" fill="#B8962E" opacity="0.7" />
      //   {[0, 1, 2, 3, 4, 5].map((i) => {
      //     const a = (i / 6) * Math.PI * 2;
      //     const x1 = 40 + 14 * Math.cos(a),
      //       y1 = 40 + 14 * Math.sin(a);
      //     const x2 = 40 + 26 * Math.cos(a),
      //       y2 = 40 + 26 * Math.sin(a);
      //     return (
      //       <g key={i}>
      //         <line
      //           x1={x1}
      //           y1={y1}
      //           x2={x2}
      //           y2={y2}
      //           stroke="#B8962E"
      //           strokeWidth="1.5"
      //           opacity="0.5"
      //         />
      //         <circle
      //           cx={x2}
      //           cy={y2}
      //           r="4"
      //           fill="none"
      //           stroke="#0D3D4E"
      //           strokeWidth="1.2"
      //           opacity="0.5"
      //         />
      //       </g>
      //     );
      //   })}
      //   <circle
      //     cx="40"
      //     cy="40"
      //     r="34"
      //     stroke="#B8962E"
      //     strokeWidth="0.8"
      //     opacity="0.1"
      //     strokeDasharray="3 6"
      //   />
      // </svg>
      <img
        src={AI}
        alt="AI"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    ),
  };
  return map[name] || map["Artificial Intelligence"];
};

/* ══════════════════════════════════════════════════════
   HERO — photo background, About-style
══════════════════════════════════════════════════════ */
const PAGE_CSS = `
  @keyframes dp-load { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  .dp-l1{animation:dp-load 1s cubic-bezier(0.16,1,0.3,1) 0.2s both;}
  .dp-l2{animation:dp-load 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
  .dp-l3{animation:dp-load 1s cubic-bezier(0.16,1,0.3,1) 0.65s both;}
  @keyframes dp-scroll{from{height:0;opacity:0}to{height:56px;opacity:1}}
  .dp-scline{animation:dp-scroll 1s ease 1.1s both;}
  @keyframes dp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  .dp-tag{background:rgba(13,61,78,0.82);border:1px solid rgba(184,150,46,0.35);
    padding:7px 16px;backdrop-filter:blur(6px);position:absolute;
    font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.22em;
    text-transform:uppercase;color:rgba(245,240,232,0.8);white-space:nowrap;pointer-events:none;}
  .dp-tag::before{content:"";position:absolute;left:-18px;top:50%;width:14px;height:1px;
    background:rgba(184,150,46,0.6);}
  .acc-strip{cursor:pointer;border-bottom:1px solid rgba(13,61,78,0.1);
    transition:background 0.3s ease;}
  .acc-strip:hover{background:rgba(13,61,78,0.03);}
  .fn-card{border:1px solid rgba(13,61,78,0.1);transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
    background:#F5F0E8;}
  .fn-card:hover{border-color:#B8962E;transform:translateY(-4px);background:#EDE8DE;}
  .fn-card:hover .fn-title{color:#B8962E;}
`;

/* ══════════════════════════════════════════════════════
   INDUSTRY ACCORDION
══════════════════════════════════════════════════════ */
function IndustryAccordion({ industries }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {industries.map((ind, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="acc-strip"
            style={{ background: isOpen ? "#EDE8DE" : "#F5F0E8" }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {/* Header row — always visible */}
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 64px",
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 26,
                    color: "#B8962E",
                    opacity: isOpen ? 1 : 0.45,
                    minWidth: 28,
                    transition: "opacity 0.3s",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(20px,2.4vw,30px)",
                    fontWeight: 300,
                    color: isOpen ? "#B8962E" : "#0D3D4E",
                    transition: "color 0.3s",
                  }}
                >
                  {ind.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 15,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#7A8694",
                    opacity: isOpen ? 1 : 0.6,
                    transition: "opacity 0.3s",
                  }}
                >
                  {ind.fn}
                </span>
              </div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: `1px solid ${isOpen ? "#B8962E" : "rgba(13,61,78,0.2)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.3s",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 18,
                    lineHeight: 1,
                    color: isOpen ? "#B8962E" : "#0D3D4E",
                    display: "inline-block",
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition:
                      "transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s",
                  }}
                >
                  +
                </span>
              </div>
            </div>

            {/* Expanded panel */}
            <div
              style={{
                maxHeight: isOpen ? 420 : 0,
                overflow: "hidden",
                transition: "max-height 0.6s cubic-bezier(0.77,0,0.175,1)",
              }}
            >
              <div
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "0 64px 48px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 64,
                }}
              >
                {/* Description */}
                <div style={{ gridColumn: "1/3" }}>
                  <div
                    style={{
                      width: 40,
                      height: 1,
                      background: "#B8962E",
                      marginBottom: 24,
                      opacity: 0.7,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: "#4A5568",
                      marginBottom: 28,
                      maxWidth: 540,
                    }}
                  >
                    {ind.d}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {ind.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        style={{
                          fontFamily: "'Jost',sans-serif",
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          border: "1px solid rgba(13,61,78,0.2)",
                          color: "#0D3D4E",
                          background: "rgba(13,61,78,0.04)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Illustration + quote */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 8,
                    borderLeft: "1px solid rgba(13,61,78,0.1)",
                    paddingLeft: 40,
                  }}
                >
                  <div style={{ width: 100, height: 84, marginBottom: 20 }}>
                    <IndustryIllustration index={i} />
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "#7A8694",
                      lineHeight: 1.7,
                      textAlign: "center",
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

/* ══════════════════════════════════════════════════════
   FUNCTION GRID — clean 4-column cards with illustrations
══════════════════════════════════════════════════════ */
function FunctionGrid() {
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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 2,
      }}
    >
      {functions.map((fn, i) => (
        <Fade key={i} delay={i * 60}>
          <div
            className="fn-card"
            style={{ padding: "36px 28px 32px", textAlign: "center" }}
          >
            <div style={{ width: 72, height: 72, margin: "0 auto 20px" }}>
              <FunctionIllustration name={fn.n} />
            </div>
            <div
              style={{
                width: 24,
                height: 1,
                background: "#B8962E",
                margin: "0 auto 14px",
                opacity: 0.6,
              }}
            />
            <div
              className="fn-title"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 17,
                fontWeight: 400,
                color: "#0D3D4E",
                lineHeight: 1.2,
                marginBottom: 8,
                transition: "color 0.3s",
              }}
            >
              {fn.n}
            </div>
            <div
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7A8694",
                lineHeight: 1.5,
              }}
            >
              {fn.sub}
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   AI SECTION — teal bg, full-width, animated topology SVG
══════════════════════════════════════════════════════ */

/* Animated pulse dot that travels along a path */
function PulseDot({ x1, y1, x2, y2, delay = 0, vis }) {
  return (
    <circle
      r="3"
      fill="#B8962E"
      opacity="0.9"
      style={{ display: vis ? "block" : "none" }}
    >
      <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay}s`}>
        <mpath href={`#pulse-path-${x1}-${y1}-${x2}-${y2}`} />
      </animateMotion>
    </circle>
  );
}

function AISection({ setPage }) {
  const [ref, vis] = useIO(0.05);

  /* Enterprise topology nodes */
  const centerX = 300,
    centerY = 200;
  const outerNodes = [
    {
      id: "strategy",
      label: "Strategy",
      sub: "Enterprise\nAlignment",
      angle: -90,
      r: 155,
    },
    {
      id: "ops",
      label: "Operations",
      sub: "Process\nIntelligence",
      angle: -18,
      r: 155,
    },
    {
      id: "finance",
      label: "Finance",
      sub: "Predictive\nAnalytics",
      angle: 54,
      r: 155,
    },
    {
      id: "talent",
      label: "Talent",
      sub: "HR & People\nAnalytics",
      angle: 126,
      r: 155,
    },
    {
      id: "risk",
      label: "Governance",
      sub: "Risk &\nCompliance",
      angle: 198,
      r: 155,
    },
  ];

  /* Convert angle+radius → cartesian */
  const polar = (angle, r) => ({
    x: centerX + r * Math.cos((angle * Math.PI) / 180),
    y: centerY + r * Math.sin((angle * Math.PI) / 180),
  });

  const outerPositions = outerNodes.map((n) => ({
    ...n,
    ...polar(n.angle, n.r),
  }));

  /* Mid-ring nodes */
  const midNodes = [
    { id: "m1", angle: -54, r: 82 },
    { id: "m2", angle: 18, r: 82 },
    { id: "m3", angle: 90, r: 82 },
    { id: "m4", angle: 162, r: 82 },
    { id: "m5", angle: 234, r: 82 },
  ];
  const midPositions = midNodes.map((n) => ({ ...n, ...polar(n.angle, n.r) }));

  /* Edges: center↔mid, mid↔outer */
  const edges = [
    ...midPositions.map((m) => ({
      x1: centerX,
      y1: centerY,
      x2: m.x,
      y2: m.y,
      key: `cm-${m.id}`,
    })),
    ...outerPositions.map((o, i) => ({
      x1: midPositions[i].x,
      y1: midPositions[i].y,
      x2: o.x,
      y2: o.y,
      key: `mo-${o.id}`,
    })),
    {
      x1: outerPositions[0].x,
      y1: outerPositions[0].y,
      x2: outerPositions[1].x,
      y2: outerPositions[1].y,
      key: "o01",
    },
    {
      x1: outerPositions[2].x,
      y1: outerPositions[2].y,
      x2: outerPositions[3].x,
      y2: outerPositions[3].y,
      key: "o23",
    },
  ];

  const AI_CSS = `
    @keyframes ai-pulse-ring {
      0%  { r: 34; opacity: 0.5; }
      100%{ r: 56; opacity: 0;   }
    }
    @keyframes ai-glow {
      0%,100% { opacity: 0.5; }
      50%     { opacity: 1;   }
    }
    @keyframes ai-orbit {
      from { transform: rotate(0deg);   }
      to   { transform: rotate(360deg); }
    }
    @keyframes ai-orbit-rev {
      from { transform: rotate(0deg);   }
      to   { transform: rotate(-360deg);}
    }
    .ai-pulse-ring {
      animation: ai-pulse-ring 2.4s ease-out infinite;
      transform-origin: ${centerX}px ${centerY}px;
    }
    .ai-pulse-ring-2 {
      animation: ai-pulse-ring 2.4s ease-out infinite 0.8s;
      transform-origin: ${centerX}px ${centerY}px;
    }
    .ai-pulse-ring-3 {
      animation: ai-pulse-ring 2.4s ease-out infinite 1.6s;
      transform-origin: ${centerX}px ${centerY}px;
    }
    .ai-core-glow {
      animation: ai-glow 2s ease-in-out infinite;
    }
    .ai-orbit-ring {
      transform-origin: ${centerX}px ${centerY}px;
      animation: ai-orbit 18s linear infinite;
    }
    .ai-orbit-ring-rev {
      transform-origin: ${centerX}px ${centerY}px;
      animation: ai-orbit-rev 26s linear infinite;
    }
  `;

  return (
    <section
      id="domains-emerging-domain"
      ref={ref}
      style={{
        background: "#0D3D4E",
        padding: "0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{AI_CSS}</style>

      {/* Dot grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px,rgba(255,255,255,0.035) 1px,transparent 0)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
        }}
      />

      {/* ── TOP: FULL-WIDTH ILLUSTRATION BAND ── */}
      <div
        style={{
          width: "100%",
          padding: "130px 0 20px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid rgba(184,150,46,0.12)",
        }}
      >
        {/* Section label centered above diagram */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: "#B8962E",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#B8962E",
              }}
            >
              Emerging Domain
            </span>
            <div
              style={{
                width: 32,
                height: 1,
                background: "#B8962E",
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* SVG Topology Diagram */}
        <svg
          viewBox="0 0 600 510"
          style={{ width: "min(680px, 90vw)", overflow: "visible" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs: pulse paths for animateMotion */}
          <defs>
            {edges.map((e) => (
              <path
                key={e.key}
                id={`pulse-path-${e.x1}-${e.y1}-${e.x2}-${e.y2}`}
                d={`M${e.x1},${e.y1} L${e.x2},${e.y2}`}
              />
            ))}
          </defs>

          {/* Orbit rings (decorative, rotating) */}
          <circle
            className="ai-orbit-ring"
            cx={centerX}
            cy={centerY}
            r="155"
            stroke="#B8962E"
            strokeWidth="0.6"
            strokeDasharray="3 14"
            opacity={vis ? 0.2 : 0}
            style={{ transition: "opacity 0.8s ease 0.2s" }}
          />
          <circle
            className="ai-orbit-ring-rev"
            cx={centerX}
            cy={centerY}
            r="110"
            stroke="#B8962E"
            strokeWidth="0.5"
            strokeDasharray="2 20"
            opacity={vis ? 0.15 : 0}
            style={{ transition: "opacity 0.8s ease 0.3s" }}
          />

          {/* Edges — draw on scroll */}
          {edges.map((e, i) => (
            <line
              key={e.key}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="#B8962E"
              strokeWidth="0.8"
              opacity="0.22"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: vis ? 0 : 200,
                transition: `stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.08}s`,
              }}
            />
          ))}

          {/* Animated pulse dots */}
          {vis &&
            edges
              .slice(0, 7)
              .map((e, i) => (
                <PulseDot key={e.key} {...e} delay={i * 0.35} vis={vis} />
              ))}

          {/* Pulse rings on center */}
          {vis && (
            <>
              <circle
                className="ai-pulse-ring"
                cx={centerX}
                cy={centerY}
                r="34"
                fill="none"
                stroke="#B8962E"
                strokeWidth="1"
                opacity="0.5"
              />
              <circle
                className="ai-pulse-ring-2"
                cx={centerX}
                cy={centerY}
                r="34"
                fill="none"
                stroke="#B8962E"
                strokeWidth="1"
                opacity="0.5"
              />
              <circle
                className="ai-pulse-ring-3"
                cx={centerX}
                cy={centerY}
                r="34"
                fill="none"
                stroke="#B8962E"
                strokeWidth="1"
                opacity="0.5"
              />
            </>
          )}

          {/* Mid-ring nodes */}
          {midPositions.map((m, i) => (
            <g
              key={m.id}
              style={{
                opacity: vis ? 1 : 0,
                transition: `opacity 0.5s ease ${0.5 + i * 0.09}s`,
              }}
            >
              <circle
                cx={m.x}
                cy={m.y}
                r="8"
                fill="#0D3D4E"
                stroke="#B8962E"
                strokeWidth="1"
                opacity="0.8"
              />
              <circle cx={m.x} cy={m.y} r="3" fill="#B8962E" opacity="0.7" />
            </g>
          ))}

          {/* Outer function nodes */}
          {outerPositions.map((n, i) => {
            const isTop = n.y < centerY - 60;
            const isBottom = n.y > centerY + 60;
            const isLeft = n.x < centerX - 40;
            return (
              <g
                key={n.id}
                style={{
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.6 + i * 0.1}s`,
                  transform: vis
                    ? "none"
                    : `translate(${(n.x - centerX) * 0.15}px, ${(n.y - centerY) * 0.15}px)`,
                }}
              >
                {/* Outer glow ring */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="26"
                  fill="rgba(184,150,46,0.08)"
                  stroke="rgba(184,150,46,0.2)"
                  strokeWidth="1"
                />
                {/* Node circle */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="18"
                  fill="#0D3D4E"
                  stroke="#B8962E"
                  strokeWidth="1.5"
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="6"
                  fill="#B8962E"
                  opacity="0.8"
                  className="ai-core-glow"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
                {/* Label — placed away from center */}
                <text
                  x={n.x + (isLeft ? -36 : n.x > centerX + 40 ? 36 : 0)}
                  y={
                    isTop
                      ? n.y - 80
                      : isBottom
                        ? n.y + 72
                        : n.y + (n.x < centerX ? 0 : 0)
                  }
                  textAnchor={
                    isLeft ? "end" : n.x > centerX + 40 ? "start" : "middle"
                  }
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 14,
                    fill: "rgba(245,240,232,0.95)",
                    fontWeight: 400,
                  }}
                >
                  {n.label}
                </text>
                {n.sub.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={n.x + (isLeft ? -36 : n.x > centerX + 40 ? 36 : 0)}
                    y={
                      (isTop ? n.y - 80 : isBottom ? n.y + 72 : n.y) +
                      18 +
                      li * 13
                    }
                    textAnchor={
                      isLeft ? "end" : n.x > centerX + 40 ? "start" : "middle"
                    }
                    dominantBaseline="middle"
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 8,
                      fill: "rgba(184,150,46,0.75)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Center AI core */}
          <g
            style={{
              opacity: vis ? 1 : 0,
              transition: "opacity 0.7s ease 0.2s",
            }}
          >
            {/* Outer ambient glow */}
            <circle
              cx={centerX}
              cy={centerY}
              r="52"
              fill="rgba(184,150,46,0.07)"
            />
            {/* Mid glow ring */}
            <circle
              cx={centerX}
              cy={centerY}
              r="42"
              fill="rgba(184,150,46,0.12)"
              stroke="rgba(184,150,46,0.3)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            {/* Main core circle — larger + brighter border */}
            <circle
              cx={centerX}
              cy={centerY}
              r="34"
              fill="#071F28"
              stroke="#B8962E"
              strokeWidth="2.5"
            />
            {/* Inner highlight ring */}
            <circle
              cx={centerX}
              cy={centerY}
              r="28"
              fill="none"
              stroke="rgba(184,150,46,0.25)"
              strokeWidth="1"
            />
            <text
              x={centerX}
              y={centerY - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 18,
                fill: "#B8962E",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              AI
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 8,
                fill: "rgba(184,150,46,0.8)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              CORE
            </text>
          </g>

          {/* Title below diagram */}
          <text
            x={centerX}
            y={470}
            textAnchor="middle"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              fill: "rgba(245,240,232,0.3)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: vis ? 1 : 0,
              transition: "opacity 0.6s ease 1.4s",
            }}
          >
            AI as a horizontal enterprise capability
          </text>
        </svg>
      </div>

      {/* ── BOTTOM: CONTENT BAND ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 64px 96px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left — heading + body */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(24px)",
              transition: "opacity 0.85s ease 0.8s, transform 0.85s ease 0.8s",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(32px,3.6vw,50px)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: 28,
              }}
            >
              Leadership for Intelligent Enterprise Transformation.
            </h2>
            <div
              style={{
                width: 48,
                height: 1,
                background: "#B8962E",
                marginBottom: 28,
                opacity: 0.7,
              }}
            />
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(245,240,232,0.62)",
                marginBottom: 18,
              }}
            >
              Artificial Intelligence and advanced analytics are reshaping
              industries, operating models, and competitive dynamics. The
              question is no longer whether to adopt AI — but how to embed it
              responsibly, strategically, and at scale.
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(245,240,232,0.62)",
                marginBottom: 18,
              }}
            >
              AI leadership demands commercial judgement, governance awareness,
              and the ability to translate digital capability into measurable
              business impact.
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(245,240,232,0.62)",
                marginBottom: 36,
              }}
            >
              PivotEdge Partners treats AI as a horizontal capability — cutting
              across every industry and function. We identify leaders who move
              AI from experimentation to enterprise integration.
            </p>
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

          {/* Right — approach points + mandates */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(24px)",
              transition: "opacity 0.85s ease 1s, transform 0.85s ease 1s",
            }}
          >
            <div
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 14,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#B8962E",
                marginBottom: 24,
                opacity: 0.8,
              }}
            >
              Our Approach to AI
            </div>
            {[
              {
                n: "Business & Technology Alignment",
                d: "We clarify the role AI must play in long-term value creation before defining any leadership profile.",
              },
              {
                n: "Capability Definition",
                d: "Technical depth combined with strategic thinking, stakeholder management, and execution discipline.",
              },
              {
                n: "Governance Evaluation",
                d: "Candidates assessed on data governance, regulatory awareness, ethical implementation, and risk management.",
              },
              {
                n: "Enterprise Integration Readiness",
                d: "Ability to scale AI across operations, finance, customer engagement, supply chain, and human capital.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(245,240,232,0.12)",
                  alignItems: "flex-start",
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    background: "rgba(184,150,46,0.15)",
                    border: "1px solid rgba(184,150,46,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#B8962E",
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "#FFFFFF",
                      marginBottom: 6,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.n}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: "rgba(245,240,232,0.65)",
                      margin: 0,
                    }}
                  >
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 28 }}>
              <div
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 14,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#B8962E",
                  marginBottom: 12,
                  opacity: 0.7,
                }}
              >
                Typical Mandates
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                }}
              >
                {[
                  "Chief AI Officers",
                  "Chief Digital Officers",
                  "Heads of Data Science",
                  "AI Strategy Leaders",
                  "Intelligent Automation",
                  "Responsible AI & Governance",
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "10px 14px",
                      background: "rgba(245,240,232,0.1)",
                      border: "1px solid rgba(184,150,46,0.45)",
                      color: "rgba(245,240,232,0.9)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#B8962E",
                        flexShrink: 0,
                      }}
                    />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function DomainsPage({ setPage }) {
  const [heroRef, heroVis] = useIO(0);

  const industries = [
    {
      name: "Industrial",
      fn: "Manufacturing & Operations Leadership",
      d: "Industrial organisations operate within cyclical markets, cost pressures, and evolving technological landscapes. We support manufacturers and industrial enterprises in appointing leaders capable of modernising operations, improving productivity, and sustaining long-term competitiveness.",
      tags: ["Manufacturing", "Operations", "Industrials", "Capital Equipment"],
      quote:
        "Operational excellence and transformation leadership for complex industrial environments.",
    },
    {
      name: "Real Estate & Infrastructure",
      fn: "Capital Markets & Asset Development",
      d: "Capital-intensive and long-cycle in nature, this sector demands disciplined leadership with strong risk management and stakeholder alignment. We work with developers, operators, and infrastructure enterprises to identify executives who can drive scale, efficiency, and asset value.",
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
      tags: ["FMCG", "Retail", "E-commerce", "Brand Strategy"],
      quote:
        "Agile leaders who translate consumer insight into competitive advantage.",
    },
    {
      name: "Healthcare & Life Sciences",
      fn: "Clinical, Commercial & Regulatory",
      d: "Innovation, regulation, and societal responsibility define this sector. We identify leaders with scientific credibility, regulatory awareness, and strategic foresight to guide organisations through complexity and transformation across pharma, medtech, and healthcare services.",
      tags: ["Pharma", "MedTech", "Healthcare Services", "Life Sciences"],
      quote:
        "Scientific credibility paired with commercial and regulatory acumen.",
    },
    {
      name: "Banking & Financial Services",
      fn: "Risk, Compliance & Capital Performance",
      d: "Managing capital, risk, compliance, and technological change demands experienced leadership. We support financial institutions in appointing executives who can navigate regulatory landscapes while delivering sustainable performance across banking, insurance, and asset management.",
      tags: ["Banking", "Insurance", "Asset Management", "FinTech"],
      quote:
        "Governance discipline and strategic acumen in a demanding regulatory environment.",
    },
    {
      name: "Technology, Media & Telecom",
      fn: "Digital, Platform & Innovation",
      d: "Continuous innovation and digital disruption shape this domain. We partner with organisations to identify leaders who can harness emerging technologies, scale platforms, and drive competitive differentiation in an era of rapid technological change.",
      tags: ["Technology", "Media", "Telecom", "Digital Platforms"],
      quote:
        "Visionary leaders who convert digital disruption into sustainable advantage.",
    },
  ];

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, []);

  return (
    <div>
      <style>{PAGE_CSS}</style>

      {/* ── 1. HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=85"
          alt="Domains"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
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
              "linear-gradient(to right, rgba(13,61,78,0.55) 0%, transparent 60%)",
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
          <div className="dp-l1">
            <SectionLabel text="Industry Domains" light />
          </div>
          <h1
            className="dp-l2"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(60px,7.5vw,100px)",
              fontWeight: 300,
              lineHeight: 0.98,
              color: "#FFFFFF",
              margin: "16px 0 24px",
            }}
          >
            Precision-Led
            <br />
            Domain
            <br />
            Expertise.
          </h1>
          <p
            className="dp-l3"
            style={{
              fontSize: 14,
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            Six sectors. Thirty countries. One standard of rigour.
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
            className="dp-scline"
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
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Explore
          </span>
        </div>
      </section>

      {/* ── 2. SECTOR ACCORDION ── */}
      <section id="domains-where-we-operate">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 64px 48px",
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
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(36px,4vw,54px)",
                  fontWeight: 300,
                  color: "#0D3D4E",
                  lineHeight: 1.1,
                }}
              >
                Where We Operate
              </h2>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "#4A5568",
                  maxWidth: 300,
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

      {/* ── 3. FUNCTION GRID ── */}
      <section
        id="domains-functional-expertise"
        style={{ background: "#EDE8DE", padding: "100px 64px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel text="Functional Expertise" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(36px,4vw,54px)",
                fontWeight: 300,
                color: "#0D3D4E",
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
                color: "#4A5568",
                maxWidth: 520,
                margin: "20px auto 0",
              }}
            >
              Our functional capability spans the full C-suite and board — hover
              each discipline to see our depth.
            </p>
          </Fade>
          <FunctionGrid />
        </div>
      </section>

      {/* ── 4. AI SECTION ── */}
      <AISection setPage={setPage} />

      {/* ── 5. CLOSING CTA ── */}
      <section style={{ background: "#F5F0E8", padding: "100px 64px" }}>
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
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(26px,3.2vw,42px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "#0D3D4E",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  "Industry nuance and leadership dynamics are inseparable. We
                  understand both."
                </blockquote>
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{ width: 40, height: 1, background: "#B8962E" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#B8962E",
                    }}
                  >
                    PivotEdge Partners
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderLeft: "1px solid rgba(13,61,78,0.1)",
                  paddingLeft: 80,
                }}
              >
                <SectionLabel text="Begin a Conversation" />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(22px,2.6vw,34px)",
                    fontWeight: 300,
                    color: "#0D3D4E",
                    marginBottom: 20,
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
                    color: "#4A5568",
                    marginBottom: 32,
                  }}
                >
                  Our senior partners bring deep domain expertise to every
                  mandate. A confidential conversation costs nothing.
                </p>
                <button
                  className="btn btn-teal"
                  onClick={() => {
                    setPage("Contact");
                    window.scrollTo(0, 0);
                  }}
                >
                  <span>Arrange a Discussion</span>
                </button>
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#7A8694",
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
