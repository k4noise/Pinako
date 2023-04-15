import React from 'react';
import './Main.css';
import Card from '../Card/Card';

const Main = (): JSX.Element => {
  return (
    <>
      <div className="MainWrapper">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <button className="Register">
        Зарегистрируйтесь, чтобы увидеть больше
      </button>
    </>
  );
};

export default Main;
