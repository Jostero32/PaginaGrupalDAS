import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { projects } from "../data/projects";
import { featuredServiceIds, services } from "../data/services";
import { team } from "../data/team";
import usePageMeta from "../routes/usePageMeta";

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

const SERVICE_ICONS = {
  'svc-1': IconWeb,
  'svc-4': IconBackoffice,
  'svc-5': IconDevOps,
};

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
      <section 
        className="page-section"
        style={{
          background: '#393E41',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Efectos decorativos de fondo */}
        <div 
          style={{
            position: 'absolute',
            top: '10%',
            left: '-8%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(63,136,197,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '-5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(68,187,164,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          <h1 
            className="my-6 max-w-[820px] leading-[1.15]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '800',
              fontSize: 'clamp(2rem, 1.3rem + 2.5vw, 3.25rem)',
              letterSpacing: '-1.5px',
              color: '#F6F7EB'
            }}
          >
            Construimos productos digitales empresariales con foco en resultados
          </h1>
          <p 
            className="max-w-[700px] m-0"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: '1.7',
              letterSpacing: '0.01em',
              color: 'rgba(246,247,235,0.85)'
            }}
          >
            Al ser una empresa dedicada al desarrollo de software, nos enfocamos en soluciones tecnológicas innovadoras y eficientes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button as={Link} to="/contactos" variant="accent" size="lg">
              Solicitar reunion
            </Button>
            <Button as={Link} to="/proyecto" variant="primary" size="lg">
              Ver proyectos
            </Button>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Servicios destacados"
            subtitle="Tres lineas de servicio para acelerar roadmap, calidad tecnica y escalabilidad."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card 
                key={service.id}
                className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${service.color}08 0%, transparent 100%)`,
                  borderColor: `${service.color}30`,
                }}
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: service.color }}
                />
                
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `${service.color}15`,
                    color: service.color,
                  }}
                >
                  {SERVICE_ICONS[service.id] && (
                    <div style={{ width: '36px', height: '36px' }}>
                      {SERVICE_ICONS[service.id]({ color: service.color })}
                    </div>
                  )}
                </div>

                <h3 
                  className="transition-colors duration-300 group-hover:text-[var(--color-primary)]"
                  style={{ 
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    lineHeight: '1.35',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {service.title}
                </h3>
                
                <p 
                  className="muted"
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: '1.65',
                    marginBottom: '1.5rem',
                    fontWeight: '400',
                    letterSpacing: '0.01em'
                  }}
                >
                  {service.description}
                </p>
                
                <ul className="space-y-2.5" style={{ paddingLeft: 0, listStyle: 'none' }}>
                  {service.features.slice(0, 2).map((feature) => (
                    <li 
                      key={feature} 
                      className="flex items-start gap-3"
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: '1.55',
                        fontWeight: '500',
                        letterSpacing: '0.005em'
                      }}
                    >
                      <span 
                        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ 
                          background: service.color,
                          marginTop: '0.5rem'
                        }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div 
                  className="mt-6 pt-4 border-t inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  style={{ 
                    borderColor: `${service.color}20`,
                    color: service.color,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    letterSpacing: '0.02em'
                  }}
                >
                  Ver más detalles
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Proyectos recientes"
            subtitle="Casos ficticios que combinan frontend, backend y operaciones modernas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#393E41]/5"
              >
                {/* Imagen del proyecto con badges */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.demoUrl} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <span 
                      className="text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        background: '#E94F37',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {project.category}
                    </span>
                    <span 
                      className="text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        background: project.status === 'Completado' ? '#44BBA4' : 
                                   project.status === 'En progreso' ? '#3F88C5' : '#393E41',
                        color: 'white'
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Contenido del proyecto */}
                <div className="p-6">
                  <h3 
                    className="mb-3 group-hover:text-[#3F88C5] transition-colors"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: '700',
                      fontSize: '1.35rem',
                      lineHeight: '1.25',
                      letterSpacing: '-0.02em',
                      color: '#393E41'
                    }}
                  >
                    {project.name}
                  </h3>
                  
                  <p 
                    className="mb-4"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.875rem',
                      lineHeight: '1.65',
                      letterSpacing: '0.01em',
                      color: 'rgba(57,62,65,0.7)'
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Stack tecnológico */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-3 py-1 bg-[#F6F7EB] text-[#393E41] rounded-md border border-[#393E41]/10"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Botón de acción */}
                  <div className="pt-4 border-t border-[#393E41]/10">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center px-4 py-2.5 bg-[#44BBA4] text-white font-semibold rounded-lg hover:bg-[#36a890] transition-colors shadow-sm hover:shadow-md"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        letterSpacing: '0.02em'
                      }}
                    >
                      Ver Código
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Equipo"
            subtitle="Perfiles ficticios con enfoque multidisciplinario para ciclos de entrega continuos."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {team.map((member) => (
              <Card key={member.id} className="text-center w-full max-w-[320px]">
                <div className="relative w-[120px] h-[120px] mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-[rgba(63,136,197,0.18)]"
                  />
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-[var(--color-text)] hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                    aria-label={`GitHub de ${member.name}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
                <h3 
                  className="my-4 mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    lineHeight: '1.25',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {member.name}
                </h3>
                <p 
                  className="m-0 mb-4 text-[var(--color-primary)]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '600',
                    fontSize: '0.9375rem',
                    letterSpacing: '0.01em'
                  }}
                >
                  {member.role}
                </p>
                <p 
                  className="muted"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.875rem',
                    lineHeight: '1.65',
                    letterSpacing: '0.01em'
                  }}
                >
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
