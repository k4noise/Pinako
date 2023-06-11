import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import User from '../../Components/User/User';
import UserAvatar from '../../../assets/user.svg';
import './Users.css';

const Users = (): JSX.Element => {
  return (
    <div className="AppWrapper AppWrapperLarge">
      <Search locatedInNav={false} placeholder="Поиск пользователей" />
      <div className="Users">
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/234" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/274" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/244" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/54" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/21" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/23" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/25" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/20" />
        <User name="Имя пользователя" avatar={UserAvatar} url="/profile/63" />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Users;
