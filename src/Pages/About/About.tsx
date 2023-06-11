import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Wave6 from '../../../assets/wave6.svg';
import Wave7 from '../../../assets/wave7.svg';
import Wave8 from '../../../assets/wave8.svg';
import './About.css';

const About = (): JSX.Element => {
  return (
    <div className="AppWrapper">
      <div className="About">
        <div className="AboutSection">
          <img src={Wave6} className="Wave6" />
          <h3 className="AboutHeader">Что за сервис?</h3>
          <p>Пинако - онлайн портфолио для художников.</p>
        </div>
        <div className="AboutSection">
          <img src={Wave7} className="Wave7" />
          <h3 className="AboutHeader">Наша команда</h3>
          <p>
            Мы - первокурсники ИРИТ-РТФ заинтересованные в создании самого
            удобного сервиса по созданию и хранению портфолио для дизайнеров.
          </p>
        </div>
        <div className="AboutSection">
          <img src={Wave8} className="Wave8" />
          <h3 className="AboutHeader">Наши преимущества</h3>
          <ul>
            <li>Удобная система тегов</li>
            <li>Ориентированно на дизайнеров</li>
            <li>Удобный поиск</li>
          </ul>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default About;
