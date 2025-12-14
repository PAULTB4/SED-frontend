import { useTranslation } from 'react-i18next';
import { StarRating } from '../StarRating';
import { Button } from '../Button';
import './CourseCard.css';

/**
 * Componente CourseCard - Card de curso con información
 * @param {string} codigo - Código del curso (ej: CS-101)
 * @param {string} nombre - Nombre del curso
 * @param {number} estudiantes - Número de estudiantes
 * @param {number} evaluaciones - Número de evaluaciones recibidas
 * @param {number} promedio - Promedio de calificación (0-5)
 * @param {function} onVerEvaluaciones - Callback al hacer click en el botón
 */
export const CourseCard = ({
  codigo,
  nombre,
  estudiantes,
  evaluaciones,
  promedio,
  onVerEvaluaciones
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="course-card">
      <div className="course-card__header">
        <div className="course-card__rating">
          <StarRating rating={promedio} size="sm" />
          <span className="course-card__rating-value">{promedio.toFixed(1)}</span>
        </div>
        <span className="course-card__code">{codigo}</span>
      </div>

      <h3 className="course-card__title">{nombre}</h3>

      <div className="course-card__stats">
        <div className="course-card__stat">
          <span className="course-card__stat-label">{t('docente.dashboard.students')}:</span>
          <span className="course-card__stat-value">{estudiantes}</span>
        </div>
        <div className="course-card__stat">
          <span className="course-card__stat-label">{t('docente.dashboard.evaluations')}:</span>
          <span className="course-card__stat-value">{evaluaciones}</span>
        </div>
      </div>

      <Button 
        variant="primary" 
        fullWidth
        onClick={onVerEvaluaciones}
      >
        {t('common.viewEvaluations')}
      </Button>
    </div>
  );
};
