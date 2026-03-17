import api from "./axios";

export function login(email, password) {
  return api.post("/auth/login", { email, password }, { withCredentials: true });
}

export function getProfile() {
  return api.get("/auth/profile", { withCredentials: true }).then((res) => res.data);
}
