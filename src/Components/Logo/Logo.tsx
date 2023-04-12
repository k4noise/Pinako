import React from 'react';
import './Logo.css';

interface LogoProps {
  image: string;
  text?: string;
  size: number; //px
}

const Logo = (props: LogoProps): JSX.Element => {
  return (
    <div className="LogoWrapper">
      <img src={props.image} width={`${props.size}px`} className="LogoImage" />
      {props?.text && <span className="LogoText">{props.text}</span>}
    </div>
  );
};

export default Logo;
