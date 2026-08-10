import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductForm from '../../components/ProductForm';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <>
      <div className="admin-head">
        <h1>Новый товар</h1>
        <Link className="btn light" href="/admin">Отмена</Link>
      </div>
      <ProductForm categories={categories} isEditing={false} />
    </>
  );
}