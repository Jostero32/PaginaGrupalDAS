import { useState } from "react";
import Card from "../components/ui/Card";
import TeamCard from "../components/ui/TeamCard";
import TeamModal from "../components/ui/TeamModal";
import Timeline from "../components/ui/Timeline";
import useScrollReveal from "../hooks/useScrollReveal";
import usePageMeta from "../routes/usePageMeta";
// icons from react-icons (FontAwesome)
import { FaBookOpen, FaBullseye, FaEye, FaFlask, FaProjectDiagram, FaDatabase, FaCheck, FaChartBar, FaUsers } from "react-icons/fa";

// bring in data used on homepage so we can replicate its card sections
import { projects } from "../data/projects";
import { featuredServiceIds, services } from "../data/services";
import { team } from "../data/team";

const identity = {
  historia: {
    title: "Historia",
    icon: "📖",
    description:
      "Nacimos en 2019 como laboratorio de I+D para resolver la complejidad del software moderno. Desde entonces, hemos acompañado a equipos en transformaciones digitales, construyendo soluciones que permiten a las empresas innovar con confiabilidad.",
  },
  mision: {
    title: "Misión",
    icon: "🎯",
    description:
      "Traducir investigación avanzada en software escalable, sistemas confiables y procesos que elevan la calidad. Nos comprometemos a entregar soluciones que crecen con el negocio.",
  },
  vision: {
    title: "Visión",
    icon: "🔮",
    description:
      "Ser el referente en gestión de conocimiento técnico: empresas que innovan con rigor metodológico, controlando riesgo mientras aceleran el time-to-market de sus productos digitales.",
  },
};

const values = [
  {
    id: "value-1",
    number: "01",
    title: "Rigor Aplicado",
    description:
      "Convertimos investigación en decisiones concretas con evidencia medible.",
  },
  {
    id: "value-2",
    number: "02",
    title: "Trazabilidad Total",
    description:
      "Cada cambio tiene un porqué: documentación, métricas y contexto compartido.",
  },
  {
    id: "value-3",
    number: "03",
    title: "Código Vivo",
    description:
      "Sistemas fáciles de evolucionar: modularidad, pruebas y automatización.",
  },
  {
    id: "value-4",
    number: "04",
    title: "Colaboración Abierta",
    description:
      "Liderazgo distribuido, feedback continuo y acuerdos para equipos híbridos.",
  },
];

const processSteps = [
  {
    id: "step-1",
    title: "Exploración",
    description:
      "Mapeo profundo del problema, hipótesis clave y definición de éxito con métricas simples.",
  },
  {
    id: "step-2",
    title: "Modelado y Prototipo",
    description:
      "Arquitectura mínima viable, prototipo funcional y validación de riesgos técnicos.",
  },
  {
    id: "step-3",
    title: "Construcción con Control",
    description:
      "Entregas iterativas, calidad automatizada y monitoreo de performance desde el inicio.",
  },
  {
    id: "step-4",
    title: "Evolución Medible",
    description:
      "Análisis de resultados, ajuste del roadmap y documentación de aprendizajes.",
  },
];

const focusAreas = [
  {
    id: "area-1",
    icon: "🔬",
    title: "Investigación aplicada",
    description:
      "Hipótesis validadas, experimentos medibles y decisiones basadas en datos concretos.",
  },
  {
    id: "area-2",
    icon: "🏗️",
    title: "Arquitectura escalable",
    description:
      "Sistemas modulares y resilientes que crecen sin reingeniería constante.",
  },
  {
    id: "area-3",
    icon: "⚡",
    title: "Data pipelines",
    description:
      "Flujos confiables de datos, trazabilidad total desde ingesta hasta reporting.",
  },
  {
    id: "area-4",
    icon: "✅",
    title: "Automatización QA",
    description:
      "Pruebas continuas y detección temprana de regresiones en cada despliegue.",
  },
  {
    id: "area-5",
    icon: "📊",
    title: "Operaciones confiables",
    description:
      "Observabilidad avanzada, SLOs claros y respuesta rápida a incidentes.",
  },
  {
    id: "area-6",
    icon: "👥",
    title: "Gobernanza de código",
    description:
      "Estándares compartidos, ownership definido y reviews que elevan calidad.",
  },
];

