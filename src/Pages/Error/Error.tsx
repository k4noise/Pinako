import React from "react";
import { Link } from "react-router-dom";
import './Error.css';

interface ErrorProps {
  number: number,
  description: string
}

const Error = (props: ErrorProps): JSX.Element => {
  return <div className="Error">
    <h2 className="ErrorNumber">{props.number}</h2>
    <p className="ErrorDescription">{props.description}</p>
    <Link to="/" className="LinkToHome">Вернуться на главную</Link>
  </div>
}

export default Error;