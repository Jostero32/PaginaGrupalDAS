import { useEffect, useRef } from 'react';

/**
 * Hook para animar elementos cuando entran en el viewport
 * Implementa FadeInUp (fade + traslación Y)
 */
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    duration = 0.6,
    delay = 0,
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.style.animation = `fadeInUp ${duration}s ease-out ${delay}s both`;
        observer.unobserve(element);
      }
    }, {
      threshold,
      rootMargin,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, duration, delay]);

  return ref;
}

export default useScrollReveal;
