import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { createCategory } from '../actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Категории</h1>
          <div className="muted">Категории каталога</div>
        </div>
      </div>

      <form className="form" action={createCategory}>
        <div className="row">
          <div className="field">
            <label>Название новой категории</label>
            <input name="name" required placeholder="Например: Без сахара" />
          </div>
          <div className="field">
            <label>Порядок</label>
            <input name="sortOrder" type="number" defaultValue="0" />
          </div>
        </div>
        <button className="btn">Добавить категорию</button>
      </form>

      <br />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Товаров</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c._count.products}</td>
              <td>{c.active ? '✅ Активна' : '⛔ Скрыта'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}