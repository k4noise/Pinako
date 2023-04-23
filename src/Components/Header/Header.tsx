import React from 'react';
import Logo from '../Logo/Logo';
import LogoImg from '../../../assets/logo.svg';
import './Header.css';
import wave2 from '../../../assets/Vector 1.svg';
import wave1 from '../../../assets/Vector 2.svg';

const Header = (): JSX.Element => {
  return (
    <header className="Header">
      <h1 className="HeaderTitle">Пинако</h1>
      <h2 className="HeaderTagline">Черпай вдохновение и делись опытом</h2>
      <img src={wave1} className="Wave1" />
      <img src={wave2} className="Wave2" />
      <Logo image={LogoImg} size={300} />
    </header>
  );
};

export default Header;
