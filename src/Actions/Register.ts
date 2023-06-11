import React from "react";
import axios from "axios";
import { Request } from "../Requests";
import { NotificationManager } from 'react-notifications';

interface RegisterProps {
  login: string,
  password: string
}

async function Register(props: RegisterProps) {
  const url: string = '/accounts/create';
  try {
    await Request.post(url, props);
    NotificationManager.success('Вы зарегестрированы!');
  } catch (error) {
    NotificationManager.error('Учетная запись с таким именем уже существует', 'Ошибка');
  }
}

export default Register;