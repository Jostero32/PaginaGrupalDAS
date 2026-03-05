import { useRef, useState, useEffect } from 'react';

/**
 * Hook that uses IntersectionObserver to detect when an element scrolls into view.
 * Once triggered, it stays true (one-shot animation trigger).
 * @param {number} threshold - Visibility threshold (0-1), default 0.15
 * @returns {[React.RefObject, boolean]} - [ref to attach, whether element is in view]
 */
export default function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}
