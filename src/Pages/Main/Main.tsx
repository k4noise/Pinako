import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import Cookies from "js-cookie"
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

  const params = useParams();
  const startPageNumber: number = params?.pageId ? Number(params.pageId) : 0;
  const cardsInPage: number = CardsInPage(windowSize.width);
  const [cards, addCards] = useState(CardsGenerator(cardsInPage));

    useLayoutEffect(() => {
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

  if (Cookies.get("accessToken")) {
    useEffect(() => {
      const handleScroll = () => {
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = height - screenHeight / 8;
        const position = scrolled + screenHeight;

        if (position >= threshold) {
          addCards([...cards, ...CardsGenerator(cardsInPage)]);
          const currentPageNumber: number = startPageNumber + cards.length / cardsInPage
          window.history.pushState(null, '', `/#/page/${currentPageNumber}`)
        }
      }

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });
  }

  return (
    <>
      <Header />
      <div className="AppWrapper">
        <Search locatedInNav={false} placeholder="Поиск" onlyMobile={true} />
        <Artworks additionalClassName="MainWrapper">
          {cards}
        </Artworks>
        {!Cookies.get("accessToken") &&
          <button className="Register">
            <Link to="/register">Зарегистрируйтесь, чтобы увидеть больше</Link>
          </button>
        }
      </div>
      <ScrollRestoration />
    </>
  );
};

const CardsInPage = (width: number): number => {
  const paddings: number = Math.min(200, width * 0.07);
  const cleanWidth: number = Math.floor(width - paddings);
  const cardCount: number =
    cleanWidth < 650
      ? 3
      : Math.floor((cleanWidth - (20 * cleanWidth) / 500) / 500) * 3;
  return cardCount;
}

const CardsGenerator = (count: number): JSX.Element[] => {
  let cards: JSX.Element[] = [];
  for (let i = 0; i < count; i++) {
    cards[i] = <Card key={Math.random()} image={RectImg} />;
  }
  return cards;
};

export default Main;
