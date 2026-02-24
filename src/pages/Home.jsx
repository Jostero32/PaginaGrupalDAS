import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import usePageMeta from '../routes/usePageMeta';
import { services, featuredServiceIds } from '../data/services';
import { projects } from '../data/projects';
import { team } from '../data/team';
import './Home.css';

function Home() {
  usePageMeta(
    'Inicio',
    'Inicio de Grupo Nexus Software. Servicios destacados, proyectos recientes y equipo de ejemplo.'
  );

  const featuredServices = services.filter((service) =>
    featuredServiceIds.includes(service.id)
  );
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      <section className='page-section home-hero'>
        <div className='container'>
          <Badge variant='secondary'>Software Development Group</Badge>
          <h1>Construimos productos digitales empresariales con foco en resultados</h1>
          <p className='muted'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat
            eros vel diam auctor, at sagittis urna posuere. Donec vitae est non augue
            efficitur volutpat at ut metus.
          </p>
          <div className='hero-actions'>
            <Button as={Link} to='/contactos' variant='accent' size='lg'>
              Solicitar reunion
            </Button>
            <Button as={Link} to='/proyecto' variant='primary' size='lg'>
              Ver proyectos
            </Button>
          </div>
        </div>
      </section>

      <section className='page-section'>
        <div className='container'>
          <SectionTitle
            title='Servicios destacados'
            subtitle='Tres lineas de servicio para acelerar roadmap, calidad tecnica y escalabilidad.'
          />

          <div className='grid home-service-grid'>
            {featuredServices.map((service) => (
              <Card key={service.id}>
                <h3>{service.title}</h3>
                <p className='muted'>{service.description}</p>
                <ul className='home-list'>
                  {service.features.slice(0, 2).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='page-section'>
        <div className='container'>
          <SectionTitle
            title='Proyectos recientes'
            subtitle='Casos ficticios que combinan frontend, backend y operaciones modernas.'
          />

          <div className='grid home-project-grid'>
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <div className='placeholder-media' aria-hidden='true' />
                <div className='home-project-meta'>
                  <Badge variant='primary'>{project.category}</Badge>
                  <h3>{project.name}</h3>
                </div>
                <p className='muted'>{project.description}</p>
                <Button as={Link} to='/proyecto' variant='secondary' size='sm'>
                  Explorar portafolio
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='page-section'>
        <div className='container'>
          <SectionTitle
            title='Equipo'
            subtitle='Perfiles ficticios con enfoque multidisciplinario para ciclos de entrega continuos.'
          />

          <div className='grid home-team-grid'>
            {team.map((member) => (
              <Card key={member.id} className='home-team-card'>
                <div className='avatar-placeholder' aria-hidden='true'>
                  {member.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <h3>{member.name}</h3>
                <p className='home-team-role'>{member.role}</p>
                <p className='muted'>{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
