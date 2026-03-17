import axios from "axios";
import { getToken } from "./token";

const BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").trim();

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
