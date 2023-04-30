import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

interface LogoProps {
  image: string;
  text?: string;
  size: number; //px
}

const Logo = (props: LogoProps): JSX.Element => {
  return (
    <Link to="/" className="LogoWrapper">
      <img src={props.image} width={`${props.size}px`} className="LogoImage" />
      {props?.text && <span className="LogoText">{props.text}</span>}
    </Link>
  );
};

export default Logo;
