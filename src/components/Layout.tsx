import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { isStandalonePath } from '../routes';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  // Kendi başlık ve alt bilgisini taşıyan açılış sayfaları KAPTAN kabuğunu
  // kullanmaz; aksi halde sayfada iki navigasyon ve iki footer olurdu.
  if (isStandalonePath(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col font-body bg-bg text-text-primary selection:bg-gold/30">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
