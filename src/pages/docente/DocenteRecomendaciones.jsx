import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/components';
import './DocenteRecomendaciones.css';

/**
 * Página Recomendaciones del Docente
 * Muestra sugerencias de mejora basadas en evaluaciones
 */
export const DocenteRecomendaciones = () => {
  const { t } = useTranslation();
  
  // Datos mock de recomendaciones
  const recomendaciones = [
    {
      id: 1,
      categoria: t('docente.recommendations.methodology'),
      calificacionActual: 3.2,
      severidad: 'high',
      descripcion: t('docente.recommendations.methodologyDesc'),
      acciones: [
        t('docente.recommendations.methodologyAction1'),
        t('docente.recommendations.methodologyAction2'),
        t('docente.recommendations.methodologyAction3')
      ]
    },
    {
      id: 2,
      categoria: t('docente.recommendations.technology'),
      calificacionActual: 3.8,
      severidad: 'medium',
      descripcion: t('docente.recommendations.technologyDesc'),
      acciones: [
        t('docente.recommendations.technologyAction1'),
        t('docente.recommendations.technologyAction2'),
        t('docente.recommendations.technologyAction3')
      ]
    },
    {
      id: 3,
      categoria: t('docente.recommendations.availability'),
      calificacionActual: 4.5,
      severidad: 'low',
      descripcion: t('docente.recommendations.availabilityDesc'),
      acciones: [
        t('docente.recommendations.availabilityAction1'),
        t('docente.recommendations.availabilityAction2'),
        t('docente.recommendations.availabilityAction3')
      ]
    }
  ];

  const getSeverityColor = (severidad) => {
    switch (severidad) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getSeverityLabel = (severidad) => {
    switch (severidad) {
      case 'high':
        return t('docente.recommendations.highPriority');
      case 'medium':
        return t('docente.recommendations.mediumPriority');
      case 'low':
        return t('docente.recommendations.goodLevel');
      default:
        return '';
    }
  };

  return (
    <div className="docente-recomendaciones">
        <div className="docente-recomendaciones__header">
          <div className="docente-recomendaciones__header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18h6M10 22h4M15 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="docente-recomendaciones__header-text">
            <h1 className="docente-recomendaciones__title">
              {t('docente.recommendations.title')}
            </h1>
            <p className="docente-recomendaciones__subtitle">
              {t('docente.recommendations.subtitle')}
            </p>
          </div>
        </div>

        <div className="docente-recomendaciones__section-header">
          <h2 className="docente-recomendaciones__section-title">{t('docente.recommendations.opportunityAreas')}</h2>
        </div>

        <div className="docente-recomendaciones__list">
          {recomendaciones.map((rec) => (
            <div 
              key={rec.id} 
              className={`docente-recomendaciones__card docente-recomendaciones__card--${getSeverityColor(rec.severidad)}`}
            >
              <div className="docente-recomendaciones__card-header">
                <div className="docente-recomendaciones__card-icon">
                  {rec.severidad === 'high' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                  {rec.severidad === 'medium' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 16h.01M12 8v4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                  {rec.severidad === 'low' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
                <div className="docente-recomendaciones__card-title-section">
                  <h3 className="docente-recomendaciones__card-title">
                    {rec.categoria}
                  </h3>
                  <span className={`docente-recomendaciones__badge docente-recomendaciones__badge--${getSeverityColor(rec.severidad)}`}>
                    {getSeverityLabel(rec.severidad)}
                  </span>
                </div>
                <div className="docente-recomendaciones__rating">
                  <span className="docente-recomendaciones__rating-label">{t('docente.recommendations.currentRating')}:</span>
                  <span className="docente-recomendaciones__rating-value">
                    {rec.calificacionActual}/5
                  </span>
                </div>
              </div>

              <p className="docente-recomendaciones__description">
                {rec.descripcion}
              </p>

              <div className="docente-recomendaciones__actions-section">
                <h4 className="docente-recomendaciones__actions-title">
                  {t('docente.recommendations.suggestedActions')}:
                </h4>
                <ul className="docente-recomendaciones__actions-list">
                  {rec.acciones.map((accion, index) => (
                    <li key={index} className="docente-recomendaciones__action-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {accion}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="docente-recomendaciones__card-footer">
                <Button variant="outline" size="sm">
                  {t('docente.recommendations.viewDetails')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};
