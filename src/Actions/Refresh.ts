import Cookies from "js-cookie"
import { Request } from "../Requests";
import Logout from "./Logout";


async function Refresh() {
  const url: string = '/accounts/auth/refresh';
  const retryCount = 3;
  let currentAttempt = 0;
  const body = {
    token: localStorage.getItem('refreshToken'),
    fingerprint: localStorage.getItem("fingerprint")
  };
  try {
    currentAttempt++;
    const response = await Request.post(url, body);
    const data = response.data;
    localStorage.setItem("refreshToken", data.refreshToken);
    Cookies.set("accessToken", data.accessToken, { expires: 1 / 24 });
  } catch (error) {
    if (currentAttempt = retryCount)
      Logout();
  }
}

export default Refresh;