import { Button, Card } from '@/shared/ui/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LandingGuide.css';

export const LandingGuide = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      id: 1,
      title: t('landing.guide.step1Title'),
      description: t('landing.guide.step1Desc')
    },
    {
      id: 2,
      title: t('landing.guide.step2Title'),
      description: t('landing.guide.step2Desc')
    },
    {
      id: 3,
      title: t('landing.guide.step3Title'),
      description: t('landing.guide.step3Desc')
    },
    {
      id: 4,
      title: t('landing.guide.step4Title'),
      description: t('landing.guide.step4Desc')
    },
    {
      id: 5,
      title: t('landing.guide.step5Title'),
      description: t('landing.guide.step5Desc')
    }
  ];

  return (
    <section className="guide" id="manual">
      <div className="container">
        <div className="guide__header">
          <span className="guide__badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            {t('landing.guide.badge')}
          </span>
          <h2 className="guide__title">{t('landing.guide.title')}</h2>
          <p className="guide__description">
            {t('landing.guide.description')}
          </p>
        </div>

        <div className="guide__content">
          {/* Lista de pasos */}
          <div className="guide__steps">
            <div className="guide__steps-header">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
              </svg>
              <h3>{t('landing.guide.stepsTitle')}</h3>
            </div>

            <ol className="guide__steps-list">
              {steps.map((step) => (
                <li key={step.id} className="guide__step">
                  <div className="guide__step-number">{step.id}</div>
                  <div className="guide__step-content">
                    <h4 className="guide__step-title">{step.title}</h4>
                    <p className="guide__step-description">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Callouts informativos */}
          <div className="guide__callouts">
            {/* Callout Anonimato */}
            <Card 
              padding="md"
              className="guide__callout guide__callout--primary"
            >
              <div className="guide__callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="guide__callout-content">
                <h4 className="guide__callout-title">{t('landing.guide.callout1Title')}</h4>
                <p className="guide__callout-description">
                  {t('landing.guide.callout1Desc')}
                </p>
              </div>
            </Card>

            {/* Callout Mejora */}
            <Card 
              padding="md"
              className="guide__callout guide__callout--secondary"
            >
              <div className="guide__callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="guide__callout-content">
                <h4 className="guide__callout-title">{t('landing.guide.callout2Title')}</h4>
                <p className="guide__callout-description">
                  {t('landing.guide.callout2Desc')}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="guide__cta">
  <Link to="/login">
    <Button 
      variant="primary" 
      size="lg"
      leftIcon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
            fill="currentColor"
          />
        </svg>
      }
    >
      {t('landing.guide.btnStart')}
    </Button>
  </Link>
</div>
      </div>
    </section>
  );
};