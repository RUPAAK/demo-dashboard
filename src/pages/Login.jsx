import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
          <Link to="/">Home</Link>
          <a href="#order">Order</a>
          <a href="#customers">Our Customers</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact Us</a>
          <span className="login-nav-lang">
            English
            <img src="https://flagcdn.com/w40/gb.png" alt="" />
          </span>
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
                Home
              </Link>
              <a href="#order" onClick={closeMenu}>
                Order
              </a>
              <a href="#customers" onClick={closeMenu}>
                Our Customers
              </a>
              <a href="#about" onClick={closeMenu}>
                About us
              </a>
              <a href="#contact" onClick={closeMenu}>
                Contact Us
              </a>
            </div>
          </div>
          <span className="login-nav-lang-mobile">
            English
            <img src="https://flagcdn.com/w40/gb.png" alt="" />
          </span>
        </div>
      </nav>

      <main className="login-main">
        <div className="login-card">
          <h1>Log in</h1>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="login-email">Enter your email address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Enter your password</label>
              <div className="login-password-wrap">
                <input
                  id="login-password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setPasswordVisible((v) => !v)}
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.04 0-2.04.2-2.94.57l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-2.73-4.39-7-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="login-submit">
              Log in
            </button>
          </form>
          <div className="login-card-links">
            <Link to="/register">Register</Link>
            <a href="#forgot">Forgotten password?</a>
          </div>
        </div>
      </main>

      <footer className="login-footer-bar">
        <div className="login-footer-bar-content">
          <p className="login-footer-bar-brand">123 Fakturera</p>
          <div className="login-footer-bar-links">
            <Link to="/">Home</Link>
            <a href="#order">Order</a>
            <a href="#contact">Contact us</a>
          </div>
        </div>
        <p className="login-footer-bar-copyright">
          © Lättfaktura, CRO no. 638537, 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Login;
