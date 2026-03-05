import { FaFlask, FaBuilding, FaChartBar, FaVial, FaCog, FaClipboardList } from "react-icons/fa";
import SectionLabel from "../components/ui/SectionLabel";
import usePageMeta from "../routes/usePageMeta";
import useInView from "../hooks/useInView";

const values = [
  { id: "value-1", title: "Rigor Aplicado", description: "Convertimos investigación en decisiones concretas, con experimentos pequeños y evidencia medible antes de escalar." },
  { id: "value-2", title: "Trazabilidad Total", description: "Todo cambio tiene un porqué: documentación ligera, métricas visibles y contexto compartido en cada entrega." },
  { id: "value-3", title: "Código Vivo", description: "Preferimos sistemas fáciles de evolucionar: modularidad, pruebas útiles y automatización que no frena al equipo." },
  { id: "value-4", title: "Colaboración Abierta", description: "Trabajamos con liderazgo distribuido, feedback continuo y acuerdos claros para equipos híbridos." },
];

const processSteps = [
  { id: "step-1", title: "Exploración", description: "Mapeamos el problema, identificamos hipótesis y definimos el impacto esperado con métricas simples." },
  { id: "step-2", title: "Modelado y Prototipo", description: "Diseñamos la arquitectura mínima viable, prototipamos la solución y validamos riesgos técnicos." },
  { id: "step-3", title: "Construcción con Control", description: "Entregas iterativas, calidad automatizada y seguimiento de performance desde el día uno." },
  { id: "step-4", title: "Evolución Medible", description: "Monitoreamos resultados, ajustamos el roadmap y documentamos aprendizajes para el siguiente ciclo." },
];

const focusAreas = [
  { id: "area-1", title: "Investigación aplicada", description: "Hipótesis, experimentos cortos y resultados que se convierten en decisiones de producto.", icon: FaFlask },
  { id: "area-2", title: "Arquitectura escalable", description: "Diseño modular, resiliencia y performance para crecer sin rehacer todo el stack.", icon: FaBuilding },
  { id: "area-3", title: "Data pipelines", description: "Flujos de datos confiables, trazabilidad y calidad desde la ingesta hasta el reporte.", icon: FaChartBar },
  { id: "area-4", title: "Automatización QA", description: "Pruebas continuas, detección temprana de regresiones y releases con control.", icon: FaVial },
  { id: "area-5", title: "Operaciones confiables", description: "Observabilidad, SLOs claros y respuesta a incidentes orientada al aprendizaje.", icon: FaCog },
  { id: "area-6", title: "Gobernanza de código", description: "Estándares compartidos, ownership definido y revisiones que elevan la calidad.", icon: FaClipboardList },
];

/* Animated wrapper using scroll-triggered IntersectionObserver */
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

function AboutGroup() {
  usePageMeta("ARCM Solutions", "Conoce la historia, misión, visión y proceso de ARCM Solutions.");

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="hero-section"
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          padding: '6rem 0 4rem',
        }}
      >
        {/* Decorative blobs */}
        <div className="decor-blob" style={{
          top: '10%', left: '-6%',
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
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{ maxWidth: '56rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                background: 'rgba(63, 136, 197, 0.15)',
                border: '1px solid rgba(63, 136, 197, 0.3)',
                color: '#3F88C5',
              }}
            >
              Advanced Research &amp; Code Management
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 2rem + 3vw, 4.5rem)',
                letterSpacing: '-2px',
                color: 'var(--color-hero-text)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              ARCM{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                Solutions
              </span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--color-hero-muted)', maxWidth: 600, lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Un equipo que transforma investigación avanzada en software confiable, con gestión rigurosa del código y foco en resultados medibles.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '28rem' }}>
              {[
                { value: '2019', label: 'Fundación', color: '#44BBA4' },
                { value: '48', label: 'Entregas', color: '#3F88C5' },
                { value: '7', label: 'Laboratorios', color: '#E94F37' },
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

      {/* ══ IDENTIDAD ══════════════════════════════════════════ */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header">
              <SectionLabel text="Identidad" color="#E94F37" />
              <h2>Historia, misión y <span className="highlight">visión</span></h2>
              <p>Una base sólida para entregar soluciones con investigación, calidad y escala sostenida.</p>
            </div>
          </AnimatedItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Historia', desc: 'Nacimos como un laboratorio de I+D que buscaba reducir el caos del desarrollo moderno. Hoy acompañamos equipos que necesitan velocidad sin sacrificar confiabilidad.', color: '#E94F37' },
              { title: 'Misión', desc: 'Traducir investigación avanzada en software que escale, con procesos claros, código auditable y entregas consistentes.', color: '#3F88C5' },
              { title: 'Visión', desc: 'Ser el referente en gestión de conocimiento técnico para organizaciones que desean innovar con control y eficiencia.', color: '#44BBA4' },
            ].map((item, i) => (
              <AnimatedItem key={item.title} index={i + 1}>
                <div className="modern-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="card-decor-circle" style={{ background: `${item.color}15` }} />
                  <h3 style={{ color: item.color, marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ÁREAS DE ENFOQUE ═══════════════════════════════════ */}
      <section className="page-section" style={{ padding: '100px 0', background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header">
              <SectionLabel text="Capacidades" color="#3F88C5" />
              <h2>Áreas de <span className="highlight">enfoque</span></h2>
              <p>Cobertura completa desde investigación hasta operación continua.</p>
            </div>
          </AnimatedItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {focusAreas.map((area, i) => {
              const IconComponent = area.icon;
              return (
                <AnimatedItem key={area.id} index={i + 1}>
                  <div className="modern-card">
                    <div className="card-decor-circle" style={{ background: 'rgba(68,187,164,0.1)' }} />
                    <div style={{ marginBottom: '0.75rem', color: 'var(--color-primary)', fontSize: '1.5rem' }}>
                      <IconComponent />
                    </div>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 700 }}>{area.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{area.description}</p>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ VALUES ══════════════════════════════════════════════ */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header">
              <SectionLabel text="Cultura" color="#44BBA4" />
              <h2>Valores que nos <span className="highlight">mueven</span></h2>
              <p>Principios que guían decisiones técnicas y relaciones de trabajo.</p>
            </div>
          </AnimatedItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {values.map((value, index) => (
              <AnimatedItem key={value.id} index={index + 1}>
                <div className="modern-card">
                  <span
                    style={{
                      display: 'inline-block',
                      marginBottom: '1rem',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                      fontSize: '2rem',
                      fontFamily: 'var(--font-heading)',
                      opacity: 0.4,
                    }}
                  >
                    0{index + 1}
                  </span>
                  <h3 style={{ color: 'var(--color-heading)', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 700 }}>{value.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{value.description}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ════════════════════════════════════════════ */}
      <section className="page-section" style={{ padding: '100px 0', background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <SectionLabel text="Método" color="#E94F37" />
              <h2 style={{ textAlign: 'center' }}>Nuestro <span className="highlight">proceso</span></h2>
              <p style={{ textAlign: 'center' }}>Un ciclo claro para convertir investigación en entregables confiables.</p>
            </div>
          </AnimatedItem>

          <ol className="list-reset" style={{ display: 'grid', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
            {processSteps.map((step, index) => (
              <AnimatedItem key={step.id} index={index + 1} tag="li">
                <div className="modern-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      fontWeight: 700,
                      color: '#fff',
                      flexShrink: 0,
                      background: 'var(--color-accent)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-heading)', fontSize: '1.1rem', fontWeight: 700 }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: 1.65 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default AboutGroup;
