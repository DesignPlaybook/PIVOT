import { useRef, useMemo } from "react";
import DottedMap from "dotted-map";
import { T } from "./tokens";
import { SectionLabel } from "./utils";

export default function GlobalPresence() {
  const svgRef = useRef(null);

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    [],
  );

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: "rgba(245,240,232,0.18)",
        shape: "circle",
        backgroundColor: "#0D3D4E",
      }),
    [map],
  );

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const dubai = projectPoint(25.204, 55.27);
  const mumbai = projectPoint(19.076, 72.877);
  const pathD = createCurvedPath(dubai, mumbai);

  const DRAW_CSS = `
    @keyframes gp-draw {
      from { stroke-dashoffset: 300; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes gp-travel {
      0%   { offset-distance: 0%;   opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { offset-distance: 100%; opacity: 0; }
    }
    @keyframes gp-pulse {
      0%   { r: 4;  opacity: 0.7; }
      100% { r: 18; opacity: 0;   }
    }
    @keyframes gp-dot {
      0%,100% { box-shadow: 0 0 0 3px rgba(184,150,46,0.25); }
      50%     { box-shadow: 0 0 0 8px rgba(184,150,46,0.07); }
    }
    .gp-line {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: gp-draw 1.8s cubic-bezier(0.77,0,0.175,1) 0.5s forwards;
    }
    .gp-traveller {
      offset-path: path('${pathD}');
      animation: gp-travel 2.2s ease-in-out 0.5s infinite;
    }
    .gp-p1 { animation: gp-pulse 2.4s ease-out infinite; }
    .gp-p2 { animation: gp-pulse 2.4s ease-out infinite 0.8s; }
    .gp-dot-1 { animation: gp-dot 3s ease-in-out infinite; }
    .gp-dot-2 { animation: gp-dot 3s ease-in-out infinite 1.5s; }
  `;

  return (
    <section
      style={{
        background: T.teal,
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <style>{DRAW_CSS}</style>

      {/* Dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px,rgba(255,255,255,0.03) 1px,transparent 0)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "64px 40px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionLabel text="Global Presence" light />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(32px,4vw,48px)",
            fontWeight: 300,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Where We Operate
        </h2>
        <p
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(245,240,232,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          Two strategic hubs. One standard of rigour.
        </p>
      </div>

      {/* Map */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "2/1",
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, transparent, white 8%, white 92%, transparent)",
          }}
        >
          {/* Dotted map base */}
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

          {/* SVG overlay — pins + arc */}
          <svg
            ref={svgRef}
            viewBox="0 0 800 400"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="gp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8962E" stopOpacity="0" />
                <stop offset="10%" stopColor="#B8962E" stopOpacity="1" />
                <stop offset="90%" stopColor="#B8962E" stopOpacity="1" />
                <stop offset="100%" stopColor="#B8962E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Arc path */}
            <path
              className="gp-line"
              d={pathD}
              fill="none"
              stroke="url(#gp-grad)"
              strokeWidth="1.2"
              strokeDasharray="5 3"
            />

            {/* Travelling dot */}
            <circle r="3" fill="#B8962E" className="gp-traveller" />

            {/* DUBAI pin */}
            <g>
              <circle
                cx={dubai.x}
                cy={dubai.y}
                r="4"
                fill="none"
                stroke="rgba(184,150,46,0.6)"
                strokeWidth="1"
                className="gp-p1"
              />
              <circle
                cx={dubai.x}
                cy={dubai.y}
                r="4"
                fill="none"
                stroke="rgba(184,150,46,0.35)"
                strokeWidth="1"
                className="gp-p2"
              />
              <circle
                cx={dubai.x}
                cy={dubai.y}
                r="5"
                fill="#0D3D4E"
                stroke="#B8962E"
                strokeWidth="1.5"
              />
              <circle cx={dubai.x} cy={dubai.y} r="2.5" fill="#B8962E" />
              {/* Label */}
              <rect
                x={dubai.x - 36}
                y={dubai.y - 26}
                width="58"
                height="17"
                rx="2"
                fill="rgba(13,61,78,0.92)"
                stroke="rgba(184,150,46,0.5)"
                strokeWidth="0.8"
              />
              <text
                x={dubai.x - 7}
                y={dubai.y - 14}
                textAnchor="middle"
                fontFamily="'Jost',sans-serif"
                fontSize="8"
                fill="#B8962E"
                letterSpacing="2"
              >
                DUBAI
              </text>
            </g>

            {/* MUMBAI pin */}
            <g>
              <circle
                cx={mumbai.x}
                cy={mumbai.y}
                r="4"
                fill="none"
                stroke="rgba(184,150,46,0.6)"
                strokeWidth="1"
                className="gp-p1"
                style={{ animationDelay: "0.6s" }}
              />
              <circle
                cx={mumbai.x}
                cy={mumbai.y}
                r="4"
                fill="none"
                stroke="rgba(184,150,46,0.35)"
                strokeWidth="1"
                className="gp-p2"
                style={{ animationDelay: "1.4s" }}
              />
              <circle
                cx={mumbai.x}
                cy={mumbai.y}
                r="5"
                fill="#0D3D4E"
                stroke="#B8962E"
                strokeWidth="1.5"
              />
              <circle cx={mumbai.x} cy={mumbai.y} r="2.5" fill="#B8962E" />
              {/* Label */}
              <rect
                x={mumbai.x - 38}
                y={mumbai.y - 26}
                width="64"
                height="17"
                rx="2"
                fill="rgba(13,61,78,0.92)"
                stroke="rgba(184,150,46,0.5)"
                strokeWidth="0.8"
              />
              <text
                x={mumbai.x - 6}
                y={mumbai.y - 14}
                textAnchor="middle"
                fontFamily="'Jost',sans-serif"
                fontSize="8"
                fill="#B8962E"
                letterSpacing="2"
              >
                MUMBAI
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid rgba(184,150,46,0.15)",
          background: T.creamAlt,
          position: "relative",
          zIndex: 2,
        }}
      >
        {[
          {
            city: "Mumbai",
            country: "India · Headquarters",
            detail: "South Asia & Global Operations",
            tz: "IST — UTC +5:30",
            cls: "gp-dot-1",
          },
          {
            city: "Dubai",
            country: "UAE · Regional Hub",
            detail: "Middle East & Africa",
            tz: "GST — UTC +4:00",
            cls: "gp-dot-2",
          },
        ].map((loc, i) => (
          <div
            key={i}
            style={{
              padding: "28px 48px",
              display: "flex",
              gap: 16,
              flex: 1,
              maxWidth: 300,
              borderRight: i === 0 ? "1px solid rgba(13,61,78,0.1)" : "none",
            }}
          >
            <div
              className={loc.cls}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: T.gold,
                marginTop: 8,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 24,
                  fontWeight: 300,
                  color: T.teal,
                  marginBottom: 4,
                }}
              >
                {loc.city}
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(184,150,46,0.8)",
                  marginBottom: 6,
                }}
              >
                {loc.country}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: "rgba(13,61,78,0.5)",
                  lineHeight: 1.65,
                }}
              >
                {loc.detail}
                <br />
                {loc.tz}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
