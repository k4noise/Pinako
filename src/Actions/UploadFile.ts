import { AuthRequest } from "../Requests";

const UploadFile = async (props: FormData): Promise<string | null> => {
  const url = '/files/upload';
  try {
    const response = await AuthRequest.post(url, props);
    return response.data.filename;
  }
  catch (error) {
    return null;
  }
};

export default UploadFile;