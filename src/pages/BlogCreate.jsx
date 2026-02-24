import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { addPost, getPosts } from "../data/posts";
import usePageMeta from "../routes/usePageMeta";

const todayIso = new Date().toISOString().slice(0, 10);

const initialValues = {
  title: "",
  excerpt: "",
  date: todayIso,
  tags: "",
  content: "",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseTags = (value) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const parseContent = (value) =>
  value
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const buildUniqueSlug = (baseSlug, existingSlugs) => {
  if (!existingSlugs.includes(baseSlug)) return baseSlug;

  let counter = 2;
  let nextSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(nextSlug)) {
    counter += 1;
    nextSlug = `${baseSlug}-${counter}`;
  }

  return nextSlug;
};

const validate = (values) => {
  const errors = {};

  if (!values.title.trim()) errors.title = "El titulo es obligatorio.";
  if (!values.excerpt.trim()) errors.excerpt = "El resumen es obligatorio.";
  if (!values.date.trim()) errors.date = "La fecha es obligatoria.";
  if (!values.content.trim()) errors.content = "El contenido es obligatorio.";

  return errors;
};

function BlogCreate() {
  usePageMeta("Publicar nuevo blog", "Publica un nuevo blog.");

  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const tags = useMemo(() => parseTags(values.tags), [values.tags]);
  const content = useMemo(() => parseContent(values.content), [values.content]);

  const previewTitle = values.title.trim() || "Titulo del articulo";
  const previewExcerpt =
    values.excerpt.trim() ||
    "Resume la idea principal en una o dos frases claras.";
  const previewDate = values.date || todayIso;
  const previewTags = tags.length > 0 ? tags : ["Estrategia", "Producto"];
  const previewContent =
    content.length > 0
      ? content.slice(0, 3)
      : [
          "Escribe un parrafo para ver como se vera el contenido.",
          "Puedes separar ideas con saltos de linea para crear secciones.",
        ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validate(values);
    const baseSlug = slugify(values.title);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    const existingSlugs = getPosts().map((post) => post.slug);
    const uniqueSlug = buildUniqueSlug(baseSlug, existingSlugs);
    const parsedContent = parseContent(values.content);

    const newPost = {
      id: `post-${Date.now()}`,
      slug: uniqueSlug,
      title: values.title.trim(),
      excerpt: values.excerpt.trim(),
      date: values.date,
      tags: tags.length > 0 ? tags : ["General"],
      content: parsedContent.length > 0 ? parsedContent : [values.content],
    };

    addPost(newPost);
    navigate(`/blog/${uniqueSlug}`);
  };

  return (
    <section className="page-section bg-gradient-to-br from-[rgba(63,136,197,0.12)] via-[rgba(246,247,235,0.6)] to-[rgba(233,79,55,0.08)]">
      <div className="container">
        <Link className="link-inline" to="/blog">
          Volver al blog
        </Link>

        <div className="mt-6 max-w-[720px]">
          <h1 className="m-0 text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-[1.15]">
            Publicar nuevo blog
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <Card as="form" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-3">
              <label htmlFor="title" className="font-bold">
                Titulo
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                aria-invalid={Boolean(errors.title)}
                required
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
                placeholder="Arquitectura para producto escalable"
              />
              {errors.title && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="excerpt" className="font-bold">
                Resumen
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={values.excerpt}
                onChange={handleChange}
                aria-invalid={Boolean(errors.excerpt)}
                required
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
                placeholder="Una introduccion breve sobre la idea principal."
              />
              {errors.excerpt && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.excerpt}
                </span>
              )}
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="date" className="font-bold">
                Fecha
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                aria-invalid={Boolean(errors.date)}
                required
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
              />
              {errors.date && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="tags" className="font-bold">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={values.tags}
                onChange={handleChange}
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
                placeholder="Producto, UX, React"
              />
              <span className="muted text-[0.85rem]">
                Separa etiquetas con comas.
              </span>
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="content" className="font-bold">
                Contenido
              </label>
              <textarea
                id="content"
                name="content"
                rows="6"
                value={values.content}
                onChange={handleChange}
                aria-invalid={Boolean(errors.content)}
                required
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
                placeholder="Desarrolla la idea en varios parrafos..."
              />
              <span className="muted text-[0.85rem]">
                Usa saltos de linea para separar parrafos.
              </span>
              {errors.content && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.content}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="submit" variant="accent" size="md">
                Publicar articulo
              </Button>
              <Button as={Link} to="/blog" variant="secondary" size="md">
                Cancelar
              </Button>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(63,136,197,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(68,187,164,0.2),transparent_60%)]"
              aria-hidden="true"
            />
            <div className="relative">
              <Badge variant="primary">Vista previa</Badge>
              <p className="mt-5 m-0 text-[var(--color-primary)] font-bold text-[0.85rem]">
                {previewDate}
              </p>
              <h2 className="my-4 mb-3 text-[clamp(1.4rem,1.1rem+1.3vw,2rem)] leading-[1.2]">
                {previewTitle}
              </h2>
              <p className="muted">{previewExcerpt}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {previewTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 text-[0.95rem] text-[rgba(57,62,65,0.86)] [&>p+p]:mt-4">
                {previewContent.map((paragraph) => (
                  <p key={paragraph} className="m-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default BlogCreate;
