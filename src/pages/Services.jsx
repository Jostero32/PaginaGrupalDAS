import Accordion from '../components/ui/Accordion';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import usePageMeta from '../routes/usePageMeta';
import { faqItems, services } from '../data/services';
import './Services.css';

function Services() {
  usePageMeta(
    'Servicios',
    'Servicios ficticios de desarrollo, modernizacion, consultoria y operaciones para empresas.'
  );

  return (
    <>
      <section className='page-section'>
        <div className='container'>
          <SectionTitle
            title='Servicios'
            subtitle='Catalogo de soluciones para diseno, construccion y evolucion de plataformas digitales.'
          />

          <div className='grid services-grid'>
            {services.map((service) => (
              <Card key={service.id}>
                <h3>{service.title}</h3>
                <p className='muted'>{service.description}</p>
                <ul className='service-features'>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='page-section services-faq'>
        <div className='container'>
          <SectionTitle
            title='Preguntas frecuentes'
            subtitle='Respuestas rapidas sobre tiempos, colaboracion y soporte.'
          />
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}

export default Services;
