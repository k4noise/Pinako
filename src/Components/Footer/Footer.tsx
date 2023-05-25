import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = (): JSX.Element => {
  const location = useLocation();
  return (
    <footer className={`Footer ${location.pathname !== '/' && 'HiddenFooter'}`}>
      <span>© Sunrise, 2023</span>
      <a
        href="https://github.com/Yrwlcm/Digital-portfolio"
        className="GithubLink"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
