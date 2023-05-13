import React, { useRef } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginForm = (): JSX.Element => {
  const ref = useRef(null);

  const IsValidForm = (): boolean => {
    const form: HTMLFormElement = ref.current as HTMLFormElement;
    const email: string = form?.email?.value as string;
    const password: string = form?.password?.value as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

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
    }
    return isValid;
  };

  return (
    <>
      <form
        ref={ref}
        action="/login"
        method="post"
        className="LoginForm"
        onSubmit={(event) => {
          event.preventDefault();
          if (IsValidForm())
            NotificationManager.error('Данная функция в разработке', 'Ошибка');
        }}
      >
        <h3 className="FormTitle">Вход</h3>
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          inputMode="email"
          className="FormInput"
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          className="FormInput"
        />
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
