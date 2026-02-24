import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import usePageMeta from "../routes/usePageMeta";

function NotFound() {
  usePageMeta("404", "La pagina solicitada no fue encontrada.");

  return (
    <section className="page-section text-center">
      <div className="container">
        <p className="m-0 text-[clamp(3rem,2.2rem+4vw,6rem)] font-extrabold text-[var(--color-accent)] leading-none">
          404
        </p>
        <h1 className="my-4 mb-3">Pagina no encontrada</h1>
        <p className="muted">La ruta que buscaste no existe en esta SPA.</p>
        <Button as={Link} to="/" variant="primary">
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
