import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import usePageMeta from "../routes/usePageMeta";

const values = [
  {
    id: "value-1",
    title: "Calidad Tecnica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem sem. Nam non fermentum justo.",
  },
  {
    id: "value-2",
    title: "Transparencia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis lacus in urna dictum pharetra.",
  },
  {
    id: "value-3",
    title: "Mejora Continua",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor metus sit amet lacus facilisis, vel feugiat nulla varius.",
  },
  {
    id: "value-4",
    title: "Colaboracion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ligula in ipsum efficitur luctus non in massa.",
  },
];

const processSteps = [
  {
    id: "step-1",
    title: "Descubrimiento",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat gravida interdum.",
  },
  {
    id: "step-2",
    title: "Estrategia y Alcance",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at augue ut erat consectetur varius.",
  },
  {
    id: "step-3",
    title: "Construccion Iterativa",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere nibh sed sapien posuere finibus.",
  },
  {
    id: "step-4",
    title: "Lanzamiento y Evolucion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus ac eros placerat tincidunt.",
  },
];

function AboutGroup() {
  usePageMeta(
    "Nombre del grupo",
    "Conoce la historia, mision, vision, valores y proceso de ARCM Solutions.",
  );

  return (
    <>
      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Nombre del grupo: ARCM Solutions"
            subtitle="Equipo ficticio de desarrollo enfocado en soluciones empresariales modernas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3>Historia</h3>
              <p className="muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                feugiat, nunc vel egestas cursus, turpis sem fermentum mauris,
                in porttitor lectus sem et arcu. Mauris rutrum eros quis magna
                congue, et luctus nulla vehicula.
              </p>
            </Card>

            <Card>
              <h3>Mision</h3>
              <p className="muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                aliquet, sapien sit amet luctus elementum, augue magna eleifend
                sem, vitae vulputate purus est non sapien.
              </p>
            </Card>

            <Card>
              <h3>Vision</h3>
              <p className="muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                aliquet massa ac neque elementum, eget scelerisque tortor
                luctus. Suspendisse malesuada ipsum sed enim tristique suscipit.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Valores"
            subtitle="Principios que guian decisiones tecnicas y relaciones de trabajo."
          />

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
          <SectionTitle
            title="Nuestro proceso"
            subtitle="Un ciclo claro en cuatro pasos para convertir ideas en entregables confiables."
          />

          <ol className="list-reset grid gap-6">
            {processSteps.map((step, index) => (
              <li key={step.id}>
                <Card className="grid gap-3">
                  <span className="text-[var(--color-accent)] font-bold">
                    Paso {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.description}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export default AboutGroup;
