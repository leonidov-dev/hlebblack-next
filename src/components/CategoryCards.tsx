import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryCardsProps {
  categories: Category[];
}

const categoryImages: Record<string, string> = {
  'Ржано-пшеничные': 'https://static.tildacdn.com/tild3038-3233-4661-b361-306632356638/photo.png',
  'Пшеничные': 'https://static.tildacdn.com/tild3935-3963-4464-a631-373439366566/_.jpg',
  'Для тостов': 'https://static.tildacdn.com/tild3534-6330-4662-a130-323237666432/02_1.jpg',
  'Зерновые': 'https://static.tildacdn.com/tild3563-3738-4763-a636-393162303663/02.jpg',
  'Батоны': 'https://static.tildacdn.com/tild6564-6137-4366-a262-326263623636/photo.png',
  'Булочки, пироги': 'https://static.tildacdn.com/tild3634-3364-4532-a638-656132646235/_.png',
  'Лаваши, лепешки': 'https://static.tildacdn.com/tild6137-3737-4335-a334-636539663138/_.png',
};

export default function CategoryCards({ categories }: CategoryCardsProps) {
  // Разбиваем категории: первые 6 в сетку 2x3, последняя отдельно
  const mainCategories = categories.slice(0, 6);
  const lastCategory = categories.slice(6, 7)[0];

  return (
    <div className="category-cards-wrapper">
      <div className="category-grid">
        {mainCategories.map((cat, index) => (
          <Link 
            key={cat.id}
            href={`/?category=${cat.slug}`}
            className={`category-card ${index % 2 === 1 ? 'category-card--yellow' : 'category-card--blue'}`}
            style={{
              backgroundImage: `url(${categoryImages[cat.name] || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="category-card__overlay">
              <h3 className="category-card__title">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      {lastCategory && (
        <div className="category-grid category-grid--single">
          <Link 
            href={`/?category=${lastCategory.slug}`}
            className="category-card category-card--blue category-card--centered"
            style={{
              backgroundImage: `url(${categoryImages[lastCategory.name] || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="category-card__overlay">
              <h3 className="category-card__title">{lastCategory.name}</h3>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}