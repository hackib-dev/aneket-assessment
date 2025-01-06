import Axios, { AxiosInstance } from "axios";
import { User } from "@/types.ts";
import { API_BASE_URL, sessionStorageName } from "@/app/config";

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 1 minutes
});

const axios = (url?: string, refreshToken?: string) => {
  if (refreshToken) {
    axiosInstance.defaults.headers.Authorization = refreshToken;
  }
  if (url) {
    axiosInstance.defaults.baseURL = `${API_BASE_URL}${url}`;
  }

  return axiosInstance;
};

axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    let storedSession;
    if (typeof window !== "undefined") {
      storedSession = sessionStorage.getItem(sessionStorageName);
    }

    if (storedSession) {
      const storedSessionObj: Partial<User> = JSON.parse(storedSession);
      const refreshToken = storedSessionObj.refreshToken as string;
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${refreshToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const AxiosObject = axiosInstance;

export default axios;
