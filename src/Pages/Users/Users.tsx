import React from 'react';
import Search from '../../Components/Search/Search';
import User from '../../Components/User/User';
import './Users.css';

const Users = (): JSX.Element => {
  return (
    <div className="AppWrapper AppWrapperLarge">
      <Search locatedInNav={false} placeholder="Поиск пользователей" />
      <div className="Users">
        <User name="Имя пользователя" url="/user/234" />
        <User name="Имя пользователя" url="/user/274" />
        <User name="Имя пользователя" url="/user/244" />
        <User name="Имя пользователя" url="/user/54" />
        <User name="Имя пользователя" url="/user/21" />
        <User name="Имя пользователя" url="/user/23" />
        <User name="Имя пользователя" url="/user/25" />
        <User name="Имя пользователя" url="/user/20" />
        <User name="Имя пользователя" url="/user/63" />
      </div>
    </div>
  );
};

export default Users;
