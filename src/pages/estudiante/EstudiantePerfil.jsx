import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/components';
import { useEstudianteData } from '@/features/evaluacion-estudiante';
import { useState } from 'react';
import './EstudiantePerfil.css';

/**
 * Página Mi Perfil del Estudiante
 * Muestra información personal y cursos matriculados
 */
export const EstudiantePerfil = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useEstudianteData();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savingAvatar, setSavingAvatar] = useState(false);

  if (loading) {
    return (
      <div className="estudiante-perfil__loading">
        <div className="estudiante-perfil__spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estudiante-perfil__error">
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

  const { estudiante, cursosMatriculados } = data;

  const displayEstudiante = {
    ...estudiante,
    nombre: storedUser.nombre || storedUser.nombreCompleto || estudiante.nombre,
    email: storedUser.correo || storedUser.email || estudiante.email,
    codigo: storedUser.codigoEstudiante || storedUser.codigo || estudiante.codigo || '',
    carrera: storedUser.carrera || storedUser.facultad || estudiante.carrera || '',
    semestre: storedUser.semestre || storedUser.semestreActual || estudiante.semestre || '',
    avatar: avatarPreview || storedUser.avatar || estudiante.avatar
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
    <div className="estudiante-perfil">
      <h1 className="estudiante-perfil__page-title">{t('estudiante.profile.title')}</h1>

      <div className="estudiante-perfil__grid">
        {/* Información Personal */}
        <div className="estudiante-perfil__card">
          <div className="estudiante-perfil__avatar-section">
            <Avatar 
              src={displayEstudiante.avatar} 
              alt={displayEstudiante.nombre} 
              size="xl" 
              fallback="U" 
            />
            <h2 className="estudiante-perfil__name">{displayEstudiante.nombre}</h2>
            <label className="estudiante-perfil__avatar-upload">
              <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={savingAvatar} />
              {savingAvatar ? t('common.saving') : t('estudiante.profile.changeAvatar', 'Cambiar foto')}
            </label>
          </div>

          <div className="estudiante-perfil__info">
            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">{t('estudiante.profile.email')}</span>
              <span className="estudiante-perfil__info-value">{displayEstudiante.email}</span>
            </div>

            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">{t('estudiante.profile.studentCode')}</span>
              <span className="estudiante-perfil__info-value">{estudiante.codigo}</span>
            </div>

            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">{t('estudiante.profile.career')}</span>
              <span className="estudiante-perfil__info-value">{estudiante.carrera}</span>
            </div>

            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">{t('estudiante.profile.currentSemester')}</span>
              <span className="estudiante-perfil__info-value">{estudiante.semestre}</span>
            </div>
          </div>
        </div>

        {/* Cursos Matriculados */}
        <div className="estudiante-perfil__card">
          <h3 className="estudiante-perfil__section-title">{t('estudiante.profile.enrolledCourses')}</h3>
          <div className="estudiante-perfil__courses-list">
            {cursosMatriculados.map((curso) => (
              <div key={curso.id} className="estudiante-perfil__course-item">
                <div className="estudiante-perfil__course-info">
                  <span className="estudiante-perfil__course-code">{curso.codigo}</span>
                  <span className="estudiante-perfil__course-name">{curso.nombre}</span>
                </div>
                <span className="estudiante-perfil__course-teacher">
                  {t('estudiante.profile.teacher')}: {curso.docente}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
