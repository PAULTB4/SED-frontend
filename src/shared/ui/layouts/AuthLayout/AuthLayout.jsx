import './AuthLayout.css';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-layout">
      {/* Fondo decorativo */}
      <div className="auth-layout__background">
        <div className="auth-layout__circle auth-layout__circle--1"></div>
        <div className="auth-layout__circle auth-layout__circle--2"></div>
        <div className="auth-layout__circle auth-layout__circle--3"></div>
      </div>

      <div className="auth-layout__container">
        {/* Logo y volver */}
        <div className="auth-layout__header">
          <a href="/" className="auth-layout__logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
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
            <span>SED</span>
          </a>

          <a href="/" className="auth-layout__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Volver al inicio
          </a>
        </div>

        {/* Contenido del formulario */}
        <div className="auth-layout__content">
          <div className="auth-layout__box">
            {title && (
              <div className="auth-layout__title-section">
                <h1 className="auth-layout__title">{title}</h1>
                {subtitle && (
                  <p className="auth-layout__subtitle">{subtitle}</p>
                )}
              </div>
            )}
            
            {children}
          </div>

          {/* Footer */}
          <p className="auth-layout__footer">
            © 2025 SED - Universidad Nacional Agraria de la Selva
          </p>
        </div>
      </div>
    </div>
  );
};