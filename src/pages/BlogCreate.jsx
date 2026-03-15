import { useMemo, useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionLabel from "../components/ui/SectionLabel";
import { addPost, getPosts } from "../data/posts";
import { uploadImage } from "../api";
import usePageMeta from "../routes/usePageMeta";
import useInView from "../hooks/useInView";
import "./BlogContent.css";

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
  const [existingPosts, setExistingPosts] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showImageSizeModal, setShowImageSizeModal] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState(null);
  const [imageWidth, setImageWidth] = useState(600);
  const [imageHeight, setImageHeight] = useState(350);
  const [isImageDragging, setIsImageDragging] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getPosts();
        setExistingPosts(posts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
    loadPosts();
  }, []);

  // Editor con Tiptap
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        Image: false, // Desactivar la imagen default de StarterKit
      }),
      ImageExtension.configure({
        allowBase64: true,
        inline: false, // IMPORTANTE: La imagen es BLOQUE, no inline
        HTMLAttributes: {
          class: 'editor-image',
        },
      }).extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: null,
              parseHTML: element => element.dataset.width || null,
              renderHTML: attributes => {
                if (!attributes.width) return {};
                const h = attributes.height || attributes.width;
                return {
                  'data-width': attributes.width,
                  'data-height': h,
                  style: `width: ${attributes.width}px !important; height: ${h}px !important; max-width: none !important; object-fit: fill;`,
                };
              },
            },
            height: {
              default: null,
              parseHTML: element => element.dataset.height || null,
              renderHTML: attributes => {
                return {};
              },
            },
          };
        },
      }),
    ],
    content: values.content,
    onUpdate: ({ editor }) => {
      setValues((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  const tags = useMemo(() => parseTags(values.tags), [values.tags]);

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    setUploadError(null);
    setCoverFile(file);

    // Crear preview local
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    processFile(file);
  };

  // Manejador custom para inserción de imágenes en el editor
  const handleImageInsert = () => {
    setShowImageSizeModal(true);
    setPendingImageUrl(null);
    setImageWidth(600);
    setImageHeight(350);
  };

  const handleImageFileSelected = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPendingImageUrl(e.target.result);
      
      // Obtener dimensiones de la imagen
      const img = new Image();
      img.onload = () => {
        setImageWidth(img.naturalWidth);
        setImageHeight(img.naturalHeight);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsImageDragging(true);
  };

  const handleImageDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsImageDragging(false);
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsImageDragging(false);

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    handleImageFileSelected(file);
  };

  const handleConfirmImage = () => {
    if (editor && pendingImageUrl) {
      // Validar que los valores sean al menos 50 (ancho) y 350 (alto)
      const finalWidth = Math.max(50, imageWidth || 50);
      const finalHeight = Math.max(350, imageHeight || 350);

      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: {
            src: pendingImageUrl,
            alt: 'Imagen del artículo',
            width: finalWidth,
            height: finalHeight,
          },
        })
        .run();

      setShowImageSizeModal(false);
      setPendingImageUrl(null);
    }
  };

  const previewTitle = values.title.trim() || "Titulo del articulo";
  const previewExcerpt =
    values.excerpt.trim() ||
    "Resume la idea principal en una o dos frases claras.";
  const previewDate = values.date || todayIso;
  const previewTags = tags.length > 0 ? tags : ["Estrategia", "Producto"];
  const previewCover = coverPreview;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
  };

  // Procesar y subir imágenes base64 del contenido
  const processContentImages = async (htmlContent) => {
    let processedContent = htmlContent;
    const base64ImageRegex = /src="(data:image[^"]+)"/g;
    const base64Matches = htmlContent.match(base64ImageRegex);

    if (base64Matches) {
      for (const match of base64Matches) {
        const base64Src = match.match(/src="([^"]+)"/)[1];
        
        try {
          // Convertir data URL a blob
          const response = await fetch(base64Src);
          const blob = await response.blob();
          const file = new File([blob], `image-${Date.now()}.png`, { type: 'image/png' });
          
          // Subir al servidor
          const imageUrl = await uploadImage(file);
          
          // Reemplazar en el contenido
          processedContent = processedContent.replace(base64Src, imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new Error('Error al procesar una imagen del contenido');
        }
      }
    }

    return processedContent;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate(values);
    const baseSlug = slugify(values.title);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;
    if (!coverFile) {
      setErrors((prev) => ({ ...prev, cover: "La imagen de portada es obligatoria." }));
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);

    try {
      let coverUrl = "";

      // Subir imagen de portada
      const formData = new FormData();
      formData.append('image', coverFile);
      const uploadRes = await fetch(`${import.meta.env.VITE_UPLOAD_URL || 'http://localhost:3001'}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('Error al subir la imagen');
      }

      const uploadBody = await uploadRes.json();
      coverUrl = uploadBody.url;

      // Procesar imágenes del contenido (convertir base64 a URLs definitivas)
      const processedContent = await processContentImages(values.content);

      const existingSlugs = existingPosts.map((post) => post.slug);
      const uniqueSlug = buildUniqueSlug(baseSlug, existingSlugs);

      const newPost = {
        id: `post-${Date.now()}`,
        slug: uniqueSlug,
        title: values.title.trim(),
        excerpt: values.excerpt.trim(),
        date: values.date,
        tags: tags.length > 0 ? tags : ["General"],
        cover: coverUrl,
        content: processedContent, // Contenido con imágenes subidas
        author: "Equipo Nexus", // Default author
        role: "Editorial",
        category: tags.length > 0 ? tags[0] : "Blog",
      };

      await addPost(newPost);
      navigate(`/blog/${uniqueSlug}`);
    } catch (err) {
      console.error('Error:', err);
      setUploadError('Error al publicar el artículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section bg-gradient-to-br from-[rgba(63,136,197,0.12)] via-[rgba(246,247,235,0.6)] to-[rgba(233,79,55,0.08)]">
      <div className="container">
        <RouterLink className="link-inline" to="/blog">
          ← Volver al blog
        </RouterLink>

        <div className="mt-6 max-w-[900px]">
          <h1 className="m-0 text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-[1.15]">
            Publicar nuevo artículo
          </h1>
          <p className="text-[rgba(57,62,65,0.7)] mt-2">Comparte tu conocimiento con la comunidad</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-10 mb-10 max-w-[1000px] mx-auto">
          {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold">Información Básica</h2>
            </div>

            <Card className="p-6 space-y-5">
              <div className="grid gap-3">
                <label htmlFor="title" className="font-semibold text-[var(--color-heading)]">
                  Título del artículo *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.title)}
                  required
                  className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-4 py-2.5 bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(63,136,197,0.2)]"
                  placeholder="Arquitectura para productos escalables"
                />
                {errors.title && (
                  <span className="text-[#9b2915] text-[0.85rem] flex items-center gap-1">
                    ⚠️ {errors.title}
                  </span>
                )}
                <p className="text-[0.85rem] text-[rgba(57,62,65,0.6)]">
                  Se crea automáticamente un slug para la URL
                </p>
              </div>

              <div className="grid gap-3">
                <label htmlFor="excerpt" className="font-semibold text-[var(--color-heading)]">
                  Resumen (descripción breve) *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="3"
                  value={values.excerpt}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.excerpt)}
                  required
                  className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-4 py-2.5 bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(63,136,197,0.2)]"
                  placeholder="Una breve introducción que resuma la idea principal del artículo"
                />
                {errors.excerpt && (
                  <span className="text-[#9b2915] text-[0.85rem] flex items-center gap-1">
                    ⚠️ {errors.excerpt}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <label htmlFor="date" className="font-semibold text-[var(--color-heading)]">
                    Fecha de publicación *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.date)}
                    required
                    className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-4 py-2.5 bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(63,136,197,0.2)]"
                  />
                  {errors.date && (
                    <span className="text-[#9b2915] text-[0.85rem] flex items-center gap-1">
                      ⚠️ {errors.date}
                    </span>
                  )}
                </div>

                <div className="grid gap-3">
                  <label htmlFor="tags" className="font-semibold text-[var(--color-heading)]">
                    Etiquetas (tags)
                  </label>
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    value={values.tags}
                    onChange={handleChange}
                    className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-4 py-2.5 bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(63,136,197,0.2)]"
                    placeholder="producto, diseño, tecnología"
                  />
                  <p className="text-[0.85rem] text-[rgba(57,62,65,0.6)]">
                    Separa las etiquetas con comas
                  </p>
                </div>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </section>

          {/* SECCIÓN 2: IMAGEN DE PORTADA */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold">Imagen de Portada</h2>
            </div>

            <Card className="p-6">
              <div
                className={`relative border-2 border-dashed rounded-[var(--radius-md)] p-8 text-center transition-all ${
                  isDragging
                    ? 'border-[var(--color-primary)] bg-[rgba(63,136,197,0.15)] scale-[1.01]'
                    : coverPreview
                    ? 'border-[rgba(57,62,65,0.26)] bg-white'
                    : 'border-[rgba(57,62,65,0.26)] bg-[rgba(57,62,65,0.02)] hover:border-[var(--color-primary)] hover:bg-[rgba(63,136,197,0.08)]'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      alt="Preview de portada"
                      className="w-full max-h-[300px] object-cover rounded-[var(--radius-md)] mb-4 shadow-lg"
                    />
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-semibold text-white bg-[var(--color-primary)] rounded-[var(--radius-sm)] hover:opacity-90 transition"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        📁 Cambiar imagen
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-semibold text-[#9b2915] bg-[#fff3e0] rounded-[var(--radius-sm)] hover:opacity-90 transition"
                        onClick={() => {
                          setCoverFile(null);
                          setCoverPreview(null);
                        }}
                      >
                        ✕ Eliminar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="text-4xl mb-3">🖼️</div>
                    <p className="font-semibold text-[rgba(57,62,65,0.9)] text-lg">
                      Arrastra tu imagen aquí
                    </p>
                    <p className="text-[0.95rem] text-[rgba(57,62,65,0.7)] mt-2">
                      o{' '}
                      <button
                        type="button"
                        className="text-[var(--color-primary)] font-semibold hover:underline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        selecciona un archivo
                      </button>
                    </p>
                    <p className="text-[0.85rem] text-[rgba(57,62,65,0.6)] mt-3">
                      JPG, PNG o WebP • Máx 5MB • Mínimo 1200x630px
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {errors.cover && (
                <span className="text-[#9b2915] text-[0.85rem] flex items-center gap-1 mt-3">
                  ⚠️ {errors.cover}
                </span>
              )}
              {uploadError && (
                <span className="text-[#9b2915] text-[0.85rem] flex items-center gap-1 mt-3">
                  ⚠️ {uploadError}
                </span>
              )}
            </Card>
          </section>

          {/* SECCIÓN 3: CONTENIDO */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold">Contenido del Artículo</h2>
            </div>

            <Card className="p-6">
              <div className="grid gap-4">
                {/* TOOLBAR */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[rgba(57,62,65,0.8)]">Editor de texto</p>
                  <div className="flex flex-wrap gap-1 p-3 bg-[rgba(57,62,65,0.04)] rounded-[var(--radius-sm)] border border-[rgba(57,62,65,0.15)]">
                    {/* Formato de texto */}
                    <div className="flex gap-1 border-r border-[rgba(57,62,65,0.2)] pr-2 mr-1">
                      <button
                        type="button"
                        title="Negrita (Ctrl+B)"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold transition ${
                          editor?.isActive('bold')
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        B
                      </button>
                      <button
                        type="button"
                        title="Itálica (Ctrl+I)"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold italic transition ${
                          editor?.isActive('italic')
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        I
                      </button>
                      <button
                        type="button"
                        title="Subrayado"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold underline transition ${
                          editor?.isActive('underline')
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        U
                      </button>
                    </div>

                    {/* Encabezados */}
                    <div className="flex gap-1 border-r border-[rgba(57,62,65,0.2)] pr-2 mr-1">
                      <button
                        type="button"
                        title="Encabezado 1"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold transition ${
                          editor?.isActive('heading', { level: 1 })
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        H1
                      </button>
                      <button
                        type="button"
                        title="Encabezado 2"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold transition ${
                          editor?.isActive('heading', { level: 2 })
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        title="Encabezado 3"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold transition ${
                          editor?.isActive('heading', { level: 3 })
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        H3
                      </button>
                    </div>

                    {/* Listas */}
                    <div className="flex gap-1 border-r border-[rgba(57,62,65,0.2)] pr-2 mr-1">
                      <button
                        type="button"
                        title="Lista con viñetas"
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold transition ${
                          editor?.isActive('bulletList')
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        •
                      </button>
                      <button
                        type="button"
                        title="Lista numerada"
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={`w-9 h-9 rounded flex items-center justify-center text-sm font-bold transition ${
                          editor?.isActive('orderedList')
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)]'
                        }`}
                      >
                        1.
                      </button>
                    </div>

                    {/* Inserción */}
                    <div className="flex gap-1 border-r border-[rgba(57,62,65,0.2)] pr-2 mr-1">
                      <button
                        type="button"
                        title="Insertar imagen"
                        onClick={handleImageInsert}
                        disabled={isUploadingImage}
                        className="w-9 h-9 rounded flex items-center justify-center text-sm font-bold bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[rgba(63,136,197,0.1)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploadingImage ? '⏳' : '🖼️'}
                      </button>
                    </div>

                    {/* Limpiar */}
                    <button
                      type="button"
                      title="Limpiar formato"
                      onClick={() => editor?.chain().focus().clearNodes().run()}
                      className="w-9 h-9 rounded flex items-center justify-center text-sm font-bold bg-white text-[var(--color-text)] border border-[rgba(57,62,65,0.2)] hover:bg-[#ffe0e0] transition"
                    >
                      ⟲
                    </button>
                  </div>
                </div>

                {/* EDITOR */}
                <div className="grid gap-3">
                  <label className="font-semibold text-[var(--color-heading)]">
                    Contenido *
                  </label>
                  <div className="border-2 border-[rgba(34, 68, 90, 0.26)] rounded-[var(--radius-sm)] bg-white overflow-hidden transition-all focus-within:border-black focus-within:shadow-[0_2px_8px_rgba(0,0,0,0.08)]" style={{ display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
                    <EditorContent
                      editor={editor}
                      className="tiptap-wrapper"
                    />
                  </div>
                  {errors.content && (
                    <span className="text-[#9b2915] text-[0.85rem] flex items-center gap-1">
                      ⚠️ {errors.content}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </section>

          {/* BOTONES DE ACCIÓN */}
          <section className="mb-8 flex flex-wrap gap-4">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? '⏳ Publicando...' : '✓ Publicar Artículo'}
            </Button>
            <Button
              as={RouterLink}
              to="/blog"
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              ← Cancelar
            </Button>
          </section>

          {/* VISTA PREVIA - Ahora en un solo Card */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[rgba(63,136,197,0.3)] text-[var(--color-primary)] flex items-center justify-center font-bold text-sm">
                👁️
              </div>
              <h2 className="text-xl font-bold">Vista Previa</h2>
            </div>

            <Card className="relative overflow-hidden">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(63,136,197,0.2),transparent_55%),radial-gradient(circle_at_bottom,rgba(68,187,164,0.2),transparent_60%)]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="primary">Vista previa del artículo</Badge>
                  <span className="text-[0.85rem] text-[rgba(57,62,65,0.6)]">
                    Se actualiza automáticamente
                  </span>
                </div>

                <div className="grid md:grid-cols-[1fr_0.4fr] gap-6">
                  <div>
                    {previewCover ? (
                      <img
                        src={previewCover}
                        alt="Portada del articulo"
                        className="w-full h-[240px] object-cover rounded-[var(--radius-md)] mb-6 shadow-lg"
                      />
                    ) : (
                      <div
                        className="w-full h-[240px] bg-gradient-to-br from-[rgba(63,136,197,0.1)] to-[rgba(233,79,55,0.1)] rounded-[var(--radius-md)] mb-6 flex items-center justify-center text-4xl"
                        aria-hidden="true"
                      >
                        📸
                      </div>
                    )}
                    <p className="text-[var(--color-primary)] font-bold text-[0.85rem] mb-2">
                      {previewDate}
                    </p>
                    <h3 className="text-2xl font-bold mb-3 leading-tight">
                      {previewTitle}
                    </h3>
                    <p className="text-[rgba(57,62,65,0.75)] mb-6 leading-relaxed">
                      {previewExcerpt}
                    </p>

                    {values.content && (
                      <div className="mt-6 pt-6 border-t border-[rgba(57,62,65,0.15)]">
                        <p className="text-sm font-semibold text-[rgba(57,62,65,0.7)] mb-3">
                          Adelanto del contenido:
                        </p>
                        <div className="blog-content text-[0.95rem] text-[rgba(57,62,65,0.75)] line-clamp-4">
                          <div dangerouslySetInnerHTML={{ __html: values.content.substring(0, 300) + '...' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:border-l md:border-[rgba(57,62,65,0.15)] md:pl-6">
                    <p className="text-sm font-semibold text-[rgba(57,62,65,0.8)] mb-3">
                      Etiquetas
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {previewTags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="p-3 bg-[rgba(63,136,197,0.05)] rounded-[var(--radius-sm)] border border-[rgba(63,136,197,0.2)]">
                      <p className="text-[0.85rem] text-[rgba(57,62,65,0.7)]">
                        <span className="font-semibold text-[var(--color-primary)]">💡 Consejo:</span> Escribe un título atractivo y un resumen claro para mejorar el engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </form>

        {/* MODAL TAMAÑO DE IMAGEN */}
        {showImageSizeModal && (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h3 className="text-2xl font-bold mb-2">Insertar imagen</h3>
              <p className="text-[rgba(57,62,65,0.7)] text-sm mb-6">
                Sube o arrastra una imagen y ajusta el tamaño
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LADO IZQUIERDO - Upload */}
                <div className="md:col-span-1">
                  <label className="font-semibold text-[var(--color-heading)] mb-3 block">
                    Selecciona la imagen
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-[var(--radius-md)] p-6 text-center transition-all ${
                      isImageDragging
                        ? 'border-[var(--color-primary)] bg-[rgba(63,136,197,0.15)]'
                        : pendingImageUrl
                        ? 'border-[rgba(57,62,65,0.26)] bg-white'
                        : 'border-[rgba(57,62,65,0.26)] bg-[rgba(57,62,65,0.02)] hover:border-[var(--color-primary)]'
                    }`}
                    onDragOver={handleImageDragOver}
                    onDragLeave={handleImageDragLeave}
                    onDrop={handleImageDrop}
                  >
                    {pendingImageUrl ? (
                      <div>
                        <p className="text-sm text-[rgba(57,62,65,0.6)] mb-3">Imagen seleccionada ✓</p>
                        <button
                          type="button"
                          className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageFileSelected(file);
                            };
                            input.click();
                          }}
                        >
                          Cambiar imagen
                        </button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <div className="text-3xl mb-2">🖼️</div>
                        <p className="font-semibold text-[rgba(57,62,65,0.9)] text-sm">
                          Arrastra aquí
                        </p>
                        <p className="text-xs text-[rgba(57,62,65,0.6)] mt-2">
                          o{' '}
                          <button
                            type="button"
                            className="text-[var(--color-primary)] font-semibold hover:underline"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageFileSelected(file);
                              };
                              input.click();
                            }}
                          >
                            selecciona
                          </button>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CENTRO - Preview Grande */}
                <div className="md:col-span-2">
                  <label className="text-sm text-[rgba(57,62,65,0.7)] block mb-3 font-semibold">
                    Preview
                  </label>
                  <div className="border border-[rgba(57,62,65,0.15)] rounded-[var(--radius-sm)] p-4 bg-[rgba(57,62,65,0.02)] flex items-center justify-center overflow-auto" style={{ minHeight: '300px', maxHeight: '400px' }}>
                    {pendingImageUrl ? (
                      <img
                        src={pendingImageUrl}
                        alt="Preview"
                        style={{
                          width: `${imageWidth}px`,
                          height: `${imageHeight}px`,
                          objectFit: 'fill',
                        }}
                        className="rounded-[var(--radius-sm)]"
                      />
                    ) : (
                      <p className="text-[rgba(57,62,65,0.6)] text-sm">
                        Sube una imagen para ver el preview
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CONTROLES DE TAMAÑO */}
              {pendingImageUrl && (
                <div className="mt-6 pt-6 border-t border-[rgba(57,62,65,0.15)]">
                  <label className="font-semibold text-[var(--color-heading)] mb-4 block">
                    Dimensiones
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="img-width" className="text-sm text-[rgba(57,62,65,0.7)] block mb-2">
                        Ancho (px) - Mínimo 50
                      </label>
                      <input
                        id="img-width"
                        type="number"
                        value={imageWidth}
                        onChange={(e) => {
                          setImageWidth(parseInt(e.target.value) || '');
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value) || 50;
                          setImageWidth(Math.max(50, val));
                        }}
                        className="w-full border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-2 focus:outline-none focus:border-[var(--color-primary)]"
                      />
                      <p className="text-xs text-[rgba(57,62,65,0.6)] mt-1">Tamaño actual: {imageWidth}px</p>
                    </div>
                    <div>
                      <label htmlFor="img-height" className="text-sm text-[rgba(57,62,65,0.7)] block mb-2">
                        Alto (px) - Mínimo 350
                      </label>
                      <input
                        id="img-height"
                        type="number"
                        value={imageHeight}
                        onChange={(e) => {
                          setImageHeight(parseInt(e.target.value) || '');
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value) || 350;
                          setImageHeight(Math.max(350, val));
                        }}
                        className="w-full border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-2 focus:outline-none focus:border-[var(--color-primary)]"
                      />
                      <p className="text-xs text-[rgba(57,62,65,0.6)] mt-1">Tamaño actual: {imageHeight}px</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-[rgba(63,136,197,0.05)] rounded-[var(--radius-sm)] border border-[rgba(63,136,197,0.2)]">
                    <p className="text-[0.85rem] text-[rgba(57,62,65,0.7)]">
                      <span className="font-semibold">Tamaño final:</span> {imageWidth} × {imageHeight} px
                    </p>
                  </div>
                </div>
              )}

              {/* BOTONES */}
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="accent"
                  size="md"
                  disabled={!pendingImageUrl}
                  onClick={handleConfirmImage}
                >
                  ✓ Insertar imagen
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setShowImageSizeModal(false);
                    setPendingImageUrl(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogCreate;
