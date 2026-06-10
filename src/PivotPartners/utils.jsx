import { useState, useEffect, useRef } from "react";
import { T } from "./tokens";

// ─── Hooks ────────────────────────────────────────────────────────
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

export function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

// ─── Section Label ────────────────────────────────────────────────
export function SectionLabel({ text, light }) {
  return (
    <div className="section-label">
      <span className="rule" />
      <span
        className="label-text"
        style={light ? { color: "rgba(184,150,46,0.8)" } : {}}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Stat Counter ─────────────────────────────────────────────────
export function StatCounter({ value, suffix = "", label, last = false }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const animated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !animated.current) {
          animated.current = true;
          const target = parseFloat(value);
          const dur = 1800;
          const start = performance.now();
          const update = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(ease * target));
            if (p < 1) requestAnimationFrame(update);
            else setCount(target);
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        padding: "0 32px",
        borderRight: last ? "none" : "1px solid rgba(245,240,232,0.15)",
      }}
    >
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ─── Custom Cursor ────────────────────────────────────────────────
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + "px";
        ring.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
