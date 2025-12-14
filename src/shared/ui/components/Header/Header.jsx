import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, LanguageSwitcher } from '../';
import './Header.css';

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <header className="header">
        <nav className="header__nav">
          {/* Logo */}
          <Link to="/" className="header__logo">
            <svg 
              className="header__logo-icon" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 14l9-5-9-5-9 5 9 5z" 
                fill="currentColor"
              />
              <path 
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
            <span className="header__logo-text">SED</span>
          </Link>

          {/* Menú Desktop */}
          <ul className="header__menu">
            <li>
              <a href="#inicio" className="header__menu-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {t('header.home')}
              </a>
            </li>
            <li>
              <a href="#objetivos" className="header__menu-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {t('header.objectives')}
              </a>
            </li>
            <li>
              <a href="#manual" className="header__menu-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {t('header.manual')}
              </a>
            </li>
          </ul>

          {/* Acciones: Dark Mode + Idioma + Iniciar Sesión */}
          <div className="header__actions">
            {/* Botón Dark Mode */}
            <button 
              className="header__icon-button"
              onClick={toggleDarkMode}
              aria-label={t('common.darkMode')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {/* Selector de Idioma */}
            <LanguageSwitcher />

            <Link to="/login">
              <Button 
                variant="primary" 
                size="sm"
                leftIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                }
              >
                {t('header.login')}
              </Button>
            </Link>
          </div>

          {/* Botón hamburguesa móvil */}
          <button 
            className="header__hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`header__hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`header__hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`header__hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </nav>

        {/* Menú móvil */}
        <div className={`header__mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="header__mobile-list">
            <li>
              <a href="#inicio" className="header__mobile-link" onClick={toggleMenu}>
                {t('header.home')}
              </a>
            </li>
            <li>
              <a href="#objetivos" className="header__mobile-link" onClick={toggleMenu}>
                {t('header.objectives')}
              </a>
            </li>
            <li>
              <a href="#manual" className="header__mobile-link" onClick={toggleMenu}>
                {t('header.manual')}
              </a>
            </li>
            <li>
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                onClick={() => window.location.href = '/login'}>
                {t('header.login')}
              </Button>
            </li>
          </ul>
        </div>
    </header>
  );
};