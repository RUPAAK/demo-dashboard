import "./DashboardSidebar.css";

function DashboardSidebar({ priceListLabel = "Price List", isOpen, onClose }) {
  return (
    <>
      {onClose && (
        <div
          className={`dashboard-sidebar-backdrop ${isOpen ? "is-open" : ""}`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`dashboard-sidebar ${isOpen ? "is-open" : ""}`}
        data-overlay={!!onClose}
      >
      <div className="dashboard-sidebar-header">
        <h2 className="dashboard-sidebar-title">Menu</h2>
        <div className="dashboard-sidebar-line" />
      </div>
      <nav className="dashboard-sidebar-nav">
        <a
          href="#price-list"
          className="dashboard-sidebar-item is-active"
          onClick={onClose}
        >
          <span className="dashboard-sidebar-icons">
            <span className="dashboard-sidebar-dot" />
            <span className="dashboard-sidebar-icon-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </span>
          </span>
          <span className="dashboard-sidebar-label">{priceListLabel}</span>
        </a>
      </nav>
    </aside>
    </>
  );
}

export default DashboardSidebar;
