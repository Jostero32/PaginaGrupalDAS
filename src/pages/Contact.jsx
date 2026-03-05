import { useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaXTwitter, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";
import usePageMeta from "../routes/usePageMeta";
import useInView from "../hooks/useInView";

const initialValues = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "El nombre es obligatorio.";
  if (!values.email.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Ingresa un correo válido.";
  }
  if (!values.subject.trim()) errors.subject = "El asunto es obligatorio.";
  if (!values.message.trim()) errors.message = "El mensaje es obligatorio.";
  return errors;
}

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

function Contact() {
  usePageMeta("Contactos", "Formulario de contacto de ejemplo con validación en cliente e información.");

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true);
      setValues(initialValues);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const inputStyle = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    background: 'var(--color-bg)',
    color: 'var(--color-heading)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* -- HERO ----------------------------------------------- */}
      <section
        className="hero-section"
        style={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          padding: '6rem 0 4rem',
        }}
      >
        {/* Decorative blobs */}
        <div className="decor-blob" style={{
          top: '10%', left: '-6%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(68,187,164,0.15) 0%, transparent 70%)',
        }} />
        <div className="decor-blob" style={{
          bottom: '10%', right: '-4%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(233,79,55,0.12) 0%, transparent 70%)',
        }} />

        <div className="decor-ring" style={{
          top: '25%', right: '12%',
          width: '140px', height: '140px',
          border: '1.5px dashed rgba(63,136,197,0.2)',
        }} />

        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{ maxWidth: '48rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
              letterSpacing: '-1.5px', color: 'var(--color-hero-text)', lineHeight: 1.1, marginBottom: '1rem',
            }}>
              Hablemos de tu{' '}
              <span style={{ color: 'var(--color-accent)' }}>proyecto</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-hero-muted)', maxWidth: 500, lineHeight: 1.7 }}>
              Comparte el contexto de tu necesidad y te responderemos con una propuesta.
            </p>
          </div>
        </div>
      </section>

      {/* -- FORM + INFO ---------------------------------------- */}
      <section className="page-section dot-grid-bg" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '32px', alignItems: 'start' }}>
            {/* Form Card */}
            <AnimatedItem index={1}>
              <form onSubmit={handleSubmit} noValidate className="modern-card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem' }}>
                  Envíanos tu mensaje
                </h2>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {[
                    { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre completo' },
                    { id: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'tu@correo.com' },
                    { id: 'subject', label: 'Asunto', type: 'text', placeholder: 'Tema de tu consulta' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        value={values[field.id]}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors[field.id])}
                        required
                        placeholder={field.placeholder}
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(68,187,164,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
                      />
                      {errors[field.id] && (
                        <span style={{ display: 'block', color: '#E94F37', fontSize: '0.8rem', fontWeight: 500, marginTop: '0.5rem' }}>
                          {errors[field.id]}
                        </span>
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      required
                      placeholder="Cuéntanos con más detalle tu consulta..."
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(68,187,164,0.15)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {errors.message && (
                      <span style={{ display: 'block', color: '#E94F37', fontSize: '0.8rem', fontWeight: 500, marginTop: '0.5rem' }}>
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="accent" size="md" style={{ width: '100%', marginTop: '1.5rem' }}>
                  Enviar mensaje →
                </Button>

                {isSubmitted && (
                  <div
                    style={{
                      marginTop: '1.5rem', padding: '1rem', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      background: 'rgba(68,187,164,0.15)',
                      border: '1px solid rgba(68,187,164,0.3)',
                      color: '#44BBA4', fontWeight: 600,
                      animation: 'fadeIn 0.4s ease forwards',
                    }}
                    role="status"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span>¡Mensaje enviado! Te responderemos pronto.</span>
                  </div>
                )}
              </form>
            </AnimatedItem>

            {/* Info Card */}
            <AnimatedItem index={2}>
              <div className="modern-card">
                <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-heading)', marginBottom: '0.25rem' }}>ARCM Solutions</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Soluciones integrales de software</p>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {[
                    { icon: <FaEnvelope size={18} />, label: 'Correo Electrónico', content: <a href="mailto:contacto@arcmsolutions.com" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>contacto@arcmsolutions.com</a> },
                    { icon: <FaLocationDot size={18} />, label: 'Ubicación', content: <><p style={{ color: 'var(--color-heading)', fontWeight: 500, fontSize: '0.9rem', margin: 0 }}>Calle Principal 456</p><p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Ambato, Ecuador</p></> },
                    { icon: <FaClock size={18} />, label: 'Horario de Atención', content: <><p style={{ color: 'var(--color-heading)', fontWeight: 500, fontSize: '0.9rem', margin: 0 }}>Lun - Vie: 08:00 - 17:00</p><p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Sab - Dom: atendemos todo el día</p></> },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--color-secondary)', paddingTop: 2, flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{item.label}</p>
                        {item.content}
                      </div>
                    </div>
                  ))}

                  <div style={{ paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                      Síguenos en nuestras redes sociales
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '0.75rem' }}>
                      {[
                        { Icon: FaGithub, href: '#', title: 'GitHub' },
                        { Icon: FaLinkedin, href: 'https://linkedin.com/', title: 'LinkedIn' },
                        { Icon: FaFacebook, href: 'https://facebook.com/', title: 'Facebook' },
                        { Icon: FaInstagram, href: 'https://instagram.com/', title: 'Instagram' },
                        { Icon: FaXTwitter, href: 'https://x.com/', title: 'X' },
                      ].map(({ Icon, href, title }) => (
                        <li key={title}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            title={title}
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              width: 44, height: 44, borderRadius: 12, transition: 'all 0.3s',
                              background: 'var(--color-surface)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text-muted)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--color-primary)';
                              e.currentTarget.style.color = '#fff';
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(68,187,164,0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'var(--color-surface)';
                              e.currentTarget.style.color = 'var(--color-text-muted)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <Icon size={20} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
