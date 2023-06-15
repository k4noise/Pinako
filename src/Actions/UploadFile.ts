import Cookies from "js-cookie"
import { CreateAuthRequest } from "../Requests";

const UploadFile = async (props: FormData): Promise<string | null> => {
  const url = '/files/upload';
  const authRequest = CreateAuthRequest(Cookies.get('accessToken'), 'multipart/form-data');
  try {
    const response = await authRequest.post(url, props);
    return response.data.filename;
  }
  catch (error) {
    return null;
  }
};

export default UploadFile;