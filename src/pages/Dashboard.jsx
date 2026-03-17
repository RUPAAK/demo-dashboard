import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Printer, ToggleRight, Menu } from "lucide-react";
import { getTranslations } from "../api/translations";
import { getProfile } from "../api/auth";
import { setToken } from "../api/token";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTable from "./DashboardTable";
import "./Dashboard.css";

const LOCALE_STORAGE_KEY = "app.locale";
const LANG_TO_API_LOCALE = { en: "english", sv: "swedish" };

function Dashboard() {
  const navigate = useNavigate();
  const lang = localStorage.getItem(LOCALE_STORAGE_KEY) || "en";
  const apiLocale = LANG_TO_API_LOCALE[lang] || "english";

  const { data: translations } = useQuery({
    queryKey: ["translations", apiLocale],
    queryFn: () => getTranslations(apiLocale),
  });

  const {
    data: profile,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  const user = profile?.data?.user;

  useEffect(() => {
    const status = error?.response?.status;
    if (isError && (status === 401 || status === 403)) {
      navigate("/login", { replace: true });
    }
  }, [isError, error, navigate]);

  const t = translations?.data?.dashboard ?? {};

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  const authError =
    isError &&
    (error?.response?.status === 401 || error?.response?.status === 403);
  if (authError) return null;
  if (!profile) return null;

  return (
    <div className="dashboard-layout">
      <header className="dashboard-navbar">
        <button
          type="button"
          className="dashboard-navbar-hamburger"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          <Menu size={24} strokeWidth={2} />
        </button>
        <div className="dashboard-navbar-user">
          <div className="dashboard-navbar-avatar">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <div className="dashboard-navbar-name">
              {user?.username ?? user?.email ?? "—"}
            </div>
            <div className="dashboard-navbar-company">{user?.email ?? ""}</div>
          </div>
        </div>
        <div className="dashboard-navbar-right">
          <div className="dashboard-navbar-lang">
            {lang === "sv" ? "Svenska" : "English"}
            <img
              src={
                lang === "sv"
                  ? "https://storage.123fakturere.no/public/flags/SE.png"
                  : "https://storage.123fakturere.no/public/flags/GB.png"
              }
              alt=""
            />
          </div>
          <button
            type="button"
            className="dashboard-navbar-logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <DashboardSidebar
        priceListLabel={t.price_list ?? "Price List"}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="dashboard-main">
        <div className="dashboard-toolbar">
          <div className="dashboard-search-row">
            <div className="dashboard-search-field">
              <input
                type="text"
                placeholder={t.search_article_no ?? "Search Article No..."}
              />
              <Search className="dashboard-search-icon" size={20} />
            </div>
            <div className="dashboard-search-field">
              <input
                type="text"
                placeholder={t.search_product ?? "Search Product..."}
              />
              <Search className="dashboard-search-icon" size={20} />
            </div>
          </div>
          <div className="dashboard-actions">
            <button type="button" className="dashboard-btn" title={t.new_product ?? "New Product"}>
              <span className="dashboard-btn-text">{t.new_product ?? "New Product"}</span>
              <span className="dashboard-btn-icon dashboard-btn-icon-green">
                <Plus size={10} strokeWidth={2.5} />
              </span>
            </button>
            <button type="button" className="dashboard-btn" title={t.print_list ?? "Print List"}>
              <span className="dashboard-btn-text">{t.print_list ?? "Print List"}</span>
              <span className="dashboard-btn-icon dashboard-btn-icon-blue">
                <Printer size={10} strokeWidth={2} />
              </span>
            </button>
            <button type="button" className="dashboard-btn" title={t.advanced_mode ?? "Advanced mode"}>
              <span className="dashboard-btn-text">{t.advanced_mode ?? "Advanced mode"}</span>
              <span className="dashboard-btn-icon dashboard-btn-icon-blue">
                <ToggleRight size={10} strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>

        <DashboardTable labels={t} />
      </main>
    </div>
  );
}

export default Dashboard;
