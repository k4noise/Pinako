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
    const { refreshToken, accessToken } = data.tokenPair;
    Cookies.set("accessToken", accessToken, { expires: 30 });
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("fingerprint", props.fingerprint);
    localStorage.setItem("id", data.userId);
    localStorage.setItem("avatarUrl", data.userPfp);
    return true;
  } catch (error) {
    NotificationManager.error('Неверный логин или пароль', 'Ошибка');
    return false;
  }
}

export default LoginUser;