import React, { useRef, useState } from 'react';
import { ScrollRestoration, useNavigate, useLoaderData, redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import './Edit.css';
import Update from '../../Actions/UpdateProfile';
import ChangePassword from '../../Actions/ChangePassword';
import User from '../../Components/User/User';
import UserImage from '../../../assets/user.svg';
import UploadFile from '../../Actions/UploadFile';
import { GetImage } from '../../Requests';
import {ClearStorage} from '../../Actions/Logout';
import Login from '../../Actions/Login';

const Edit = (): JSX.Element => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const userData = useLoaderData().data;
  const [isDirty, setIsDirty] = useState(false);
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState(false);
  const handlePasswordChange = (event: Event): void => {
    setPassword(!password);
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('Show')
  }
  const handleNewPasswordChange = (event: Event): void => {
    setNewPassword(!passwordRepeat);
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('Show')
  }
  const handlePasswordRepeatChange = (event: Event): void => {
    setPasswordRepeat(!passwordRepeat);
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('Show')
  }

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
            const login = ref.current.login.value;
            let password = ref.current.password.value;
            const formData = new FormData();
            formData.set('file', avatar);
            const avatarUrl = await UploadFile(formData);
            if (ref.current.newPassword.value.length > 0) {
              await ChangePassword({ currentPassword: ref.current.password.value, newPassword: ref.current.newPassword.value })
              password = ref.current.newPassword.value;
            }

            const isSuccess: boolean = await Update({
              login: login,
              displayName: ref.current.username.value,
              about: ref.current.aboutUser.value,
              pfpUrl: avatarUrl,
              currentPassword: password
            })
            if (isSuccess) {
              ClearStorage();
              await Login({
                'login': login,
                'password': password,
                'fingerprint': navigator.userAgent
              });
              navigate('/profile');
            }
          }
        }}
      >
        <h3 className="FormTitle">Редактировать профиль</h3>
        <span className="ChangeAvatar">
          <User avatar={userData?.pfpUrl ? GetImage(userData.pfpUrl) : UserImage} />
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
                setAvatar(event.target.files[0]);
              }
            }}
          />
        </span>
        <div className="UserData">
          <label htmlFor="username">Логин</label>
          <input type="text" name="login" className="FormInput2" defaultValue={userData.login} />
          <label htmlFor="username">Имя</label>
          <input type="text" name="username" className="FormInput2" defaultValue={userData.displayName} />
          <label htmlFor="AboutUser">О пользователе</label>
          <input type="text" name="aboutUser" className="FormInput2" defaultValue={userData.about}/>
          <label htmlFor="password">Текущий пароль</label>
          <label>
            <input type={password ? "text" : "password"} className="FormInput2" name="password" />
            <button type="button" className="Password Show" onClick={handlePasswordChange}><img src="http://localhost:3000/2029fe045292039d99f8.svg" className="HiddenPassword"/></button>
          </label>
          <label htmlFor="newPassword">Новый пароль</label>
          <label>
            <input type={newPassword ? "text" : "password"} className="FormInput2" name="newPassword" />
            <button type="button" className="Password Show" onClick={handleNewPasswordChange}><img src="http://localhost:3000/2029fe045292039d99f8.svg" className="HiddenPassword"/></button>
          </label>
          <label htmlFor="passwordRepeat">Повторите новый пароль</label>
          <label>
            <input type={passwordRepeat ? "text" : "password"} className="FormInput2" name="passwordRepeat" />
            <button type="button" className="Password Show" onClick={handlePasswordRepeatChange}><img src="http://localhost:3000/2029fe045292039d99f8.svg" className="HiddenPassword"/></button>
          </label>
        </div>
        <button className="FormButton">Сохранить</button>
      </form>
      <ScrollRestoration />
    </div>
  );
};

export default Edit;
