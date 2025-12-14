import { Card } from '@/shared/ui/components';
import { useTranslation } from 'react-i18next';
import './LandingVision.css';

export const LandingVision = () => {
  const { t } = useTranslation();
  return (
    <section className="vision" id="objetivos">
      <div className="container">
        <div className="vision__header">
          <span className="vision__badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {t('landing.vision.badge')}
          </span>
          <h2 className="vision__title">{t('landing.vision.title')}</h2>
        </div>

        <div className="vision__grid">
          {/* Visión */}
          <Card 
            padding="lg" 
            shadow={true}
            className="vision__card vision__card--vision"
          >
            <div className="vision__card-header">
              <div className="vision__card-icon vision__card-icon--vision">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="vision__card-title">{t('landing.vision.visionTitle')}</h3>
            </div>
            <p className="vision__card-description">
              {t('landing.vision.visionDesc')}
            </p>
          </Card>

          {/* Misión */}
          <Card 
            padding="lg" 
            shadow={true}
            className="vision__card vision__card--mission"
          >
            <div className="vision__card-header">
              <div className="vision__card-icon vision__card-icon--mission">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="vision__card-title">{t('landing.vision.missionTitle')}</h3>
            </div>
            <p className="vision__card-description">
              {t('landing.vision.missionDesc')}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};