import api from "./axios";

export function getProducts(opts = {}) {
  const pg = opts.page ?? 1;
  const lim = opts.limit ?? 10;
  return api.get("/products", { params: { page: pg, limit: lim } }).then((r) => r.data);
}

