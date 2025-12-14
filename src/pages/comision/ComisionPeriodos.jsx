import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComisionData } from '../../features/evaluacion-comision';
import './ComisionPeriodos.css';

export const ComisionPeriodos = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useComisionData();
  const [activeTab, setActiveTab] = useState('activos');

  if (loading) {
    return (
      <div className="comision-periodos">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comision-periodos">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const { periodos } = data;

  const filterPeriodosByStatus = (status) => {
    if (status === 'activos') return periodos.filter(p => p.estado === 'activo');
    if (status === 'programados') return periodos.filter(p => p.estado === 'programado');
    if (status === 'finalizados') return periodos.filter(p => p.estado === 'finalizado');
    return periodos;
  };

  const filteredPeriodos = filterPeriodosByStatus(activeTab);

  const getStatusBadge = (estado) => {
    const badges = {
      activo: { text: t('comision.periods.active'), class: 'status-active' },
      programado: { text: t('comision.periods.scheduled'), class: 'status-scheduled' },
      finalizado: { text: t('comision.periods.finished'), class: 'status-finished' }
    };
    return badges[estado] || badges.activo;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="comision-periodos">
      {/* Header */}
      <div className="periodos-header">
        <div>
          <h1>{t('comision.periods.title')}</h1>
          <p>{t('comision.periods.subtitle')}</p>
        </div>
        <button className="btn-create-period">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>{t('comision.periods.createNew')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="periodos-tabs">
        <button
          className={`tab ${activeTab === 'activos' ? 'active' : ''}`}
          onClick={() => setActiveTab('activos')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{t('comision.periods.active')}</span>
          <span className="tab-count">{periodos.filter(p => p.estado === 'activo').length}</span>
        </button>

        <button
          className={`tab ${activeTab === 'programados' ? 'active' : ''}`}
          onClick={() => setActiveTab('programados')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>{t('comision.periods.scheduled')}</span>
          <span className="tab-count">{periodos.filter(p => p.estado === 'programado').length}</span>
        </button>

        <button
          className={`tab ${activeTab === 'finalizados' ? 'active' : ''}`}
          onClick={() => setActiveTab('finalizados')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{t('comision.periods.finished')}</span>
          <span className="tab-count">{periodos.filter(p => p.estado === 'finalizado').length}</span>
        </button>
      </div>

      {/* Períodos Grid */}
      <div className="periodos-grid">
        {filteredPeriodos.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <h3>{t('comision.periods.noPeriods')} {activeTab}</h3>
            <p>{t('comision.periods.noPeriodsFound')}</p>
          </div>
        ) : (
          filteredPeriodos.map(periodo => {
            const badge = getStatusBadge(periodo.estado);
            return (
              <div key={periodo.id} className="period-card">
                <div className="period-card-header">
                  <h3>{periodo.nombre}</h3>
                  <span className={`status-badge ${badge.class}`}>{badge.text}</span>
                </div>

                <div className="period-dates">
                  <div className="date-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{t('comision.periods.start')}: {formatDate(periodo.fechaInicio)}</span>
                  </div>
                  <div className="date-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span>{t('comision.periods.end')}: {formatDate(periodo.fechaFin)}</span>
                  </div>
                </div>

                <div className="period-stats">
                  <div className="stat-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    <div>
                      <span className="stat-value">{periodo.docentesEvaluados}/{periodo.totalDocentes}</span>
                      <span className="stat-label">{t('comision.periods.teachers')}</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    <div>
                      <span className="stat-value">{periodo.estudiantesParticipantes.toLocaleString()}</span>
                      <span className="stat-label">{t('comision.periods.students')}</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    <div>
                      <span className="stat-value">{periodo.tasaRespuesta}%</span>
                      <span className="stat-label">{t('comision.periods.responseRate')}</span>
                    </div>
                  </div>
                </div>

                <div className="period-progress">
                  <div className="progress-header">
                    <span className="progress-label">{t('comision.periods.progress')}</span>
                    <span className="progress-value">{periodo.progreso}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${periodo.progreso}%` }}
                    ></div>
                  </div>
                </div>

                <div className="period-actions">
                  <button className="btn-action btn-view">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{t('comision.periods.viewDetails')}</span>
                  </button>

                  {periodo.estado !== 'finalizado' && (
                    <button className="btn-action btn-edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>{t('comision.periods.edit')}</span>
                    </button>
                  )}

                  <button className="btn-action btn-more">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
