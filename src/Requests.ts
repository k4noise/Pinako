import axios, { AxiosInstance } from "axios";

const CreateAuthRequest = (token: string): AxiosInstance => {
  return axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
});
}

const Request = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Content-Type': 'application/json',
  }
});

export { Request, CreateAuthRequest };