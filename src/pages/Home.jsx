import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";
import { projects } from "../data/projects";
import { featuredServiceIds, services } from "../data/services";
import { team } from "../data/team";
import usePageMeta from "../routes/usePageMeta";
import useInView from "../hooks/useInView";

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

const SERVICE_ICONS = {
  'svc-1': IconWeb,
  'svc-2': IconMobile,
  'svc-3': IconFrontend,
  'svc-4': IconBackoffice,
  'svc-5': IconDevOps,
};

/* ─── Animated Wrapper ─────────────────────────────────────── */
function AnimatedItem({ children, index = 0, style, className = '' }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
      }}
    >
      {children}
    </div>
  );
}

function Home() {
  usePageMeta(
    "Inicio",
    "Inicio de ARCM Solutions. Servicios destacados, proyectos recientes y equipo de ejemplo.",
  );

  const featuredServices = services.filter((service) =>
    featuredServiceIds.includes(service.id),
  );
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '2rem 0 4rem',
        }}
      >
        {/* Decorative blobs */}
        <div className="decor-blob" style={{
          top: '10%', left: '-8%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(63,136,197,0.15) 0%, transparent 70%)',
        }} />
        <div className="decor-blob" style={{
          bottom: '5%', right: '-5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(68,187,164,0.15) 0%, transparent 70%)',
        }} />

        {/* Spinning rings */}
        <div className="decor-ring" style={{
          top: '15%', right: '8%',
          width: '200px', height: '200px',
          border: '1.5px dashed rgba(63,136,197,0.2)',
        }} />
        <div className="decor-ring" style={{
          top: '22%', right: '12%',
          width: '100px', height: '100px',
          border: '1.5px solid rgba(68,187,164,0.15)',
          animationDirection: 'reverse',
          animationDuration: '15s',
        }} />

        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '2rem',
                background: 'rgba(63, 136, 197, 0.15)',
                border: '1px solid rgba(63, 136, 197, 0.3)',
                color: '#3F88C5',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3F88C5', animation: 'pulse-glow 2s infinite' }} />
              Software que transforma negocios
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 4.5rem)',
                letterSpacing: '-2px',
                color: 'var(--color-hero-text)',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '820px',
              }}
            >
              Construimos productos{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                digitales
              </span>{' '}
              con foco en{' '}
              <span style={{ color: 'var(--color-secondary)' }}>
                resultados
              </span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2vw, 20px)',
                lineHeight: '1.7',
                color: 'var(--color-hero-muted)',
                margin: '1.5rem 0 2.5rem',
                maxWidth: '600px',
              }}
            >
              Soluciones tecnológicas innovadoras y eficientes que impulsan el crecimiento de tu empresa con código limpio y resultados medibles.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Button as={Link} to="/contactos" variant="accent" size="lg">
                Solicitar reunión →
              </Button>
              <Button as={Link} to="/proyecto" variant="primary" size="lg">
                Ver proyectos
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '36rem' }} className="animate-fadeInUp delay-3">
            {[
              { value: '15+', label: 'Proyectos', color: '#44BBA4' },
              { value: '99%', label: 'Uptime', color: '#3F88C5' },
              { value: '24/7', label: 'Soporte', color: '#E94F37' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="modern-card-dark"
                style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div
                  style={{
                    width: 10, height: 10,
                    borderRadius: '50%',
                    background: stat.color,
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: '#F6F7EB' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(246, 247, 235, 0.7)' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═══════════════════════════════════════════ */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header">
              <SectionLabel text="Servicios" color="#E94F37" />
              <h2>
                Soluciones que <span className="highlight">impulsan</span> tu negocio
              </h2>
              <p>Tres líneas de servicio para acelerar roadmap, calidad técnica y escalabilidad.</p>
            </div>
          </AnimatedItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {featuredServices.map((service, i) => (
              <AnimatedItem key={service.id} index={i + 1}>
                <div
                  className="modern-card"
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px', cursor: 'pointer' }}
                >
                  <div className="card-decor-circle" style={{ background: `${service.color}15` }} />

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      color: service.color,
                    }}
                  >
                    {SERVICE_ICONS[service.id] && (
                      <div style={{ width: '48px', height: '48px' }}>
                        {SERVICE_ICONS[service.id]({ color: service.color })}
                      </div>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: 'var(--color-heading)',
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                    {service.description}
                  </p>

                  <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                    {service.features.slice(0, 2).map((feature) => (
                      <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        <span
                          style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: service.color, marginTop: '0.45rem', flexShrink: 0 }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ═══════════════════════════════════════════ */}
      <section className="page-section" style={{ padding: '100px 0', background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header">
              <SectionLabel text="Portafolio" color="#3F88C5" />
              <h2>
                Proyectos <span className="highlight">recientes</span>
              </h2>
              <p>Casos ficticios que combinan frontend, backend y operaciones modernas.</p>
            </div>
          </AnimatedItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {recentProjects.map((project, i) => (
              <AnimatedItem key={project.id} index={i + 1}>
                <div className="modern-card" style={{ padding: 0, overflow: 'hidden' }}>
                  {/* Image */}
                  <div style={{ height: 192, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={project.demoUrl}
                      alt={project.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    <div style={{
                      position: 'absolute', bottom: 12, left: 12, right: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1
                    }}>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 700, padding: '0.375rem 0.75rem', borderRadius: '999px',
                        background: 'var(--color-accent)', color: '#fff',
                      }}>
                        {project.category}
                      </span>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 700, padding: '0.375rem 0.75rem', borderRadius: '999px',
                        background: project.status === 'Completado' ? 'var(--color-primary)' :
                          project.status === 'En progreso' ? 'var(--color-secondary)' : 'var(--color-surface)',
                        color: '#fff',
                      }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-heading)', marginBottom: '0.5rem' }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                      {project.description}
                    </p>

                    {/* Stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: '0.375rem',
                            background: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'block', textAlign: 'center', padding: '0.625rem 1rem', fontWeight: 600, borderRadius: '0.5rem',
                          background: 'var(--color-secondary)', color: '#fff', fontSize: '0.85rem', textDecoration: 'none', transition: 'all var(--transition-smooth)',
                        }}
                      >
                        Ver Código
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ════════════════════════════════════════════════ */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <SectionLabel text="Equipo" color="#44BBA4" />
              <h2 style={{ textAlign: 'center', maxWidth: '100%' }}>
                Nuestro <span className="highlight">equipo</span>
              </h2>
              <p style={{ textAlign: 'center' }}>Perfiles ficticios con enfoque multidisciplinario para ciclos de entrega continuos.</p>
            </div>
          </AnimatedItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', justifyContent: 'center', justifyItems: 'center' }}>
            {team.map((member, i) => (
              <AnimatedItem key={member.id} index={i + 1}>
                <div className="modern-card" style={{ textAlign: 'center', width: '100%', maxWidth: 320 }}>
                  <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 1rem' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(68,187,164,0.3)' }}
                    />
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: 'absolute', bottom: 0, right: 0, width: 36, height: 36,
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s',
                      }}
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-heading)', margin: '0.75rem 0 0.5rem' }}>
                    {member.name}
                  </h3>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', margin: '0 0 0.75rem' }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                    {member.bio}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
