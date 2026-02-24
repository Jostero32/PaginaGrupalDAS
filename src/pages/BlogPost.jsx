import { Link, useParams } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import usePageMeta from '../routes/usePageMeta';
import { posts } from '../data/posts';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  usePageMeta(
    post ? post.title : 'Post no encontrado',
    post ? post.excerpt : 'El articulo solicitado no existe en el blog.'
  );

  if (!post) {
    return (
      <section className='page-section'>
        <div className='container blog-post-empty'>
          <h1>Articulo no encontrado</h1>
          <p className='muted'>El slug solicitado no existe.</p>
          <Link className='link-inline' to='/blog'>
            Volver al blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className='page-section'>
      <div className='container blog-post'>
        <Link className='link-inline' to='/blog'>
          Volver al blog
        </Link>

        <p className='blog-post-date'>{post.date}</p>
        <h1>{post.title}</h1>

        <div className='blog-post-tags'>
          {post.tags.map((tag) => (
            <Badge key={tag} variant='secondary'>
              {tag}
            </Badge>
          ))}
        </div>

        <div className='blog-post-content'>
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
