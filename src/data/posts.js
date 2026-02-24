export const posts = [
  {
    id: 'post-1',
    slug: 'arquitectura-frontend-escalable',
    title: 'Arquitectura Frontend Escalable en Equipos Mixtos',
    excerpt:
      'Como mantener coherencia de UI y velocidad en un equipo que mezcla seniors y juniors sin frenar el delivery.',
    date: '2026-01-12',
    readingTime: '7 min',
    author: 'Lucia Andrade',
    role: 'Tech Lead Frontend',
    category: 'Arquitectura',
    tags: ['Frontend', 'Arquitectura', 'React'],
    cover:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Los equipos mixtos necesitan limites claros para moverse rapido sin romper contratos. Arrancamos definiendo un core de componentes con tokens compartidos y un catalogo de patrones listos para reusar.',
      'Separar boundary entre UI y dominio evita fugas. Usamos adaptadores para que la UI reciba view models planos y los merges complejos queden en la capa de servicios.',
      'Documentar decisiones con RFC livianos permite que los juniors contribuyan sin miedo. Cada RFC incluye impacto, riesgos y plan de rollout con feature flags.',
      'La escalabilidad no solo es tecnica: establecer rotaciones de ownership y pairing semanal reduce cuellos de botella y mantiene consistente la experiencia.',
    ],
    keyTakeaways: [
      'Define contratos de componentes que se puedan auditar con lint y pruebas visuales.',
      'Mantiene limites claros entre dominio y UI usando adaptadores.',
      'Prefiere RFC cortos y feature flags para evolucionar sin frenar releases.',
    ],
  },
  {
    id: 'post-2',
    slug: 'metricas-que-importan-en-producto',
    title: 'Metricas que Importan en Producto Digital',
    excerpt:
      'No todas las metricas empujan al negocio. Estos son los indicadores que usamos para alinear discovery, entrega y soporte.',
    date: '2026-01-25',
    readingTime: '6 min',
    author: 'Mateo Salas',
    role: 'Product Manager',
    category: 'Producto',
    tags: ['Producto', 'Analitica', 'UX'],
    cover:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Arrancamos con una North Star que combina valor para el usuario y salud del negocio. Evitamos la tirania de metricas de vanidad como descargas o visitas aisladas.',
      'Cada feature se define con una hipotesis medible y su leading indicator. Ejemplo: para onboardings medimos activaciones completas en lugar de clics en el CTA.',
      'Los dashboards muestran tanto input como output metrics para no optimizar en vacio. Soporte y UX comparten la misma vista para detectar friccion temprano.',
      'Revisar las metricas en rituales quincenales permite ajustar rapido. Si un indicador no gatilla decisiones en dos ciclos, lo eliminamos.',
    ],
    keyTakeaways: [
      'Define una North Star que combine valor usuario y negocio.',
      'Liga cada feature a una hipotesis y su leading indicator.',
      'Depura dashboards que no cambian decisiones en dos ciclos.',
    ],
  },
  {
    id: 'post-3',
    slug: 'diseno-de-sistemas-para-startups',
    title: 'Diseno de Sistemas para Startups en Crecimiento',
    excerpt:
      'Diseñar pensando en el hoy y el proximo trimestre: decisiones livianas que no hipotecan el futuro del sistema.',
    date: '2025-12-20',
    readingTime: '8 min',
    author: 'Valentina Rios',
    role: 'Staff Engineer',
    category: 'Sistemas',
    tags: ['Sistemas', 'Escalabilidad', 'Cloud'],
    cover:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
    content: [
      'En early-stage conviene diseñar en capas removibles. Un gateway ligero permite cambiar proveedores sin tocar el core.',
      'La observabilidad es la primera deuda que pagamos. Loguear con contexto de negocio evita excavar en trazas infinitas.',
      'Las decisiones se evalúan por costo de reversibilidad. Si algo es caro de revertir, lo probamos primero como experimento de borde con un solo cliente.',
      'Los docs breves con diagramas C4 nos ayudaron a alinear al equipo remoto y a onboardear nuevos devs en menos de una semana.',
    ],
    keyTakeaways: [
      'Disena capas removibles y evita dependencias pegadas al core.',
      'Prioriza observabilidad antes de optimizar performance.',
      'Mide el costo de revertir antes de tomar una decision arquitectonica.',
    ],
  },
  {
    id: 'post-4',
    slug: 'automatizacion-cicd-sin-dolor',
    title: 'Automatizacion CI/CD sin Dolor Operativo',
    excerpt:
      'Pipelines cortos, feedback rapido y lanzamientos seguros sin secuestrar al equipo en guardias eternas.',
    date: '2025-11-18',
    readingTime: '5 min',
    author: 'Diego Duarte',
    role: 'DevOps',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'Calidad'],
    cover:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Dividimos el pipeline en stages cortos con limites de tiempo claros. Si un paso supera 8 minutos, lo fragmentamos o lo movemos a un chequeo asincrono.',
      'Trunk-based con feature flags nos permite deployar varias veces al dia. Los flags tienen fecha de vencimiento y dueño asignado para evitar cementerios.',
      'Automatizamos checks de seguridad (SCA y SAST) en paralelo al build para no impactar el time-to-merge.',
      'Los canary releases con health checks de negocio redujeron incidentes en produccion y bajaron el MTTR a menos de 20 minutos.',
    ],
    keyTakeaways: [
      'Mantiene pipelines por debajo de 10 minutos con stages paralelos.',
      'Usa feature flags con fecha de vencimiento y dueño claro.',
      'Incluye canaries con checks de negocio para detectar regresiones rapido.',
    ],
  },
  {
    id: 'post-5',
    slug: 'testing-pragmatico-en-spa',
    title: 'Testing Pragmatico en Aplicaciones SPA',
    excerpt:
      'Un stack de pruebas liviano que cubre regresiones criticas sin frenar la entrega continua.',
    date: '2025-10-07',
    readingTime: '6 min',
    author: 'Sofia Mendez',
    role: 'QA Engineer',
    category: 'Calidad',
    tags: ['QA', 'Testing', 'Frontend'],
    cover:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Los contratos de API se validan con tests de esquema para que los mocks no se desalineen. Esto previene errores silenciosos en ambientes intermedios.',
      'Los componentes criticos tienen pruebas de interaccion con Testing Library y validacion visual automatica en PRs.',
      'Evitamos duplicar cobertura: smoke e2e solo sobre user journeys de pago y alta frecuencia, mientras la logica compleja vive en pruebas unitarias rapidas.',
      'La matriz de navegadores se reduce a donde realmente convertimos. Los reportes se comparten en el mismo dashboard que producto y soporte.',
    ],
    keyTakeaways: [
      'Valida contratos de API con esquema para evitar mocks obsoletos.',
      'Combina pruebas de interaccion y visuales en los componentes core.',
      'Reserva e2e para flujos de negocio de alta frecuencia.',
    ],
  },
  {
    id: 'post-6',
    slug: 'gestion-tecnica-para-equipos-hibridos',
    title: 'Gestion Tecnica para Equipos Hibridos',
    excerpt:
      'Rituales ligeros y acuerdos explicitos para equipos distribuidos que buscan ritmo sin perder calidad.',
    date: '2025-09-15',
    readingTime: '5 min',
    author: 'Camila Paredes',
    role: 'Engineering Manager',
    category: 'Management',
    tags: ['Management', 'Equipos', 'Procesos'],
    cover:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Establecimos acuerdos de comunicacion que priorizan asincronia: decisiones quedan en un doc corto con contexto y dueños claros.',
      'Las dailies se reemplazaron por check-ins escritos dos veces por semana y una reunion tecnica de 25 minutos focalizada en bloqueos.',
      'Rotar ownership cada mes reduce silos y expone a todos a distintas partes del sistema. Cada rotacion viene con un buddy para transferir contexto.',
      'El bienestar se mide junto con la entrega: encuestas cortas quincenales y seguimiento de tiempo en guardias para prevenir burnout.',
    ],
    keyTakeaways: [
      'Documenta decisiones en un formato liviano y accesible.',
      'Prefiere check-ins asincronos y reuniones cortas focalizadas.',
      'Rota ownership con buddy system para reducir silos y burnout.',
    ],
  },
];
