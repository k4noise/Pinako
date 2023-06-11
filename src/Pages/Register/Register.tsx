import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link, useNavigate, ScrollRestoration } from 'react-router-dom';
import Cookies from "js-cookie"
import './Register.css';
import Register from '../../Actions/Register';
import eyePic from '../../../assets/eye.svg'

const RegisterForm = (): JSX.Element => {
  const [password, setPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState(false);
  const navigate = useNavigate();
  const handlePasswordChange = (event: Event): void => {
    setPassword(!password);
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('Show')
  }
  const handlePasswordRepeatChange = (event: Event): void => {
    setPasswordRepeat(!passwordRepeat);
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('Show')
  }

  const IsValidForm = (form: HTMLFormElement): boolean => {
    const username: string = form?.username?.value as string;
    const password: string = form?.password?.value as string;
    const passwordRepeat: string = form?.passwordRepeat?.value as string;
    const approve: boolean = form?.approve?.checked as boolean;
    let isValid: boolean = true;

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

   useEffect(() => {
    if (Cookies.get("accessToken"))
      navigate('/403');
   });

  return (
    <form
      className="RegisterForm"
      onSubmit={async (event) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();
        if (IsValidForm(form)) {
          await Register({ login: form.username.value, password: form.password.value });
          navigate("/login");
        }
      }}
    >
      <h3 className="FormTitle">Регистрация</h3>
      <input
        type="text"
        placeholder="Имя пользователя"
        className="FormInput"
        name="username"
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
      <label>
        <input
          type={passwordRepeat ? "text" : "password"}
          placeholder="Повтор пароля"
          className="FormInput"
          name="passwordRepeat"
          />
          <button type="button" className='Password Show' onClick={handlePasswordRepeatChange}>
            <img src={eyePic} className='HiddenPassword' />
          </button>
        </label>
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
      <ScrollRestoration />
    </form>
  );
};

export default RegisterForm;
