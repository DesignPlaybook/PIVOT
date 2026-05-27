import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/PEPLogo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/insights", label: "Insights" },
    { to: "/domains", label: "Domains" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/">
            <img src={logo} alt="PivotEdge Partners" className="navbar-logo" />
          </Link>
          <ul className="navbar-links">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <Link key={l.to} to={l.to}>
            {l.label}
          </Link>
        ))}
        <div
          style={{
            borderTop: "1px solid rgba(15,76,92,0.1)",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <Link to="/terms" style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            Terms & Conditions
          </Link>
          <Link
            to="/disclaimer"
            style={{ fontSize: "0.8rem", color: "#6b7280" }}
          >
            Disclaimer
          </Link>
          <Link to="/privacy" style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
}
