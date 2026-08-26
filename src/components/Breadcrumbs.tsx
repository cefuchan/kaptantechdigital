import { Link } from 'react-router-dom';

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Görünür breadcrumb navigasyonu.
 * Aynı zincir BreadcrumbList şeması olarak da sayfaya eklenir; Google'ın
 * yapılandırılmış veriyi doğrulayabilmesi için hiyerarşinin sayfada da
 * görünür olması gerekir.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className="text-text-primary/70 line-clamp-1">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-gold transition-colors">
                  {item.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true" className="text-muted/50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
