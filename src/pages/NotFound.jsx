import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import usePageMeta from '../routes/usePageMeta';
import './NotFound.css';

function NotFound() {
  usePageMeta('404', 'La pagina solicitada no fue encontrada.');

  return (
    <section className='page-section not-found'>
      <div className='container'>
        <p className='not-found-code'>404</p>
        <h1>Pagina no encontrada</h1>
        <p className='muted'>La ruta que buscaste no existe en esta SPA.</p>
        <Button as={Link} to='/' variant='primary'>
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
