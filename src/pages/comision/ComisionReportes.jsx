import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComisionData } from '../../features/evaluacion-comision';
import { BarChart, PieChart, LineChart } from '../../shared/ui/components';
import './ComisionReportes.css';

export const ComisionReportes = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useComisionData();
  const [selectedPeriodo, setSelectedPeriodo] = useState('todos');

  if (loading) {
    return (
      <div className="comision-reportes">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comision-reportes">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const { periodos, datosGraficos, estadisticas } = data;

  // Preparar datos para gráficos
  const tasaRespuestaData = datosGraficos.tasaRespuestaPorFacultad.map(item => ({
    label: item.facultad,
    value: item.tasa
  }));

  const distribucionData = datosGraficos.distribucionCalificaciones.map((item, index) => {
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280'];
    return {
      label: item.rango,
      value: item.cantidad,
      color: colors[index]
    };
  });

  const tendenciaData = datosGraficos.tendenciaMensual.map(item => ({
    label: item.mes,
    value: item.participacion
  }));

  const promediosData = datosGraficos.promediosPorDimension.map(item => ({
    label: item.dimension,
    value: item.promedio
  }));

  return (
    <div className="comision-reportes">
      {/* Header */}
      <div className="reportes-header">
        <div>
          <h1>{t('comision.reports.title')}</h1>
          <p>{t('comision.reports.subtitle')}</p>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="reportes-controls">
        <div className="control-group">
          <label htmlFor="periodo-select">{t('comision.reports.period')}:</label>
          <select
            id="periodo-select"
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
            className="periodo-select"
          >
            <option value="todos">{t('comision.reports.allPeriods')}</option>
            {periodos.map(periodo => (
              <option key={periodo.id} value={periodo.id}>
                {periodo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="export-buttons">
          <button className="btn-export btn-pdf">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>{t('comision.reports.exportPDF')}</span>
          </button>

          <button className="btn-export btn-excel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{t('comision.reports.exportExcel')}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card green">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{estadisticas.docentesEvaluados}</h3>
            <p>{t('comision.reports.evaluatedTeachers')}</p>
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{estadisticas.estudiantesParticipantes.toLocaleString()}</h3>
            <p>{t('comision.reports.participatingStudents')}</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{estadisticas.tasaRespuesta}%</h3>
            <p>{t('comision.reports.responseRate')}</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-section">
        {/* Tasa de Respuesta por Facultad */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>{t('comision.reports.responseByFaculty')}</h3>
            <p>{t('comision.reports.responseByFacultyDesc')}</p>
          </div>
          <div className="chart-body">
            <BarChart
              data={tasaRespuestaData}
              height={300}
              color="#10B981"
              maxValue={100}
              showPercentage={true}
            />
          </div>
        </div>

        {/* Distribución de Calificaciones */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>{t('comision.reports.ratingDistribution')}</h3>
            <p>{t('comision.reports.ratingDistributionDesc')}</p>
          </div>
          <div className="chart-body">
            <PieChart data={distribucionData} size={280} />
          </div>
        </div>

        {/* Promedio por Dimensión */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>{t('comision.reports.averageByDimension')}</h3>
            <p>{t('comision.reports.averageByDimensionDesc')}</p>
          </div>
          <div className="chart-body">
            <BarChart
              data={promediosData}
              height={300}
              color="#3B82F6"
              maxValue={5}
            />
          </div>
        </div>

        {/* Tendencia de Participación */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>{t('comision.reports.monthlyTrend')}</h3>
            <p>{t('comision.reports.monthlyTrendDesc')}</p>
          </div>
          <div className="chart-body">
            <LineChart
              data={tendenciaData}
              height={300}
              color="#10B981"
            />
          </div>
        </div>
      </div>

      {/* Tabla de Reportes Recientes */}
      <div className="recent-reports-section">
        <h2>{t('comision.reports.recentReports')}</h2>
        <div className="reports-table">
          <table>
            <thead>
              <tr>
                <th>{t('comision.reports.title')}</th>
                <th>{t('comision.reports.type')}</th>
                <th>{t('comision.reports.period')}</th>
                <th>{t('comision.reports.date')}</th>
                <th>{t('comision.reports.format')}</th>
                <th>{t('comision.reports.size')}</th>
                <th>{t('comision.reports.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data.reportesRecientes.map(reporte => (
                <tr key={reporte.id}>
                  <td className="report-title">{reporte.titulo}</td>
                  <td>
                    <span className="report-type-badge">{reporte.tipo}</span>
                  </td>
                  <td>{reporte.periodo}</td>
                  <td>{new Date(reporte.fecha).toLocaleDateString('es-PE')}</td>
                  <td>
                    <span className={`format-badge ${reporte.formato.toLowerCase()}`}>
                      {reporte.formato}
                    </span>
                  </td>
                  <td>{reporte.tamaño}</td>
                  <td>
                    <button className="btn-download" title="Descargar">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
