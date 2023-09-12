import axios from "axios";
import { localStorage } from "@/utils-frontend";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getAccessToken()) {
      config.headers.authorization = `Bearer ${localStorage.getAccessToken()}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
