import { LogOut } from "lucide-react";
import "./DashboardSidebar.css";
import { useNavigate } from "react-router-dom";
import { setToken } from "../api/token";

function DashboardSidebar({ priceListLabel = "Price List", isOpen, onClose }) {
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
          <h2 className="menuTitle">Menu</h2>
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </span>
            </span>
            <span className="lbl">{priceListLabel}</span>
          </a>

          <button
            type="button"
            className="sbLogout"
            onClick={() => {
              if (onClose) onClose();
              if (handleLogout) handleLogout();
            }}
          >
            <LogOut size={18} strokeWidth={2} />
            <span>Log out</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSidebar;
