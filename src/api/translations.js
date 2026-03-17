import axios from "axios";

const translationsBase =
  (import.meta.env.VITE_API_URL || "http://localhost:3000/api").trim().replace(/\/$/, "") ||
  "http://localhost:3000/api";

export function getTranslations(locale) {
  const url = `${translationsBase}/translations`;
  return axios
    .get(url, { params: { locale }, timeout: 10000 })
    .then((res) => res.data);
}
