import Cookies from "js-cookie"
import { AuthRequest } from "../Requests";
import { NotificationManager } from 'react-notifications';

interface UploadProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

async function UploadArtwork(props: UploadProps): Promise<boolean> {
  const url: string = '/artworks/upload';
  try {
    await AuthRequest.post(url, props);
    NotificationManager.success('Работа успешно добавлена');
    return true;
  }
  catch (error) {
    console.log(error)
  }
  return false;
}

export default UploadArtwork;