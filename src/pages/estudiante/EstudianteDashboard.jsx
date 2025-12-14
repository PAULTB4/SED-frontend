import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatCard, Avatar } from '@/shared/ui/components';
import { useEstudianteData } from '@/features/evaluacion-estudiante';
import './EstudianteDashboard.css';

/**
 * Dashboard principal del Estudiante
 * Muestra estadísticas y cursos actuales para evaluar
 */
export const EstudianteDashboard = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useEstudianteData();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="estudiante-dashboard__loading">
        <div className="estudiante-dashboard__spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estudiante-dashboard__error">
        <p>{error}</p>
      </div>
    );
  }

  const { estudiante, estadisticas, cursosActuales } = data;

  const handleEvaluar = (cursoId) => {
    navigate(`/estudiante/evaluar/${cursoId}`);
  };

  return (
    <div className="estudiante-dashboard">
      {/* Header con saludo */}
      <div className="estudiante-dashboard__header">
        <div className="estudiante-dashboard__welcome">
          <Avatar src={estudiante.avatar} alt={estudiante.nombre} size="lg" fallback="MG" />
          <div className="estudiante-dashboard__welcome-text">
            <h1 className="estudiante-dashboard__title">
              {t('estudiante.dashboard.welcome', { nombre: estudiante.nombre })}
            </h1>
            <p className="estudiante-dashboard__subtitle">
              {estudiante.carrera}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="estudiante-dashboard__stats">
        <StatCard
          title={t('estudiante.dashboard.pending')}
          value={estadisticas.pendientes}
          color="yellow"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          }
        />
        
        <StatCard
          title={t('estudiante.dashboard.completed')}
          value={estadisticas.completadas}
          color="green"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          }
        />
      </div>

      {/* Mis Cursos Actuales */}
      <div className="estudiante-dashboard__section">
        <h2 className="estudiante-dashboard__section-title">{t('estudiante.dashboard.myCourses')}</h2>
        <div className="estudiante-dashboard__courses">
          {cursosActuales.map((curso) => (
            <div key={curso.id} className="estudiante-dashboard__course-card">
              <div className="estudiante-dashboard__course-header">
                <span className="estudiante-dashboard__course-code">{curso.codigo}</span>
                {curso.evaluado && (
                  <span className="estudiante-dashboard__badge-evaluado">{t('estudiante.dashboard.evaluated')}</span>
                )}
              </div>
              
              <h3 className="estudiante-dashboard__course-title">{curso.nombre}</h3>
              <p className="estudiante-dashboard__course-teacher">{t('estudiante.dashboard.teacher')}: {curso.docente}</p>
              
              {curso.evaluado ? (
                <button className="estudiante-dashboard__btn estudiante-dashboard__btn--disabled" disabled>
                  {t('estudiante.dashboard.alreadyEvaluated')}
                </button>
              ) : (
                <button 
                  className="estudiante-dashboard__btn estudiante-dashboard__btn--primary"
                  onClick={() => handleEvaluar(curso.id)}
                >
                  {t('estudiante.dashboard.evaluate')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};