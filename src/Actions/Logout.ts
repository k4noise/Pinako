import React from "react";
import { CreateAuthRequest } from "../Requests";
import Cookies from 'js-cookie';


async function Logout() {
  try {
    const authRequest = CreateAuthRequest(Cookies.get('accessToken'));
    await authRequest.post('/accounts/auth/logout', { fingerprint: localStorage.getItem("fingerprint") });
  }
  finally {
    localStorage.clear();
    Cookies.remove('accessToken');
    window.location.reload();
  }
}

export default Logout;
