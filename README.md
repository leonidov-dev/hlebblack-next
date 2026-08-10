# HLEBBLACK — Next.js + Prisma

Самостоятельная версия каталога, собранная на основе Tilda-экспорта. В проект уже перенесены изображения и данные 35 popup-товаров из исходного HTML.

## Запуск

Нужны Node.js 20+ и PostgreSQL.

```bash
cp .env.example .env
# укажите DATABASE_URL и ADMIN_PASSWORD
npm install
npm run db:push
npm run db:seed
npm run dev
```

Сайт: http://localhost:3000
Админка: http://localhost:3000/admin

Админка защищена Basic Auth: логин `admin`, пароль из `ADMIN_PASSWORD`.

## Что уже есть

- Next.js frontend
- PostgreSQL + Prisma
- 35 товаров из Tilda-экспорта
- категории
- страницы товаров
- характеристики и таблицы
- редактирование товаров из админки
- добавление категорий
- адаптивная верстка

## Следующий этап

Для production я бы переделал JSON-поля в полноценные визуальные repeatable-поля: строки таблиц, характеристики и варианты товара будут добавляться кнопкой «+ Добавить», а изображения — drag-and-drop. Также стоит добавить полноценную авторизацию, удаление товаров, сортировку drag-and-drop, загрузку файлов в S3/Cloudflare R2 и перенести все остальные страницы/блоки Tilda.
