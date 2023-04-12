import React from 'react';
import UserAvatar from '../../../assets/user.svg';
import './User.css';

interface UserProps {
  name?: string;
  url?: string;
}

const User = (props: UserProps): JSX.Element => {
  return (
    <a className="User" href={props.url}>
      <img src={UserAvatar} />
      {props.name && <span className="UserName">{props.name}</span>}
    </a>
  );
};

export default User;
