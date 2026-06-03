import { useState, useEffect, useRef, useCallback } from "react";
import { T } from "./tokens";
import { SectionLabel } from "./utils";

/* ─── Unsplash images — high-end executive / architecture / boardroom ─── */
const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    label: "Executive Search",
    caption: "Identifying leaders who shape strategy",
  },
  {
    url: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=2000&q=80",
    label: "Board Advisory",
    caption: "Governance that defines direction",
  },
  {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
    label: "Leadership Advisory",
    caption: "Precision at the highest level",
  },
  {
    url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&q=80",
    label: "CEO & Enterprise",
    caption: "Vision aligned with long-term performance",
  },
];

/* ─── CSS injected once ─── */
const HERO_CSS = `
  @keyframes pe-ken-burns {
    0%   { transform: scale(1.08) translate(0, 0); }
    100% { transform: scale(1.0) translate(-1%, -0.5%); }
  }
  @keyframes pe-fade-in {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pe-line-grow {
    from { width: 0; }
    to   { width: 48px; }
  }
  @keyframes pe-ticker {
    0%   { width: 0%; }
    100% { width: 100%; }
  }
  @keyframes pe-slide-in-left {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
 
  .pe-hero { position: relative; width: 100%; height: 100vh; min-height: 620px; overflow: hidden; }
 
  .pe-slide {
    position: absolute; inset: 0;
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }
  .pe-slide.active { opacity: 1; pointer-events: auto; }
 
  .pe-slide img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    animation: pe-ken-burns 8s ease-out forwards;
  }
 
  .pe-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      105deg,
      rgba(13,61,78,0.88) 0%,
      rgba(13,61,78,0.72) 42%,
      rgba(13,61,78,0.12) 68%,
      rgba(13,61,78,0) 100%
    );
  }
 
  /* Subtle dot-grid texture on overlay */
  .pe-overlay::after {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(245,240,232,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
 
  /* Gold accent bar — left edge */
  .pe-edge-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, transparent 0%, #B8962E 30%, #B8962E 70%, transparent 100%);
    opacity: 0.6;
    z-index: 10;
  }
 
  .pe-content {
    position: absolute; inset: 0;
    display: flex;
    align-items: center;
    z-index: 5;
    padding: 0 72px;
    max-width: 1200px;
    margin: 0 auto;
    left: 0; right: 0;
  }
 
  .pe-text { max-width: 600px; }
 
  .pe-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 28px;
    animation: pe-slide-in-left 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  }
  .pe-eyebrow-line {
    width: 48px; height: 1px;
    background: #B8962E;
  }
  .pe-eyebrow-text {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgba(184,150,46,0.9);
  }
 
  .pe-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(58px, 7.5vw, 104px);
    font-weight: 300;
    line-height: 1.02;
    color: #F5F0E8;
    letter-spacing: -0.01em;
    margin-bottom: 28px;
    animation: pe-fade-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both;
  }
  .pe-h1 em {
    font-style: italic;
    color: rgba(245,240,232,0.65);
  }
 
  .pe-rule {
    width: 48px; height: 1px;
    background: #B8962E;
    margin-bottom: 24px;
    animation: pe-line-grow 0.6s ease 1s both;
  }
 
  .pe-body {
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(245,240,232,0.7);
    max-width: 460px;
    margin-bottom: 44px;
    animation: pe-fade-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both;
  }
 
  .pe-cta-group {
    display: flex; gap: 16px; flex-wrap: wrap;
    animation: pe-fade-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both;
  }
 
  .pe-tagline {
    margin-top: 64px;
    display: flex; align-items: center; gap: 14px;
    animation: pe-fade-in 0.9s cubic-bezier(0.16,1,0.3,1) 1s both;
  }
  .pe-tagline-line { width: 48px; height: 1px; background: rgba(184,150,46,0.6); }
  .pe-tagline-text {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(184,150,46,0.75);
  }
 
  /* ── Carousel controls — bottom band ── */
  .pe-controls {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 8;
    display: flex;
    align-items: stretch;
    background: rgba(8,35,45,0.72);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(184,150,46,0.12);
  }
 
  .pe-slide-tab {
    flex: 1;
    padding: 18px 24px 20px;
    cursor: pointer;
    border: none;
    background: transparent;
    border-right: 1px solid rgba(184,150,46,0.08);
    text-align: left;
    position: relative;
    overflow: hidden;
    transition: background 0.3s ease;
  }
  .pe-slide-tab:last-child { border-right: none; }
  .pe-slide-tab:hover { background: rgba(184,150,46,0.05); }
 
  .pe-tab-index {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    font-weight: 300;
    color: rgba(184,150,46,0.5);
    letter-spacing: 0.1em;
    margin-bottom: 4px;
  }
  .pe-tab-label {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.5);
    transition: color 0.3s ease;
    white-space: nowrap;
  }
  .pe-slide-tab.active .pe-tab-label { color: rgba(245,240,232,0.9); }
  .pe-slide-tab.active .pe-tab-index  { color: rgba(184,150,46,0.9); }
 
  /* Progress bar */
  .pe-tab-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    background: #B8962E;
    width: 0%;
  }
  .pe-slide-tab.active .pe-tab-progress {
    animation: pe-ticker var(--slide-duration, 5s) linear forwards;
  }
 
  /* ── Prev / Next arrows ── */
  .pe-arrow {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(13,61,78,0.55);
    border: 1px solid rgba(184,150,46,0.25);
    color: rgba(245,240,232,0.8);
    cursor: pointer;
    z-index: 9;
    transition: background 0.25s, border-color 0.25s, color 0.25s;
    font-size: 18px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    user-select: none;
  }
  .pe-arrow:hover {
    background: rgba(184,150,46,0.2);
    border-color: rgba(184,150,46,0.7);
    color: #F5F0E8;
  }
  .pe-arrow.prev { left: 28px; }
  .pe-arrow.next { right: 28px; }
 
  /* ── Slide caption — top right ── */
  .pe-caption {
    position: absolute;
    top: 40px; right: 56px;
    z-index: 8;
    text-align: right;
  }
  .pe-caption-label {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(184,150,46,0.7);
    margin-bottom: 4px;
  }
  .pe-caption-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    color: rgba(245,240,232,0.6);
    letter-spacing: 0.02em;
  }
 
  /* ── Slide counter ── */
  .pe-counter {
    position: absolute;
    bottom: 92px; right: 56px;
    z-index: 8;
    display: flex; align-items: baseline; gap: 6px;
  }
  .pe-counter-current {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: rgba(245,240,232,0.9);
    line-height: 1;
  }
  .pe-counter-sep {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    color: rgba(184,150,46,0.5);
    letter-spacing: 0.1em;
  }
  .pe-counter-total {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 300;
    color: rgba(245,240,232,0.35);
  }
 
  @media (max-width: 768px) {
    .pe-content { padding: 0 24px; }
    .pe-arrow { display: none; }
    .pe-caption { display: none; }
    .pe-slide-tab { padding: 14px 12px 16px; }
    .pe-tab-label { font-size: 9px; }
    .pe-counter { bottom: 88px; right: 24px; }
  }
`;

