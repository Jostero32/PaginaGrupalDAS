import { useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaXTwitter, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import usePageMeta from "../routes/usePageMeta";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "El nombre es obligatorio.";
  if (!values.email.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Ingresa un correo valido.";
  }
  if (!values.subject.trim()) errors.subject = "El asunto es obligatorio.";
  if (!values.message.trim()) errors.message = "El mensaje es obligatorio.";

  return errors;
}

function Contact() {
  usePageMeta(
    "Contactos",
    "Formulario de contacto de ejemplo con validacion en cliente e informacion ficticia.",
  );

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
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          title="Contactos"
          subtitle="Comparte el contexto de tu necesidad y te responderemos con una propuesta ficticia."
        />

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8">
          <Card as="form" onSubmit={handleSubmit} noValidate>
            <h2 className="text-xl font-bold text-[#1f2937] mb-6">Envíanos tu mensaje</h2>
            
            <div className="grid gap-4">
              <div>
                <label htmlFor="name" className="block text-[0.95rem] font-semibold text-[#374151] mb-2">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  required
                  className="w-full font-[inherit] border-2 border-[#e5e7eb] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[rgba(15,118,110,0.1)] transition-all"
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <span className="block text-[#dc2626] text-[0.85rem] font-medium mt-2">
                    ✓ {errors.name}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-[0.95rem] font-semibold text-[#374151] mb-2">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  required
                  className="w-full font-[inherit] border-2 border-[#e5e7eb] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[rgba(15,118,110,0.1)] transition-all"
                  placeholder="tu@correo.com"
                />
                {errors.email && (
                  <span className="block text-[#dc2626] text-[0.85rem] font-medium mt-2">
                    ✓ {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-[0.95rem] font-semibold text-[#374151] mb-2">
                  Asunto
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  required
                  className="w-full font-[inherit] border-2 border-[#e5e7eb] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[rgba(15,118,110,0.1)] transition-all"
                  placeholder="Tema de tu consulta"
                />
                {errors.subject && (
                  <span className="block text-[#dc2626] text-[0.85rem] font-medium mt-2">
                    ✓ {errors.subject}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-[0.95rem] font-semibold text-[#374151] mb-2">
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
                  className="w-full font-[inherit] border-2 border-[#e5e7eb] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[rgba(15,118,110,0.1)] transition-all resize-none"
                  placeholder="Cuéntanos con más detalle tu consulta..."
                />
                {errors.message && (
                  <span className="block text-[#dc2626] text-[0.85rem] font-medium mt-2">
                    ✓ {errors.message}
                  </span>
                )}
              </div>
            </div>

            <Button type="submit" variant="accent" size="md" className="w-full mt-6 bg-[#0f766e] hover:bg-[#065a55] text-white font-bold py-3 rounded-lg transition-all">
              Enviar mensaje
            </Button>

            {isSubmitted && (
              <div
                className="mt-6 p-4 rounded-lg bg-[#dcfce7] border-2 border-[#22c55e] text-[#166534] font-bold flex items-center gap-3"
                role="status"
              >
                <span className="text-2xl">✅</span>
                <span>¡Mensaje enviado! Te responderemos pronto.</span>
              </div>
            )}
          </Card>

          <div className="grid gap-6">
            <Card>
              <div className="mb-6 pb-6 border-b border-[rgba(57,62,65,0.1)]">
                <h3 className="font-bold text-2xl text-[#1f2937]">ARCM Solutions</h3>
                <p className="text-[0.95rem] text-[rgba(57,62,65,0.6)] mt-1">Soluciones integrales de software</p>
              </div>
              
              <div className="grid gap-5">
                <div className="flex gap-3">
                  <span className="text-[#0f766e] pt-1"><FaEnvelope size={20} /></span>
                  <div>
                    <p className="text-[0.75rem] text-[rgba(57,62,65,0.6)] font-semibold uppercase tracking-wide mb-1">Correo Electrónico</p>
                    <a href="mailto:contacto@arcmsolutions.com" className="text-[#0f766e] hover:text-[#1f6f60] font-semibold text-[0.95rem] transition-colors">
                      contacto@arcmsolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-[#0f766e] pt-1"><FaLocationDot size={20} /></span>
                  <div>
                    <p className="text-[0.75rem] text-[rgba(57,62,65,0.6)] font-semibold uppercase tracking-wide mb-1">Ubicación</p>
                    <p className="text-[0.95rem] text-[#374151] font-medium">Calle Principal 456</p>
                    <p className="text-[0.95rem] text-[rgba(57,62,65,0.7)]">Ambato, Ecuador</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-[#0f766e] pt-1"><FaClock size={20} /></span>
                  <div>
                    <p className="text-[0.75rem] text-[rgba(57,62,65,0.6)] font-semibold uppercase tracking-wide mb-1">Horario de Atención</p>
                    <p className="text-[0.95rem] text-[#374151] font-medium">Lun - Vie: 08:00 - 17:00</p>
                    <p className="text-[0.95rem] text-[rgba(57,62,65,0.7)]">Sab - Dom: atendemos todo el día</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-[0.75rem] text-[rgba(57,62,65,0.6)] font-semibold uppercase tracking-wide mb-4">Síguenos en nuestras redes sociales</p>
                  <ul className="list-reset flex gap-4">
                    <li>
                      <a
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f3f4f6] hover:bg-[#1f2937] hover:text-white transition-all duration-200"
                        href="https://github.com/arcmsolutions"
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub"
                      >
                        <FaGithub size={32} />
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f3f4f6] hover:bg-[#0a66c2] hover:text-white transition-all duration-200"
                        href="https://linkedin.com/company/arcmsolutions"
                        target="_blank"
                        rel="noreferrer"
                        title="LinkedIn"
                      >
                        <FaLinkedin size={32} />
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f3f4f6] hover:bg-[#1877f2] hover:text-white transition-all duration-200"
                        href="https://facebook.com/arcmsolutions"
                        target="_blank"
                        rel="noreferrer"
                        title="Facebook"
                      >
                        <FaFacebook size={32} />
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f3f4f6] hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#fa7e1e] hover:to-[#d92e7f] hover:text-white transition-all duration-200"
                        href="https://instagram.com/arcmsolutions"
                        target="_blank"
                        rel="noreferrer"
                        title="Instagram"
                      >
                        <FaInstagram size={32} />
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f3f4f6] hover:bg-[#1f2937] hover:text-white transition-all duration-200"
                        href="https://x.com/arcmsolutions"
                        target="_blank"
                        rel="noreferrer"
                        title="X (Twitter)"
                      >
                        <FaXTwitter size={32} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
