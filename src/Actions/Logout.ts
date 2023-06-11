import React from "react";
import { AuthRequest } from "../Requests";
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';


async function Logout() {
  try {
    await AuthRequest.post('/accounts/auth/logout', { fingerprint: localStorage.getItem("fingerprint") });
  }
  finally {
    localStorage.clear();
    Cookies.remove('accessToken');
    window.location.reload();
  }
}

export default Logout;
