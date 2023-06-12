import Cookies from "js-cookie"
import { NotificationManager } from 'react-notifications';
import { Request } from "../Requests";
import Refresh from "./Refresh";

interface LoginProps {
  login: string;
  password: string;
  fingerprint: string;
}


async function LoginUser(props: LoginProps): Promise<boolean> {
  const url: string = '/accounts/auth/login';
  const updateTime: number = 59 * 60 * 1000; //59 минут
  try {
    const response = await Request.post(url, props);
    const data = response.data;
    Cookies.set("accessToken", data.accessToken, { expires: 1 / 24 });
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("fingerprint", props.fingerprint);
    NotificationManager.success('Вход выполнен успешно');
    setInterval(Refresh, updateTime);
    return true;
  } catch (error) {
    NotificationManager.error('Неверный логин или пароль', 'Ошибка');
    return false;
  }
}

export default LoginUser;