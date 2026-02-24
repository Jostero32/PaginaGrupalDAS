import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container footer-content'>
        <div>
          <h3 className='footer-title'>ARCM Solutions</h3>
          <p className='muted'>
            Advanced Research & Code Management.
          </p>
        </div>

        <ul className='list-reset footer-links' aria-label='Footer links'>
          <li>
            <NavLink to='/'>Inicio</NavLink>
          </li>
          <li>
            <NavLink to='/servicios'>Servicios</NavLink>
          </li>
          <li>
            <NavLink to='/proyecto'>Proyecto</NavLink>
          </li>
          <li>
            <NavLink to='/blog'>Blog</NavLink>
          </li>
          <li>
            <NavLink to='/contactos'>Contactos</NavLink>
          </li>
        </ul>
      </div>
      <div className='footer-bottom'>
        <div className='container'>
          <small>Copyright {new Date().getFullYear()} ARCM Solutions. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
