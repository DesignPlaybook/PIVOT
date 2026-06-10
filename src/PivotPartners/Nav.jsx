import { useState, useEffect, useRef } from "react";
import { useScrollNav } from "./utils";
import logo from "../assets/PEPLogo.png";

const NAV_ITEMS = [
  {
    label: "About Us",
    page: "About Us",
    items: [
      { label: "Vision & Mission", id: "about-vision-mission" },
      { label: "Who We Are", id: "about-who-we-are" },
      { label: "Leadership Philosophy", id: "about-leadership-philosophy" },
      { label: "Where We Operate", id: "about-global-presence" },
      { label: "Our Practice", id: "how-we-work" },
      { label: "Core Values", id: "about-core-values" },
      { label: "Our Approach", id: "our-approach" },
    ],
  },
  {
    label: "Services",
    page: "Services",
    items: [
      { label: "Executive Search", id: "services-executive-search" },
      { label: "Succession Planning", id: "services-succession-planning" },
      { label: "Career Transition", id: "services-career-transition" },
      { label: "Interim Management", id: "services-interim-management" },
      { label: "Our Mandates", id: "services-our-mandates" },
    ],
  },
  {
    label: "Domains",
    page: "Domains",
    items: [
      { label: "Where We Operate", id: "domains-where-we-operate" },
      { label: "Functional Expertise", id: "domains-functional-expertise" },
      { label: "Emerging Domain: AI", id: "domains-emerging-domain" },
    ],
  },
  {
    label: "Insights",
    page: "Insights",
    // items: [
    //   { label: "Featured Analysis", id: "insights-featured" },
    //   { label: "Articles", id: "insights-articles" },
    //   { label: "Research Archive", id: "insights-reports" },
    // ],
    dropdown: false,
  },
  {
    label: "Careers Page",
    page: "CareersPage",
    dropdown: false,
  },
];

const NAV_CSS = `
  @keyframes dd-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pep-nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--teal);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.25s ease;
    white-space: nowrap;
    line-height: 1;
  }
  .pep-nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width 0.3s ease;
  }
  .pep-nav-link:hover { color: var(--gold); }
  .pep-nav-link:hover::after { width: 100%; }

  /* chevron — tiny, refined */
  .pep-chev {
    width: 6px;
    height: 6px;
    border-right: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
    transform: rotate(45deg) translate(-1px, -2px);
    transition: transform 0.25s ease;
    display: inline-block;
    flex-shrink: 0;
    opacity: 0.5;
    margin-top: 2px;
  }
  .pep-chev.up {
    transform: rotate(-135deg) translate(-1px, -2px);
    opacity: 0.7;
  }

  /* Dropdown container — positioned under each nav item */
  .pep-dd {
  position: fixed;

  background: rgba(245,240,232,.97);

  backdrop-filter: blur(16px);

  border-radius: 18px;

  border: 1px solid rgba(184,150,46,.15);

  min-width: 260px;

  overflow: hidden;

  z-index: 1000;

  box-shadow:
    0 20px 50px rgba(13,61,78,.12),
    0 2px 10px rgba(13,61,78,.05);

  animation: dd-in .25s ease;
}

  .pep-dd-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 13px 20px;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(13,61,78,0.06);
    cursor: pointer;
    text-align: left;
    transition: background 0.15s ease;
  }
  .pep-dd-item:last-child { border-bottom: none; }
  .pep-dd-item:hover { background: rgba(13,61,78,0.03); }
  .pep-dd-item:hover .pep-dd-num   { color: var(--gold); opacity: 1; }
  .pep-dd-item:hover .pep-dd-label { color: var(--gold); }

  .pep-dd-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    font-weight: 300;
    color: rgba(13,61,78,0.25);
    flex-shrink: 0;
    transition: color 0.2s ease, opacity 0.2s ease;
    line-height: 1;
    min-width: 18px;
  }

  .pep-dd-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--teal);
    transition: color 0.2s ease;
    line-height: 1.3;
  }

  /* gold pip — appears on hover, right side */
  .pep-dd-pip {
    margin-left: auto;
    width: 4px;
    height: 4px;
    background: var(--gold);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.15s ease;
    flex-shrink: 0;
  }
  .pep-dd-item:hover .pep-dd-pip { opacity: 1; }

  .pep-nav-cta {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--teal);
    border: 1px solid var(--teal);
    padding: 10px 24px;
    cursor: pointer;
    background: transparent;
    position: relative;
    overflow: hidden;
    transition: color 0.4s ease;
    white-space: nowrap;
  }
  .pep-nav-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--teal);
    transform: translateX(-101%);
    transition: transform 0.4s ease;
    z-index: 0;
  }
  .pep-nav-cta:hover { color: var(--cream); }
  .pep-nav-cta:hover::before { transform: translateX(0); }
  .pep-nav-cta span { position: relative; z-index: 1; }

  @media (max-width: 768px) {
    .pep-dd { display: none; }
  }
`;

