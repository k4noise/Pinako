import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './User.css';

interface UserProps {
  name?: string;
  url?: string;
  avatar?: string;
}

const User = (props: UserProps): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Link className="User" to={props?.url ? props.url : '/profile'}>
      <img src={props.avatar} className="UserAvatar" />
      {props.name && <span className="UserName">{props.name}</span>}
    </Link>
  );
};

export default User;
