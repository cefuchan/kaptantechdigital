/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
