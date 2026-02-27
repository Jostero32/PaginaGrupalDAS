import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import "./Navbar.css";
import logoACRM from "../../assets/logoACRM.jpeg";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nombre-del-grupo" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/proyecto" },
  { label: "Blog", to: "/blog" },
  { label: "Contactos", to: "/contactos" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar container" aria-label="Main navigation">
        <NavLink className="brand" to="/">
          <img
            src={logoACRM}
            alt="ARCM Solutions Logo"
            className="brand-logo"
          />
          <span>ARCM Solutions</span>
        </NavLink>

        <button
          className={`nav-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <ul className={`list-reset nav-links ${isOpen ? "nav-links-open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
                to={item.to}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Button as={NavLink} to="/contactos" variant="accent" size="sm" className="nav-cta">
          Hablemos
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
