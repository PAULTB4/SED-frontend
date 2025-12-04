import { Card } from '@/shared/ui/components';
import './LandingFeatures.css';

export const LandingFeatures = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="M12 14v-4m0 0V7m0 3h3m-3 0H9" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      ),
      title: '100% Anónimo',
      description: 'Tus evaluaciones son totalmente anónimas, garantizando transparencia y sinceridad.'
    },
    {
      id: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      ),
      title: 'Datos en tiempo real',
      description: 'Resultados procesados instantáneamente para una retroalimentación oportuna.'
    },
    {
      id: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Fácil de usar',
      description: 'Interfaz intuitiva que permite completar evaluaciones rápidamente desde cualquier dispositivo.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features__header">
          <span className="features__badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
            </svg>
            Por qué SED
          </span>
          <h2 className="features__title">
            Una plataforma diseñada para la comunidad universitaria
          </h2>
          <p className="features__description">
            Facilitamos la recopilación y análisis de evaluaciones para mejorar la calidad educativa.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              padding="lg"
              shadow={true}
              hoverable={true}
              className="features__card"
            >
              <div className="features__card-icon">
                {feature.icon}
              </div>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-description">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};