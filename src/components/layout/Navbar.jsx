import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import "./Navbar.css";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nombre-del-grupo" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/proyecto" },
  { label: "Blog", to: "/blog" },
  { label: "Contactos", to: "/contactos" },
];

function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar container" aria-label="Main navigation">
        <NavLink className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            GNS
          </span>
          <span>Grupo Nexus Software</span>
        </NavLink>

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

        <Button as={NavLink} to="/contactos" variant="accent" size="sm">
          Hablemos
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
