import { Link, useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import { findPostBySlug } from "../data/posts";
import usePageMeta from "../routes/usePageMeta";

function BlogPost() {
  const { slug } = useParams();
  const post = findPostBySlug(slug);

  const formatDate = (value) =>
    new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));

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

  const author = post.author || "Equipo Nexus";
  const role = post.role || "Editorial";
  const category = post.category || post.tags?.[0] || "Blog";
  const readingTime =
    post.readingTime ||
    `${Math.max(
      1,
      Math.round(
        post.content.join(" ").split(/\s+/).filter(Boolean).length / 200,
      ),
    )} min`;

  return (
    <article className="page-section">
      <div className="container max-w-[820px]">
        <Link className="link-inline" to="/blog">
          Volver al blog
        </Link>

        <Card className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-[0.95rem] text-[rgba(57,62,65,0.78)]">
            <Badge variant="primary">{category}</Badge>
            <span className="font-semibold text-[var(--color-primary)]">
              {formatDate(post.date)}
            </span>
            <span aria-hidden="true">•</span>
            <span className="muted">{readingTime}</span>
          </div>

          <h1 className="my-4 mb-4 text-[var(--color-text)] leading-[1.2] text-[clamp(1.9rem,1.4rem+1.7vw,2.6rem)]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-6 text-sm">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold"
              style={{
                background: "rgba(63, 136, 197, 0.16)",
                color: "var(--color-primary)",
              }}
            >
              {author.charAt(0)}
            </div>
            <div>
              <p className="m-0 font-semibold">{author}</p>
              <p className="m-0 muted">{role}</p>
            </div>
          </div>

          {post.cover ? (
            <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[rgba(57,62,65,0.08)] mb-7 shadow-[0_10px_26px_rgba(57,62,65,0.08)]">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full max-h-[420px] object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div
              className="placeholder-media mb-7 h-[320px]"
              aria-hidden="true"
            />
          )}

          <div className="flex gap-3 flex-wrap mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="[&>p]:m-0 [&>p+p]:mt-6 leading-[1.7] text-[1.02rem]">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {post.keyTakeaways?.length ? (
            <div className="mt-8 p-5 rounded-[var(--radius-md)] border border-[rgba(57,62,65,0.1)] bg-white shadow-[0_10px_24px_rgba(57,62,65,0.06)]">
              <h3 className="m-0 mb-3 text-[1.1rem] text-[var(--color-text)]">
                Claves rapidas
              </h3>
              <ul className="list-reset m-0">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex gap-2 mb-2 last:mb-0">
                    <span aria-hidden="true">•</span>
                    <span className="muted">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      </div>
    </article>
  );
}

export default BlogPost;
