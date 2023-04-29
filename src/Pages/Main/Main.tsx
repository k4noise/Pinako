import React from 'react';
import './Main.css';
import Card from '../../Components/Card/Card';
import Header from '../../Components/Header/Header';
import { Link } from 'react-router-dom';

const Main = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className="MainWrapper">{CardsGenerator()}</div>
      <button className="Register">
        <Link to="/register">Зарегистрируйтесь, чтобы увидеть больше</Link>
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
    cards[i] = <Card key={i} />;
  }
  return cards;
};

export default Main;
