import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!p || !p.active) return notFound();

  const facts = p.facts as string[];
  const tables = p.tables as any[];
  const additional = p.additional as string[];
  const variants = p.variants as any[];

  return (
    <main className="site-container product-detail-page">
      <Link href="/" className="back-link">← Каталог</Link>

      <div className="product-detail-layout">
        <div>
          <div className="product-detail-image">
            <img src={p.image} alt={p.name} />
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-muted)' }}>{p.category.name}</div>
          <h1 className="product-detail-title">{p.name}</h1>
          <div className="product-detail-description">{p.description}</div>

          {facts.length > 0 && (
            <div className="product-facts">
              {facts.map((f, i) => (
                <div className="product-fact" key={i}>{f}</div>
              ))}
            </div>
          )}

          {tables.length > 0 && (
            <div className="product-tables">
              {tables.map((t, i) => (
                <table className="info-table" key={i}>
                  <caption>{t.caption}</caption>
                  <thead>
                    <tr>
                      {Object.keys(t.items).map(k => (
                        <th key={k}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(t.items).map((v: any, j) => (
                        <td key={j}>{v}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          )}

          {additional.length > 0 && (
            <p style={{ color: 'var(--text-muted)' }}>{additional.join(' · ')}</p>
          )}

          {variants.length > 0 && (
            <div className="products-grid" style={{ paddingBottom: 0 }}>
              {variants.map((v: any, i) => (
                <div className="product-card" key={i}>
                  <div className="card-image-wrapper">
                    <img src={v.image} alt="" />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{v.name}</h3>
                    <div className="card-category">{v.weight}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}