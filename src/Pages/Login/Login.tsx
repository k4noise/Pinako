import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginForm = (): JSX.Element => {
  return (
    <>
      <form
        action="/login"
        method="post"
        className="LoginForm"
        onSubmit={(event) => event.preventDefault()}
      >
        <h3 className="FormTitle">Вход</h3>
        <input type="email" placeholder="E-mail" className="FormInput" />
        <input type="password" placeholder="Пароль" className="FormInput" />
        <button type="submit" className="FormButton">
          Войти
        </button>
        <span className="ToRegister">
          Еще не зарегистрировались?&nbsp;
          <Link to="/register">Зарегистрируйтесь сейчас</Link>
        </span>
      </form>
    </>
  );
};

export default LoginForm;