let cssInjected = false;
function injectCSS() {
  if (cssInjected) return;
  const style = document.createElement("style");
  style.innerHTML = HERO_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

const SLIDE_DURATION = 5500; // ms

export default function HeroSection({ setPage }) {
  const [current, setCurrent] = useState(0);
  const [tickerKey, setTickerKey] = useState(0); // force progress bar restart
  const timerRef = useRef(null);

  useEffect(() => {
    injectCSS();
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setTickerKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setTickerKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="pe-hero">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div key={i} className={`pe-slide${i === current ? " active" : ""}`}>
          <img src={s.url} alt={s.label} loading={i === 0 ? "eager" : "lazy"} />
          <div className="pe-overlay" />
        </div>
      ))}

      {/* Left gold edge accent */}
      <div className="pe-edge-bar" />

      {/* Slide caption — top right */}
      <div className="pe-caption">
        <div className="pe-caption-label">Current Focus</div>
        <div className="pe-caption-text">{slide.caption}</div>
      </div>

      {/* Main content — left-aligned text */}
      <div className="pe-content" style={{ paddingTop: 80 }}>
        <div className="pe-text">
          {/* Section label / eyebrow */}
          <div className="pe-eyebrow">
            <div className="pe-eyebrow-line" />
            <span className="pe-eyebrow-text">
              Executive Leadership Advisory
            </span>
          </div>

          {/* H1 */}
          <h1 className="pe-h1">
            Leadership
            <br />
            That <em>Defines</em>
            <br />
            Direction.
          </h1>

          {/* Gold rule */}
          <div className="pe-rule" />

          {/* Body */}
          <p className="pe-body">
            PivotEdge Partners is a specialist executive search and leadership
            advisory firm partnering with Boards and senior executives to secure
            leadership that shapes strategy, governance, and long-term
            performance.
          </p>

          {/* CTAs */}
          <div className="pe-cta-group">
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
                sessionStorage.setItem("scrollTo", "how-we-work");
                setPage("About Us");
                window.scrollTo(0, 0);
              }}
            >
              <span>How We Work</span>
            </button>
          </div>

          {/* Tagline */}
          <div className="pe-tagline">
            <div className="pe-tagline-line" />
            <span className="pe-tagline-text">Advantage Starts Here</span>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="pe-counter">
        <span className="pe-counter-current">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="pe-counter-sep">—</span>
        <span className="pe-counter-total">
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Prev / Next arrows */}
      <button
        className="pe-arrow prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button className="pe-arrow next" onClick={next} aria-label="Next slide">
        →
      </button>

      {/* Bottom tab bar */}
      {/* <div className="pe-controls">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`pe-slide-tab${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide: ${s.label}`}
            style={{ "--slide-duration": `${SLIDE_DURATION}ms` }}
          >
            <div className="pe-tab-index">{String(i + 1).padStart(2, "0")}</div>
            <div className="pe-tab-label">{s.label}</div>
            {i === current && (
              <div key={tickerKey} className="pe-tab-progress" />
            )}
          </button>
        ))}
      </div> */}
    </section>
  );
}
