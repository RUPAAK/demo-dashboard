import { LogOut, Tag } from "lucide-react";
import "./DashboardSidebar.css";
import { useNavigate } from "react-router-dom";
import { setToken } from "../api/token";

const defaultLabels = {
  logout: "Log out",
  menu: "Menu",
  price_list: "Price List",
};

function DashboardSidebar({ labels = {}, isOpen, onClose }) {
  const t = { ...defaultLabels, ...labels };
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };
  return (
    <>
      {onClose && (
        <div
          className={`sidebar_backdrop ${isOpen ? "is-open" : ""}`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`dashboard-sidebar ${isOpen ? "is-open" : ""}`}
        data-overlay={!!onClose}
      >
        <div className="sidebar_header">
          <h2 className="menuTitle">{t.menu}</h2>
          <div className="line" />
        </div>
        <nav className="nav">
          <a
            href="/price-list"
            className="navItem is-active"
            onClick={(e) => {
              e.preventDefault();
              if (onClose) onClose();
              navigate("/price-list");
            }}
          >
            <span className="icons">
              <span className="dot" />
              <span className="icon_tag">
                <Tag size={16} strokeWidth={2} />
              </span>
            </span>
            <span className="lbl">{t.price_list}</span>
          </a>

          <button
            type="button"
            className="sbLogout"
            onClick={() => {
              if (onClose) onClose();
              if (handleLogout) handleLogout();
            }}
          >
            <LogOut size={16} strokeWidth={2} />
            <span>{t.logout}</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSidebar;
