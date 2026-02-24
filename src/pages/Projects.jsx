import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import usePageMeta from "../routes/usePageMeta";

const categories = [
  "Todos",
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "DevOps",
];

function getStatusColor(status) {
  if (status === "Completado") return "bg-[#44BBA4] text-white";
  if (status === "En progreso") return "bg-[#3F88C5] text-white";
  return "bg-[#393E41] text-white";
}

function Projects() {
  usePageMeta(
    "Proyecto",
    "Portafolio de proyectos de ejemplo con filtros por categoria y busqueda textual.",
  );

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "Todos" || project.category === selectedCategory;

      const searchable =
        `${project.name} ${project.description} ${project.stack.join(" ")}`.toLowerCase();
      const matchesQuery =
        !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen bg-[#F6F7EB]">
      {/* Hero Section */}
      <section className="relative bg-[#393E41] text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E94F37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3F88C5] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#44BBA4] rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E94F37] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Portafolio
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Nuestros <span className="text-[#3F88C5]">Proyectos</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Explora nuestra colección de proyectos de desarrollo de software. Desde
              aplicaciones web hasta soluciones backend, cada proyecto
              representa un desafío único y aprendizajes valiosos.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#44BBA4]">
                  {projects.length}
                </div>
                <div className="text-sm text-white/60 mt-1">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3F88C5]">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-white/60 mt-1">Categorías</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E94F37]">
                  {new Set(projects.flatMap((p) => p.stack)).size}
                </div>
                <div className="text-sm text-white/60 mt-1">Tecnologías</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
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

      {/* Filters Section */}
      <section className="bg-white shadow-sm border-b border-[#393E41]/10">
        <div className="container py-8">
          {/* Category Filters */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#393E41] uppercase tracking-wider mb-4">
              Categorías
            </h2>
            <div
              className="flex flex-wrap gap-3"
              role="group"
              aria-label="Filtrar proyectos por categoria"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[#E94F37] text-white shadow-md scale-105"
                      : "bg-white text-[#393E41] border-2 border-[#393E41]/20 hover:border-[#E94F37] hover:text-[#E94F37]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl">
            <label
              htmlFor="project-search"
              className="block text-sm font-bold text-[#393E41] uppercase tracking-wider mb-3"
            >
              Buscar
            </label>
            <div className="relative">
              <input
                id="project-search"
                name="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej: React, Node.js, TypeScript..."
                className="w-full px-4 py-3 pr-12 border-2 border-[#393E41]/20 rounded-lg focus:outline-none focus:border-[#3F88C5] focus:ring-2 focus:ring-[#3F88C5]/20 transition-all"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#393E41]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          <p className="mt-4 text-sm text-[#393E41]/60">
            Mostrando {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-20 h-20 mx-auto mb-4 text-[#393E41]/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xl font-semibold text-[#393E41] mb-2">
                No se encontraron proyectos
              </p>
              <p className="text-[#393E41]/60">
                Intenta con otros filtros o términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#393E41]/5"
                >
                  {/* Project Image/Placeholder */}
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#3F88C5]/20 to-[#44BBA4]/20">
                    {project.demoUrl && project.demoUrl !== "#" ? (
                      <>
                        <img
                          src={project.demoUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3F88C5] to-[#44BBA4] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="bg-[#E94F37] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {project.category}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${getStatusColor(
                          project.status,
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#393E41] mb-3 group-hover:text-[#3F88C5] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-[#393E41]/70 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-semibold px-3 py-1 bg-[#F6F7EB] text-[#393E41] rounded-md border border-[#393E41]/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-[#393E41]/10">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-center px-4 py-2.5 bg-[#E94F37]/70 text-white font-semibold rounded-lg hover:bg-[#E94F37] transition-colors shadow-sm hover:shadow-md"
                      >
                        Ver Código
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;
