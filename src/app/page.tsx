import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import HeaderTop from '../components/HeaderTop';
import CategoryCards from '../components/CategoryCards';
import Footer from '../components/Footer';

interface HomeProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const categorySlug = params?.category;

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' }
  });

  const whereCondition: any = { active: true };
  
  if (categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      whereCondition.categoryId = category.id;
    }
  }

  const products = await prisma.product.findMany({
    where: whereCondition,
    include: { category: true },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <>
      {/* Верхний блок с логотипом, кнопкой "На главную" и "Хлебные истины" */}
      <HeaderTop />

      {/* Основной контент */}
      <main className="site-container">
        <section className="hero-block">
          <h1 className="hero-title">Хлеб, который хочется разделить.</h1>
          <p className="hero-description">
            Каталог продукции. Традиционные рецептуры, натуральная закваска и свежая выпечка.
          </p>
        </section>

        {/* Заголовок "Каталог" */}
        <div className="catalog-heading-wrapper">
          <h2 className="catalog-heading">Каталог</h2>
        </div>

        <p className="catalog-description">
          Добро пожаловать в наш каталог хлебобулочных изделий!<br />
          Мы предлагаем широкий выбор свежего хлеба и выпечки, созданных с заботой<br />
          и по традиционным рецептам. Изучайте продукцию на сайте и ищите любимую выпечку в магазинах вашего города!
        </p>

        {/* Карточки категорий */}
        <CategoryCards categories={categories} />

        {/* Фильтры-чипсы */}
        <div className="category-filters">
          <Link 
            className={`filter-chip ${!categorySlug ? 'active' : ''}`} 
            href="/"
          >
            Все
          </Link>
          {categories.map(c => (
            <Link 
              className={`filter-chip ${categorySlug === c.slug ? 'active' : ''}`} 
              key={c.id} 
              href={`/?category=${c.slug}`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Товары */}
        {products.length === 0 ? (
          <div className="empty-state">
            <p>В этой категории пока нет товаров</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <Link className="product-card" href={`/product/${p.slug}`} key={p.id}>
                <div className="card-image-wrapper">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{p.name}</h3>
                  <div className="card-category">{p.category.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Футер */}
      <Footer />
    </>
  );
}