/* ─── SVG Icon Components (copied from Home.jsx) ──────────────────────────────────── */
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

  function AboutGroup() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300); // Reset after animation
  };

  // Scroll reveal refs for animations
  const heroRef = useScrollReveal({ delay: 0.1 });
  const identityRef = useScrollReveal({ delay: 0.15 });
  const servicesRef = useScrollReveal({ delay: 0.15 });
  const focusRef = useScrollReveal({ delay: 0.15 });
  const valuesRef = useScrollReveal({ delay: 0.15 });
  const processRef = useScrollReveal({ delay: 0.15 });
  const teamRef = useScrollReveal({ delay: 0.15 });

  usePageMeta(
    "ARCM Solutions",
    "Conoce la historia, misión, visión y proceso de ARCM Solutions.",
  );

  return (
    <div className="min-h-screen bg-[#F6F7EB]">
      <section ref={heroRef} className="relative bg-[#393E41] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E94F37] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3F88C5] rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#44BBA4] rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#E94F37] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              Advanced Research &amp; Code Management
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              ARCM <span className="text-[#3F88C5]">Solutions</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Un equipo que transforma investigación avanzada en software
              confiable, con gestión rigurosa del código y foco en resultados
              medibles.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#44BBA4]">2019</div>
                <div className="text-sm text-white/60 mt-1">Fundación</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3F88C5]">48</div>
                <div className="text-sm text-white/60 mt-1">Entregas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E94F37]">7</div>
                <div className="text-sm text-white/60 mt-1">Laboratorios</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 md:h-16 text-white"
            preserveAspectRatio="none"
            viewBox="0 0 1440 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 22L60 17C120 12 240 2 360 0C480 2 600 12 720 14C840 17 960 12 1080 10C1200 7 1320 7 1380 7L1440 7V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      <section ref={identityRef} className="page-section">
        <div className="container">
          <Card className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#E94F37] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Identidad
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-[var(--color-text)]">
              Historia, misión y visión
            </h2>
            <p className="muted text-lg m-0">
              Una base sólida para entregar soluciones con investigación, calidad
              y escala sostenida.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="mb-3 text-3xl text-[var(--color-primary)]">
                <FaBookOpen />
              </div>
              <h3>{identity.historia.title}</h3>
              <p className="muted">{identity.historia.description}</p>
            </Card>

            <Card>
              <div className="mb-3 text-3xl text-[var(--color-primary)]">
                <FaBullseye />
              </div>
              <h3>{identity.mision.title}</h3>
              <p className="muted">{identity.mision.description}</p>
            </Card>

            <Card>
              <div className="mb-3 text-3xl text-[var(--color-primary)]">
                <FaEye />
              </div>
              <h3>{identity.vision.title}</h3>
              <p className="muted">{identity.vision.description}</p>
            </Card>
          </div>
        </div>
      </section>

      <section ref={focusRef} className="page-section">
        <div className="container">
          <Card className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#3F88C5] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Capacidades
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-[var(--color-text)]">
              Áreas de enfoque
            </h2>
            <p className="muted text-lg m-0">
              Cobertura completa desde investigación hasta operación continua.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <Card key={area.id} className="grid gap-3">
                <div className="text-2xl text-[var(--color-primary)] mb-1">
                  {(() => {
                    switch(area.id) {
                      case 'area-1': return <FaFlask />;
                      case 'area-2': return <FaProjectDiagram />;
                      case 'area-3': return <FaDatabase />;
                      case 'area-4': return <FaCheck />;
                      case 'area-5': return <FaChartBar />;
                      case 'area-6': return <FaUsers />;
                      default: return null;
                    }
                  })()}
                </div>
                <span className="text-sm font-bold text-[var(--color-primary)]">
                  {area.title}
                </span>
                <p className="muted">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="page-section">
        <div className="container">
          <Card className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#44BBA4] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Cultura
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-[var(--color-text)]">
              Valores que nos mueven
            </h2>
            <p className="muted text-lg m-0">
              Principios que guían decisiones técnicas y relaciones de trabajo.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.id}>
                <span className="inline-flex mb-4 text-[var(--color-secondary)] font-extrabold tracking-[0.08em] text-lg">
                  {value.number}
                </span>
                <h3>{value.title}</h3>
                <p className="muted">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section ref={processRef} className="page-section">
        <div className="container">
          <Card className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#E94F37] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Método
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-[var(--color-text)]">
              Nuestro proceso
            </h2>
            <p className="muted text-lg m-0">
              Un ciclo claro para convertir investigación en entregables
              confiables.
            </p>
          </Card>

          <Timeline steps={processSteps} />
        </div>
      </section>

      {/* --- Replicate some of the cards from Home page --- */}
      <section ref={servicesRef} className="page-section">
        <div className="container">
          <Card className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#44BBA4] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Servicios destacados
            </div>
            <p className="muted text-lg m-0">
              Tres lineas de servicio para acelerar roadmap, calidad técnica y escalabilidad.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((service) => featuredServiceIds.includes(service.id))
              .map((service) => (
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
                      fontFamily: "'DM Sans', sans-serif",
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
                      letterSpacing: '0.01em',
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
                          letterSpacing: '0.005em',
                        }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            background: service.color,
                            marginTop: '0.5rem',
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
                      letterSpacing: '0.02em',
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

      {/* ─── Team Section: Premium Interactive Design ─────────────────────────────────── */}
      <section ref={teamRef} className="page-section">
        <div className="container">
          <Card className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#44BBA4] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Nuestro equipo
            </div>
            <p className="muted text-lg m-0">
              Profesionales multidisciplinarios que impulsan cada entrega con rigor y creatividad.
            </p>
          </Card>

          {/* Responsive Grid: 3 columns desktop, 2 tablets, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {/* Note for user interaction */}
          <p className="text-center mt-10 text-sm text-gray-500">
            Haz clic en cualquier tarjeta para ver el perfil completo y habilidades técnicas
          </p>
        </div>
      </section>

      {/* Modal for detailed team member view */}
      <TeamModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default AboutGroup;
