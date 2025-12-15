import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instrumentosApi } from '@/features/evaluacion-comision/api/instrumentosApi';
import { useComisionData } from '@/features/evaluacion-comision';
import './ComisionEvaluaciones.css';

export const ComisionEvaluaciones = () => {
  const { id: periodoId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useComisionData();
  const [instrumentos, setInstrumentos] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  const periodo = useMemo(
    () => data?.periodos?.find((p) => p.id === periodoId),
    [data, periodoId]
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingList(true);
        const list = await instrumentosApi.listarPorPeriodo(periodoId);
        const uniques = Object.values(
          (list || []).reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {})
        );
        setInstrumentos(uniques);
      } catch (err) {
        console.error(err);
        setFeedback('No se pudieron cargar las evaluaciones');
      } finally {
        setLoadingList(false);
      }
    };
    load();
  }, [periodoId]);

  const handleDelete = async (instrumentoId) => {
    if (!window.confirm('¿Eliminar esta evaluación? Esta acción no se puede deshacer.')) return;
    try {
      setSaving(true);
      await instrumentosApi.eliminar(instrumentoId);
      const list = await instrumentosApi.listarPorPeriodo(periodoId);
      const uniques = Object.values(
        (list || []).reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {})
      );
      setInstrumentos(uniques);
    } catch (err) {
      console.error(err);
      setFeedback(err?.response?.data?.message || 'No se pudo eliminar la evaluación');
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingList) return <div className="eva-list__loading">Cargando...</div>;
  if (error) return <div className="eva-list__error">{error}</div>;
  if (!periodo) {
    return (
      <div className="eva-list__error">
        No se encontro el periodo.
        <button onClick={() => navigate('/comision/periodos')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="eva-list">
      <div className="eva-list__header">
        <div>
          <p className="eva-list__breadcrumb">Periodos / {periodo.nombre}</p>
          <h1>Evaluaciones del periodo</h1>
          <p>Selecciona una evaluación para editarla.</p>
        </div>
        <button className="btn-primary" type="button" onClick={() => navigate(`/comision/periodos/${periodoId}/evaluacion/nueva`)}>
          Crear nueva evaluación
        </button>
      </div>

      {feedback && <div className="eva-list__alert">{feedback}</div>}

      {instrumentos.length === 0 ? (
        <div className="eva-list__empty">
          <p>No hay evaluaciones en este periodo.</p>
          <button className="btn-secondary" onClick={() => navigate(`/comision/periodos/${periodoId}/evaluacion/nueva`)}>Crear evaluación</button>
        </div>
      ) : (
        <div className="eva-list__grid">
          {instrumentos.map((inst) => (
            <div key={inst.id} className="eva-list__card">
              <div>
                <h3>{inst.nombre}</h3>
                <p className="eva-list__muted">{inst.descripcion || 'Sin descripción'}</p>
                <p className="eva-list__muted">{inst.modulos?.length || 0} módulo(s)</p>
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(`/comision/periodos/${periodoId}/evaluacion/${inst.id}`)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn-secondary danger"
                onClick={() => handleDelete(inst.id)}
                disabled={saving}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
