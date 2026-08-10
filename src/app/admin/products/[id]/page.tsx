import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductForm from '../../components/ProductForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: Number(id) }
  });

  if (!product) return notFound();

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Редактирование товара</h1>
          <div className="muted">ID {product.id}</div>
        </div>
        <Link className="btn light" href="/admin">← Каталог</Link>
      </div>
      <ProductForm initialData={product} categories={categories} isEditing={true} />
    </>
  );
}