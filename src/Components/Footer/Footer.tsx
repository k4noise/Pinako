import React from 'react';
import './Footer.css';

const Footer = (): JSX.Element => {
  return (
    <footer className="Footer">
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
