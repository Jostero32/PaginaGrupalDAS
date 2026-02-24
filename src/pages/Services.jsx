import Accordion from "../components/ui/Accordion";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { faqItems, services } from "../data/services";
import usePageMeta from "../routes/usePageMeta";

function Services() {
  usePageMeta(
    "Servicios",
    "Servicios ficticios de desarrollo, modernizacion, consultoria y operaciones para empresas.",
  );

  return (
    <>
      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Servicios"
            subtitle="Catalogo de soluciones para diseno, construccion y evolucion de plataformas digitales."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id}>
                <h3 className="m-0 mb-3">{service.title}</h3>
                <p className="muted">{service.description}</p>
                <ul className="mt-6 pl-[1.1rem]">
                  {service.features.map((feature) => (
                    <li key={feature} className="mt-3 first:mt-0">
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-[rgba(63,136,197,0.08)]">
        <div className="container">
          <SectionTitle
            title="Preguntas frecuentes"
            subtitle="Respuestas rapidas sobre tiempos, colaboracion y soporte."
          />
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}

export default Services;
