import React from "react";
import { AuthRequest } from "../Requests";
import Cookies from 'js-cookie';

async function Logout() {
  try {
    await AuthRequest.post('/accounts/auth/logout', { fingerprint: localStorage.getItem("fingerprint") });
  }
  finally {
    ClearStorage();
  }
}

const ClearStorage = (): void => {
  localStorage.clear();
  Cookies.remove('accessToken');
}

export default Logout;
export { ClearStorage };
