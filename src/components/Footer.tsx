import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-left">
          <Link href="/" className="btn-back-to-main footer-btn">
            На главную
          </Link>
          <Link href="https://hz-5.ru/otziv" target="_blank" className="btn-review">
            Оставить отзыв
          </Link>
        </div>

        <div className="footer-center">
          <img 
            src="https://static.tildacdn.com/tild3437-3635-4562-b339-373239373464/__3.png" 
            alt="Хлеб" 
            className="footer-logo"
          />
        </div>

        <div className="footer-right">
          <div className="footer-contacts">
            <div className="footer-contacts__title">Контакты:</div>
            <a href="mailto:office@hz-5.ru" className="footer-contacts__email">
              office@hz-5.ru
            </a>
            <a href="tel:+78463752015" className="footer-contacts__phone">
              +7 (846) 375 20 15
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}