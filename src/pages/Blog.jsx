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

  return (
    <section className="page-section">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            title="Blog"
            subtitle="Ideas, aprendizajes y notas tecnicas de un equipo de software ficticio."
          />
          <Button as={Link} to="/blog/nuevo" variant="accent" size="sm">
            Agregar articulo
          </Button>
        </div>

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
  );
}

export default Blog;
