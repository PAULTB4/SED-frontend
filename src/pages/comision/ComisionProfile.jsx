import { useTranslation } from 'react-i18next';
import { useComisionData } from '../../features/evaluacion-comision';
import { Avatar, StatCard } from '../../shared/ui/components';
import { useState } from 'react';
import './ComisionProfile.css';

export const ComisionProfile = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useComisionData();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  if (loading) {
    return (
      <div className="comision-profile">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comision-profile">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const { comision, estadisticas } = data;

  const displayComision = {
    ...comision,
    nombre: storedUser.nombre || storedUser.nombreCompleto || comision.nombre,
    rol: storedUser.rol || storedUser.role || comision.rol,
    email: storedUser.correo || comision.email,
    avatar: avatarPreview || storedUser.avatar || comision.avatar
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setAvatarPreview(base64);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.avatar = base64;
        localStorage.setItem('user', JSON.stringify(user));
      } catch {
        /* ignore storage errors */
      }
    };
    setSavingAvatar(true);
    reader.onloadend = () => setSavingAvatar(false);
    reader.readAsDataURL(file);
  };

  return (
    <div className="comision-profile">
      {/* Header del perfil */}
      <div className="profile-header">
        <div className="profile-card">
          <Avatar src={displayComision.avatar} alt={displayComision.nombre} size="xl" fallback="U" />
          <div className="profile-info">
            <h1>{displayComision.nombre}</h1>
            <p className="profile-rol">{displayComision.rol}</p>
            <p className="profile-cargo">{displayComision.cargo}</p>
            <label className="avatar-upload">
              <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={savingAvatar} />
              {savingAvatar ? t('common.saving') : t('comision.profile.changeAvatar')}
            </label>
          </div>
        </div>
      </div>

      {/* Información de contacto */}
      <section className="profile-section">
        <h2>{t('comision.profile.contactInfo')}</h2>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="info-content">
              <label>{t('comision.profile.email')}</label>
              <p>{displayComision.email}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div className="info-content">
              <label>{t('comision.profile.phone')}</label>
              <p>{comision.telefono}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="info-content">
              <label>{t('comision.profile.office')}</label>
              <p>{comision.oficina}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="info-content">
              <label>{t('comision.profile.dependency')}</label>
              <p>{comision.facultad}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <div className="info-content">
              <label>{t('comision.profile.annex')}</label>
              <p>{comision.anexo}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsabilidades */}
      <section className="profile-section">
        <h2>{t('comision.profile.responsibilities')}</h2>
        <div className="responsibilities-list">
          {comision.responsabilidades.map((responsabilidad, index) => (
            <div key={index} className="responsibility-item">
              <div className="responsibility-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p>{responsabilidad}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Estadísticas de gestión */}
      <section className="profile-section">
        <h2>{t('comision.profile.managementStats')}</h2>
        <div className="stats-grid">
          <StatCard
            title={t('comision.profile.managedTeachers')}
            value={estadisticas.docentesEvaluados}
            subtitle={t('comision.profile.totalCurrentPeriod')}
            borderColor="#10B981"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          <StatCard
            title={t('comision.profile.configuredSurveys')}
            value={estadisticas.encuestasConfigur}
            subtitle={t('comision.profile.activeSurveys')}
            borderColor="#3B82F6"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          <StatCard
            title={t('comision.profile.generatedReports')}
            value={estadisticas.reportesGenerados}
            subtitle={t('comision.profile.exportedDocuments')}
            borderColor="#F59E0B"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          <StatCard
            title={t('comision.profile.activePeriods')}
            value={estadisticas.periodosActivos}
            subtitle={t('comision.profile.inProgress')}
            borderColor="#8B5CF6"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
};
