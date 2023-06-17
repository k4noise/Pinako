import Cookies from "js-cookie"
import { Request } from "../Requests";
import Logout from "./Logout";

async function Refresh() {
  const url: string = '/accounts/auth/refresh';
  const body = {
    token: localStorage.getItem('refreshToken'),
    fingerprint: localStorage.getItem("fingerprint")
  };

  let data;

  try {
    const response = await Request.post(url, body);
    data = response.data;
    localStorage.setItem("refreshToken", data.refreshToken);
    Cookies.set("accessToken", data.accessToken, { expires: 1 / 24 });
  } catch (error) {
    if (error.response.status == 410)
      Logout();
  }
}

export default Refresh;