import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * index.html'deki (ve ön render edilmiş sayfalardaki) varsayılan SEO
 * etiketlerini kaldırır. Uygulama açıldıktan sonra bu etiketleri SEO bileşeni
 * yönetir; ikisi bir arada kalırsa sayfada iki canonical ve çift og:/twitter:
 * etiketi oluşur ve arama motorlarına çelişkili sinyal gider.
 */
function clearDefaultSeoTags() {
  document.head.querySelectorAll('[data-seo-default]').forEach((element) => element.remove());
}

clearDefaultSeoTags();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
