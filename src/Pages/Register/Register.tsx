import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const RegisterForm = (): JSX.Element => {
  return (
    <form
      action="/register"
      method="post"
      className="RegisterForm"
      onSubmit={(event) => event.preventDefault()}
    >
      <h3 className="FormTitle">Регистрация</h3>
      <input type="text" placeholder="Имя пользователя" className="FormInput" />
      <input type="email" placeholder="E-mail" className="FormInput" />
      <input type="password" placeholder="Пароль" className="FormInput" />
      <input
        type="password"
        placeholder="Повтор пароля"
        className="FormInput"
      />
      <label className="FormCheckboxInput">
        <input type="checkbox" name="approve" />
        Согласие на обработку персональных данных
      </label>

      <button type="submit" className="FormButton">
        Регистрация
      </button>
      <span className="ToLogin">
        Уже зарегистрировались?&nbsp;
        <Link to="/login">Войдите в аккаунт</Link>
      </span>
    </form>
  );
};

export default RegisterForm;
