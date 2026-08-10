'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-|-$/g, '') + '-' + Date.now().toString(36);
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get('name') || '');
  const categoryId = Number(formData.get('categoryId'));
  const image = String(formData.get('image') || '');
  const description = String(formData.get('description') || '');
  const price = String(formData.get('price') || '');
  const sortOrder = Number(formData.get('sortOrder') || 0);
  const active = formData.get('active') === 'on';
  
  const facts = JSON.parse(String(formData.get('facts') || '[]'));
  const tables = JSON.parse(String(formData.get('tables') || '[]'));
  const additional = JSON.parse(String(formData.get('additional') || '[]'));
  const variants = JSON.parse(String(formData.get('variants') || '[]'));

  const product = await prisma.product.create({
    data: {
      name,
      slug: slugify(name),
      categoryId,
      image,
      description,
      price,
      sortOrder,
      active,
      facts,
      tables,
      additional,
      variants,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}

export async function updateProduct(id: number, formData: FormData) {
  const name = String(formData.get('name') || '');
  const categoryId = Number(formData.get('categoryId'));
  const image = String(formData.get('image') || '');
  const description = String(formData.get('description') || '');
  const price = String(formData.get('price') || '');
  const sortOrder = Number(formData.get('sortOrder') || 0);
  const active = formData.get('active') === 'on';
  
  const facts = JSON.parse(String(formData.get('facts') || '[]'));
  const tables = JSON.parse(String(formData.get('tables') || '[]'));
  const additional = JSON.parse(String(formData.get('additional') || '[]'));
  const variants = JSON.parse(String(formData.get('variants') || '[]'));

  await prisma.product.update({
    where: { id },
    data: {
      name,
      categoryId,
      image,
      description,
      price,
      sortOrder,
      active,
      facts,
      tables,
      additional,
      variants,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath(`/product/${slugify(name)}`);
  redirect('/admin');
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get('name') || '');
  const sortOrder = Number(formData.get('sortOrder') || 0);
  const slug = name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-|-$/g, '') + '-' + Date.now().toString(36);

  await prisma.category.create({
    data: { name, slug, sortOrder },
  });

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}