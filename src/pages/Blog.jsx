import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";
import { getPosts } from "../data/posts";
import usePageMeta from "../routes/usePageMeta";
import useInView from "../hooks/useInView";

/* Animated wrapper */
function AnimatedItem({ children, index = 0, style, className = '' }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
      }}
    >
      {children}
    </div>
  );
}

function Blog() {
  usePageMeta("Blog", "Blog con publicaciones de ejemplo y detalle por slug.");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const tagCount = new Set(sortedPosts.flatMap((post) => post.tags || [])).size;
  const paragraphCount = sortedPosts.reduce((total, post) => total + (post.content?.length || 0), 0);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="hero-section"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: '6rem 0 4rem',
        }}
      >
        {/* Decorative blobs */}
        <div className="decor-blob" style={{
          top: '10%', left: '-6%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(63,136,197,0.15) 0%, transparent 70%)',
        }} />
        <div className="decor-blob" style={{
          bottom: '10%', right: '-5%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(233,79,55,0.12) 0%, transparent 70%)',
        }} />

        <div className="decor-ring" style={{
          top: '20%', right: '10%',
          width: '160px', height: '160px',
          border: '1.5px dashed rgba(68,187,164,0.2)',
        }} />

        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{ maxWidth: '56rem' }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem',
                fontWeight: 700, marginBottom: '1.5rem',
                background: 'rgba(63,136,197,0.15)', border: '1px solid rgba(63,136,197,0.3)', color: '#3F88C5',
              }}
            >
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Blog</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 2rem + 3vw, 4.5rem)',
              letterSpacing: '-2px', color: 'var(--color-hero-text)', lineHeight: 1.1, marginBottom: '1.5rem',
            }}>
              Nuestros{' '}
              <span style={{ color: 'var(--color-primary)' }}>Blogs</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--color-hero-muted)', maxWidth: 600, lineHeight: 1.7, marginBottom: '2rem' }}>
              Ideas, aprendizajes y notas técnicas del equipo, con ejemplos claros y listos para compartir.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <Button as={Link} to="/blog/nuevo" variant="accent" size="lg">
                Publicar nuevo blog
              </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '22rem' }}>
              {[
                { value: sortedPosts.length, label: 'Artículos', color: '#44BBA4' },
                { value: tagCount, label: 'Etiquetas', color: '#3F88C5' },
                { value: paragraphCount, label: 'Párrafos', color: '#E94F37' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-hero-muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ARTICLES ════════════════════════════════════════════ */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          <AnimatedItem>
            <div className="section-header">
              <SectionLabel text="Artículos" color="#3F88C5" />
              <h2>Publicaciones <span className="highlight">recientes</span></h2>
              <p>Explora nuestras publicaciones más recientes.</p>
            </div>
          </AnimatedItem>

          {loading ? (
            <div className="modern-card" style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                Cargando artículos...
              </p>
            </div>
          ) : sortedPosts.length === 0 ? (
            <div className="modern-card" style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                Aún no hay artículos publicados. Crea el primero.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {sortedPosts.map((post, i) => (
                <AnimatedItem key={post.id} index={i + 1}>
                  <div className="modern-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {post.cover ? (
                      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', marginBottom: '0.75rem' }}>
                        <img
                          src={post.cover}
                          alt={post.title}
                          style={{ width: '100%', height: 180, objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(57,62,65,0.6), transparent)' }} />
                      </div>
                    ) : (
                      <div
                        style={{
                          minHeight: 150, borderRadius: '12px', marginBottom: '0.75rem',
                          background: 'linear-gradient(135deg, rgba(63,136,197,0.2), rgba(68,187,164,0.2))',
                          border: '1px solid var(--color-border)',
                        }}
                        aria-hidden
                      />
                    )}
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                      {post.date}
                    </p>
                    <h3 style={{ color: 'var(--color-heading)', fontSize: '1.1rem', margin: '0.25rem 0', fontWeight: 700 }}>{post.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{post.excerpt}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      style={{
                        color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none',
                        marginTop: 'auto', transition: 'color 0.2s',
                      }}
                    >
                      Leer artículo →
                    </Link>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
