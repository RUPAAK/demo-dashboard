import api from "./axios";

export function login(email, password) {
  return api.post("/auth/login", { email, password }, { withCredentials: true });
}
