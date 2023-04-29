import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../../../assets/user.svg';
import './User.css';

interface UserProps {
  name?: string;
  url?: string;
}

const User = (props: UserProps): JSX.Element => {
  return (
    <Link className="User" to={props.url}>
      <img src={UserAvatar} />
      {props.name && <span className="UserName">{props.name}</span>}
    </Link>
  );
};

export default User;
