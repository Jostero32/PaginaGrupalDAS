import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import AboutGroup from '../pages/AboutGroup';
import Services from '../pages/Services';
import Projects from '../pages/Projects';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='nombre-del-grupo' element={<AboutGroup />} />
        <Route path='servicios' element={<Services />} />
        <Route path='proyecto' element={<Projects />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:slug' element={<BlogPost />} />
        <Route path='contactos' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
