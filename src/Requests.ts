import axios from "axios";
import Cookies from "js-cookie"
import Refresh from "./Actions/Refresh";

const GetToken = (): string => Cookies.get("accessToken");


const Request = axios.create({
  baseURL: "http://localhost:8081",
});

const GetImage = (fileName: string) => `http://localhost:8081/uploads/${fileName}`

const AuthRequest = axios.create({
  baseURL: "http://localhost:8081",
});;

AuthRequest.interceptors.request.use(config => {
  const token = GetToken();
    if (token)
      config.headers["Authorization"] = `Bearer ${token}`;
  return config;
})

AuthRequest.interceptors.response.use(config => config,
  async (error) => {
  const originalRequest = error.config;
  if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest?._retry) {
    originalRequest['_retry'] = true;
    if (localStorage.hasOwnProperty("refreshToken")) {
      await Refresh();
      return axios(originalRequest);
    }
  }
  else if (error.response?.status === 500 && !originalRequest?._retry) {
    originalRequest['_retry'] = true;
    return axios(originalRequest);
  }
  return Promise.reject(originalRequest)
}
);

Request.interceptors.response.use(config => config, async (error) => {
  const originalRequest = error.config;
  if (error.response?.status === 500)
    return axios(originalRequest);
  return Promise.reject(originalRequest)
});


export { Request, AuthRequest, GetImage };