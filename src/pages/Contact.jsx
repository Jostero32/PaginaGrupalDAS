import { useState } from "react";
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

        <div className="grid grid-cols-1">
          <Card as="form" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-3">
              <label htmlFor="name" className="font-bold">
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
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
              />
              {errors.name && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                required
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
              />
              {errors.email && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="subject" className="font-bold">
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
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
              />
              {errors.subject && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="grid gap-3 mt-6">
              <label htmlFor="message" className="font-bold">
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
                className="w-full font-[inherit] border border-[rgba(57,62,65,0.26)] rounded-[var(--radius-sm)] px-3 py-3 bg-white"
              />
              {errors.message && (
                <span className="text-[#9b2915] text-[0.85rem]">
                  {errors.message}
                </span>
              )}
            </div>

            <Button type="submit" variant="accent" size="md">
              Enviar mensaje
            </Button>

            {isSubmitted && (
              <p
                className="mt-6 p-4 rounded-[var(--radius-sm)] bg-[rgba(68,187,164,0.2)] text-[#1f6f60] font-bold"
                role="status"
              >
                Mensaje enviado correctamente. Te responderemos pronto.
              </p>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;
