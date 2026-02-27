import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const socialLinks = [
  { icon: FaGithub, label: 'GitHub', href: '#', hoverClass: 'social-github' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/', hoverClass: 'social-linkedin' },
  { icon: FaFacebook, label: 'Facebook', href: 'https://facebook.com/', hoverClass: 'social-facebook' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/', hoverClass: 'social-instagram' },
  { icon: FaXTwitter, label: 'X', href: 'https://x.com/', hoverClass: 'social-x' },
];

function Footer() {
  return (
    <footer className='footer'>
      <div className='container footer-content'>
        <div className='footer-brand'>
          <h3 className='footer-title'>ARCM Solutions</h3>
          <p className='muted footer-desc'>
            Advanced Research &amp; Code Management. Construimos tecnología de alto impacto para empresas que buscan innovar.
          </p>
          <ul className='list-reset footer-social'>
            {socialLinks.map(({ icon: Icon, label, href, hoverClass }) => (
              <li key={label}>
                <a
                  className={`footer-social-link ${hoverClass}`}
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  title={label}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='footer-col'>
          <h4 className='footer-col-title'>Navegación</h4>
          <ul className='list-reset footer-links'>
            <li><NavLink to='/'>Inicio</NavLink></li>
            <li><NavLink to='/nombre-del-grupo'>Nosotros</NavLink></li>
            <li><NavLink to='/proyecto'>Proyectos</NavLink></li>
            <li><NavLink to='/blog'>Blog</NavLink></li>
            <li><NavLink to='/contactos'>Contactos</NavLink></li>
          </ul>
        </div>

        <div className='footer-col'>
          <h4 className='footer-col-title'>Servicios</h4>
          <ul className='list-reset footer-links'>
            <li><NavLink to='/servicios'>Desarrollo Web</NavLink></li>
            <li><NavLink to='/servicios'>Apps Mobile</NavLink></li>
            <li><NavLink to='/servicios'>Frontend</NavLink></li>
            <li><NavLink to='/servicios'>DevOps</NavLink></li>
            <li><NavLink to='/servicios'>Consultoría</NavLink></li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='container'>
          <small>&copy; {new Date().getFullYear()} ARCM Solutions. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
