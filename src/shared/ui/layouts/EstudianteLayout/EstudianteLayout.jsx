import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, LanguageSwitcher } from '@/shared/ui/components';
import './EstudianteLayout.css';

/**
 * Layout principal para las vistas del Estudiante
 * Incluye navbar con navegación y dropdown de usuario
 */
export const EstudianteLayout = () => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Inicializar desde localStorage
    return localStorage.getItem('darkMode') === 'true';
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Aplicar/remover clase dark-mode en el body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Usuario mock temporal (esto se reemplazará con datos reales del contexto)
  const user = {
    nombre: 'María García',
    rol: 'Estudiante',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  };

  const navItems = [
    { path: '/estudiante/dashboard', label: t('estudiante.nav.home'), icon: 'home' },
    { path: '/estudiante/perfil', label: t('estudiante.nav.profile'), icon: 'user' },
    { path: '/estudiante/evaluar-docentes', label: t('estudiante.nav.evaluateTeachers'), icon: 'star' },
    { path: '/estudiante/explorar', label: t('estudiante.nav.explore'), icon: 'search' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="estudiante-layout">
      {/* Navbar */}
      <nav className="estudiante-layout__navbar">
        <div className="estudiante-layout__navbar-container">
          {/* Mobile Menu Button */}
          <button 
            className="estudiante-layout__mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/estudiante/dashboard" className="estudiante-layout__logo">
            <svg 
              className="estudiante-layout__logo-icon" 
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
            <span className="estudiante-layout__logo-text">SED</span>
          </Link>

          {/* Navigation Links */}
          <div className="estudiante-layout__nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`estudiante-layout__nav-link ${isActive(item.path) ? 'estudiante-layout__nav-link--active' : ''}`}
              >
                {item.icon === 'home' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {item.icon === 'user' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {item.icon === 'star' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {item.icon === 'search' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section: Dark Mode + Language + Notifications + User */}
          <div className="estudiante-layout__navbar-right">
            {/* Dark Mode Toggle */}
            <button 
              className="estudiante-layout__icon-button"
              onClick={toggleDarkMode}
              aria-label={t('common.darkMode')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications */}
            <button className="estudiante-layout__icon-button estudiante-layout__notification-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="estudiante-layout__notification-badge">2</span>
            </button>

            {/* User Dropdown */}
            <div className="estudiante-layout__user-dropdown">
              <button 
                className="estudiante-layout__user-button"
                onClick={toggleDropdown}
              >
                <Avatar src={user.avatar} alt={user.nombre} size="sm" fallback="MG" />
                <span className="estudiante-layout__user-name">{user.rol}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="estudiante-layout__dropdown-menu">
                  <div className="estudiante-layout__dropdown-header">
                    <div className="estudiante-layout__dropdown-user-info">
                      <p className="estudiante-layout__dropdown-name">{user.nombre}</p>
                      <p className="estudiante-layout__dropdown-role">{user.rol}</p>
                    </div>
                  </div>
                  <div className="estudiante-layout__dropdown-divider"></div>
                  <Link 
                    to="/estudiante/perfil" 
                    className="estudiante-layout__dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {t('userMenu.profile')}
                  </Link>
                  <button 
                    className="estudiante-layout__dropdown-item estudiante-layout__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {t('userMenu.logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="estudiante-layout__mobile-overlay" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`estudiante-layout__mobile-menu ${mobileMenuOpen ? 'estudiante-layout__mobile-menu--open' : ''}`}>
        <div className="estudiante-layout__mobile-header">
          <div className="estudiante-layout__mobile-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 14l9-5-9-5-9 5 9 5z" fill="currentColor"/>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" fill="currentColor" opacity="0.6"/>
            </svg>
            <span>SED</span>
          </div>
          <button 
            className="estudiante-layout__mobile-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="estudiante-layout__mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`estudiante-layout__mobile-nav-link ${isActive(item.path) ? 'estudiante-layout__mobile-nav-link--active' : ''}`}
              onClick={closeMobileMenu}
            >
              {item.icon === 'home' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {item.icon === 'user' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {item.icon === 'star' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {item.icon === 'search' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="estudiante-layout__mobile-footer">
          <div className="estudiante-layout__mobile-user">
            <Avatar name={user.nombre} size="md" />
            <div>
              <p className="estudiante-layout__mobile-user-name">{user.nombre}</p>
              <p className="estudiante-layout__mobile-user-role">{user.rol}</p>
            </div>
          </div>
          <button 
            className="estudiante-layout__mobile-logout"
            onClick={handleLogout}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {t('userMenu.logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="estudiante-layout__content">
        <div className="estudiante-layout__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};