import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import User from '../User/User';
import EyeImg from '../../../assets/eye.svg';
import UserAvatar from '../../../assets/user.svg';

interface StaticticsProps {
  likes: number;
  watches: number;
}

interface CardProps {
  showStats?: boolean;
  hashTag?: string;
  userId: number;
  id: number;
  artworkView: boolean;
  image: string;
}

const Card = (props: CardProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="Card">
      <span className="ClickableCard" onClick={(event) => navigate(`/profile/${props.userId}/artwork/${props.id}`)}>
        <img src={props.image} className="UserImage" loading="lazy" />
        <div className="CardControls">
          {props.hashTag && (
            <span className="CardHashTag">#{props.hashTag}</span>
          )}
          {!props.artworkView && !props?.hashTag && (
            <User
              name="Имя пользователя"
              avatar={UserAvatar}
              url={`/profile/${props.userId}`}
            />
          )}
          <Statictics likes={120} watches={120} />
        </div>
      </span>
      {props.artworkView && (
        <div className="CardInformation">
          <User
            name="Имя пользователя"
            avatar={UserAvatar}
            url={`/profile/${props.userId}`}
          />
          <h3 className="CardName">Название работы</h3>
          <p className="CardDescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="CardTags">
            <span className="CardTag">картина маслом</span>
            <span className="CardTag">натюрморт</span>
            <span className="CardTag">абстракционизм</span>
            <span className="CardTag">пастель</span>
            <span className="CardTag">живопись</span>
            <span className="CardTag">эстетика</span>
            <span className="CardTag">арт</span>
            <span className="CardTag">гуашь</span>
            <span className="CardTag">fashion</span>
            <span className="CardTag">скетчинг</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Statictics = (props: StaticticsProps): JSX.Element => {
  const [likesCount, changeLikesCount] = useState(props.likes);
  const [hasLiked, changeLike] = useState(false);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const likeIcon: SVGElement = event.currentTarget as SVGElement;
    const likedIconColor = '#be70d9';
    changeLike(!hasLiked);
    likeIcon.style.fill = !hasLiked ? likedIconColor : '#fff';
    changeLikesCount(!hasLiked ? likesCount + 1 : likesCount - 1);
  };

  return (
    <div className="Controls">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        className="LikesIcon"
        onClick={handleClick}
      >
        <path
          d="M4.83332 0.5C2.53249 0.5 0.666656 2.34667 0.666656 4.625C0.666656 6.46417 1.39582 10.8292 8.57332 15.2417C8.70189 15.3199 8.84949 15.3613 8.99999 15.3613C9.15049 15.3613 9.29809 15.3199 9.42666 15.2417C16.6042 10.8292 17.3333 6.46417 17.3333 4.625C17.3333 2.34667 15.4675 0.5 13.1667 0.5C10.8658 0.5 8.99999 3 8.99999 3C8.99999 3 7.13416 0.5 4.83332 0.5Z"
          stroke="black"
        />
      </svg>
      <span className="LikesCount">{likesCount}</span>
      <svg
        width="24"
        height="14"
        viewBox="0 0 24 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ViewsIcon"
      >
        <path
          d="M12 13.5C7.26206 13.5 3.07025 10.932 0.587558 7C3.07025 3.06797 7.26206 0.5 12 0.5C16.7379 0.5 20.9298 3.06797 23.4124 7C20.9298 10.932 16.7379 13.5 12 13.5Z"
          fill="white"
          stroke="black"
        />
        <circle cx="12" cy="7" r="4.5" fill="white" stroke="black" />
      </svg>
      <span className="ViewsCount">{props.watches}</span>
    </div>
  );
};

export default Card;
