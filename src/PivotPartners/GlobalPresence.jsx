import { useRef, useMemo, useState } from "react";
import DottedMap from "dotted-map";
import { T } from "./tokens";
import { SectionLabel } from "./utils";

const OFFICES = [
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    role: "Headquarters",
    region: "South Asia & Global Operations",
    tz: "IST — UTC +5:30",
    lat: 19.076,
    lng: 72.877,
    address: "Bandra Kurla Complex\nMumbai 400 051\nIndia",
    email: "mumbai@pivotedgegroup.com",
    phone: "+91 22 6678 9000",
    mapsUrl: "https://maps.google.com/?q=Bandra+Kurla+Complex+Mumbai+India",
    desc: "Our global headquarters, anchoring our South Asia practice and international coordination. The Mumbai office leads CEO and Board mandates across the subcontinent.",
    pulseDelay: "0s",
    pulse2Delay: "0.8s",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    role: "Regional Hub",
    region: "Middle East & Africa",
    tz: "GST — UTC +4:00",
    lat: 25.204,
    lng: 55.27,
    address: "Dubai International\nFinancial Centre\nDubai, UAE",
    email: "dubai@pivotedgegroup.com",
    phone: "+971 4 388 7000",
    mapsUrl: "https://maps.google.com/?q=Dubai+International+Financial+Centre",
    desc: "Our Middle East hub serves sovereign wealth, regional conglomerates, and multinational leaders across the GCC and wider Africa region.",
    pulseDelay: "0.4s",
    pulse2Delay: "1.2s",
  },
  {
    id: "sydney",
    city: "Sydney",
    country: "Australia",
    role: "Representative Office",
    region: "Asia-Pacific",
    tz: "AEDT — UTC +11:00",
    lat: -33.868,
    lng: 151.209,
    address: "1 Martin Place\nSydney NSW 2000\nAustralia",
    email: "sydney@pivotedgegroup.com",
    phone: "+61 2 9000 7500",
    mapsUrl: "https://maps.google.com/?q=1+Martin+Place+Sydney+NSW+Australia",
    desc: "Our Asia-Pacific representative office supports clients across Australia, New Zealand, and South-East Asia with executive search and governance advisory.",
    pulseDelay: "0.8s",
    pulse2Delay: "1.6s",
  },
];

// Project lat/lng → SVG viewBox 0 0 800 400
function projectPoint(lat, lng) {
  return {
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  };
}

