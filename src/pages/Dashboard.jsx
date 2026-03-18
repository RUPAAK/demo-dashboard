import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Printer, ToggleRight, Menu } from "lucide-react";
import Avatar from "react-avatar";
import { getTranslations } from "../api/translations";
import { getProfile } from "../api/auth";
import { getProducts, updateProduct } from "../api/products";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTable from "./DashboardTable";
import "./Dashboard.css";

const LOCALE_STORAGE_KEY = "app.locale";
const LANG_TO_API_LOCALE = { en: "english", sv: "swedish" };
const LANG_OPTIONS = [
  {
    id: "en",
    label: "English",
    flag: "https://storage.123fakturere.no/public/flags/GB.png",
  },
  {
    id: "sv",
    label: "Svenska",
    flag: "https://storage.123fakturere.no/public/flags/SE.png",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [locale, setLocale] = useState(
    () => localStorage.getItem(LOCALE_STORAGE_KEY) || "en",
  );
  const apiLocale = LANG_TO_API_LOCALE[locale] || "english";

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

  const page = 1;
  const limit = 50;
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts({ page, limit }),
    retry: false,
  });

  const [updatingRowId, setUpdatingRowId] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const { mutate: patchProduct } = useMutation({
    mutationFn: ({ id, key, value }) => updateProduct(id, key, value),
    onMutate: ({ id }) => {
      setUpdatingRowId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSnackbar({ type: "success", message: "Product updated successfully" });
    },
    onError: () => {
      setSnackbar({ type: "error", message: "Failed to update product" });
    },
    onSettled: () => {
      setUpdatingRowId(null);
    },
  });

  useEffect(() => {
    if (!snackbar) return;
    const timer = setTimeout(() => setSnackbar(null), 3000);
    return () => clearTimeout(timer);
  }, [snackbar]);

  const handleProductUpdate = (id, key, value) => {
    patchProduct({ id, key, value });
  };

  useEffect(() => {
    const status = error?.response?.status;
    if (isError && (status === 401 || status === 403)) {
      navigate("/login", { replace: true });
    }
  }, [isError, error, navigate]);

  const navT = translations?.data?.nav ?? {};
  const t = translations?.data?.dashboard ?? {};

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const navLabel = (id) =>
    id === "en" ? (navT.english ?? "English") : (navT.swedish ?? "Svenska");

  const currentLang =
    LANG_OPTIONS.find((o) => o.id === locale) || LANG_OPTIONS[0];

  const setLanguage = (id) => {
    setLocale(id);
    setLangOpen(false);
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
          className="dashboard_navbar_hamburger"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          <Menu size={24} strokeWidth={2} />
        </button>
        <div className="dash_usr">
          <div className="Av">
            <Avatar
              name={user?.username ?? user?.email ?? ""}
              size="40"
              round
              maxInitials={2}
            />
          </div>
          <div>
            <div className="userName">
              {user?.username ?? user?.email ?? "—"}
            </div>
            <div className="dashboardNavbarCompany">{user?.email ?? ""}</div>
          </div>
        </div>
        <div className="RIGHT">
          <div className="langWrap">
            <button
              type="button"
              className="lang_selector"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              {navLabel(locale)}
              <img src={currentLang.flag} alt="" />
            </button>
            <div
              className={`langDrop ${langOpen ? "is-open" : ""}`}
              role="listbox"
              aria-hidden={!langOpen}
            >
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={locale === opt.id}
                  className="langOpt"
                  onClick={() => setLanguage(opt.id)}
                >
                  {navLabel(opt.id)}
                  <img src={opt.flag} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <DashboardSidebar
        priceListLabel={t.price_list ?? "Price List"}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="dashboard-main">
        <div className="dashboardToolbar">
          <div className="dashboardSearchRow">
            <div className="searchFld">
              <input
                type="text"
                placeholder={t.search_article_no ?? "Search Article No..."}
              />
              <Search className="search_icn" size={20} />
            </div>
            <div className="searchFld">
              <input
                type="text"
                placeholder={t.search_product ?? "Search Product..."}
              />
              <Search className="search_icn" size={20} />
            </div>
          </div>
          <div className="dashboard_actions">
            <button
              type="button"
              className="btn"
              title={t.new_product ?? "New Product"}
            >
              <span className="btnTxt">{t.new_product ?? "New Product"}</span>
              <span className="btn_icn btn_icn_grn">
                <Plus size={10} strokeWidth={2.5} />
              </span>
            </button>
            <button
              type="button"
              className="btn"
              title={t.print_list ?? "Print List"}
            >
              <span className="btnTxt">{t.print_list ?? "Print List"}</span>
              <span className="btn_icn btn_icn_blu">
                <Printer size={10} strokeWidth={2} />
              </span>
            </button>
            <button
              type="button"
              className="btn"
              title={t.advanced_mode ?? "Advanced mode"}
            >
              <span className="btnTxt">
                {t.advanced_mode ?? "Advanced mode"}
              </span>
              <span className="btn_icn btn_icn_blu">
                <ToggleRight size={10} strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>

        <div className="tbl_zone">
          <DashboardTable
            labels={t}
            rows={products?.data?.items ?? []}
            isLoading={isProductsLoading}
            onUpdate={handleProductUpdate}
            updatingRowId={updatingRowId}
          />
        </div>
      </main>
      {snackbar && (
        <div className={`snackbar snackbar--${snackbar.type}`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
