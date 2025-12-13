import { useState } from 'react';
import { useComisionData } from '../../features/evaluacion-comision';
import { StatCard } from '../../shared/ui/components';
import './ComisionDashboard.css';

export const ComisionDashboard = () => {
  const { data, loading, error } = useComisionData();
  const [showBanner, setShowBanner] = useState(true);

  if (loading) {
    return (
      <div className="comision-dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comision-dashboard">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const { estadisticas, periodos } = data;
  const periodosActivos = periodos.filter(p => p.estado === 'activo');

  return (
    <div className="comision-dashboard">
      {/* Banner informativo */}
      {showBanner && (
        <div className="info-banner">
          <div className="banner-content">
            <div className="banner-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <div className="banner-text">
              <h3>Panel de Administración - Comisión de Evaluación Docente</h3>
              <p>Gestiona períodos de evaluación, configura encuestas y genera reportes del sistema</p>
            </div>
            <button className="banner-close" onClick={() => setShowBanner(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Funciones principales */}
      <section className="main-functions">
        <h2>Funciones Principales</h2>
        <div className="functions-grid">
          <div className="function-card">
            <div className="function-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <h3>Gestionar Períodos</h3>
            <p>Crear y administrar períodos de evaluación docente</p>
          </div>

          <div className="function-card">
            <div className="function-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3>Configurar Encuestas</h3>
            <p>Diseñar y editar cuestionarios de evaluación</p>
          </div>

          <div className="function-card">
            <div className="function-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3>Generar Reportes</h3>
            <p>Exportar estadísticas y análisis de evaluaciones</p>
          </div>
        </div>
      </section>

      {/* Estadísticas generales */}
      <section className="stats-section">
        <h2>Estadísticas Generales</h2>
        <div className="stats-grid">
          <StatCard
            title="Docentes Evaluados"
            value={estadisticas.docentesEvaluados}
            subtitle="En período actual"
            borderColor="#10B981"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          <StatCard
            title="Estudiantes Participantes"
            value={estadisticas.estudiantesParticipantes.toLocaleString()}
            subtitle="Total de respuestas"
            borderColor="#3B82F6"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          <StatCard
            title="Tasa de Respuesta"
            value={`${estadisticas.tasaRespuesta}%`}
            subtitle="Promedio general"
            borderColor="#F59E0B"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          <StatCard
            title="Períodos Activos"
            value={estadisticas.periodosActivos}
            subtitle="En ejecución"
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

      {/* Accesos rápidos */}
      <section className="quick-access-section">
        <h2>Accesos Rápidos</h2>
        <div className="quick-access-grid">
          <div className="quick-card create-period">
            <div className="quick-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <h3>Crear Nuevo Período</h3>
            <p>Configurar un nuevo período de evaluación docente</p>
            <button className="quick-btn">
              <span>Crear Período</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="quick-card view-reports">
            <div className="quick-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 17V9M13 17v-6M8 17v-3" />
              </svg>
            </div>
            <h3>Ver Reportes</h3>
            <p>Acceder a estadísticas y análisis detallados</p>
            <button className="quick-btn">
              <span>Ver Reportes</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="quick-card manage-surveys">
            <div className="quick-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
            </div>
            <h3>Gestionar Encuestas</h3>
            <p>Configurar y editar cuestionarios de evaluación</p>
            <button className="quick-btn">
              <span>Gestionar</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Períodos activos */}
      {periodosActivos.length > 0 && (
        <section className="active-periods-section">
          <div className="section-header">
            <h2>Períodos Activos</h2>
            <span className="badge-count">{periodosActivos.length}</span>
          </div>
          <div className="periods-list">
            {periodosActivos.map(periodo => (
              <div key={periodo.id} className="period-card-mini">
                <div className="period-info">
                  <h4>{periodo.nombre}</h4>
                  <p className="period-dates">
                    {new Date(periodo.fechaInicio).toLocaleDateString('es-PE')} - {new Date(periodo.fechaFin).toLocaleDateString('es-PE')}
                  </p>
                </div>
                <div className="period-progress">
                  <div className="progress-stats">
                    <span>{periodo.docentesEvaluados}/{periodo.totalDocentes} docentes</span>
                    <span className="progress-value">{periodo.progreso}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${periodo.progreso}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
