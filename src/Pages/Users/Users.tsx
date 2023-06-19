import React from 'react';
import { ScrollRestoration, useLoaderData } from 'react-router-dom';
import { GetImage } from '../../Requests';
import Search from '../../Components/Search/Search';
import User from '../../Components/User/User';
import './Users.css';

const Users = (): JSX.Element => {
  const users = useLoaderData()?.data;
  return (
    <div className="AppWrapper AppWrapperLarge">
      <Search locatedInNav={false} placeholder="Поиск пользователей" userSearch={true} />
      <div className="Users">
        {users && Object.keys(users).length > 0 && GetUsers(users)}
      </div>
      <ScrollRestoration />
    </div>
  );
};

const GetUsers = (allUsers: object): JSX.Element[] => {
  const users: JSX.Element[] = [];
  allUsers.forEach((user, index) => {
    users[index] = <User name={user.displayName} avatar={GetImage(user.pfpUrl)} url={`/profile/${user.id}`} />
  })
  return users;
}

export default Users;
