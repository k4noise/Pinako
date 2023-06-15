import Cookies from "js-cookie"
import { CreateAuthRequest } from "../Requests";
import Refresh from "./Refresh";
import { NotificationManager } from 'react-notifications';
import { ClearStorage } from "./Logout";
import { useNavigate } from "react-router-dom";

interface UpdateProps {
  login: string;
  displayName: string;
  about: string;
}

async function Update(props: UpdateProps): Promise<boolean> {
  const url: string = '/accounts/update';
    const authRequest = CreateAuthRequest(Cookies.get('accessToken'));
  try {
    await authRequest.post(url, props);
    NotificationManager.success('Профиль обновлен успешно');
    ClearStorage();
    return true;
  }

  catch (error) {
    console.log(error)
    if (error?.response?.status === 409)
      NotificationManager.error('Логин занят');
  }
  return false;
}

export default Update;