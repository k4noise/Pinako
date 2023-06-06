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
    <>
      {props?.url ? (
        <Link className="User" to={props.url}>
          <img src={props.avatar} className="UserAvatar" />
          {props.name && <span className="UserName">{props.name}</span>}
        </Link>
      ) : (
        <span className="User">
          <img src={props.avatar} className="UserAvatar" />
          {props.name && <span className="UserName">{props.name}</span>}
        </span>
      )}
    </>
  );
};

export default User;
