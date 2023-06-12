import Cookies from "js-cookie"
import { CreateAuthRequest } from "../Requests";
import Refresh from "./Refresh";
import { NotificationManager } from 'react-notifications';

interface LoginProps {
  login: string;
  displayName: string;
  about: string;
}

async function Update(props: LoginProps) {
  const url: string = '/accounts/update';
  try {
    const authRequest = CreateAuthRequest(Cookies.get('accessToken'));
    authRequest.post(url, props);
    NotificationManager.success('Профиль обновлен успешно');
    Refresh();
  }
  catch (error) {
    NotificationManager.error('Логин занят');
    console.log(error)
  }
}

export default Update;