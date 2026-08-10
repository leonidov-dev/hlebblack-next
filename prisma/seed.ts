import { PrismaClient } from '@prisma/client';
import products from '../src/lib/seed-products.json';

const db = new PrismaClient();

const categories = [
  'Ржано-пшеничные',
  'Пшеничные',
  'Для тостов',
  'Зерновые',
  'Батоны',
  'Булочки, пироги',
  'Лаваши, лепешки'
];

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Создаем категории
  console.log('📁 Создаем категории...');
  for (let i = 0; i < categories.length; i++) {
    await db.category.upsert({
      where: { slug: `cat-${i + 1}` },
      update: { name: categories[i], sortOrder: i },
      create: { name: categories[i], slug: `cat-${i + 1}`, sortOrder: i }
    });
  }
  console.log(`✅ Создано ${categories.length} категорий`);

  // Создаем продукты
  console.log('🍞 Создаем товары...');
  let count = 0;
  for (const p of products as any[]) {
    const c = await db.category.findFirst({
      where: { name: p.category }
    });
    if (!c) {
      console.log(`⚠️ Категория "${p.category}" не найдена для товара "${p.name}"`);
      continue;
    }

    await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        image: p.image,
        facts: p.facts ?? [],
        tables: p.tables ?? [],
        additional: p.additional ?? [],
        variants: p.variants ?? [],
        categoryId: c.id,
        active: p.active ?? true,
        price: p.price ?? '',
        sortOrder: p.sortOrder ?? 0
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        image: p.image,
        facts: p.facts ?? [],
        tables: p.tables ?? [],
        additional: p.additional ?? [],
        variants: p.variants ?? [],
        categoryId: c.id,
        active: p.active ?? true,
        price: p.price ?? '',
        sortOrder: p.sortOrder ?? 0
      }
    });
    count++;
  }
  console.log(`✅ Создано ${count} товаров`);
  console.log('🎉 Заполнение базы данных завершено!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
