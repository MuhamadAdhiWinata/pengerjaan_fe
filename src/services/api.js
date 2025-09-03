import axios from "axios";
import { getToken } from "./authServices";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔹 Interceptor: otomatis sisipkan Authorization header
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
