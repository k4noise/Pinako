import Cookies from "js-cookie"
import { CreateAuthRequest } from "../Requests";
import { NotificationManager } from 'react-notifications';

interface UploadProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

async function UploadArtwork(props: UploadProps) {
  const url: string = '/artworks/upload';
  try {
    const authRequest = CreateAuthRequest(Cookies.get('accessToken'));
    await authRequest.post(url, props);
    NotificationManager.success('Работа успешно добавлена');
  }
  catch (error) {
    console.log(error)
  }
}

export default UploadArtwork;