import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useComisionData } from '../../features/evaluacion-comision';
import { periodosApi } from '@/features/evaluacion-comision/api/periodosApi';
import { useSeccionesPeriodo } from '@/features/evaluacion-comision/hooks/useSeccionesPeriodo';
import './ComisionPeriodos.css';

export const ComisionPeriodos = () => {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useComisionData();
  const [activeTab, setActiveTab] = useState('activos');
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingPeriodo, setEditingPeriodo] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const periodos = data?.periodos || [];
  const periodoIds = useMemo(() => periodos.map((p) => p.id), [periodos]);
  const { data: seccionesPorPeriodo } = useSeccionesPeriodo(periodoIds);

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

  const toggleMenu = (id) => {
    setMenuOpen((prev) => prev === id ? null : id);
  };

  const openEditModal = (periodo) => {
    setEditingPeriodo(periodo);
    setNuevoNombre(periodo?.nombre || '');
    setFeedback('');
    setMenuOpen(null);
  };

  const closeEditModal = () => {
    setEditingPeriodo(null);
    setNuevoNombre('');
    setFeedback('');
  };

  const mapEstadoToBackend = (periodo) => {
    if (!periodo) return 'PLANIFICADO';
    if (periodo.estadoBackend) return periodo.estadoBackend;
    const val = (periodo.estado || '').toString().toUpperCase();
    if (val === 'PROGRAMADO' || val === 'PLANIFICADO') return 'PLANIFICADO';
    if (val === 'FINALIZADO' || val === 'CERRADO') return 'CERRADO';
    return 'ACTIVO';
  };

  const handleUpdateNombre = async (e) => {
    e.preventDefault();
    if (!editingPeriodo) return;
    if (!nuevoNombre.trim()) {
      setFeedback('Ingresa un nombre');
      return;
    }
    setSaving(true);
    setFeedback('');
    try {
      await periodosApi.actualizar(editingPeriodo.id, {
        nombre: nuevoNombre.trim(),
        fechaInicio: editingPeriodo.fechaInicio?.toString().split('T')[0],
        fechaFin: editingPeriodo.fechaFin?.toString().split('T')[0],
        estado: mapEstadoToBackend(editingPeriodo)
      });
      await refetch();
      closeEditModal();
    } catch (updateErr) {
      console.error(updateErr);
      setFeedback(updateErr?.response?.data?.message || 'No se pudo actualizar el periodo');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePeriodo = async (periodoId) => {
    if (!window.confirm('¿Eliminar este periodo? Esta acción no se puede deshacer.')) return;
    try {
      setSaving(true);
      await periodosApi.eliminar(periodoId);
      await refetch();
    } catch (errDelete) {
      console.error(errDelete);
      setFeedback(errDelete?.response?.data?.message || 'No se pudo eliminar el periodo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="comision-periodos">
      <div className="periodos-header">
        <div>
          <h1>{t('comision.periods.title')}</h1>
          <p>{t('comision.periods.subtitle')}</p>
        </div>
        <button className="btn-create-period" type="button" onClick={() => navigate('/comision/periodos/crear')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>{t('comision.periods.createNew')}</span>
        </button>
      </div>

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
            const secciones = seccionesPorPeriodo[periodo.id] || [];
            const seccionesConEval = secciones.filter((s) => s.instrumentoId);
            return (
              <div key={periodo.id} className="period-card">
                <div className="period-card-header">
                  <h3>{periodo.nombre}</h3>
                  <span className={`status-badge ${badge.class}`}>{badge.text}</span>
                </div>

                {seccionesConEval.length > 0 && (
                  <div className="period-eval-chip">
                    <div>
                      <p className="chip-title">Evaluaciones configuradas</p>
                      <p className="chip-desc">{seccionesConEval.length} curso(s) con instrumento asignado</p>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => navigate(`/comision/periodos/${periodo.id}/evaluaciones`)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-ghost danger"
                      onClick={() => handleDeletePeriodo(periodo.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}

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
                  <button className="btn-action btn-view" onClick={() => navigate(`/comision/periodos/${periodo.id}`)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{t('comision.periods.viewDetails')}</span>
                  </button>

                  {periodo.estado !== 'finalizado' && (
                    <button className="btn-action btn-edit" onClick={() => navigate(`/comision/periodos/${periodo.id}/editar`)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>{t('comision.periods.edit')}</span>
                    </button>
                  )}
                  <button className="btn-action btn-edit danger" onClick={() => handleDeletePeriodo(periodo.id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 4H8l-1 14h13l1-14Z" />
                      <path d="M10 4V2h6v2" />
                      <path d="M14 10v6" />
                      <path d="M10 10v6" />
                    </svg>
                    <span>Eliminar</span>
                  </button>

                  <div className="actions-wrapper">
                    <button className="btn-action btn-more" onClick={() => toggleMenu(periodo.id)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    {menuOpen === periodo.id && (
                      <div className="period-dropdown">
                        <button type="button" onClick={() => navigate(`/comision/periodos/${periodo.id}/evaluaciones`)}>Gestionar evaluaciones</button>
                        <button type="button" onClick={() => openEditModal(periodo)}>Editar nombre</button>
                        <button type="button" onClick={() => navigate(`/comision/periodos/${periodo.id}/editar`)}>Editar fechas</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {editingPeriodo && (
        <div className="edit-modal">
          <div className="edit-modal__content">
            <h3>Renombrar periodo</h3>
            <p>Actualiza el nombre que veran docentes y estudiantes.</p>
            {feedback && <div className="edit-modal__error">{feedback}</div>}
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Nombre del periodo"
            />
            <div className="edit-modal__actions">
              <button type="button" className="btn-secondary" onClick={closeEditModal}>Cancelar</button>
              <button type="button" className="btn-primary" onClick={handleUpdateNombre} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
