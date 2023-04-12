import React from 'react';
import './Card.css';
import User from '../User/User';
import RectImg from '../../../assets/rect.png';
import LikeImg from '../../../assets/like.svg';
import EyeImg from '../../../assets/eye.svg';

interface StaticticsProps {
  likes: number;
  watches: number;
}

const Card = (): JSX.Element => {
  return (
    <div className="Card">
      <img src={RectImg} className="UserImage" />
      <div className="CardControls">
        <User name="Имя пользователя" url="./user/23452" />
        <Statictics likes={120} watches={120} />
      </div>
    </div>
  );
};

const Statictics = (props: StaticticsProps): JSX.Element => {
  return (
    <div className="Controls">
      <object data={LikeImg} />
      <span>{props.likes}</span>
      <object data={EyeImg} />
      <span>{props.watches}</span>
    </div>
  );
};

export default Card;