function curvedPath(a, b, curvature = 0.35) {
  const midX = (a.x + b.x) / 2;
  const midY =
    Math.min(a.y, b.y) - Math.hypot(b.x - a.x, b.y - a.y) * curvature;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

export default function GlobalPresence() {
  const [active, setActive] = useState(OFFICES[0]);
  const [panelVisible, setPanelVisible] = useState(true);
  const svgRef = useRef(null);

  const dottedMap = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    [],
  );
  const svgMap = useMemo(
    () =>
      dottedMap.getSVG({
        radius: 0.22,
        color: "rgba(245,240,232,0.15)",
        shape: "circle",
        backgroundColor: "#0D3D4E",
      }),
    [dottedMap],
  );

  // Project all office coordinates
  const projected = useMemo(
    () => OFFICES.map((o) => ({ ...o, pt: projectPoint(o.lat, o.lng) })),
    [],
  );

  // Arc paths between offices
  const arcs = useMemo(() => {
    const pts = projected;
    return [
      { path: curvedPath(pts[0].pt, pts[1].pt), id: "mum-dub" }, // Mumbai–Dubai
      { path: curvedPath(pts[1].pt, pts[2].pt, 0.28), id: "dub-syd" }, // Dubai–Sydney
    ];
  }, [projected]);

  const CSS = `
    @keyframes gp2-draw {
      from { stroke-dashoffset: 500; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes gp2-pulse-out {
      0%   { r: 5;  opacity: 0.7; }
      100% { r: 22; opacity: 0;   }
    }
    @keyframes gp2-pin-glow {
      0%,100% { filter: drop-shadow(0 0 3px rgba(184,150,46,0.4)); }
      50%     { filter: drop-shadow(0 0 9px rgba(184,150,46,0.9)); }
    }
    @keyframes gp2-panel-in {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes gp2-dot-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(184,150,46,0.4); }
      50%     { box-shadow: 0 0 0 6px rgba(184,150,46,0); }
    }
    .gp2-arc {
      stroke-dasharray: 500;
      stroke-dashoffset: 500;
      animation: gp2-draw 2s cubic-bezier(0.77,0,0.175,1) 0.6s forwards;
    }
    .gp2-arc-2 {
      stroke-dasharray: 500;
      stroke-dashoffset: 500;
      animation: gp2-draw 2s cubic-bezier(0.77,0,0.175,1) 1.1s forwards;
    }
    .gp2-pulse { animation: gp2-pulse-out 2.4s ease-out infinite; }
    .gp2-pin-active { animation: gp2-pin-glow 2s ease-in-out infinite; }
    .gp2-panel { animation: gp2-panel-in 0.45s cubic-bezier(0.16,1,0.3,1) both; }
    .gp2-tab { transition: all 0.3s ease; cursor: pointer; border: none; background: none; text-align: left; width: 100%; }
    .gp2-tab:hover .gp2-tab-city { color: #B8962E; }
    .gp2-pin-hit { cursor: pointer; }
    .gp2-pin-hit:hover { opacity: 1; }
  `;

  const handleSelect = (office) => {
    setPanelVisible(false);
    setTimeout(() => {
      setActive(office);
      setPanelVisible(true);
    }, 180);
  };

  return (
    <section
      style={{
        background: T.teal,
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <style>{CSS}</style>

      {/* Dot-grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── HEADER ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 64px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div>
            <SectionLabel text="Global Presence" light />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px,4.5vw,56px)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.05,
                marginBottom: 10,
              }}
            >
              Where We Operate
            </h2>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(245,240,232,0.45)",
                letterSpacing: "0.06em",
              }}
            >
              Three strategic offices. One standard of rigour.
            </p>
          </div>
          {/* Stat */}
          <div style={{ textAlign: "right", flexShrink: 0, paddingBottom: 4 }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 64,
                fontWeight: 600,
                color: T.gold,
                lineHeight: 1,
                opacity: 0.35,
              }}
            >
              3
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(184,150,46,0.6)",
                marginTop: 4,
              }}
            >
              Office Locations
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY: sidebar + map ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 64px 80px",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 0,
          alignItems: "stretch",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ── LEFT SIDEBAR ── */}
        <div
          style={{
            background: "rgba(5,25,33,0.65)",
            border: "1px solid rgba(184,150,46,0.12)",
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "18px 22px 14px",
              borderBottom: "1px solid rgba(184,150,46,0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(184,150,46,0.6)",
              }}
            >
              Our Offices
            </span>
          </div>

          {OFFICES.map((office) => {
            const isActive = active.id === office.id;
            return (
              <button
                key={office.id}
                className="gp2-tab"
                onClick={() => handleSelect(office)}
                style={{
                  padding: "18px 22px",
                  borderBottom: "1px solid rgba(184,150,46,0.07)",
                  borderLeft: isActive
                    ? `2px solid ${T.gold}`
                    : "2px solid transparent",
                  paddingLeft: isActive ? 20 : 22,
                  background: isActive
                    ? "rgba(184,150,46,0.06)"
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: isActive ? T.gold : "rgba(184,150,46,0.3)",
                    flexShrink: 0,
                    boxShadow: isActive
                      ? "0 0 0 3px rgba(184,150,46,0.18)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <div>
                  <div
                    className="gp2-tab-city"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 300,
                      color: isActive ? T.gold : "#FFFFFF",
                      lineHeight: 1,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {office.city}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.3)",
                      marginTop: 4,
                    }}
                  >
                    {office.country} · {office.role}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Active office detail panel */}
          <div
            key={active.id}
            className="gp2-panel"
            style={{
              padding: "24px 22px",
              marginTop: "auto",
              borderTop: "1px solid rgba(184,150,46,0.1)",
              opacity: panelVisible ? 1 : 0,
              transition: "opacity 0.18s ease",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 300,
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              {active.city}
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(184,150,46,0.7)",
                marginBottom: 14,
              }}
            >
              {active.tz}
            </div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(245,240,232,0.38)",
                marginBottom: 16,
                whiteSpace: "pre-line",
              }}
            >
              {active.address}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                marginBottom: 16,
              }}
            >
              <a
                href={`mailto:${active.email}`}
                style={{
                  fontSize: 10,
                  color: "rgba(245,240,232,0.5)",
                  textDecoration: "none",
                  fontFamily: "'Jost', sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = T.gold)}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(245,240,232,0.5)")
                }
              >
                {active.email}
              </a>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(245,240,232,0.4)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {active.phone}
              </span>
            </div>
            <a
              href={active.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: T.gold,
                background: "none",
                border: "1px solid rgba(184,150,46,0.35)",
                padding: "7px 14px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(184,150,46,0.12)";
                e.currentTarget.style.borderColor = T.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.borderColor = "rgba(184,150,46,0.35)";
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Maps
            </a>
          </div>
        </div>

        {/* ── MAP ── */}
        <div
          style={{
            border: "1px solid rgba(184,150,46,0.12)",
            position: "relative",
            background: "#071F28",
            overflow: "hidden",
          }}
        >
          {/* Corner accents */}
          {[
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ].map(([rx, ry], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                zIndex: 5,
                pointerEvents: "none",
                top: ry === 0 ? 10 : "auto",
                bottom: ry === 1 ? 10 : "auto",
                left: rx === 0 ? 10 : "auto",
                right: rx === 1 ? 10 : "auto",
                width: 14,
                height: 14,
                borderTop: ry === 0 ? "1px solid rgba(184,150,46,0.3)" : "none",
                borderBottom:
                  ry === 1 ? "1px solid rgba(184,150,46,0.3)" : "none",
                borderLeft:
                  rx === 0 ? "1px solid rgba(184,150,46,0.3)" : "none",
                borderRight:
                  rx === 1 ? "1px solid rgba(184,150,46,0.3)" : "none",
              }}
            />
          ))}

          {/* Map container with mask */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "2/1",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, white 6%, white 94%, transparent 100%)",
            }}
          >
            {/* Dotted base map */}
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
              alt="world map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
            />

            {/* SVG overlay: arcs + pins */}
            <svg
              ref={svgRef}
              viewBox="0 0 800 400"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="gp2-arcgrad1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#B8962E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#B8962E" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient
                  id="gp2-arcgrad2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#B8962E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#B8962E" stopOpacity="0.8" />
                </linearGradient>
                <filter id="gp2-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Arc: Mumbai → Dubai */}
              <path
                className="gp2-arc"
                d={arcs[0].path}
                fill="none"
                stroke="url(#gp2-arcgrad1)"
                strokeWidth="1.2"
                strokeDasharray="5 4"
                opacity="0.8"
              />
              {/* Arc: Dubai → Sydney */}
              <path
                className="gp2-arc-2"
                d={arcs[1].path}
                fill="none"
                stroke="url(#gp2-arcgrad2)"
                strokeWidth="1.2"
                strokeDasharray="5 4"
                opacity="0.8"
              />

              {/* Pins */}
              {projected.map((office) => {
                const isActive = active.id === office.id;
                const { pt } = office;
                return (
                  <g
                    key={office.id}
                    className="gp2-pin-hit"
                    onClick={() => handleSelect(office)}
                  >
                    {/* Pulse rings */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      fill="none"
                      stroke="rgba(184,150,46,0.6)"
                      strokeWidth="1"
                      className="gp2-pulse"
                      style={{ animationDelay: office.pulseDelay }}
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      fill="none"
                      stroke="rgba(184,150,46,0.3)"
                      strokeWidth="0.8"
                      className="gp2-pulse"
                      style={{ animationDelay: office.pulse2Delay }}
                    />

                    {/* Pin body */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="7"
                      fill={isActive ? T.gold : "#0D3D4E"}
                      stroke={T.gold}
                      strokeWidth={isActive ? 0 : 1.8}
                      className={isActive ? "gp2-pin-active" : ""}
                      style={{ transition: "fill 0.3s ease" }}
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="3"
                      fill={isActive ? "#F5F0E8" : T.gold}
                      style={{ transition: "fill 0.3s ease" }}
                    />

                    {/* Hit area (invisible, larger) */}
                    <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />

                    {/* City label chip */}
                    <rect
                      x={pt.x - 30}
                      y={pt.y - 26}
                      width={office.city.length * 6.5 + 8}
                      height="16"
                      rx="2"
                      fill="rgba(7,31,40,0.9)"
                      stroke={isActive ? T.gold : "rgba(184,150,46,0.4)"}
                      strokeWidth={isActive ? 1 : 0.7}
                      style={{ transition: "stroke 0.3s ease" }}
                    />
                    <text
                      x={pt.x - 30 + (office.city.length * 6.5 + 8) / 2}
                      y={pt.y - 14}
                      textAnchor="middle"
                      fontFamily="'Jost', sans-serif"
                      fontSize="8"
                      fill={isActive ? T.gold : "rgba(245,240,232,0.75)"}
                      letterSpacing="1.5"
                      style={{
                        transition: "fill 0.3s ease",
                        textTransform: "uppercase",
                        userSelect: "none",
                      }}
                    >
                      {office.city.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating info card — active office description */}
          <div
            key={`info-${active.id}`}
            className="gp2-panel"
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              zIndex: 10,
              background: "rgba(7,31,40,0.95)",
              border: "1px solid rgba(184,150,46,0.35)",
              padding: "20px 22px",
              minWidth: 220,
              maxWidth: 260,
              backdropFilter: "blur(8px)",
              opacity: panelVisible ? 1 : 0,
              transition: "opacity 0.18s ease",
            }}
          >
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(184,150,46,0.7)",
                marginBottom: 6,
              }}
            >
              {active.role}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {active.city}
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.3)",
                marginBottom: 12,
              }}
            >
              {active.region}
            </div>
            <div
              style={{
                width: 24,
                height: 1,
                background: T.gold,
                opacity: 0.5,
                marginBottom: 12,
              }}
            />
            <p
              style={{
                fontSize: 11,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(245,240,232,0.55)",
                marginBottom: 14,
              }}
            >
              {active.desc}
            </p>
            <a
              href={active.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: T.gold,
                textDecoration: "none",
                background: "none",
                border: "1px solid rgba(184,150,46,0.35)",
                padding: "6px 12px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(184,150,46,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open in Maps
            </a>
          </div>

          {/* Hint */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              zIndex: 5,
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.25)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 14,
                height: 1,
                background: "rgba(184,150,46,0.4)",
              }}
            />
            Click a pin to explore
          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP: 3 office cards ── */}
      <div
        style={{
          borderTop: "1px solid rgba(184,150,46,0.12)",
          background: T.creamAlt,
          display: "flex",
        }}
      >
        {OFFICES.map((office, i) => {
          const isActive = active.id === office.id;
          return (
            <button
              key={office.id}
              onClick={() => handleSelect(office)}
              style={{
                flex: 1,
                padding: "26px 40px",
                display: "flex",
                gap: 14,
                cursor: "pointer",
                textAlign: "left",
                background: isActive ? "rgba(184,150,46,0.05)" : "transparent",
                border: "none",
                borderRight: i < 2 ? "1px solid rgba(13,61,78,0.1)" : "none",
                borderBottom: isActive
                  ? `2px solid ${T.gold}`
                  : "2px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: isActive ? T.gold : "rgba(184,150,46,0.3)",
                  marginTop: 8,
                  flexShrink: 0,
                  boxShadow: isActive
                    ? "0 0 0 4px rgba(184,150,46,0.15)"
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 300,
                    color: T.teal,
                    marginBottom: 3,
                  }}
                >
                  {office.city}
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(184,150,46,0.8)",
                    marginBottom: 5,
                  }}
                >
                  {office.country} · {office.role}
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 11,
                    fontWeight: 300,
                    color: "rgba(13,61,78,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  {office.region}
                  <br />
                  {office.tz}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
