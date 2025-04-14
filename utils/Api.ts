import Auth from "@/utils/auth";
import axios, { InternalAxiosRequestConfig } from "axios";

const Api = axios.create({
  baseURL: process.env.BASE_URL,
});

Api.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: InternalAxiosRequestConfig<any>) => {
    if (await Auth.isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Api;
