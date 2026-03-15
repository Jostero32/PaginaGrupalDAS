import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const { isLoggedIn, user, login, logout } = useAuth();

  useEffect(() => {
    setIsOpen(false);
    setShowLoginModal(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const result = login({ email, password });

    if (!result.ok) {
      setLoginError(result.message);
      return;
    }

    setLoginError("");
    setPassword("");
    setShowLoginModal(false);
  };

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

          <div className="navbar-right">
            {isLoggedIn ? (
              <button
                type="button"
                className="user-access-btn"
                onClick={logout}
                title="Cerrar sesión"
              >
                <FiLogOut /> {user?.name || "Editor"}
              </button>
            ) : (
              <button
                type="button"
                className="user-access-btn"
                onClick={() => setShowLoginModal(true)}
                title="Iniciar sesión"
              >
                <FiUser /> Ingresar
              </button>
            )}

            <Button as={NavLink} to="/contactos" variant="accent" size="sm" className="nav-cta">
              Hablemos
            </Button>
          </div>
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
          {isLoggedIn ? (
            <button type="button" className="drawer-auth-btn" onClick={logout}>
              <FiLogOut /> Cerrar sesión
            </button>
          ) : (
            <button
              type="button"
              className="drawer-auth-btn"
              onClick={() => {
                setIsOpen(false);
                setShowLoginModal(true);
              }}
            >
              <FiLogIn /> Iniciar sesión
            </button>
          )}
          <Button as={NavLink} to="/contactos" variant="accent" size="md" onClick={() => setIsOpen(false)} style={{ width: '100%' }}>
            Hablemos
          </Button>
        </div>
      </aside>

      {showLoginModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Acceso interno ARCM</h3>
            <p className="auth-modal-subtitle">
              Solo personal autorizado puede publicar, editar y eliminar posts.
            </p>

            <form onSubmit={handleSubmitLogin} className="auth-form">
              <label htmlFor="auth-email">Correo</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="correo@empresa.com"
                required
              />

              <label htmlFor="auth-password">Contraseña</label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />

              {loginError && <p className="auth-error">{loginError}</p>}

              <div className="auth-actions">
                <button type="button" className="auth-cancel" onClick={() => setShowLoginModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="auth-submit">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
