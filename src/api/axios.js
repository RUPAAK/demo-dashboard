import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").trim();

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
