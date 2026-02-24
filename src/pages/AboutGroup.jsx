import Card from "../components/ui/Card";
import usePageMeta from "../routes/usePageMeta";

const values = [
  {
    id: "value-1",
    title: "Rigor Aplicado",
    description:
      "Convertimos investigación en decisiones concretas, con experimentos pequeños y evidencia medible antes de escalar.",
  },
  {
    id: "value-2",
    title: "Trazabilidad Total",
    description:
      "Todo cambio tiene un porqué: documentación ligera, métricas visibles y contexto compartido en cada entrega.",
  },
  {
    id: "value-3",
    title: "Código Vivo",
    description:
      "Preferimos sistemas fáciles de evolucionar: modularidad, pruebas útiles y automatización que no frena al equipo.",
  },
  {
    id: "value-4",
    title: "Colaboración Abierta",
    description:
      "Trabajamos con liderazgo distribuido, feedback continuo y acuerdos claros para equipos híbridos.",
  },
];

const processSteps = [
  {
    id: "step-1",
    title: "Exploración",
    description:
      "Mapeamos el problema, identificamos hipótesis y definimos el impacto esperado con métricas simples.",
  },
  {
    id: "step-2",
    title: "Modelado y Prototipo",
    description:
      "Diseñamos la arquitectura mínima viable, prototipamos la solución y validamos riesgos técnicos.",
  },
  {
    id: "step-3",
    title: "Construcción con Control",
    description:
      "Entregas iterativas, calidad automatizada y seguimiento de performance desde el día uno.",
  },
  {
    id: "step-4",
    title: "Evolución Medible",
    description:
      "Monitoreamos resultados, ajustamos el roadmap y documentamos aprendizajes para el siguiente ciclo.",
  },
];

const focusAreas = [
  {
    id: "area-1",
    title: "Investigación aplicada",
    description:
      "Hipótesis, experimentos cortos y resultados que se convierten en decisiones de producto.",
  },
  {
    id: "area-2",
    title: "Arquitectura escalable",
    description:
      "Diseño modular, resiliencia y performance para crecer sin rehacer todo el stack.",
  },
  {
    id: "area-3",
    title: "Data pipelines",
    description:
      "Flujos de datos confiables, trazabilidad y calidad desde la ingesta hasta el reporte.",
  },
  {
    id: "area-4",
    title: "Automatización QA",
    description:
      "Pruebas continuas, detección temprana de regresiones y releases con control.",
  },
  {
    id: "area-5",
    title: "Operaciones confiables",
    description:
      "Observabilidad, SLOs claros y respuesta a incidentes orientada al aprendizaje.",
  },
  {
    id: "area-6",
    title: "Gobernanza de código",
    description:
      "Estándares compartidos, ownership definido y revisiones que elevan la calidad.",
  },
];

function AboutGroup() {
  usePageMeta(
    "ARCM Solutions",
    "Conoce la historia, misión, visión y proceso de ARCM Solutions.",
  );

  return (
    <div className="min-h-screen bg-[#F6F7EB]">
      <section className="relative bg-[#393E41] text-white overflow-hidden">
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

      <section className="page-section">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3>Historia</h3>
              <p className="muted">
                Nacimos como un laboratorio de I+D que buscaba reducir el caos del
                desarrollo moderno. Hoy acompañamos equipos que necesitan
                velocidad sin sacrificar confiabilidad.
              </p>
            </Card>

            <Card>
              <h3>Misión</h3>
              <p className="muted">
                Traducir investigación avanzada en software que escale, con
                procesos claros, código auditable y entregas consistentes.
              </p>
            </Card>

            <Card>
              <h3>Visión</h3>
              <p className="muted">
                Ser el referente en gestión de conocimiento técnico para
                organizaciones que desean innovar con control y eficiencia.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-section">
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
                <span className="text-sm font-bold text-[var(--color-primary)]">
                  {area.title}
                </span>
                <p className="muted">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
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
            {values.map((value, index) => (
              <Card key={value.id}>
                <span className="inline-flex mb-4 text-[var(--color-secondary)] font-extrabold tracking-[0.08em]">
                  0{index + 1}
                </span>
                <h3>{value.title}</h3>
                <p className="muted">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
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

          <ol className="list-reset grid gap-6">
            {processSteps.map((step, index) => (
              <li key={step.id}>
                <Card className="grid gap-4 border-l-4 border-l-[var(--color-accent)]">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E94F37] text-white font-bold">
                      0{index + 1}
                    </span>
                    <h3 className="m-0">{step.title}</h3>
                  </div>
                  <p className="muted">{step.description}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default AboutGroup;
