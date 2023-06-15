import React, { useEffect, useState } from 'react';
import { Link, useNavigate, ScrollRestoration } from 'react-router-dom';
import Cookies from "js-cookie"
import { NotificationManager } from 'react-notifications';
import Login from "../../Actions/Login"
import './Login.css';
import eyePic from '../../../assets/eye.svg'

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const handlePasswordChange = (event: Event): void => {
    setPassword(!password);
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('Show')
  }

  const IsValidForm = (form: HTMLFormElement): boolean => {
    const username: string = form?.username?.value as string;
    const password: string = form?.password?.value as string;
    let isValid = true;

    if (username.length === 0) {
      NotificationManager.warning('Не указано имя пользователя');
      isValid = false;
    } else if (username.length < 5) {
      NotificationManager.warning('Имя пользователя не может быть короче 5 символов');
      isValid = false;
    } else if (username.length >= 20) {
      NotificationManager.warning('Имя пользователя не может быть длиннее 20 символов');
      isValid = false;
    }

    if (password.length === 0) {
      NotificationManager.warning('Не указан пароль');
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    if (Cookies.get("accessToken"))
      navigate('/403');
  }, []);

  return (
    <>
      <form
        action="/login"
        method="post"
        className="LoginForm"
        onSubmit={async (event) => {
          const form = event.target as HTMLFormElement;
          event.preventDefault();
          if (IsValidForm(form)) {
            const isLogged = await Login({
              login: form.username.value, password: form.password.value, fingerprint: navigator.
                userAgent
            });
            isLogged && navigate('/');
          }
        }}
      >
        <h3 className="FormTitle">Вход</h3>
        <input
          type="text"
          placeholder="Логин"
          name="username"
          className="FormInput"
        />
        <label>
        <input
          type={password ? "text" : "password"}
          placeholder="Пароль"
          className="FormInput"
          name="password"
          />
          <button type="button" className='Password Show' onClick={handlePasswordChange}>
            <img src={eyePic} className='HiddenPassword' />
          </button>
      </label>
        <button type="submit" className="FormButton">
          Войти
        </button>
        <span className="ToRegister">
          Еще не зарегистрировались?&nbsp;
          <Link to="/register">Зарегистрируйтесь сейчас</Link>
        </span>
      <ScrollRestoration />
      </form>
    </>
  );
};

export default LoginForm;
