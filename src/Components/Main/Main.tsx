import React from 'react';
import './Main.css';
import Card from '../Card/Card';

const Main = (): JSX.Element => {
  return (
    <>
      <div className="MainWrapper">{CardsGenerator()}</div>
      <button className="Register">
        Зарегистрируйтесь, чтобы увидеть больше
      </button>
    </>
  );
};

const CardsGenerator = (): JSX.Element[] => {
  const width: number = document.documentElement.clientWidth;
  const paddings: number = Math.min(200, width * 0.07);
  const cleanWidth: number = Math.floor(width - paddings);
  const cardCount: number =
    cleanWidth < 650
      ? 3
      : Math.floor((cleanWidth - (20 * cleanWidth) / 550) / 550) * 3;
  const cards: JSX.Element[] = [];
  for (let i = 0; i < cardCount; i++) {
    cards[i] = <Card />;
  }
  return cards;
};

export default Main;
