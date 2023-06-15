import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import User from '../User/User';
import Search from '../Search/Search';
import Logout from '../../Actions/Logout';
import './Nav.css';
import UserAvatar from '../../../assets/user.svg';
import LogoImage from '../../../assets/logo.svg';

interface LinkProps {
  name: string;
  url: string;
}

const Nav = (): JSX.Element => {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const navigation: HTMLElement = document.querySelector(
        '.UtilityNavigationWrapper'
      ) as HTMLElement;
      if (
        window.innerWidth > 993 &&
        window.getComputedStyle(navigation).getPropertyValue('display') ===
          'none'
      )
        navigation.style.display = 'flex';
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsAuth(Cookies.get("accessToken"))
  },[location]);

  return (
    <nav className="UtilityNavigation">
      <Logo image={LogoImage} text="Пинако" size={50} />
      <div className="UtilityNavigationWrapper">
        <Links url="/" name="Главная" />
        <Links url="/profile" name="Профиль" />
        <Links url="/users" name="Пользователи" />
        <Links url="/about" name="О нас" />
      </div>
      <Search locatedInNav={true} placeholder="Поиск" />
      <User avatar={UserAvatar} />
      <div className="UserNavigation" onClick={ToggleMobileMenu}>
        {isAuth ?
          <>
            <Link to="/profile/upload">Добавить работу</Link>
            <Link to="" onClick={async (event) => {
              event.preventDefault();
              Logout();
              setIsAuth(false);
            }
            }>Выйти</Link>
          </>
          :<>
            <Link to="/register">Зарегестрироваться</Link>
            <Link to="/login">Войти</Link>
          </>
      }
      </div>
      <button onClick={ToggleMobileMenu} className="UtilityMobileNavigaion">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
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
  footer.style.display = footer.style.display === 'flex' ? 'none' : 'flex';
  userNav.style.visibility =
    userNav.style.visibility === 'visible' ? 'hidden' : 'visible';
};

export default Nav;
