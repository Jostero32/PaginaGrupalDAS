import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

function Layout() {
  return (
    <div className='site-shell'>
      <a className='skip-link' href='#main-content'>
        Skip to main content
      </a>
      <Navbar />
      <main id='main-content' className='site-main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
