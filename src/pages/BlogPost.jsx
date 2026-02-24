import { Link, useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import { findPostBySlug } from "../data/posts";
import usePageMeta from "../routes/usePageMeta";

function BlogPost() {
  const { slug } = useParams();
  const post = findPostBySlug(slug);

  usePageMeta(
    post ? post.title : "Post no encontrado",
    post ? post.excerpt : "El articulo solicitado no existe en el blog.",
  );

  if (!post) {
    return (
      <section className="page-section">
        <div className="container text-center">
          <h1>Articulo no encontrado</h1>
          <p className="muted">El slug solicitado no existe.</p>
          <Link className="link-inline" to="/blog">
            Volver al blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="page-section">
      <div className="container max-w-[820px]">
        <Link className="link-inline" to="/blog">
          Volver al blog
        </Link>

        <p className="mt-6 m-0 text-[var(--color-primary)] font-bold">
          {post.date}
        </p>
        <h1 className="my-4 mb-4 text-[var(--color-text)] leading-[1.2] text-[clamp(1.9rem,1.4rem+1.7vw,2.6rem)]">
          {post.title}
        </h1>

        <div className="flex gap-3 flex-wrap mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="[&>p]:m-0 [&>p+p]:mt-6">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
