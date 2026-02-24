import { createElement } from 'react';
import './Card.css';

function Card({ className = '', children, as = 'article', ...props }) {
  return createElement(as, { className: `card ${className}`.trim(), ...props }, children);
}

export default Card;
