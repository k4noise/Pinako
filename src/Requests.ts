import axios from "axios";
import Cookies from "js-cookie"
import Refresh from "./Actions/Refresh";

const GetToken = (): string => Cookies.get("accessToken");

const Request = axios.create({
  baseURL: "http://localhost:8081",
});

const AuthRequest = Request;

AuthRequest.interceptors.request.use(config => {
  const token = GetToken();
    if (token)
      config.headers["Authorization"] = `Bearer ${token}`;
  return config;
})

AuthRequest.interceptors.response.use(config => config,
  async (error) => {
  const originalRequest = error.config;
  if ((error.response.status === 401 || error.response.status === 403) && !originalRequest.data?._retry) {
    originalRequest.data['_retry'] = true;
    if (localStorage.hasOwnProperty("refreshToken")) {
      await Refresh();
      return await AuthRequest.post(originalRequest.url, originalRequest.data)
    }
  }
  else if (error.response.status === 500 && !originalRequest.data?._retry) {
    originalRequest.data['_retry'] = true;
    return await AuthRequest.post(originalRequest.url, originalRequest.data)
  }
  return Promise.reject(originalRequest)
}
);



Request.interceptors.response.use(config => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 500)
    return await Request.post(originalRequest.url, originalRequest.data)
  return Promise.reject(originalRequest)
});


export { Request, AuthRequest };