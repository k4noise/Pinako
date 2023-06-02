import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import User from '../../Components/User/User';
import Artworks from '../../Components/Artworks/Artworks';
import UserImage from '../../../assets/user.svg';
import Wave3pic from '../../../assets/wave3.svg';
import Wave4pic from '../../../assets/wave4.svg';
import Wave5pic from '../../../assets/wave5.svg';
import CardImage from '../../../assets/photo.svg';
import './Profile.css';

interface ProfileProps {
  isMine?: boolean;
}

const Profile = (props: ProfileProps): JSX.Element => {
  return (
    <>
      <div className="UserHeader">
        <User name="Имя пользователя" avatar={UserImage} />
        <div className="AboutUser">
          <div
            className={`AboutUserText ${!props.isMine && 'AboutUserTextAlone'}`}
          >
            О пользователе
          </div>
          {props?.isMine && (
            <div className="AboutUserControls">
              <Link to="/profile/edit">
                <button>Редактировать профиль</button>
              </Link>
              <button
                onClick={() =>
                  NotificationManager.error(
                    'Данная функция в разработке',
                    'Ошибка',
                    3000
                  )
                }
              >
                Добавить работу
              </button>
            </div>
          )}
        </div>
        <img src={Wave3pic} className="Wave3" />
        <img src={Wave4pic} className="Wave4" />
        <img src={Wave5pic} className="Wave5" />
      </div>
      <Artworks additionalClassName="MainWrapper">
        <Card hashTag={'хэштег'} image={CardImage} artworkView={false} />
        <Card hashTag={'хэштег'} image={CardImage} artworkView={false} />
        <Card hashTag={'хэштег'} image={CardImage} artworkView={false} />
        <Card hashTag={'хэштег'} image={CardImage} artworkView={false} />
        <Card hashTag={'хэштег'} image={CardImage} artworkView={false} />
        <Card hashTag={'хэштег'} image={CardImage} artworkView={false} />
      </Artworks>
    </>
  );
};

export default Profile;
