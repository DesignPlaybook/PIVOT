import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* ─── GLOBAL STYLES ───────────────────────────────────────────────────────── */

/* ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

/* ─── GOLD DIVIDER ────────────────────────────────────────────────────────── */
const GoldDivider = () => <div className="gold-divider" />;

/* ─── SVG ICONS ──────────────────────────────────────────────────────────── */

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */

/* ─── LAYOUT ─────────────────────────────────────────────────────────────── */

/* ─── METHODOLOGY STEPS ──────────────────────────────────────────────────── */

/* ─── CLOSING CTA STRIP ──────────────────────────────────────────────────── */
