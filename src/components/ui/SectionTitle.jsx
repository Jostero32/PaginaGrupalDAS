import './SectionTitle.css';

function SectionTitle({ title, subtitle, center = false }) {
  return (
    <header className={`section-title ${center ? 'section-title-center' : ''}`.trim()}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export default SectionTitle;
