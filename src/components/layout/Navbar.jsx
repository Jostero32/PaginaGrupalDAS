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

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
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

          <div className="nav-actions">
            {/* Hamburger */}
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
          </div>

          {/* Desktop links */}
          <ul className="list-reset nav-links">
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

      {/* Mobile drawer overlay */}
      {isOpen && <div className="drawer-overlay" onClick={() => setIsOpen(false)} />}

      {/* Mobile drawer */}
      <aside className={`drawer ${isOpen ? "drawer-open" : ""}`}>
        <div className="drawer-header">
          <NavLink className="brand" to="/" onClick={() => setIsOpen(false)}>
            <img src={logoACRM} alt="ARCM Solutions Logo" className="brand-logo" />
            <span>ARCM Solutions</span>
          </NavLink>
          <button className="drawer-close" onClick={() => setIsOpen(false)} aria-label="Cerrar menú">
            ✕
          </button>
        </div>

        <ul className="list-reset drawer-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "drawer-link drawer-link-active" : "drawer-link"
                }
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="drawer-footer">
          <Button as={NavLink} to="/contactos" variant="accent" size="md" onClick={() => setIsOpen(false)} style={{ width: '100%' }}>
            Hablemos
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
