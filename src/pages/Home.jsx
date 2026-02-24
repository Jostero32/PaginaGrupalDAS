import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { projects } from "../data/projects";
import { featuredServiceIds, services } from "../data/services";
import { team } from "../data/team";
import usePageMeta from "../routes/usePageMeta";

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
      <section className="page-section bg-gradient-to-br from-[rgba(63,136,197,0.14)] to-[rgba(68,187,164,0.16)]">
        <div className="container">
          <Badge variant="secondary">Software Development Group</Badge>
          <h1 className="my-6 max-w-[820px] text-[clamp(2rem,1.3rem+2.5vw,3.25rem)] leading-[1.15] text-[var(--color-text)]">
            Construimos productos digitales empresariales con foco en resultados
          </h1>
          <p className="muted max-w-[700px] m-0">
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
              <Card key={service.id}>
                <h3 className="my-4 mb-3">{service.title}</h3>
                <p className="muted">{service.description}</p>
                <ul className="mt-6 pl-[1.1rem]">
                  {service.features.slice(0, 2).map((feature) => (
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

      <section className="page-section">
        <div className="container">
          <SectionTitle
            title="Proyectos recientes"
            subtitle="Casos ficticios que combinan frontend, backend y operaciones modernas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <div className="placeholder-media" aria-hidden="true" />
                <div className="mt-6">
                  <Badge variant="primary">{project.category}</Badge>
                  <h3 className="my-4 mb-3">{project.name}</h3>
                </div>
                <p className="muted">{project.description}</p>
                <Button as={Link} to="/proyecto" variant="secondary" size="sm">
                  Explorar portafolio
                </Button>
              </Card>
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
                <h3 className="my-4 mb-3">{member.name}</h3>
                <p className="m-0 mb-4 text-[var(--color-primary)] font-bold">
                  {member.role}
                </p>
                <p className="muted">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
