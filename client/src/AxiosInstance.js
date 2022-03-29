import axios from "axios";

const defaultOptions = {
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("jwt");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
