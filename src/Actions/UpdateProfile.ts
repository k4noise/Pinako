import { AuthRequest } from "../Requests";
import { NotificationManager } from 'react-notifications';
import { ClearStorage } from "./Logout";

interface UpdateProps {
  login: string;
  displayName: string;
  about: string;
  currentPassword: string;
}

async function Update(props: UpdateProps): Promise<boolean> {
  const url: string = '/accounts/update';
  try {
    await AuthRequest.post(url, props);
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