import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Logo y descripción */}
          <div className="footer__section footer__section--brand">
            <div className="footer__logo">
              <svg 
                className="footer__logo-icon" 
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
              <span className="footer__logo-text">SED</span>
            </div>
            <p className="footer__description">
              {t('common.sed')}
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="footer__section">
            <h3 className="footer__title">{t('footer.links')}</h3>
            <ul className="footer__links">
              <li>
                <Link to="/politica-privacidad" className="footer__link">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="footer__link">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="footer__link">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer__section">
            <h3 className="footer__title">{t('footer.contact')}</h3>
            <ul className="footer__contact">
              <li className="footer__contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Tingo María, Perú
              </li>
              <li className="footer__contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                sed.pautb.com
              </li>
              <li className="footer__contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                (062) 562341
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} SED - Sistema de Evaluación Docente
          </p>
        </div>
      </div>
    </footer>
  );
};