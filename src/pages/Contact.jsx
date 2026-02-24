import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import usePageMeta from '../routes/usePageMeta';
import './Contact.css';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'El nombre es obligatorio.';
  if (!values.email.trim()) {
    errors.email = 'El correo es obligatorio.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Ingresa un correo valido.';
  }
  if (!values.subject.trim()) errors.subject = 'El asunto es obligatorio.';
  if (!values.message.trim()) errors.message = 'El mensaje es obligatorio.';

  return errors;
}

function Contact() {
  usePageMeta(
    'Contactos',
    'Formulario de contacto de ejemplo con validacion en cliente e informacion ficticia.'
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
    }
  };

  return (
    <section className='page-section'>
      <div className='container'>
        <SectionTitle
          title='Contactos'
          subtitle='Comparte el contexto de tu necesidad y te responderemos con una propuesta ficticia.'
        />

        <div className='contact-layout'>
          <Card as='form' onSubmit={handleSubmit} noValidate>
            <div className='contact-field'>
              <label htmlFor='name'>Nombre</label>
              <input
                id='name'
                name='name'
                type='text'
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                required
              />
              {errors.name && <span className='contact-error'>{errors.name}</span>}
            </div>

            <div className='contact-field'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                required
              />
              {errors.email && <span className='contact-error'>{errors.email}</span>}
            </div>

            <div className='contact-field'>
              <label htmlFor='subject'>Asunto</label>
              <input
                id='subject'
                name='subject'
                type='text'
                value={values.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                required
              />
              {errors.subject && <span className='contact-error'>{errors.subject}</span>}
            </div>

            <div className='contact-field'>
              <label htmlFor='message'>Mensaje</label>
              <textarea
                id='message'
                name='message'
                rows='5'
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                required
              />
              {errors.message && <span className='contact-error'>{errors.message}</span>}
            </div>

            <Button type='submit' variant='accent' size='md'>
              Enviar mensaje
            </Button>

            {isSubmitted && (
              <p className='contact-success' role='status'>
                Mensaje enviado correctamente. Te responderemos pronto.
              </p>
            )}
          </Card>

          <div className='contact-side grid'>
            <Card>
              <h3>Informacion de contacto</h3>
              <p className='muted'>Correo: contacto@nexussoftware.fake</p>
              <p className='muted'>Ubicacion: Avenida Central 123, Ciudad Demo</p>
              <p className='muted'>Horario: Lun - Vie, 09:00 a 18:00</p>
            </Card>

            <Card>
              <h3>Siguenos</h3>
              <ul className='list-reset contact-social'>
                <li>
                  <a className='link-inline' href='#' target='_blank' rel='noreferrer'>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className='link-inline' href='#' target='_blank' rel='noreferrer'>
                    GitHub
                  </a>
                </li>
                <li>
                  <a className='link-inline' href='#' target='_blank' rel='noreferrer'>
                    X / Twitter
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
