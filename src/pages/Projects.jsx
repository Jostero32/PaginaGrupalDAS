import { useMemo, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import usePageMeta from '../routes/usePageMeta';
import { projects } from '../data/projects';
import './Projects.css';

const categories = ['Todos', 'Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps'];

function getStatusVariant(status) {
  if (status === 'Completado') return 'success';
  if (status === 'En progreso') return 'progress';
  return 'paused';
}

function Projects() {
  usePageMeta(
    'Proyecto',
    'Portafolio de proyectos de ejemplo con filtros por categoria y busqueda textual.'
  );

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'Todos' || project.category === selectedCategory;

      const searchable = `${project.name} ${project.description} ${project.stack.join(' ')}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <section className='page-section'>
      <div className='container'>
        <SectionTitle
          title='Portafolio de proyectos'
          subtitle='Filtra por tipo de iniciativa o busca por stack, nombre o descripcion.'
        />

        <div className='project-controls'>
          <div className='project-filter-list' role='group' aria-label='Filtrar proyectos por categoria'>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size='sm'
                type='button'
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className='project-search'>
            <label htmlFor='project-search'>Buscar proyectos</label>
            <input
              id='project-search'
              name='project-search'
              type='search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Ej: React, dashboard, API...'
            />
          </div>
        </div>

        <div className='grid project-grid'>
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <div className='project-card-header'>
                <Badge variant='primary'>{project.category}</Badge>
                <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
              </div>

              <h3>{project.name}</h3>
              <p className='muted'>{project.description}</p>

              <div className='project-stack' aria-label='Tecnologias'>
                {project.stack.map((item) => (
                  <Badge key={item} variant='secondary'>
                    {item}
                  </Badge>
                ))}
              </div>

              <div className='project-links'>
                <a className='link-inline' href={project.demoUrl} target='_blank' rel='noreferrer'>
                  Demo
                </a>
                <a className='link-inline' href={project.repoUrl} target='_blank' rel='noreferrer'>
                  Repo
                </a>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className='projects-empty'>No se encontraron proyectos con ese criterio.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
