import React, { useRef, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import './Edit.css';
import User from '../../Components/User/User';
import UserImage from '../../../assets/user.svg';

const Edit = (): JSX.Element => {
  const ref = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  const IsValidForm = (): boolean => {
    const form: HTMLFormElement = ref.current as HTMLFormElement;
    const username: string = form?.username?.value as string;
    const aboutUser: string = form?.aboutUser?.value as string;
    const email: string = form?.email?.value as string;
    const password: string = form?.password?.value as string;
    const newPassword: string = form?.newPassword?.value as string;
    const passwordRepeat: string = form?.passwordRepeat?.value as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid: boolean = true;

    if (username.length === 0) {
      NotificationManager.warning('Имя пользователя не может быть пустым');
      isValid = false;
    }
    if (aboutUser.length === 0) {
      NotificationManager.warning(
        'Информация о пользователе не может быть пустой'
      );
      isValid = false;
    }
    if (email.length === 0) {
      NotificationManager.warning('E-mail не может быть пустым');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      NotificationManager.warning('Введите корректный e-mail');
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
        onSubmit={(event) => {
          event.preventDefault();
          if (IsValidForm())
            NotificationManager.error('Данная функция в разработке', 'Ошибка');
        }}
      >
        <h3 className="FormTitle">Редактировать профиль</h3>
        <span className="ChangeAvatar">
          <User avatar={UserImage} />
          <label htmlFor="UploadAvatar">Изменить фото</label>
          <input type="file" accept="image/*" id="UploadAvatar" name="avatar" />
        </span>
        <div className="UserData">
          <label htmlFor="username">Имя пользователя</label>
          <input type="text" name="username" className="FormInput2" />
          <label htmlFor="AboutUser">О пользователе</label>
          <input type="text" name="aboutUser" className="FormInput2" />
          <label htmlFor="">E-mail</label>
          <input type="text" className="FormInput2" name="email" />
          <label htmlFor="">Текущий пароль</label>
          <input type="password" className="FormInput2" name="password" />
          <label htmlFor="">Новый пароль</label>
          <input type="password" className="FormInput2" name="newPassword" />
          <label htmlFor="">Повторите новый пароль</label>{' '}
          <input type="password" className="FormInput2" name="passwordRepeat" />
        </div>
        <button className="FormButton">Сохранить</button>
      </form>
    </div>
  );
};

export default Edit;
