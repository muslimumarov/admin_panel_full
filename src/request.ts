import axios from "axios";
import { ACCESS_TOKEN_KEY } from "./core/store/constants/storage.constants.ts";
import Cookies from "js-cookie";

const request = axios.create({
  withCredentials: true,
  // baseURL: config.MODE.PROD ? config.API_ROOT : "",
  // baseURL: config.API_ROOT,
  baseURL: "",
});

request.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    } catch (err) {
      console.log(err);
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default request;
