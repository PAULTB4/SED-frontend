import { useNavigate } from 'react-router-dom';
import { StatCard, CourseCard, Avatar } from '@/shared/ui/components';
import { useDocenteData } from '@/features/evaluaciones-docente';
import './DocenteDashboard.css';

/**
 * Dashboard principal del Docente
 * Muestra estadísticas generales y lista de cursos
 */
export const DocenteDashboard = () => {
  const { data, loading, error } = useDocenteData();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="docente-dashboard__loading">
        <div className="docente-dashboard__spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="docente-dashboard__error">
        <p>{error}</p>
      </div>
    );
  }

  const { docente, estadisticas, cursos } = data;

  const handleVerEvaluaciones = (cursoId) => {
    navigate(`/docente/evaluaciones?curso=${cursoId}`);
  };

  return (
    <div className="docente-dashboard">
        {/* Header con saludo */}
        <div className="docente-dashboard__header">
          <div className="docente-dashboard__welcome">
            <Avatar src={docente.avatar} alt={docente.nombre} size="lg" fallback="CM" />
            <div className="docente-dashboard__welcome-text">
              <h1 className="docente-dashboard__title">
                Bienvenido, {docente.nombre}
              </h1>
              <p className="docente-dashboard__subtitle">
                {docente.departamento}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="docente-dashboard__stats">
          <StatCard
            title="Total de Evaluaciones"
            value={estadisticas.totalEvaluaciones}
            color="green"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          
          <StatCard
            title="Calificación Promedio"
            value={
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {estadisticas.promedioGeneral}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FCD34D' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            }
            color="yellow"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          
          <StatCard
            title="Tendencia vs Semestre Anterior"
            value={`+${estadisticas.tendencia}`}
            color="blue"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          
          <StatCard
            title="Comentarios Recientes"
            value={estadisticas.comentariosRecientes}
            color="green"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
        </div>

        {/* Mis Cursos */}
        <div className="docente-dashboard__section">
          <h2 className="docente-dashboard__section-title">Mis Cursos</h2>
          <div className="docente-dashboard__courses">
            {cursos.map((curso) => (
              <CourseCard
                key={curso.id}
                codigo={curso.codigo}
                nombre={curso.nombre}
                estudiantes={curso.estudiantes}
                evaluaciones={curso.evaluaciones}
                promedio={curso.promedio}
                onVerEvaluaciones={() => handleVerEvaluaciones(curso.id)}
              />
            ))}
          </div>
        </div>
      </div>
  );
};
