import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ email, onSignOut, authText, authLink }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src="/images/Vector.png"
        alt="Logo Around"
      />

      {authLink ? (
        <Link className="header__auth-link" to={authLink}>
          {authText}
        </Link>
      ) : (
        <>
          {/* DESKTOP */}
          <div className="header__user">
            <p className="header__email">{email}</p>

            <button
              className="header__logout"
              type="button"
              onClick={onSignOut}
            >
              Sair
            </button>
          </div>

          {/* MOBILE */}
          <button
            className="header__menu-button"
            type="button"
            onClick={handleMenuToggle}
            aria-label="Abrir menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {isMenuOpen && (
            <div className="header__mobile-menu">
              <p className="header__email">{email}</p>

              <button
                className="header__logout"
                type="button"
                onClick={onSignOut}
              >
                Sair
              </button>
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;