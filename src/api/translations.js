import api from "./axios";

export function getTranslations(locale) {
  return api.get("/translations", { params: { locale } }).then((res) => res.data);
}
