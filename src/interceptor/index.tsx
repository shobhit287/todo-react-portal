import axios from "axios";
import {notification} from "antd";
import { interceptorHandledError } from "./interceptorHandledErrors";
const API_URL = import.meta.env.VITE_API_URL;

export const service = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    // const frontendOrigin = window.location.origin;
    // if (!config.headers['Origin']) {
    //   config.headers['Origin'] = frontendOrigin;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  return response.data;
},
(error) => {
    const {status} = error?.response || {};
    const {error: errorMsg} = error?.response?.data || {};
    const {code} = error || {};
    if(status == 500) {
        notification.error({message: errorMsg || "Internal Server Error"});
    } else if (status == 408) {
        notification.error({message: "Request Timeout"});
    } else if (status == 429) {
        notification.error({message: "Too Many Requests"});
    } else if(interceptorHandledError.includes(code)) {
        notification.error({message: error.message || errorMsg || code});
    }
    return Promise.reject(error);
});