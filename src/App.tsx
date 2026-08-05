/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const References = lazy(() => import('./pages/References'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Siteler = lazy(() => import('./pages/Siteler'));
const AnkaraSeo = lazy(() => import('./pages/AnkaraSeo'));
const AnkaraWebTasarim = lazy(() => import('./pages/AnkaraWebTasarim'));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<div className="min-h-screen bg-bg" />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetler" element={<Services />} />
            <Route path="/hizmetler/:slug" element={<ServiceDetail />} />
            <Route path="/referanslar" element={<References />} />
            <Route path="/vaka-calismalari" element={<CaseStudies />} />
            <Route path="/vaka-calismalari/:slug" element={<CaseStudyDetail />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/siteler" element={<Siteler />} />
            <Route path="/ankara-seo" element={<AnkaraSeo />} />
            <Route path="/ankara-web-tasarim" element={<AnkaraWebTasarim />} />
            <Route path="/iletisim" element={<Contact />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
