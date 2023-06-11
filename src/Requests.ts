import axios from "axios";
import Cookies from "js-cookie"

const AuthRequest = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
    'Content-Type': 'application/json'
  },
});

const Request = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Content-Type': 'application/json',
  }
});

export { AuthRequest, Request };