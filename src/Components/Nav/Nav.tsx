import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import User from '../User/User';
import './Nav.css';
import LogoImage from '../../../assets/logo.svg';
import SearchButtonImage from '../../../assets/magnifier.svg';

interface LinkProps {
  name: string;
  url: string;
}

const Nav = (): JSX.Element => {
  return (
    <>
      <nav className="UtilityNavigation">
        <Logo image={LogoImage} text="Пинако" size={50} />
        <div className="UtilityNavigationWrapper">
          <Links url="/" name="Главная" />
          <Links url="/profile" name="Профиль" />
          <Links url="/users" name="Пользователи" />
          <Links url="/about" name="О нас" />
        </div>
        <Search />
        <User />
        <div className="UserNavigation" onClick={ToggleMobileMenu}>
          <Link to="/register">Зарегестрироваться</Link>
          <Link to="/login">Войти</Link>
        </div>
        <button onClick={ToggleMobileMenu} className="UtilityMobileNavigaion">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </>
  );
};

const Links = (props: LinkProps): JSX.Element => {
  return (
    <NavLink
      to={props.url}
      className={({ isActive }) => {
        return isActive ? 'Link CurrentLink' : 'Link';
      }}
      onClick={ToggleMobileMenu}
    >
      {props.name}
    </NavLink>
  );
};

const Search = (): JSX.Element => {
  const location = useLocation();
  const isVisible: boolean =
    location.pathname !== '/login' && location.pathname !== '/register';
  return isVisible ? (
    <form
      method="get"
      action="/search"
      className={
        location.pathname === '/'
          ? 'SearchForm'
          : 'SearchForm SearchFormNoHeader'
      }
    >
      <input
        type="text"
        placeholder="Поиск"
        className="SearchInput"
        name="query"
      />
      <button type="submit" className="SearchButton">
        <img src={SearchButtonImage} />
      </button>
    </form>
  ) : (
    <form className="SearchForm"></form>
  );
};

const ToggleMobileMenu = () => {
  const mobileMenuButton: HTMLElement = document.querySelector(
    '.UtilityMobileNavigaion'
  ) as HTMLElement;
  if (
    window.getComputedStyle(mobileMenuButton).getPropertyValue('display') ===
    'none'
  )
    return;
  const navigation: HTMLElement = document.querySelector(
    '.UtilityNavigationWrapper'
  ) as HTMLElement;
  const footer: HTMLElement = document.querySelector('.Footer') as HTMLElement;
  const userNav: HTMLElement = document.querySelector(
    '.UserNavigation'
  ) as HTMLElement;
  const body: HTMLElement = document.querySelector('body') as HTMLElement;
  body.style.overflow = body.style.overflow == 'hidden' ? 'visible' : 'hidden';
  navigation.style.display =
    navigation.style.display === 'flex' ? 'none' : 'flex';
  footer.style.visibility =
    footer.style.visibility === 'visible' ? 'hidden' : 'visible';
  userNav.style.visibility =
    userNav.style.visibility === 'visible' ? 'hidden' : 'visible';
};

export default Nav;
