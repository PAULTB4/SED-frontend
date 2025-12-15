import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/components';
import { useDocenteData } from '@/features/evaluaciones-docente';
import { useState } from 'react';
import './DocenteProfile.css';

/**
 * Página Mi Perfil del Docente
 * Muestra información personal, cursos actuales y estadísticas generales
 */
export const DocenteProfile = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useDocenteData();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savingAvatar, setSavingAvatar] = useState(false);

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

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const { docente, estadisticas, cursos } = data;

  const displayDocente = {
    ...docente,
    nombre: storedUser.nombre || storedUser.nombreCompleto || docente.nombre,
    email: storedUser.correo || storedUser.email || docente.email,
    avatar: avatarPreview || storedUser.avatar || docente.avatar
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    setSavingAvatar(true);
    reader.onload = () => {
      const base64 = reader.result;
      setAvatarPreview(base64);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.avatar = base64;
        localStorage.setItem('user', JSON.stringify(user));
      } catch {
        /* ignore */
      }
      setSavingAvatar(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="docente-profile">
        <h1 className="docente-profile__page-title">{t('docente.profile.title')}</h1>

        <div className="docente-profile__grid">
          {/* Información Personal */}
          <div className="docente-profile__card">
            <div className="docente-profile__avatar-section">
              <Avatar 
                src={displayDocente.avatar} 
                alt={displayDocente.nombre} 
                size="xl" 
                fallback="U" 
              />
              <h2 className="docente-profile__name">{displayDocente.nombre}</h2>
              <label className="docente-profile__avatar-upload">
                <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={savingAvatar} />
                {savingAvatar ? t('common.saving') : t('docente.profile.changeAvatar', 'Cambiar foto')}
              </label>
            </div>

            <div className="docente-profile__info">
              <div className="docente-profile__info-item">
                <span className="docente-profile__info-label">{t('docente.profile.email')}</span>
                <span className="docente-profile__info-value">{displayDocente.email}</span>
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
