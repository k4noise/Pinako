import React, { useRef } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import './Register.css';

const RegisterForm = (): JSX.Element => {
  const ref = useRef(null);

  const IsValidForm = (): boolean => {
    const form: HTMLFormElement = ref.current as HTMLFormElement;
    const username: string = form?.username?.value as string;
    const email: string = form?.email?.value as string;
    const password: string = form?.password?.value as string;
    const passwordRepeat: string = form?.passwordRepeat?.value as string;
    const approve: boolean = form?.approve?.checked as boolean;
    let isValid: boolean = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.length === 0) {
      NotificationManager.warning('Не указано имя пользователя');
      isValid = false;
    }
    if (email.length === 0) {
      NotificationManager.warning('Не указан e-mail');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      NotificationManager.warning('Введите корректный e-mail');
      isValid = false;
    }
    if (password.length === 0) {
      NotificationManager.warning('Не указан пароль');
      isValid = false;
    } else if (password !== passwordRepeat) {
      NotificationManager.warning('Пароли не совпадают');
      isValid = false;
    }

    if (!approve) {
      NotificationManager.error(
        'Без согласия на обработку данных регистрация невозможна'
      );
      isValid = false;
    }

    return isValid;
  };

  return (
    <form
      ref={ref}
      action="/register"
      method="post"
      className="RegisterForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (IsValidForm())
          NotificationManager.error('Данная функция в разработке', 'Ошибка');
      }}
    >
      <h3 className="FormTitle">Регистрация</h3>
      <input
        type="text"
        placeholder="Имя пользователя"
        className="FormInput"
        name="username"
      />
      <input
        type="text"
        inputMode="email"
        placeholder="E-mail"
        className="FormInput"
        name="email"
      />
      <input
        type="password"
        placeholder="Пароль"
        className="FormInput"
        name="password"
      />
      <input
        type="password"
        placeholder="Повтор пароля"
        className="FormInput"
        name="passwordRepeat"
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
