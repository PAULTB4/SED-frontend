import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComisionData } from '../../features/evaluacion-comision';
import { periodosApi } from '@/features/evaluacion-comision/api/periodosApi';
import './ComisionPeriodoEditar.css';

export const ComisionPeriodoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useComisionData();
  const [form, setForm] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  });
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  const periodo = data?.periodos?.find((p) => p.id === id);

  useEffect(() => {
    if (periodo) {
      setForm({
        nombre: periodo.nombre || '',
        fechaInicio: periodo.fechaInicio?.toString().split('T')[0] || '',
        fechaFin: periodo.fechaFin?.toString().split('T')[0] || '',
        descripcion: periodo.descripcion || ''
      });
    }
  }, [periodo]);

  if (loading) return <div className="periodo-editar__loading">Cargando...</div>;
  if (error) return <div className="periodo-editar__error">{error}</div>;
  if (!periodo) {
    return (
      <div className="periodo-editar__error">
        No se encontro el periodo.
        <button onClick={() => navigate('/comision/periodos')}>Volver</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toBackendEstado = (estado, fallback) => {
    if (!estado && fallback) return fallback;
    const upper = (estado || '').toString().toUpperCase();
    if (upper === 'PROGRAMADO' || upper === 'PLANIFICADO') return 'PLANIFICADO';
    if (upper === 'ACTIVO' || upper === 'ABIERTO' || upper === 'EN_EVALUACION' || upper === 'PUBLICADO') return 'ACTIVO';
    if (upper === 'FINALIZADO' || upper === 'CERRADO') return 'CERRADO';
    return 'PLANIFICADO';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.fechaInicio || !form.fechaFin) {
      setErr('Completa nombre y fechas');
      return;
    }

    setSaving(true);
    setErr('');
    try {
      await periodosApi.actualizar(id, {
        nombre: form.nombre,
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
        estado: toBackendEstado(periodo.estadoBackend, periodo.estado)
      });
      await refetch();
      navigate('/comision/periodos');
    } catch (submitErr) {
      console.error(submitErr);
      setErr(submitErr?.response?.data?.message || 'Error al actualizar el periodo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="periodo-editar">
      <div className="periodo-editar__header">
        <h1>Editar periodo</h1>
        <p>Modifica los datos del periodo seleccionado.</p>
      </div>
      <form className="periodo-editar__form" onSubmit={handleSubmit}>
        {err && <div className="periodo-editar__error">{err}</div>}

        <label className="periodo-editar__label">
          Nombre del periodo
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </label>

        <div className="periodo-editar__dates">
          <label className="periodo-editar__label">
            Fecha de inicio
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
            />
          </label>
          <label className="periodo-editar__label">
            Fecha de fin
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="periodo-editar__label">
          Descripcion
          <textarea
            name="descripcion"
            rows="4"
            value={form.descripcion}
            onChange={handleChange}
          />
        </label>

        <div className="periodo-editar__actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(`/comision/periodos/${id}`)}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
        </div>
      </form>
    </div>
  );
};
