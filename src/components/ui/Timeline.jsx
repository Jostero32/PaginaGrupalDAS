import './Timeline.css';

function Timeline({ steps }) {
  return (
    <div className="timeline-container">
      <div className="timeline-track" />
      
      <ol className="timeline-list">
        {steps.map((step, index) => (
          <li key={step.id} className="timeline-item">
            {/* Timeline Dot */}
            <div className="timeline-dot">
              <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
            </div>

            {/* Timeline Content */}
            <div className="timeline-content">
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-description">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Timeline;
