import "./DashboardSidebar.css";

function DashboardSidebar({ priceListLabel = "Price List", isOpen, onClose }) {
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
          href="#price-list"
          className="navItem is-active"
          onClick={onClose}
        >
          <span className="icons">
            <span className="dot" />
            <span className="icon_tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </span>
          </span>
          <span className="lbl">{priceListLabel}</span>
        </a>
      </nav>
    </aside>
    </>
  );
}

export default DashboardSidebar;
