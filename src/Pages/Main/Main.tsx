import React, { useState, useLayoutEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import Cookies from "js-cookie"
import './Main.css';
import Card from '../../Components/Card/Card';
import Search from '../../Components/Search/Search';
import Header from '../../Components/Header/Header';
import { Link } from 'react-router-dom';
import { GetImage } from '../../Requests';
import { NotificationManager } from 'react-notifications';

const Main = (): JSX.Element => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();
  const artworks = useLoaderData();
  const url = window.location.href;
  const pageNumber = Number(url.match(/\/page\/(\d+)/)?.[1] || '');
  const cards = GetCards(artworks);

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
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
        {
          cards.length > 0 ?
            <div className="Artworks MainWrapper">
              {cards}
            </div>
            : <div className="NoArtworks">
              {pageNumber > 0 ? 'На этой странице работ нет' :
                'Работы еще не загружены.' + <Link to='/profile/upload'>Будьте первым!</Link>
              }
            </div>
        }
          <button className="Register">
        {!Cookies.get("accessToken") && cards.length > 0 ?
            <Link to="/register">Зарегистрируйтесь, чтобы увидеть больше</Link>
            : <span onClick={() => {
              if (artworks.length === 6)
                navigate(`/page/${pageNumber + 1}`)
              else {
                NotificationManager.warning('Вы просмотрели все работы')
              }
            }
            }>Смотреть еще</span>
        }
          </button>
      </div>
    </>
  );
};

const GetCards = (data: object): JSX.Element[] => {
  let cards: JSX.Element[] = [];
  data.forEach((card, index) => {
    cards[index] = <Card id={card.id} key={card.id} userId={card.userId} image={GetImage(card.imageUrl)} userName={card.userName} userAvatar={GetImage(card.userAvatar)} />;
  });
  return cards;
};


export default Main;
