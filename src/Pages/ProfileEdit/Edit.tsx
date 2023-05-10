import React from 'react';
import './Edit.css';
import User from '../../Components/User/User';
import UserImage from '../../../assets/user.svg';

const Edit = (): JSX.Element => {
  return (
    <div className="AppWrapper">
      <form className="EditForm">
        <h3 className="FormTitle">Редактировать профиль</h3>
        <span className="ChangeAvatar">
          <User avatar={UserImage} />
          <label htmlFor="UploadAvatar">Изменить фото</label>
          <input type="file" accept="image/*" id="UploadAvatar" />
        </span>
        <div className="UserData">
          <label htmlFor="UserName">Имя пользователя</label>
          <input type="text" name="UserName" className="FormInput2" />
          <label htmlFor="AboutUser">О пользователе</label>
          <input type="text" name="AboutUser" className="FormInput2" />
          <label htmlFor="">E-mail</label>
          <input type="text" className="FormInput2" />
          <label htmlFor="">Текущий пароль</label>
          <input type="password" className="FormInput2" />
          <label htmlFor="">Новый пароль</label>
          <input type="password" className="FormInput2" />
          <label htmlFor="">Повторите новый пароль</label>{' '}
          <input type="password" className="FormInput2" />
        </div>
        <button className="FormButton">Сохранить</button>
      </form>
    </div>
  );
};

export default Edit;
