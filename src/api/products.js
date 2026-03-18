import api from "./axios";

export function getProducts(opts = {}) {
  const pg = opts.page ?? 1;
  const lim = opts.limit ?? 10;
  return api.get("/products", { params: { page: pg, limit: lim } }).then((r) => r.data);
}

export function updateProduct(id, key, value) {
  return api.patch(`/products/${id}`, { key, value }).then((r) => r.data);
}

