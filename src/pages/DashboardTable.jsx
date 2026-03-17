import { ArrowDown, ArrowRight, MoreHorizontal } from "lucide-react";
import "./DashboardTable.css";

const DEFAULT_LABELS = {
  article_no: "Article No.",
  product_service: "Product/Service",
  in_price: "In Price",
  price: "Price",
  unit: "Unit",
  in_stock: "In Stock",
  description: "Description",
};

const FAKE_ROWS = [
  {
    articleNo: "1234567890",
    product: "This is a test product with fifty characters this!",
    inPrice: "900500",
    price: "1500800",
    unit: "kilometers/hour",
    inStock: "2500600",
    description: "This is the description with fifty characters this",
  },
  {
    articleNo: "1000000001",
    product: "Premium subscription (monthly)",
    inPrice: "0",
    price: "199",
    unit: "month",
    inStock: "—",
    description: "Access to all features for one month",
  },
  {
    articleNo: "1000000002",
    product: "Consulting (hourly)",
    inPrice: "0",
    price: "1250",
    unit: "hour",
    inStock: "—",
    description: "Remote consulting billed per hour",
  },
  {
    articleNo: "2000000042",
    product: "Office chair, ergonomic",
    inPrice: "950",
    price: "1499",
    unit: "pcs",
    inStock: "18",
    description: "Adjustable lumbar support and armrests",
  },
  {
    articleNo: "3000123400",
    product: "Shipping & handling",
    inPrice: "0",
    price: "89",
    unit: "order",
    inStock: "—",
    description: "Standard delivery within 3–5 business days",
  },
  {
    articleNo: "4000007777",
    product: "Stainless steel water bottle 1L",
    inPrice: "65",
    price: "129",
    unit: "pcs",
    inStock: "240",
    description: "Keeps drinks cold for up to 24 hours",
  },
];

function DashboardTable({ labels = {} }) {
  const t = { ...DEFAULT_LABELS, ...labels };

  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>
              <span className="dashboard-table-th-sortable dashboard-table-th-sortable-blue">
                {t.article_no}
                <ArrowDown
                  className="dashboard-table-sort-icon is-cyan"
                  size={18}
                  strokeWidth={2.5}
                />
              </span>
            </th>
            <th>
              <span className="dashboard-table-th-sortable dashboard-table-th-sortable-green">
                {t.product_service}
                <ArrowDown
                  className="dashboard-table-sort-icon is-green"
                  size={18}
                  strokeWidth={2.5}
                />
              </span>
            </th>
            <th>{t.in_price}</th>
            <th>{t.price}</th>
            <th>{t.unit}</th>
            <th>{t.in_stock}</th>
            <th>{t.description}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {FAKE_ROWS.map((r) => (
            <tr key={r.articleNo}>
              <td>
                <span className="dashboard-table-first-cell">
                  <ArrowRight
                    className="dashboard-table-row-hover-arrow"
                    size={18}
                    strokeWidth={2.5}
                  />
                  <span className="dashboard-table-cell-pill">{r.articleNo}</span>
                </span>
              </td>
              <td>
                <span className="dashboard-table-cell-pill">{r.product}</span>
              </td>
              <td>
                <span className="dashboard-table-cell-pill">{r.inPrice}</span>
              </td>
              <td>
                <span className="dashboard-table-cell-pill">{r.price}</span>
              </td>
              <td>
                <span className="dashboard-table-cell-pill">{r.unit}</span>
              </td>
              <td>
                <span className="dashboard-table-cell-pill">{r.inStock}</span>
              </td>
              <td>
                <span className="dashboard-table-cell-pill">
                  {r.description}
                </span>
              </td>
              <td className="dashboard-table-cell-icon">
                <MoreHorizontal size={18} strokeWidth={2.5} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
