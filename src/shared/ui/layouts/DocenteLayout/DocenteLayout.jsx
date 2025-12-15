import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, LanguageSwitcher } from '@/shared/ui/components';
import './DocenteLayout.css';

/**
 * Layout principal para las vistas del Docente
 * Incluye navbar con navegacion y dropdown de usuario
 */
export const DocenteLayout = () => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const user = {
    nombre: storedUser.nombre || storedUser.nombreCompleto || 'Usuario',
    rol: storedUser.rol || storedUser.role || 'Docente',
    avatar: storedUser.avatar || null
  };

  const navItems = [
    { path: '/docente/dashboard', label: t('docente.nav.home'), icon: 'home' },
    { path: '/docente/perfil', label: t('docente.nav.profile'), icon: 'user' },
    { path: '/docente/evaluaciones', label: t('docente.nav.evaluations'), icon: 'chart' },
    { path: '/docente/recomendaciones', label: t('docente.nav.recommendations'), icon: 'lightbulb' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="docente-layout">
      <nav className="docente-layout__navbar">
        <div className="docente-layout__navbar-container">
          <button 
            className="docente-layout__mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/docente/dashboard" className="docente-layout__logo">
            <svg 
              className="docente-layout__logo-icon" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" fill="currentColor" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" fill="currentColor" opacity="0.6" />
            </svg>
            <span className="docente-layout__logo-text">SED</span>
          </Link>

          <div className="docente-layout__nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`docente-layout__nav-link ${isActive(item.path) ? 'docente-layout__nav-link--active' : ''}`}
              >
                {item.icon === 'home' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
                {item.icon === 'user' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
                {item.icon === 'chart' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18h18M7 16l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
                {item.icon === 'lightbulb' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21h6M12 3a6 6 0 00-6 6c0 2.5 1 4.5 3 6v2a2 2 0 002 2h2a2 2 0 002-2v-2c2-1.5 3-3.5 3-6a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="docente-layout__navbar-right">
            <button 
              className="docente-layout__icon-button"
              onClick={toggleDarkMode}
              aria-label={t('common.darkMode')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <LanguageSwitcher />

            <button className="docente-layout__icon-button docente-layout__notification-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="docente-layout__notification-badge">2</span>
            </button>

            <div className="docente-layout__user-dropdown">
              <button 
                className="docente-layout__user-button"
                onClick={toggleDropdown}
              >
                <Avatar src={user.avatar} alt={user.nombre} size="sm" fallback="U" />
                <span className="docente-layout__user-name">{user.rol}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="docente-layout__dropdown-menu">
                  <div className="docente-layout__dropdown-header">
                    <div className="docente-layout__dropdown-user-info">
                      <p className="docente-layout__dropdown-name">{user.nombre}</p>
                      <p className="docente-layout__dropdown-role">{user.rol}</p>
                    </div>
                  </div>
                  <div className="docente-layout__dropdown-divider"></div>
                  <Link 
                    to="/docente/perfil" 
                    className="docente-layout__dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
                      <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {t('userMenu.profile')}
                  </Link>
                  <button 
                    className="docente-layout__dropdown-item docente-layout__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {t('userMenu.logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && <div className="docente-layout__mobile-overlay" onClick={closeMobileMenu} />}

      <div className={`docente-layout__mobile-menu ${mobileMenuOpen ? 'docente-layout__mobile-menu--open' : ''}`}>
        <div className="docente-layout__mobile-header">
          <div className="docente-layout__mobile-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 14l9-5-9-5-9 5 9 5z" fill="currentColor" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" fill="currentColor" opacity="0.6" />
            </svg>
            <span>SED</span>
          </div>
          <button 
            className="docente-layout__mobile-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="docente-layout__mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`docente-layout__mobile-nav-link ${isActive(item.path) ? 'docente-layout__mobile-nav-link--active' : ''}`}
              onClick={closeMobileMenu}
            >
              {item.icon === 'home' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              {item.icon === 'user' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              {item.icon === 'chart' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" />
                  <path d="M18 17V9M13 17V5M8 17v-3" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              {item.icon === 'lightbulb' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21h6M12 3a6 6 0 00-6 6c0 2.5 1 4.5 3 6v2a2 2 0 002 2h2a2 2 0 002-2v-2c2-1.5 3-3.5 3-6a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="docente-layout__mobile-footer">
          <div className="docente-layout__mobile-user">
            <Avatar name={user.nombre} size="md" />
            <div>
              <p className="docente-layout__mobile-user-name">{user.nombre}</p>
              <p className="docente-layout__mobile-user-role">{user.rol}</p>
            </div>
          </div>
          <button 
            className="docente-layout__mobile-logout"
            onClick={handleLogout}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" />
            </svg>
            {t('userMenu.logout')}
          </button>
        </div>
      </div>

      <main className="docente-layout__content">
        <div className="docente-layout__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
