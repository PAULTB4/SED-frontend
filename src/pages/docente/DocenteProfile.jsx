import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/components';
import { useDocenteData } from '@/features/evaluaciones-docente';
import './DocenteProfile.css';

/**
 * Página Mi Perfil del Docente
 * Muestra información personal, cursos actuales y estadísticas generales
 */
export const DocenteProfile = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useDocenteData();

  if (loading) {
    return (
      <div className="docente-profile__loading">
        <div className="docente-profile__spinner"></div>
        <p>{t('common.loading')}</p>
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
        <h1 className="docente-profile__page-title">{t('docente.profile.title')}</h1>

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
                <span className="docente-profile__info-label">{t('docente.profile.email')}</span>
                <span className="docente-profile__info-value">{docente.email}</span>
              </div>

              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">{t('docente.profile.department')}</span>
                <span className="docente-profile__info-value">{docente.departamento}</span>
              </div>

              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">{t('docente.profile.position')}</span>
                <span className="docente-profile__info-value">{docente.especialidad}</span>
              </div>

              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">{t('docente.profile.degree')}</span>
                <span className="docente-profile__info-value">{docente.grado}</span>
              </div>
            </div>
          </div>

          {/* Cursos y Estadísticas */}
          <div className="docente-profile__right-column">
            {/* Mis Cursos Actuales */}
            <div className="docente-profile__card">
              <h3 className="docente-profile__section-title">{t('docente.profile.courses')}</h3>
              <div className="docente-profile__courses-list">
                {cursos.map((curso) => (
                  <div key={curso.id} className="docente-profile__course-item">
                    <div className="docente-profile__course-info">
                      <span className="docente-profile__course-code">{curso.codigo}</span>
                      <span className="docente-profile__course-name">{curso.nombre}</span>
                    </div>
                    <span className="docente-profile__course-students">
                      {curso.estudiantes} {t('docente.profile.studentsEnrolled')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas Generales */}
            <div className="docente-profile__card">
              <h3 className="docente-profile__section-title">{t('docente.profile.generalStats')}</h3>
              <div className="docente-profile__stats-grid">
                <div className="docente-profile__stat-box">
                  <div className="docente-profile__stat-value docente-profile__stat-value--green">
                    {estadisticas.anosExperiencia}
                  </div>
                  <div className="docente-profile__stat-label">{t('docente.profile.yearsExperience')}</div>
                </div>

                <div className="docente-profile__stat-box">
                  <div className="docente-profile__stat-value docente-profile__stat-value--blue">
                    {estadisticas.totalEstudiantes}+
                  </div>
                  <div className="docente-profile__stat-label">{t('docente.profile.totalStudents')}</div>
                </div>

                <div className="docente-profile__stat-box">
                  <div className="docente-profile__stat-value docente-profile__stat-value--yellow">
                    {estadisticas.calificacionHistorica} ⭐
                  </div>
                  <div className="docente-profile__stat-label">{t('docente.profile.historicalRating')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
