import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { faqItems, services, STATS, PROCESS_STEPS } from "../data/services";
import usePageMeta from "../routes/usePageMeta";
import "./Services.css";

/* ─── SVG Icon Components ──────────────────────────────────── */
function IconWeb({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" opacity="0.2" />
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" strokeDasharray="6 4" />
      <ellipse cx="24" cy="24" rx="10" ry="20" stroke={color} strokeWidth="2" />
      <line x1="4" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" />
      <line x1="24" y1="4" x2="24" y2="44" stroke={color} strokeWidth="2" />
      <path d="M7 14h34M7 34h34" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function IconMobile({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="4" width="24" height="40" rx="4" stroke={color} strokeWidth="2.5" />
      <line x1="12" y1="12" x2="36" y2="12" stroke={color} strokeWidth="2" />
      <line x1="12" y1="36" x2="36" y2="36" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="40" r="2" fill={color} />
      <rect x="18" y="18" width="12" height="6" rx="1.5" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="18" y="27" width="8" height="4" rx="1" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function IconFrontend({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="40" height="30" rx="3" stroke={color} strokeWidth="2.5" />
      <line x1="4" y1="14" x2="44" y2="14" stroke={color} strokeWidth="2" />
      <circle cx="10" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="15" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="20" cy="10" r="1.5" fill={color} opacity="0.5" />
      <path d="M14 22l-5 5 5 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 22l5 5-5 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="27" y1="20" x2="21" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="42" x2="30" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBackoffice({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="40" height="36" rx="3" stroke={color} strokeWidth="2.5" />
      <line x1="4" y1="14" x2="44" y2="14" stroke={color} strokeWidth="2" />
      <line x1="16" y1="14" x2="16" y2="42" stroke={color} strokeWidth="2" />
      <rect x="7" y="18" width="6" height="3" rx="1" fill={color} opacity="0.3" />
      <rect x="7" y="24" width="6" height="3" rx="1" fill={color} opacity="0.5" />
      <rect x="7" y="30" width="6" height="3" rx="1" fill={color} opacity="0.3" />
      <rect x="20" y="18" width="10" height="8" rx="2" stroke={color} strokeWidth="1.5" />
      <rect x="33" y="18" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M20 33h21" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M20 37h14" stroke={color} strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

function IconDevOps({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" strokeDasharray="4 3" opacity="0.3" />
      <path d="M24 6a18 18 0 0 1 12.73 5.27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 24a18 18 0 0 1-5.27 12.73" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 42a18 18 0 0 1-12.73-5.27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 24a18 18 0 0 1 5.27-12.73" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="36,10 39,14 35,14" fill={color} />
      <polygon points="38,36 34,39 34,35" fill={color} />
      <polygon points="12,38 9,34 13,34" fill={color} />
      <polygon points="10,12 14,9 14,13" fill={color} />
      <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="24" r="2" fill={color} />
    </svg>
  );
}

function IconConsulting({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="10" stroke={color} strokeWidth="2.5" />
      <path d="M24 6v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 22v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 16h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 16h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 9l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 21l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31 9l-2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 21l-2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 32h24l-4 10H16l-4-10z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 36h12" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

/* Process step icons */
function IconSearch({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="2.5" />
      <line x1="29" y1="29" x2="38" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="5" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function IconBlueprint({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="32" height="32" rx="2" stroke={color} strokeWidth="2.5" />
      <line x1="6" y1="16" x2="38" y2="16" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="16" x2="16" y2="38" stroke={color} strokeWidth="1.5" />
      <path d="M22 24l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 28h-10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="11" cy="11" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function IconRocket({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4c-4 8-4 16-2 24h4c2-8 2-16-2-24z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 32l-4 6 8-2-4-4z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <path d="M28 32l4 6-8-2 4-4z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="18" r="3" stroke={color} strokeWidth="2" />
      <path d="M14 26c-4 0-8 2-10 6" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <path d="M30 26c4 0 8 2 10 6" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function IconChart({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 38h32" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 38V10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12" y="22" width="5" height="16" rx="1" fill={color} opacity="0.3" />
      <rect x="20" y="14" width="5" height="24" rx="1" fill={color} opacity="0.5" />
      <rect x="28" y="8" width="5" height="30" rx="1" fill={color} opacity="0.7" />
      <path d="M10 28l8-10 8 6 10-14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="10" r="2.5" fill={color} />
    </svg>
  );
}

const SERVICE_ICONS = {
  "svc-1": IconWeb,
  "svc-2": IconMobile,
  "svc-3": IconFrontend,
  "svc-4": IconBackoffice,
  "svc-5": IconDevOps,
  "svc-6": IconConsulting,
};

const PROCESS_ICONS = [IconSearch, IconBlueprint, IconRocket, IconChart];

/* ─── Hook: Intersection Observer ────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Componente: ServiceCard ────────────────────────────── */
function ServiceCard({ service, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  const isLight = index % 2 === 1;
  const IconComp = SERVICE_ICONS[service.id];

  const cardClass = `svc-card ${isLight ? "card-light" : "card-dark"}`;

  // Compute dynamic colors based on hover state
  const bgColor = hovered ? service.color : undefined;
  const borderColor = hovered ? service.color : undefined;
  const textColor = hovered ? "#fff" : isLight ? "#393E41" : "#F6F7EB";
  const descColor = hovered ? "rgba(255,255,255,0.85)" : isLight ? "#393E41cc" : "#F6F7EBaa";
  const tagColor = hovered ? "rgba(255,255,255,0.8)" : service.color;
  const dotBg = hovered ? "#fff" : service.color;
  const circBg = hovered ? "rgba(255,255,255,0.15)" : `${service.color}20`;
  const ctaColor = hovered ? "#fff" : service.color;
  const iconColor = hovered ? "#fff" : service.color;
  const shadow = hovered ? `0 20px 60px ${service.color}40` : undefined;

  return (
    <div
      ref={ref}
      className={cardClass}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease`,
        background: bgColor,
        borderColor: borderColor,
        boxShadow: shadow,
      }}
    >
      <div className="svc-card-circle" style={{ background: circBg }} />

      <span className="svc-card-tag" style={{ color: tagColor }}>
        {service.tag}
      </span>

      <div className="svc-card-icon">
        {IconComp && <IconComp color={iconColor} />}
      </div>

      <h3 style={{ color: textColor }}>{service.title}</h3>

      <p className="svc-card-desc" style={{ color: descColor }}>
        {service.description}
      </p>

      <ul className="svc-card-features">
        {service.features.map((f, i) => (
          <li key={i} style={{ color: textColor }}>
            <span className="dot" style={{ background: dotBg }} />
            {f}
          </li>
        ))}
      </ul>

      <div className="svc-card-cta" style={{ color: ctaColor }}>
        Explorar servicio <span>→</span>
      </div>
    </div>
  );
}

/* ─── Componente: StatItem ───────────────────────────────── */
function StatItem({ value, label, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="svc-stat-item"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="svc-stat-value">{value}</div>
      <div className="svc-stat-label">{label}</div>
    </div>
  );
}

/* ─── Componente: ProcessCard ────────────────────────────── */
function ProcessCard({ item, index }) {
  const [ref, inView] = useInView(0.1);
  const IconComp = PROCESS_ICONS[index];
  return (
    <div
      ref={ref}
      className="svc-process-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="svc-process-step">{item.step}</div>
      <div className="svc-process-icon">
        {IconComp && <IconComp color="#3F88C5" />}
      </div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  );
}

/* ─── Componente: FaqItem ────────────────────────────────── */
function FaqItem({ item, index, isOpen, onToggle }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`svc-faq-item ${isOpen ? "open" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <button
        className="svc-faq-trigger"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className="svc-faq-icon">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`svc-faq-panel ${isOpen ? "open" : ""}`}>
        <p className="svc-faq-answer">{item.answer}</p>
      </div>
    </div>
  );
}

/* ─── Componente Principal ───────────────────────────────── */
function Services() {
  usePageMeta(
    "Servicios",
    "Servicios de desarrollo, modernizacion, consultoria y operaciones para empresas.",
  );

  // Toggle body class for transparent nav overlay
  useEffect(() => {
    document.body.classList.add("svc-page");
    return () => document.body.classList.remove("svc-page");
  }, []);

  const [openFaq, setOpenFaq] = useState(0);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? -1 : i);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="svc-hero">
        {/* Decorative blobs */}
        <div className="svc-blob" style={{
          top: "10%", left: "-8%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, #3F88C520 0%, transparent 70%)",
        }} />
        <div className="svc-blob" style={{
          bottom: "5%", right: "-5%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, #44BBA420 0%, transparent 70%)",
        }} />

        {/* Spinning rings */}
        <div className="svc-ring" style={{
          top: "15%", right: "8%",
          width: "200px", height: "200px",
          border: "1.5px dashed #3F88C530",
        }} />
        <div className="svc-ring" style={{
          top: "22%", right: "12%",
          width: "100px", height: "100px",
          border: "1.5px solid #44BBA420",
          animationDirection: "reverse",
          animationDuration: "15s",
        }} />

        {/* Floating SVG icons */}
        {[IconWeb, IconMobile, IconFrontend, IconDevOps, IconConsulting].map((Icon, i) => (
          <div
            key={i}
            className="svc-float-icon"
            style={{
              top: `${15 + i * 16}%`,
              right: `${3 + (i % 3) * 12}%`,
              width: `${26 + (i % 2) * 12}px`,
              height: `${26 + (i % 2) * 12}px`,
              animationDuration: `${3 + i * 0.5}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <Icon color="#F6F7EB" />
          </div>
        ))}

        <div className="svc-hero-content">
          {/* Breadcrumb */}
          <div className="svc-hero-breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <span style={{ color: "#F6F7EB60", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
              
            </span>
            <span style={{ color: "#3F88C5" }}>›</span>
            <span className="svc-breadcrumb-tag">Servicios</span>
          </div>

          {/* Main heading */}
          <h1 className="svc-hero-title">
            Soluciones que<br />
            <span className="stroke-text">impulsan</span> tu<br />
            <span className="accent-text">negocio.</span>
          </h1>

          <div className="svc-hero-desc">
            <p>
              En <strong style={{ color: "#F6F7EB" }}>ARCM Solutions</strong> construimos tecnologia de alto impacto.
              Desde MVP hasta sistemas enterprise, nuestro equipo cubre cada capa de tu stack digital.
            </p>
          </div>

          {/* CTAs */}
          <div className="svc-hero-ctas" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "60px" }}>
            <a href="#servicios-grid" className="svc-btn-primary" style={{ textDecoration: "none" }}>
              Ver todos los servicios ↓
            </a>
            <Link to="/contactos" className="svc-btn-outline" style={{ textDecoration: "none" }}>
              Hablar con un experto
            </Link>
          </div>

          {/* Trust badges */}
          <div className="svc-hero-badges" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {["Metodologia Agil", "Stack Moderno", "Equipo Senior", "Soporte Continuo"].map(badge => (
              <div key={badge} className="svc-trust-badge">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════════ */}
      <div className="svc-marquee">
        <div className="svc-marquee-track">
          {[...services, ...services].map((s, i) => {
            const Icon = SERVICE_ICONS[s.id];
            return (
              <span key={i} className="svc-marquee-chip">
                {Icon && (
                  <span style={{ display: "inline-flex" }}>
                    <Icon color="#393E41" />
                  </span>
                )}
                {s.title}
              </span>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════════════ */}
      <section className="svc-stats">
        <div className="svc-stats-grid">
          {STATS.map((s, i) => (
            <StatItem key={i} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════════ */}
      <section id="servicios-grid" className="svc-grid-section">
        <div className="svc-container">
          {/* Section header */}
          <div style={{ marginBottom: "70px" }}>
            <div className="svc-section-label">
              <span className="svc-section-label-dot" />
              <span className="svc-section-label-text">Nuestro portafolio</span>
            </div>
            <div className="svc-grid-header">
              <h2>
                Tecnologia para cada <span className="highlight">etapa</span> de tu proyecto.
              </h2>
              <p>
                Seis especialidades integradas bajo un mismo equipo. Escalamos contigo desde el dia uno.
              </p>
            </div>
          </div>

          {/* 2-column uniform grid */}
          <div className="svc-grid">
            {services.map((service, index) => (
              <div key={service.id}>
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS SECTION
      ══════════════════════════════════════════════ */}
      <section className="svc-process">
        <div className="svc-container">
          <div className="svc-process-header">
            <h2>Como <span className="highlight">trabajamos</span></h2>
            <p>Un proceso agil, transparente y orientado a resultados reales.</p>
          </div>
          <div className="svc-process-grid">
            {PROCESS_STEPS.map((item, i) => (
              <ProcessCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════ */}
      <section className="svc-cta-section">
        <div className="svc-cta-card">
          {/* Deco blobs */}
          <div className="svc-blob" style={{
            top: "-60px", right: "-60px",
            width: "300px", height: "300px",
            background: "radial-gradient(circle, #3F88C530, transparent 70%)",
          }} />
          <div className="svc-blob" style={{
            bottom: "-40px", left: "10%",
            width: "200px", height: "200px",
            background: "radial-gradient(circle, #44BBA420, transparent 70%)",
          }} />
          <div className="svc-ring" style={{
            top: "30%", left: "-20px",
            width: "120px", height: "120px",
            border: "1px solid rgba(68,187,164,0.2)",
            animationDuration: "20s",
          }} />

          <div className="svc-cta-inner">
            <div className="svc-cta-text">
              <div className="svc-cta-badge">
                <span>Listo para empezar?</span>
              </div>
              <h2>
                Convirtamos tu idea<br />
                en <span className="highlight">realidad digital.</span>
              </h2>
              <p>
                Agenda una consulta gratuita de 30 minutos con nuestro equipo y recibe un diagnostico tecnico sin compromiso.
              </p>
            </div>
            <div className="svc-cta-buttons">
              <Link to="/contactos" className="svc-btn-accent" style={{ textDecoration: "none", textAlign: "center" }}>
                Agendar consulta gratuita →
              </Link>
              <Link to="/proyecto" className="svc-btn-ghost" style={{ textDecoration: "none" }}>
                Ver casos de exito
              </Link>
              <p className="svc-fine-print">Sin compromiso · Respuesta en 24h</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════════ */}
      <section className="svc-faq-section">
        <div className="svc-container">
          <div className="svc-faq-header">
            <div className="svc-section-label">
              <span className="svc-section-label-dot" />
              <span className="svc-section-label-text">FAQ</span>
            </div>
            <h2>Preguntas frecuentes</h2>
            <p>Respuestas rapidas sobre tiempos, colaboracion y soporte.</p>
          </div>
          <div className="svc-faq-list">
            {faqItems.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                index={i}
                isOpen={openFaq === i}
                onToggle={toggleFaq}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
