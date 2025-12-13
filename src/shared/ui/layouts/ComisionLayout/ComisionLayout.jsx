import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Avatar } from '@/shared/ui/components';
import './ComisionLayout.css';

/**
 * Layout principal para las vistas de Comisión
 * Incluye navbar con navegación y dropdown de usuario
 */
export const ComisionLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const user = {
    nombre: 'Admin Comisión',
    rol: 'Comisión',
    avatar: null
  };

  const navItems = [
    { path: '/comision/dashboard', label: 'Inicio', icon: 'home' },
    { path: '/comision/perfil', label: 'Mi Perfil', icon: 'user' },
    { path: '/comision/periodos', label: 'Períodos', icon: 'calendar' },
    { path: '/comision/reportes', label: 'Reportes', icon: 'chart' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="comision-layout">
      <nav className="comision-layout__navbar">
        <div className="comision-layout__navbar-container">
          <Link to="/comision/dashboard" className="comision-layout__logo">
            <svg 
              className="comision-layout__logo-icon" 
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
            <span className="comision-layout__logo-text">SED</span>
          </Link>

          <div className="comision-layout__nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`comision-layout__nav-link ${isActive(item.path) ? 'comision-layout__nav-link--active' : ''}`}
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
                {item.icon === 'calendar' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {item.icon === 'chart' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18h18M7 16l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="comision-layout__navbar-right">
            <button 
              className="comision-layout__icon-button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            <button className="comision-layout__icon-button comision-layout__notification-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="comision-layout__notification-badge">2</span>
            </button>

            <div className="comision-layout__user-dropdown">
              <button 
                className="comision-layout__user-button"
                onClick={toggleDropdown}
              >
                <Avatar src={user.avatar} alt={user.nombre} size="sm" fallback="AC" />
                <span className="comision-layout__user-name">{user.rol}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="comision-layout__dropdown-menu">
                  <div className="comision-layout__dropdown-header">
                    <div className="comision-layout__dropdown-user-info">
                      <p className="comision-layout__dropdown-name">{user.nombre}</p>
                      <p className="comision-layout__dropdown-role">{user.rol}</p>
                    </div>
                  </div>
                  <div className="comision-layout__dropdown-divider"></div>
                  <Link 
                    to="/comision/perfil" 
                    className="comision-layout__dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Mi Perfil
                  </Link>
                  <button 
                    className="comision-layout__dropdown-item comision-layout__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="comision-layout__content">
        <div className="comision-layout__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
