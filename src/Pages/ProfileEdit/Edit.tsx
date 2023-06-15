import React, { useRef, useState } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import './Edit.css';
import Update from '../../Actions/UpdateProfile';
import User from '../../Components/User/User';
import UserImage from '../../../assets/user.svg';

const Edit = (): JSX.Element => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  const [avatar, setAvatar] = useState();

  const IsValidForm = (): boolean => {
    const form: HTMLFormElement = ref.current as HTMLFormElement;
    const login: string = form?.login?.value as string;
    const username: string = form?.username?.value as string;
    const aboutUser: string = form?.aboutUser?.value as string;
    const password: string = form?.password?.value as string;
    const newPassword: string = form?.newPassword?.value as string;
    const passwordRepeat: string = form?.passwordRepeat?.value as string;
    let isValid: boolean = true;

    if (login.length === 0) {
      NotificationManager.warning('Логин не может быть пустым');
      isValid = false;
    } else if (login.length < 5) {
      NotificationManager.warning('Логин не может быть короче 5 символов');
      isValid = false;
    } else if (login.length >= 20) {
      NotificationManager.warning('Логин не может быть длиннее 20 символов');
      isValid = false;
    }

    if (username.length === 0) {
      NotificationManager.warning('Имя пользователя не может быть пустым');
      isValid = false;
    } else if (username.length < 1) {
      NotificationManager.warning('Имя пользователя не может быть короче 1 символа');
      isValid = false;
    } else if (username.length >= 50) {
      NotificationManager.warning('Имя пользователя не может быть длиннее 50 символов');
      isValid = false;
    }

    if (aboutUser.length === 0) {
      NotificationManager.warning(
        'Информация о пользователе не может быть пустой'
      );
      isValid = false;
    } else if (aboutUser.length > 300) {
      NotificationManager.warning(
        'Информация о пользователе не может быть более 300 символов'
      );
      isValid = false;
    }

    if (isDirty) {
      if (password.length === 0) {
        NotificationManager.warning(
          'Введите текущий пароль для применения изменений'
        );
        isValid = false;
      }
      if (newPassword !== passwordRepeat) {
        NotificationManager.warning('Пароли не совпадают');
        isValid = false;
      }
    }

    return isValid;
  };

  return (
    <div className="AppWrapper">
      <form
        className="EditForm"
        ref={ref}
        onChange={() => setIsDirty(true)}
        onSubmit={async (event) => {
          event.preventDefault();
          if (IsValidForm()) {
            const isSuccess: boolean = await Update({
              login: ref.current.login.value,
              displayName: ref.current.username.value,
              about: ref.current.aboutUser.value
            })
            if (isSuccess) {
                  NotificationManager.info('Войдите заново с новыми данными');
            navigate('/login');
            }
          }
        }}
      >
        <h3 className="FormTitle">Редактировать профиль</h3>
        <span className="ChangeAvatar">
          <User avatar={UserImage} />
          <label htmlFor="UploadAvatar">Изменить фото</label>
          <input
            type="file"
            accept="image/*"
            id="UploadAvatar"
            name="avatar"
            onChange={(event) => {
              const image = document.querySelector(
                '.EditForm .UserAvatar'
              ) as HTMLImageElement;
              const reader = new FileReader();
              reader.onload = function (event) {
                image.src = event.target.result;
              };

              if (event?.target?.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
                setAvatar(URL.createObjectURL(event.target.files[0]));
              }
            }}
          />
        </span>
        <div className="UserData">
          <label htmlFor="username">Логин</label>
          <input type="text" name="login" className="FormInput2" />
          <label htmlFor="username">Имя</label>
          <input type="text" name="username" className="FormInput2" />
          <label htmlFor="AboutUser">О пользователе</label>
          <input type="text" name="aboutUser" className="FormInput2" />
          <label htmlFor="">Текущий пароль</label>
          <input type="password" className="FormInput2" name="password" />
          <label htmlFor="">Новый пароль</label>
          <input type="password" className="FormInput2" name="newPassword" />
          <label htmlFor="">Повторите новый пароль</label>{' '}
          <input type="password" className="FormInput2" name="passwordRepeat" />
        </div>
        <button className="FormButton">Сохранить</button>
      </form>
      <ScrollRestoration />
    </div>
  );
};

export default Edit;
