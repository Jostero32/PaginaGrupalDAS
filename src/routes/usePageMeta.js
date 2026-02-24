import { useEffect } from 'react';

const SITE_NAME = 'Grupo Nexus Software';

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    const metaDescription =
      document.querySelector("meta[name='description']") ||
      document.createElement('meta');

    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', description);

    if (!document.querySelector("meta[name='description']")) {
      document.head.appendChild(metaDescription);
    }
  }, [title, description]);
}

export default usePageMeta;
