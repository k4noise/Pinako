import React from 'react';
import { Link, ScrollRestoration } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import User from '../../Components/User/User';
import UserImage from '../../../assets/user.svg';
import Wave3pic from '../../../assets/wave3.svg';
import Wave4pic from '../../../assets/wave4.svg';
import Wave5pic from '../../../assets/wave5.svg';
import './Profile.css';
import { GetImage } from '../../Requests';

interface ProfileProps {
  isMine?: boolean;
}

const Profile = (props: ProfileProps): JSX.Element => {
  const userData = useLoaderData().data;
  return (
    <>
      <div className="UserHeader">
        <User name={userData.displayName} avatar={userData.pfpUrl ? GetImage(userData.pfpUrl) : UserImage} />
        <div className="AboutUser">
          <div
            className={`AboutUserText${!props.isMine ?' AboutUserTextAlone' : ''}`}
          >
            {userData.about}
          </div>
          {props?.isMine && (
            <div className="AboutUserControls">
              <Link to="/profile/edit">
                <button>Редактировать профиль</button>
              </Link>
              <Link to="/profile/upload">
                <button>Добавить работу</button>
              </Link>
            </div>
          )}
        </div>
        <img src={Wave3pic} className="Wave3" />
        <img src={Wave4pic} className="Wave4" />
        <img src={Wave5pic} className="Wave5" />
      </div>
      <div className="Artworks MainWrapper">
        {userData.artworks && Object.keys(userData.artworks).length > 0 && GetCards(userData.artworks)}
        {!userData.artworks.length > 0 && <div className='NoArtworks'>У вас еще нет загруженных работ. <Link to='/profile/upload'>Загрузите свою первую работу!</Link></div> }
      </div>
      <ScrollRestoration />
    </>
  );
};

const GetCards = (artworks: object): JSX.Element[] => {
  const cards: JSX.Element[] = [];
  artworks.forEach((value, key) => {
    cards[key] = (<Card userId={value.userId} id={value.id} hashTag={value.tags[0].slice(1)} image={GetImage(value.imageUrl)} />)
  });
  return cards;
}

export default Profile;
