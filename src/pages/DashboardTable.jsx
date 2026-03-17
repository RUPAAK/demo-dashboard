import { ArrowDown, ArrowRight, MoreHorizontal } from "lucide-react";
import "./DashboardTable.css";

const defaultLabels = {
  article_no: "Article No.",
  product_service: "Product/Service",
  in_price: "In Price",
  price: "Price",
  unit: "Unit",
  in_stock: "In Stock",
  description: "Description",
};

function DashboardTable({ labels = {}, rows = [], isLoading = false }) {
  const t = { ...defaultLabels, ...labels };

  if (isLoading) {
    return <div className="loadingState">Loading...</div>;
  }

  if (!rows?.length) {
    return <div className="NO_DATA">No data</div>;
  }

  const data = rows.map((r) => ({
    id: r.id,
    articleNo: r.article_no,
    product: r.product_service,
    inPrice: r.in_price,
    price: r.price,
    unit: r.unit,
    inStock: r.in_stock,
    description: r.description,
  }));

  return (
    <div className="tblWrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>
              <span className="thSort thSortCyan">
                {t.article_no}
                <ArrowDown
                  className="dashboard-table-sort-icon is-cyan"
                  size={18}
                  strokeWidth={2.5}
                />
              </span>
            </th>
            <th>
              <span className="thSort thSortGrn">
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
          {data.map((r) => (
            <tr key={r.id ?? r.articleNo}>
              <td>
                <span className="first_cell">
                  <ArrowRight
                    className="ROW_ARROW"
                    size={18}
                    strokeWidth={2.5}
                  />
                  <span className="cellP">{r.articleNo}</span>
                </span>
              </td>
              <td>
                <span className="cellP">{r.product}</span>
              </td>
              <td>
                <span className="cellP">{r.inPrice}</span>
              </td>
              <td>
                <span className="cellP">{r.price}</span>
              </td>
              <td>
                <span className="cellP">{r.unit}</span>
              </td>
              <td>
                <span className="cellP">{r.inStock}</span>
              </td>
              <td>
                <span className="cellP">
                  {r.description}
                </span>
              </td>
              <td className="actIcon">
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
