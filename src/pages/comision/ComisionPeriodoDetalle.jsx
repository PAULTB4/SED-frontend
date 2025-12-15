import { useParams, useNavigate } from 'react-router-dom';
import { useComisionData } from '../../features/evaluacion-comision';
import './ComisionPeriodoDetalle.css';

export const ComisionPeriodoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useComisionData();

  if (loading) return <div className="periodo-detalle__loading">Cargando...</div>;
  if (error) return <div className="periodo-detalle__error">{error}</div>;

  const periodo = data.periodos.find((p) => p.id === id);
  if (!periodo) {
    return (
      <div className="periodo-detalle__error">
        No se encontró el período.
        <button onClick={() => navigate('/comision/periodos')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="periodo-detalle">
      <div className="periodo-detalle__header">
        <div>
          <h1>{periodo.nombre}</h1>
          <p>Inicio: {new Date(periodo.fechaInicio).toLocaleDateString('es-PE')} — Fin: {new Date(periodo.fechaFin).toLocaleDateString('es-PE')}</p>
        </div>
        <div className="periodo-detalle__actions">
          <button onClick={() => navigate(`/comision/periodos/${id}/editar`)}>Editar</button>
          <button onClick={() => navigate('/comision/periodos')}>Volver</button>
        </div>
      </div>

      <div className="periodo-detalle__grid">
        <div className="periodo-detalle__card">
          <h3>Resumen</h3>
          <ul>
            <li>Docentes: {periodo.docentesEvaluados}/{periodo.totalDocentes}</li>
            <li>Estudiantes: {periodo.estudiantesParticipantes.toLocaleString()}</li>
            <li>Tasa de respuesta: {periodo.tasaRespuesta}%</li>
            <li>Progreso: {periodo.progreso}%</li>
            <li>Estado: {periodo.estado}</li>
          </ul>
        </div>

        <div className="periodo-detalle__card">
          <h3>Acciones rápidas</h3>
          <button className="periodo-detalle__btn" onClick={() => navigate(`/comision/periodos/${id}/editar`)}>Editar período</button>
          <button className="periodo-detalle__btn" onClick={() => navigate('/comision/reportes')}>Ver reportes</button>
        </div>
      </div>
    </div>
  );
};