export default function Nav({ page, setPage }) {
  const scrolled = useScrollNav();
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);
  // store { top, left } for each dropdown anchor
  const [anchors, setAnchors] = useState({});
  const buttonRefs = useRef({});

  /* Measure each nav button's position */
  const measureAnchors = () => {
    const next = {};
    NAV_ITEMS.forEach((item) => {
      const el = buttonRefs.current[item.label];
      if (el) {
        const r = el.getBoundingClientRect();
        next[item.label] = { top: r.bottom + 8, left: r.left };
      }
    });
    setAnchors(next);
  };

  useEffect(() => {
    measureAnchors();
    window.addEventListener("scroll", measureAnchors, { passive: true });
    window.addEventListener("resize", measureAnchors);
    return () => {
      window.removeEventListener("scroll", measureAnchors);
      window.removeEventListener("resize", measureAnchors);
    };
  }, []);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (!navRef.current?.contains(e.target)) {
        // check if click is inside a dropdown
        const dropdowns = document.querySelectorAll(".pep-dd");
        for (const dd of dropdowns) {
          if (dd.contains(e.target)) return;
        }
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const openItem = (label) => {
    cancelClose();
    measureAnchors();
    setOpenMenu(label);
  };

  const handleSectionClick = (targetPage, sectionId) => {
    setOpenMenu(null);
    if (page !== targetPage) {
      sessionStorage.setItem("scrollTo", sectionId);
      setPage(targetPage);
      window.scrollTo(0, 0);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageClick = (targetPage) => {
    setOpenMenu(null);
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const menuData = NAV_ITEMS.find((n) => n.label === openMenu);
  const anchor = openMenu ? anchors[openMenu] : null;

  return (
    <>
      <style>{NAV_CSS}</style>

      <nav
        ref={navRef}
        className={scrolled ? "scrolled" : ""}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        {/* Logo */}
        <div
          className="nav-logo"
          onClick={() => handlePageClick("Home")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="PivotEdge Partners"
            style={{
              height: 58,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Links */}
        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: 36 }}
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() => {
                if (item.items?.length) {
                  openItem(item.label);
                }
              }}
              onMouseLeave={() => {
                if (item.items?.length) {
                  scheduleClose();
                }
              }}
            >
              <button
                ref={(el) => {
                  buttonRefs.current[item.label] = el;
                }}
                className="pep-nav-link"
                onClick={() => handlePageClick(item.page)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="pep-nav-cta"
          onClick={() => handlePageClick("Contact")}
        >
          <span>Contact Us</span>
        </button>
      </nav>

      {/* Dropdown — rendered outside nav so it sits on top of everything */}
      {openMenu && menuData && menuData.items && anchor && (
        <div
          className="pep-dd"
          style={{ top: anchor.top, left: anchor.left }}
          onMouseEnter={cancelClose}
          onMouseLeave={() => {
            if (item.items?.length) {
              scheduleClose();
            }
          }}
        >
          {menuData.items.map((item, i) => (
            <button
              key={item.id}
              className="pep-dd-item"
              onClick={() => handleSectionClick(menuData.page, item.id)}
            >
              <span className="pep-dd-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pep-dd-label">{item.label}</span>
              <span className="pep-dd-pip" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
