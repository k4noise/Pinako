import React from 'react';
import Wave6 from '../../../assets/wave6.svg';
import Wave7 from '../../../assets/wave7.svg';
import Wave8 from '../../../assets/wave8.svg';

const About = (): JSX.Element => {
  return (
    <div className="AppWrapper">
      <div className="About">
        <div className="AboutSection">
          <img src={Wave6} />
          <h3>Что за сервис?</h3>
          <p>Пинако - онлайн портфолио для художников.</p>
        </div>
        <div className="AboutSection">
          <img src={Wave7} />
          <h3>Почему такое название?</h3>
          <p>
            Пинако сокращенно от пинакотека - у древних греков помещение для
            хранения живописных изображений.
          </p>
        </div>
        <div className="AboutSection">
          <img src={Wave8} />
          <h3>Наши преимущества</h3>
          <ul>
            <li>быстрый поиск по тегам</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
