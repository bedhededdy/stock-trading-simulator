import { createContext } from "react";
import axios, { AxiosInstance } from "axios";

interface IHTTPContext {
  http: AxiosInstance;
}

const instance = axios.create()
instance.interceptors.request.use(config => {
  config.baseURL = "http://localhost:8000";
  return config;
}, error => {
  return Promise.reject(error);
});

const HTTPContext = createContext<IHTTPContext>({http: instance});
export default HTTPContext;
