import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { getTranslations } from "../api/translations";
import { login as loginApi } from "../api/auth";
import "./login.css";

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

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(
    () => localStorage.getItem(LOCALE_STORAGE_KEY) || "en",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const apiLocale = LANG_TO_API_LOCALE[lang] || "english";

  const { data: translations } = useQuery({
    queryKey: ["translations", apiLocale],
    queryFn: () => getTranslations(apiLocale),
  });

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang);
  }, [lang]);

  const closeMenu = () => setMenuOpen(false);
  const currentLang =
    LANG_OPTIONS.find((o) => o.id === lang) || LANG_OPTIONS[0];

  const t = translations?.data || {};
  const navLabel = (id) =>
    id === "en" ? (t.nav?.english ?? "English") : (t.nav?.swedish ?? "Svenska");

  const setLanguage = (id) => {
    setLang(id);
    setLangOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    const emailTrim = email.trim();
    const hasEmail = emailTrim.length > 0;
    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);
    const hasPassword = password.length > 0;
    const passwordMin = password.length >= 4;

    if (!hasEmail) {
      setEmailError("validation_field_required");
      return;
    }
    if (!emailValid) {
      setEmailError("validation_email_invalid");
      return;
    }
    if (!hasPassword) {
      setPasswordError("validation_field_required");
      return;
    }
    if (!passwordMin) {
      setPasswordError("validation_password_min_length");
      return;
    }

    loginApi(emailTrim, password).catch(() => {
      setEmailError("validation_user_does_not_exist");
    });
  };

  return (
    <div className="login-page">
      <nav className="login-nav">
        <div className="login-nav-logo">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
          />
        </div>
        <div className="login-nav-links">
          <Link to="/">{t.nav?.home ?? "Home"}</Link>
          <a href="#order">{t.nav?.order ?? "Order"}</a>
          <a href="#customers">{t.nav?.our_customers ?? "Our Customers"}</a>
          <a href="#about">{t.nav?.about_us ?? "About us"}</a>
          <a href="#contact">{t.nav?.contact_us ?? "Contact Us"}</a>
          <div className="login-nav-lang-wrap">
            <button
              type="button"
              className="login-nav-lang"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              {navLabel(lang)}
              <img src={currentLang.flag} alt="" />
            </button>
            <div
              className={`login-nav-lang-dropdown ${langOpen ? "is-open" : ""}`}
              role="listbox"
              aria-hidden={!langOpen}
            >
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={lang === opt.id}
                  className="login-nav-lang-option"
                  onClick={() => setLanguage(opt.id)}
                >
                  {navLabel(opt.id)}
                  <img src={opt.flag} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="login-nav-mobile">
          <div className="login-nav-mobile-left">
            <button
              type="button"
              className="login-nav-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
            <div
              className={`login-nav-dropdown ${menuOpen ? "is-open" : ""}`}
              aria-hidden={!menuOpen}
            >
              <Link to="/" onClick={closeMenu}>
                {t.nav?.home ?? "Home"}
              </Link>
              <a href="#order" onClick={closeMenu}>
                {t.nav?.order ?? "Order"}
              </a>
              <a href="#customers" onClick={closeMenu}>
                {t.nav?.our_customers ?? "Our Customers"}
              </a>
              <a href="#about" onClick={closeMenu}>
                {t.nav?.about_us ?? "About us"}
              </a>
              <a href="#contact" onClick={closeMenu}>
                {t.nav?.contact_us ?? "Contact Us"}
              </a>
            </div>
          </div>
          <div className="login-nav-lang-wrap">
            <button
              type="button"
              className="login-nav-lang-mobile"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              {navLabel(lang)}
              <img src={currentLang.flag} alt="" />
            </button>
            <div
              className={`login-nav-lang-dropdown ${langOpen ? "is-open" : ""}`}
              role="listbox"
              aria-hidden={!langOpen}
            >
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={lang === opt.id}
                  className="login-nav-lang-option"
                  onClick={() => setLanguage(opt.id)}
                >
                  {navLabel(opt.id)}
                  <img src={opt.flag} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="login-main">
        <div className="login-card">
          <h1>{t.auth?.log_in ?? "Log in"}</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="login-email">
                {t.auth?.enter_your_email_address ?? "Enter your email address"}
              </label>
              <input
                id="login-email"
                type="email"
                placeholder={t.auth?.email_address ?? "Email address"}
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                className={emailError ? "login-input-error" : ""}
              />
              {emailError && (
                <span className="login-form-error">
                  {t.auth?.[emailError] ?? emailError}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="login-password">
                {t.auth?.enter_your_password ?? "Enter your password"}
              </label>
              <div className="login-password-wrap">
                <input
                  id="login-password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder={t.auth?.password ?? "Password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                  }}
                  className={passwordError ? "login-input-error" : ""}
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setPasswordVisible((v) => !v)}
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <span className="login-form-error">
                  {t.auth?.[passwordError] ?? passwordError}
                </span>
              )}
            </div>
            <button type="submit" className="login-submit">
              {t.auth?.log_in ?? "Log in"}
            </button>
          </form>
          <div className="login-card-links">
            <Link to="/register">{t.auth?.register ?? "Register"}</Link>
            <a href="#forgot">
              {t.auth?.forgotten_password ?? "Forgotten password?"}
            </a>
          </div>
        </div>
      </main>

      <footer className="login-footer-bar">
        <div className="login-footer-bar-content">
          <p className="login-footer-bar-brand">
            {t.footer?.brand ?? "123 Fakturera"}
          </p>
          <div className="login-footer-bar-links">
            <Link to="/">{t.footer?.home ?? "Home"}</Link>
            <a href="#order">{t.footer?.order ?? "Order"}</a>
            <a href="#contact">{t.footer?.contact_us ?? "Contact us"}</a>
          </div>
        </div>
        <p className="login-footer-bar-copyright">
          {t.footer?.copyright ??
            "© Lättfaktura, CRO no. 638537, 2025. All rights reserved."}
        </p>
      </footer>
    </div>
  );
}

export default Login;
