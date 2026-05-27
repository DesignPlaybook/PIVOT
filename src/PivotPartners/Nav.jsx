import { T } from "./tokens";
import { useScrollNav } from "./utils";
import logo from "../assets/PEPLogo.png"; // adjust path if needed

export default function Nav({ page, setPage }) {
  const scrolled = useScrollNav();
  const links = ["Home", "About Us", "Services", "Domains", "Insights"];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo" onClick={() => setPage("Home")}>
        <img
          src={logo}
          alt="PivotEdge Partners"
          style={{
            height: "58px",
            width: "auto",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      </div>

      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l}
            className={`nav-link${page === l ? " active" : ""}`}
            onClick={() => {
              setPage(l);
              window.scrollTo(0, 0);
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <button
        className="nav-cta"
        onClick={() => {
          setPage("Contact");
          window.scrollTo(0, 0);
        }}
      >
        Contact Us
      </button>
    </nav>
  );
}
