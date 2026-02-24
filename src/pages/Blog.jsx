import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { posts } from "../data/posts";
import usePageMeta from "../routes/usePageMeta";

function Blog() {
  usePageMeta("Blog", "Blog con publicaciones de ejemplo y detalle por slug.");

  const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="Blog"
          subtitle="Ideas, aprendizajes y notas tecnicas de un equipo de software ficticio."
        />

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
      </div>
    </section>
  );
}

export default Blog;
