import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { getPosts } from "../data/posts";
import usePageMeta from "../routes/usePageMeta";

function Blog() {
  usePageMeta("Blog", "Blog con publicaciones de ejemplo y detalle por slug.");

  const sortedPosts = [...getPosts()].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const tagCount = new Set(
    sortedPosts.flatMap((post) => post.tags || []),
  ).size;
  const paragraphCount = sortedPosts.reduce(
    (total, post) => total + (post.content?.length || 0),
    0,
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
              <span className="uppercase tracking-[0.2em] text-[0.65rem]">
                Blog
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Nuestros <span className="text-[#3F88C5]">Blogs</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Ideas, aprendizajes y notas tecnicas del equipo, con ejemplos
              claros y listos para compartir.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button as={Link} to="/blog/nuevo" variant="accent" size="lg">
                Publicar nuevo blog
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#44BBA4]">
                  {sortedPosts.length}
                </div>
                <div className="text-sm text-white/60 mt-1">Articulos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3F88C5]">
                  {tagCount}
                </div>
                <div className="text-sm text-white/60 mt-1">Etiquetas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E94F37]">
                  {paragraphCount}
                </div>
                <div className="text-sm text-white/60 mt-1">Parrafos</div>
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
          <SectionTitle
            title="Articulos recientes"
            subtitle="Explora nuestras publicaciones mas recientes."
          />

          {sortedPosts.length === 0 ? (
            <Card className="text-center">
              <p className="m-0 muted">
                Aun no hay articulos publicados. Crea el primero.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post) => (
                <Card key={post.id}>
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-[180px] object-cover rounded-[var(--radius-md)] mb-5"
                    />
                  ) : (
                    <div
                      className="placeholder-media mb-5"
                      aria-hidden="true"
                    />
                  )}
                  <p className="m-0 text-[var(--color-primary)] font-bold text-[0.85rem]">
                    {post.date}
                  </p>
                  <h3 className="my-4 mb-3">{post.title}</h3>
                  <p className="muted">{post.excerpt}</p>

                  <div className="my-6 flex flex-wrap gap-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link className="link-inline" to={`/blog/${post.slug}`}>
                    Leer articulo
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
