'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const phrases = [
  "Без хлеба и обед не в обед",
  "Хлеб всему голова",
  "Хлеб на стол — и стол престол",
  "Хлеба нет — и песня не поётся",
  "Где хлеб, там и правда"
];

export default function HeaderTop() {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const changePhrase = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setCurrentPhrase(phrases[randomIndex]);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="header-top-block">
      <div className="site-container header-top-inner">
        <div className="header-logo-image">
          <img 
            src="https://static.tildacdn.com/tild3563-6663-4938-b335-363862323333/_.png" 
            alt="ХЛЕБ" 
          />
        </div>

        <div className="header-right-block">
          <Link href="/" className="btn-back-to-main">
            На главную
          </Link>

          <div className="truth-block">
            <div className="truth-block__title">
              <span>Хлебные истины</span>
            </div>
            <h2 className={`truth-block__text ${isAnimating ? 'hide' : 'show'}`}>
              {currentPhrase}
            </h2>
            <button className="truth-block__btn" onClick={changePhrase}>
              Ещё!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}