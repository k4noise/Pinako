import { AuthRequest } from "../Requests";

interface UpdatePasswordProps {
  currentPassword: string,
  newPassword: string
}

async function ChangePassword(props: UpdatePasswordProps) {
  const url: string = '/accounts/update/password';
  try {
    await AuthRequest.post(url, props);
  }

  catch (error) {
    console.log(error);
  }
}

export default ChangePassword;