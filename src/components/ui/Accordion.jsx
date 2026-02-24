import { useState } from 'react';
import './Accordion.css';

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const onToggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div className='accordion'>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className='accordion-item'>
            <h3>
              <button
                id={buttonId}
                className='accordion-trigger'
                type='button'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(index)}
              >
                <span>{item.question}</span>
                <span aria-hidden='true'>{isOpen ? '-' : '+'}</span>
              </button>
            </h3>

            <div
              id={panelId}
              role='region'
              aria-labelledby={buttonId}
              className={`accordion-panel ${isOpen ? 'accordion-panel-open' : ''}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
