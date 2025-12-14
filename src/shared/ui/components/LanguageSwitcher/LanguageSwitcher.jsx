import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    { code: 'es', name: t('common.spanish'), flag: '🇪🇸' },
    { code: 'en', name: t('common.english'), flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setDropdownOpen(false);
  };

  return (
    <div className="language-switcher">
      <button 
        className="language-switcher__button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label={t('common.language')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>

      {dropdownOpen && (
        <div className="language-switcher__dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-switcher__item ${currentLanguage.code === lang.code ? 'language-switcher__item--active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="language-switcher__flag">{lang.flag}</span>
              <span className="language-switcher__name">{lang.name}</span>
              {currentLanguage.code === lang.code && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
