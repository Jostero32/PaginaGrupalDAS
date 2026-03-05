import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import usePageMeta from "../routes/usePageMeta";
import useInView from "../hooks/useInView";
import SectionLabel from "../components/ui/SectionLabel";

const categories = ["Todos", "Frontend", "Backend", "Fullstack", "Mobile", "DevOps"];

/* Animated wrapper */
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

function Projects() {
  usePageMeta("Proyecto", "Portafolio de proyectos de ejemplo con filtros por categoría y búsqueda textual.");

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === "Todos" || project.category === selectedCategory;
      const searchable = `${project.name} ${project.description} ${project.stack.join(" ")}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* -- HERO ----------------------------------------------- */}
      <section
        className="hero-section"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: '6rem 0 4rem',
        }}
      >
        {/* Decorative blobs */}
        <div className="decor-blob" style={{
          top: '15%', left: '-6%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(63,136,197,0.15) 0%, transparent 70%)',
        }} />
        <div className="decor-blob" style={{
          bottom: '10%', right: '-5%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(68,187,164,0.15) 0%, transparent 70%)',
        }} />

        <div className="decor-ring" style={{
          top: '20%', right: '10%',
          width: '180px', height: '180px',
          border: '1.5px dashed rgba(63,136,197,0.2)',
        }} />

        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{ maxWidth: '56rem' }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem',
                fontWeight: 700, marginBottom: '1.5rem',
                background: 'rgba(63,136,197,0.15)', border: '1px solid rgba(63,136,197,0.3)', color: '#3F88C5',
              }}
            >
              <svg style={{ width: 16, height: 16 }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Portafolio
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 2rem + 3vw, 4.5rem)',
              letterSpacing: '-2px', color: 'var(--color-hero-text)', lineHeight: 1.1, marginBottom: '1.5rem',
            }}>
              Nuestros{' '}
              <span style={{ color: 'var(--color-primary)' }}>Proyectos</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--color-hero-muted)', maxWidth: 600, lineHeight: 1.7 }}>
              Explora nuestra colección de proyectos de desarrollo de software.
            </p>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '22rem' }}>
              {[
                { value: projects.length, label: 'Proyectos', color: '#44BBA4' },
                { value: categories.length - 1, label: 'Categorías', color: '#3F88C5' },
                { value: new Set(projects.flatMap((p) => p.stack)).size, label: 'Tecnologías', color: '#E94F37' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-hero-muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- FILTERS -------------------------------------------- */}
      <section style={{ background: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ padding: '2rem 0' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Categorías
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }} role="group" aria-label="Filtrar proyectos por categoría">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.5rem 1.25rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: selectedCategory === category ? 'var(--color-accent)' : 'var(--color-surface)',
                    color: selectedCategory === category ? '#fff' : 'var(--color-text-muted)',
                    border: `1px solid ${selectedCategory === category ? 'transparent' : 'var(--color-border)'}`,
                    boxShadow: selectedCategory === category ? '0 4px 15px rgba(233,79,55,0.3)' : 'none',
                    fontFamily: 'var(--font-heading)', fontSize: '0.85rem',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: 500 }}>
            <label htmlFor="project-search" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              Buscar
            </label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: React, Node.js, TypeScript..."
              style={{
                width: '100%', padding: '0.75rem 1rem',
                background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)', color: 'var(--color-heading)',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
            />
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Mostrando {filteredProjects.length} {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
          </p>
        </div>
      </section>

      {/* -- GRID ----------------------------------------------- */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.5rem' }}>No se encontraron proyectos</p>
              <p style={{ color: 'var(--color-text-muted)' }}>Intenta con otros filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {filteredProjects.map((project, i) => (
                <AnimatedItem key={project.id} index={i + 1}>
                  <div className="modern-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: 192, overflow: 'hidden', position: 'relative' }}>
                      {project.demoUrl && project.demoUrl !== "#" ? (
                        <>
                          <img src={project.demoUrl} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                            onError={(e) => { e.target.style.display = "none"; }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(57,62,65,0.7), transparent)' }} />
                        </>
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(63,136,197,0.2), rgba(68,187,164,0.2))' }} />
                      )}
                      <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', zIndex: 1 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.375rem 0.75rem', borderRadius: '999px', background: 'var(--color-accent)', color: '#fff' }}>{project.category}</span>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 700, padding: '0.375rem 0.75rem', borderRadius: '999px',
                          background: project.status === 'Completado' ? 'var(--color-primary)' : project.status === 'En progreso' ? 'var(--color-secondary)' : 'var(--color-surface)',
                          color: '#fff',
                        }}>{project.status}</span>
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-heading)', marginBottom: '0.5rem' }}>{project.name}</h3>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{project.description}</p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {project.stack.map((tech) => (
                          <span key={tech} style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: '0.375rem', background: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" style={{
                          display: 'block', textAlign: 'center', padding: '0.625rem 1rem', fontWeight: 600, borderRadius: '12px',
                          background: 'var(--color-accent)', color: '#fff', fontSize: '0.85rem', textDecoration: 'none',
                          transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(233,79,55,0.25)',
                        }}>
                          Ver Código
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;
