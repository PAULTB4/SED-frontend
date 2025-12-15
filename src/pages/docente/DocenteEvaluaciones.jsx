import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart, LineChart, StarRating } from '@/shared/ui/components';
import { useDocenteData } from '@/features/evaluaciones-docente';
import { resumenDocenteApi } from '@/features/evaluaciones-docente/api/resumenDocenteApi';
import './DocenteEvaluaciones.css';

/**
 * Página Mis Evaluaciones del Docente
 * Muestra gráficos y tabla de evaluaciones por curso
 */
export const DocenteEvaluaciones = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { data, loading } = useDocenteData();
  const [selectedCurso, setSelectedCurso] = useState(searchParams.get('curso') || '');
  const [resumen, setResumen] = useState(null);
  const [loadingResumen, setLoadingResumen] = useState(false);

  if (loading) {
    return (
      <div className="docente-evaluaciones__loading">
        <div className="docente-evaluaciones__spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  const { cursos } = data;
  const cursoActual = useMemo(() => {
    if (!selectedCurso) return cursos[0];
    return cursos.find((c) => c.id.toString() === selectedCurso) || cursos[0];
  }, [cursos, selectedCurso]);

  useEffect(() => {
    if (!cursoActual) return;
    const load = async () => {
      try {
        setLoadingResumen(true);
        const res = await resumenDocenteApi.getResumen(cursoActual.seccionId || cursoActual.id);
        setResumen(res || { promedios: [], respuestas: [], promedioGeneral: 0 });
      } catch (err) {
        console.error(err);
        setResumen({ promedios: [], respuestas: [], promedioGeneral: 0 });
      } finally {
        setLoadingResumen(false);
      }
    };
    load();
  }, [cursoActual]);

  const categoriesData = (resumen?.promedios || []).map((p) => ({
    label: p.modulo,
    value: p.promedio
  }));

  const temporalData = (resumen?.respuestas || [])
    .filter((r) => r.fecha)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .map((r) => ({
      label: new Date(r.fecha).toLocaleDateString('es-PE'),
      value: r.calificacion
    }));

  const evaluacionesIndividuales = resumen?.respuestas || [];

  return (
    <div className="docente-evaluaciones">
      <div className="docente-evaluaciones__header">
        <h1 className="docente-evaluaciones__title">{t('docente.evaluations.title')}</h1>
        <select
          className="docente-evaluaciones__select"
          value={cursoActual?.id || ''}
          onChange={(e) => setSelectedCurso(e.target.value)}
        >
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.codigo} - {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="docente-evaluaciones__charts">
        <div className="docente-evaluaciones__chart-card">
          <h3 className="docente-evaluaciones__chart-title">
            {t('docente.evaluations.categoryAverage')}
          </h3>
          {loadingResumen ? <p>{t('common.loading')}</p> : <BarChart data={categoriesData} maxValue={5} color="#10B981" />}
        </div>

        <div className="docente-evaluaciones__chart-card">
          <h3 className="docente-evaluaciones__chart-title">
            {t('docente.evaluations.temporalEvolution')}
          </h3>
          {loadingResumen ? <p>{t('common.loading')}</p> : <LineChart data={temporalData} maxValue={5} color="#10B981" />}
        </div>
      </div>

      <div className="docente-evaluaciones__table-card">
        <h3 className="docente-evaluaciones__table-title">
          {t('docente.evaluations.individualEvaluations')}
        </h3>
        <div className="docente-evaluaciones__table-container">
          <table className="docente-evaluaciones__table">
            <thead>
              <tr>
                <th>{t('docente.evaluations.date')}</th>
                <th>{t('docente.evaluations.student')}</th>
                <th>{t('docente.evaluations.rating')}</th>
                <th>{t('docente.evaluations.comment')}</th>
              </tr>
            </thead>
            <tbody>
              {evaluacionesIndividuales.map((evaluacion, index) => (
                <tr key={index}>
                  <td>{evaluacion.fecha ? new Date(evaluacion.fecha).toLocaleDateString('es-PE') : '-'}</td>
                  <td>{evaluacion.estudiante || t('docente.evaluations.anonymous')}</td>
                  <td>
                    <StarRating rating={evaluacion.calificacion || 0} size="sm" />
                  </td>
                  <td>{evaluacion.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
