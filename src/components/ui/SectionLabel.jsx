import './SectionLabel.css';

/**
 * Reusable section label component matching the Services page style.
 * Pill badge with colored dot + uppercase text.
 * 
 * @param {string} text - Label text
 * @param {string} color - Dot/accent color (default: #E94F37)
 */
export default function SectionLabel({ text, color = '#E94F37' }) {
    return (
        <div className="section-label">
            <span className="section-label-dot" style={{ background: color }} />
            <span className="section-label-text">{text}</span>
        </div>
    );
}
