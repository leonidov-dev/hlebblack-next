import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Каталог</h1>
          <div className="muted">{products.length} товаров</div>
        </div>
        <Link className="btn" href="/admin/products/new">+ Добавить товар</Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <img className="admin-img" src={p.image} alt="" />
              </td>
              <td>{p.name}</td>
              <td>{p.category?.name || '—'}</td>
              <td>{p.active ? '✅ Опубликован' : '⛔ Скрыт'}</td>
              <td>
                <Link className="btn light" href={`/admin/products/${p.id}`}>
                  ✏️ Изменить
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}