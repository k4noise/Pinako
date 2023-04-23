import React from 'react';
import Logo from '../Logo/Logo';
import User from '../User/User';
import './Nav.css';
import LogoImage from '../../../assets/logo.svg';
import SearchButtonImage from '../../../assets/magnifier.svg';

interface LinkProps {
  name: string;
  url: string;
  isActive: boolean;
}

const Nav = (): JSX.Element => {
  return (
    <nav className="UtilityNavigation">
      <Logo image={LogoImage} text="Пинако" size={50} />
      <div className="UtilityNavigationWrapper">
        <Link url="./" name="Главная" isActive={true} />
        <Link url="./profile" name="Профиль" isActive={false} />
        <Link url="./users" name="Пользователи" isActive={false} />
        <Link url="./about" name="О нас" isActive={false} />
      </div>
      <Search />
      <User />
      <div className="UserNavigation">
        <a>Зарегестрироваться</a>
        <a>Войти</a>
      </div>
      <button onClick={ShowMobileMenu} className="UtilityMobileNavigaion">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

const Link = (props: LinkProps): JSX.Element => {
  return (
    <a
      href={props.url}
      className={`Link ${props.isActive ? 'CurrentLink' : ''}`}
    >
      {props.name}
    </a>
  );
};

const Search = (): JSX.Element => {
  return (
    <form className="SearchForm">
      <input type="text" placeholder="Поиск" className="SearchInput" />
      <button type="submit" className="SearchButton">
        <img src={SearchButtonImage} />
      </button>
    </form>
  );
};

const ShowMobileMenu: void = () => {
  const navigation: JSX.Element = document.querySelector(
    '.UtilityNavigationWrapper'
  );
  const footer: JSX.Element = document.querySelector('.Footer');
  const userNav: JSX.Element = document.querySelector('.UserNavigation');
  const body: JSX.Element = document.querySelector('body');
  body.style.overflow = body.style.overflow == 'hidden' ? 'visible' : 'hidden';
  navigation.style.display =
    navigation.style.display === 'flex' ? 'none' : 'flex';
  footer.style.visibility =
    footer.style.visibility === 'visible' ? 'hidden' : 'visible';
  userNav.style.visibility =
    userNav.style.visibility === 'visible' ? 'hidden' : 'visible';
};

export default Nav;
