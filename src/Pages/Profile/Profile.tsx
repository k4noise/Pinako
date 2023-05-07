import React from 'react';
import Card from '../../Components/Card/Card';
import User from '../../Components/User/User';
import UserImage from '../../../assets/user.svg';
import Wave3pic from '../../../assets/wave3.svg';
import Wave4pic from '../../../assets/wave4.svg';
import Wave5pic from '../../../assets/wave5.svg';
import './Profile.css';

const Profile = (): JSX.Element => {
  return (
    <>
      <div className="UserHeader">
        <User name="Имя пользователя" avatar={UserImage} />
        <div className="AboutUser">
          <div className="AboutUserText">О пользователе</div>
          <div className="AboutUserControls">
            <button>Редактировать профиль</button>
            <button>Добавить работу</button>
          </div>
        </div>
        <img src={Wave3pic} className="Wave3" />
        <img src={Wave4pic} className="Wave4" />
        <img src={Wave5pic} className="Wave5" />
      </div>
      <div className="MainWrapper">
        <Card hashTag={'хэштег'} />
        <Card hashTag={'хэштег'} />
        <Card hashTag={'хэштег'} />
        <Card hashTag={'хэштег'} />
        <Card hashTag={'хэштег'} />
        <Card hashTag={'хэштег'} />
      </div>
    </>
  );
};

export default Profile;
