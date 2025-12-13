import { Avatar } from '@/shared/ui/components';
import { useDocenteData } from '@/features/evaluaciones-docente';
import './DocenteProfile.css';

/**
 * Página Mi Perfil del Docente
 * Muestra información personal, cursos actuales y estadísticas generales
 */
export const DocenteProfile = () => {
  const { data, loading, error } = useDocenteData();

  if (loading) {
    return (
      <div className="docente-profile__loading">
        <div className="docente-profile__spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="docente-profile__error">
        <p>{error}</p>
      </div>
    );
  }

  const { docente, estadisticas, cursos } = data;

  return (
    <div className="docente-profile">
        <h1 className="docente-profile__page-title">Mi Perfil</h1>

        <div className="docente-profile__grid">
          {/* Información Personal */}
          <div className="docente-profile__card">
            <div className="docente-profile__avatar-section">
              <Avatar 
                src={docente.avatar} 
                alt={docente.nombre} 
                size="xl" 
                fallback="CM" 
              />
              <h2 className="docente-profile__name">{docente.nombre}</h2>
            </div>

            <div className="docente-profile__info">
              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">Email</span>
                <span className="docente-profile__info-value">{docente.email}</span>
              </div>

              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">Departamento</span>
                <span className="docente-profile__info-value">{docente.departamento}</span>
              </div>

              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">Especialidad</span>
                <span className="docente-profile__info-value">{docente.especialidad}</span>
              </div>

              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">Grado Académico</span>
                <span className="docente-profile__info-value">{docente.grado}</span>
              </div>
            </div>
          </div>

          {/* Cursos y Estadísticas */}
          <div className="docente-profile__right-column">
            {/* Mis Cursos Actuales */}
            <div className="docente-profile__card">
              <h3 className="docente-profile__section-title">Mis Cursos Actuales</h3>
              <div className="docente-profile__courses-list">
                {cursos.map((curso) => (
                  <div key={curso.id} className="docente-profile__course-item">
                    <div className="docente-profile__course-info">
                      <span className="docente-profile__course-code">{curso.codigo}</span>
                      <span className="docente-profile__course-name">{curso.nombre}</span>
                    </div>
                    <span className="docente-profile__course-students">
                      {curso.estudiantes} estudiantes matriculados
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas Generales */}
            <div className="docente-profile__card">
              <h3 className="docente-profile__section-title">Estadísticas Generales</h3>
              <div className="docente-profile__stats-grid">
                <div className="docente-profile__stat-box">
                  <div className="docente-profile__stat-value docente-profile__stat-value--green">
                    {estadisticas.anosExperiencia}
                  </div>
                  <div className="docente-profile__stat-label">Años de Experiencia</div>
                </div>

                <div className="docente-profile__stat-box">
                  <div className="docente-profile__stat-value docente-profile__stat-value--blue">
                    {estadisticas.totalEstudiantes}+
                  </div>
                  <div className="docente-profile__stat-label">Total de Estudiantes</div>
                </div>

                <div className="docente-profile__stat-box">
                  <div className="docente-profile__stat-value docente-profile__stat-value--yellow">
                    {estadisticas.calificacionHistorica} ⭐
                  </div>
                  <div className="docente-profile__stat-label">Calificación Histórica</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
