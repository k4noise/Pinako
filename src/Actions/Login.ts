import Cookies from "js-cookie"
import { NotificationManager } from 'react-notifications';
import { Request } from "../Requests";

interface LoginProps {
  login: string;
  password: string;
  fingerprint: string;
}


async function LoginUser(props: LoginProps): Promise<boolean> {
  const url: string = '/accounts/auth/login';
  try {
    const response = await Request.post(url, props);
    const data = response.data;
    Cookies.set("accessToken", data.accessToken, { expires: 30 });
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("fingerprint", props.fingerprint);
    NotificationManager.success('Вход выполнен успешно');
    return true;
  } catch (error) {
    NotificationManager.error('Неверный логин или пароль', 'Ошибка');
    return false;
  }
}

export default LoginUser;