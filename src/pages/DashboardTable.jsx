import { ArrowDown, ArrowRight, MoreHorizontal, Loader2 } from "lucide-react";
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

function DashboardTable({ labels = {}, rows = [], isLoading = false, onUpdate, updatingRowId }) {
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
          {data.map((r) => {
            const isUpdating = updatingRowId === r.id;

            const handleBlur = (column, original) => (e) => {
              const raw = e.target.value;
              const value = e.target.type === "number" ? Number(raw) : raw;
              if (value === original) return;
              onUpdate?.(r.id, column, value);
            };

            return (
              <tr
                key={r.id ?? r.articleNo}
                className={isUpdating ? "rowUpdating" : ""}
              >
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
                  <input
                    type="text"
                    className="cellP cellInput"
                    defaultValue={r.product}
                    onBlur={handleBlur("product_service", r.product)}
                    disabled={isUpdating}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="cellP cellInput"
                    defaultValue={r.inPrice}
                    onBlur={handleBlur("in_price", Number(r.inPrice))}
                    disabled={isUpdating}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="cellP cellInput"
                    defaultValue={r.price}
                    onBlur={handleBlur("price", Number(r.price))}
                    disabled={isUpdating}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="cellP cellInput"
                    defaultValue={r.unit}
                    onBlur={handleBlur("unit", r.unit)}
                    disabled={isUpdating}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="cellP cellInput"
                    defaultValue={r.inStock}
                    onBlur={handleBlur("in_stock", Number(r.inStock))}
                    disabled={isUpdating}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="cellP cellInput"
                    defaultValue={r.description}
                    onBlur={handleBlur("description", r.description)}
                    disabled={isUpdating}
                  />
                </td>
                <td className="actIcon">
                  {isUpdating ? (
                    <Loader2 className="rowSpinner" size={18} strokeWidth={2.5} />
                  ) : (
                    <MoreHorizontal size={18} strokeWidth={2.5} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
