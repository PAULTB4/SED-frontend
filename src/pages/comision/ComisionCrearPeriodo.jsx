import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { periodosApi } from '@/features/evaluacion-comision/api/periodosApi';
import './ComisionCrearPeriodo.css';

export const ComisionCrearPeriodo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.fechaInicio || !form.fechaFin) {
      setError('Completa nombre y fechas');
      return;
    }
    try {
      setError('');
      await periodosApi.crear({
        nombre: form.nombre,
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
        estado: 'PLANIFICADO'
      });
      navigate('/comision/periodos');
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Error al crear período');
    }
  };

  return (
    <div className="comision-crear-periodo">
      <div className="crear-header">
        <h1>Crear Nuevo Período</h1>
        <p>Configura un período de evaluación docente.</p>
      </div>
      <form className="crear-form" onSubmit={handleSubmit}>
        {error && <div className="crear-error">{error}</div>}

        <label className="crear-label">
          Nombre del período
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Evaluación Semestral 2024-I"
          />
        </label>

        <div className="crear-dates">
          <label className="crear-label">
            Fecha de inicio
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
            />
          </label>
          <label className="crear-label">
            Fecha de fin
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="crear-label">
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows="4"
            placeholder="Opcional: detalles del período"
          />
        </label>

        <div className="crear-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/comision/periodos')}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Crear período
          </button>
        </div>
      </form>
    </div>
  );
};
