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
    "Inicio de Grupo Nexus Software. Servicios destacados, proyectos recientes y equipo de ejemplo.",
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            volutpat eros vel diam auctor, at sagittis urna posuere. Donec vitae
            est non augue efficitur volutpat at ut metus.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="text-center">
                <div
                  className="w-[58px] h-[58px] rounded-full mx-auto bg-[rgba(63,136,197,0.18)] text-[var(--color-primary)] inline-flex items-center justify-center font-bold"
                  aria-hidden="true"
                >
                  {member.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .slice(0, 2)
                    .join("")}
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
