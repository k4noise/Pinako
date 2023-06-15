import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie"
import Refresh from "./Actions/Refresh";

const CreateAuthRequest = (token: string, contentType: string ='application/json'): AxiosInstance => {
  return axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': contentType
  },
});
}

const GetToken = (): string => (Cookies.get("accessToken"))

const AuthRequest = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Authorization': `Bearer ${GetToken()}`,
  },
});


AuthRequest.interceptors.response.use(config => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    if (localStorage.hasOwnProperty("refreshToken")) {
      await Refresh();
      console.log(originalRequest)
      return await CreateAuthRequest(GetToken()).post(originalRequest.url, originalRequest.data)
    }
  }
  else if (error.response.status === 500)
    return await CreateAuthRequest(GetToken()).post(originalRequest.url, originalRequest.data)
  return Promise.reject(originalRequest)
}
);

const Request = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Content-Type': 'application/json',
  }
});

Request.interceptors.response.use(config => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 500)
    return await CreateAuthRequest(GetToken()).post(originalRequest.url, originalRequest.data)
  return Promise.reject(originalRequest)
});


export { Request, CreateAuthRequest, AuthRequest };