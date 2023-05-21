import React, { useState, useEffect } from 'react';
import './Main.css';
import Card from '../../Components/Card/Card';
import Search from '../../Components/Search/Search';
import Header from '../../Components/Header/Header';
import Artworks from '../../Components/Artworks/Artworks';
import { Link } from 'react-router-dom';
import RectImg from '../../../assets/rect.png';

const Main = (): JSX.Element => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Header />
      <div className="AppWrapper">
        <Search locatedInNav={false} placeholder="Поиск" onlyMobile={true} />
        <Artworks additionalClassName="MainWrapper">
          {CardsGenerator(windowSize.width)}
        </Artworks>
        <button className="Register">
          <Link to="/register">Зарегистрируйтесь, чтобы увидеть больше</Link>
        </button>
      </div>
    </>
  );
};

const CardsGenerator = (width: number): JSX.Element[] => {
  const paddings: number = Math.min(200, width * 0.07);
  const cleanWidth: number = Math.floor(width - paddings);
  const cardCount: number =
    cleanWidth < 650
      ? 3
      : Math.floor((cleanWidth - (20 * cleanWidth) / 550) / 550) * 3;
  const cards: JSX.Element[] = [];
  for (let i = 0; i < cardCount; i++) {
    cards[i] = <Card key={i} image={RectImg} />;
  }
  return cards;
};

export default Main;
