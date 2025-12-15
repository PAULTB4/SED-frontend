import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useComisionData } from '@/features/evaluacion-comision';
import { instrumentosApi } from '@/features/evaluacion-comision/api/instrumentosApi';
import { seccionesApi } from '@/features/cursos/api/seccionesApi';
import './ComisionCrearEvaluacion.css';

const buildModulo = () => ({
  tempId: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
  nombre: '',
  descripcion: '',
  preguntas: [{ tempId: Math.random().toString(36).slice(2), enunciado: '' }]
});

export const ComisionCrearEvaluacion = () => {
  const { id: periodoId, instrumentoId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useComisionData();
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [modulos, setModulos] = useState([buildModulo()]);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [secciones, setSecciones] = useState([]);
  const [seccionesLoading, setSeccionesLoading] = useState(true);
  const [selectedSeccion, setSelectedSeccion] = useState('');
  const [instrumentoLoaded, setInstrumentoLoaded] = useState(false);

  const periodo = useMemo(
    () => data?.periodos?.find((p) => p.id === periodoId),
    [data, periodoId]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadSecciones = async () => {
      if (!periodoId) return;
      try {
        setSeccionesLoading(true);
        const secs = await seccionesApi.getByPeriodo(periodoId);
        setSecciones(secs);
        const libres = secs.filter((s) => !s.instrumentoId);
        setSelectedSeccion(libres[0]?.seccionId || '');
      } catch (errLoad) {
        console.error(errLoad);
        setFeedback('No se pudieron cargar las secciones del periodo');
      } finally {
        setSeccionesLoading(false);
      }
    };
    loadSecciones();
  }, [periodoId]);

  useEffect(() => {
    const loadInstrumento = async () => {
      if (!instrumentoId) {
        setInstrumentoLoaded(true);
        return;
      }
      try {
        const inst = await instrumentosApi.getById(instrumentoId);
        setForm({
          nombre: inst.nombre || '',
          descripcion: inst.descripcion || ''
        });
        const modulosMapped = (inst.modulos || []).map((m) => ({
          tempId: Math.random().toString(36).slice(2),
          nombre: m.nombre || '',
          descripcion: m.descripcion || '',
          preguntas: (m.preguntas || []).map((p) => ({
            tempId: Math.random().toString(36).slice(2),
            enunciado: p.enunciado || ''
          }))
        }));
        setModulos(modulosMapped.length > 0 ? modulosMapped : [buildModulo()]);

        const seccionConInst = secciones.find((s) => s.instrumentoId === instrumentoId);
        setSelectedSeccion(seccionConInst?.seccionId || '');
      } catch (err) {
        console.error(err);
        setFeedback('No se pudo cargar la evaluacion seleccionada');
      } finally {
        setInstrumentoLoaded(true);
      }
    };
    loadInstrumento();
  }, [instrumentoId, secciones]);

  const updateModulo = (tempId, key, value) => {
    setModulos((prev) =>
      prev.map((m) => (m.tempId === tempId ? { ...m, [key]: value } : m))
    );
  };

  const addModulo = () => setModulos((prev) => [...prev, buildModulo()]);

  const removeModulo = (tempId) => {
    setModulos((prev) => (prev.length === 1 ? prev : prev.filter((m) => m.tempId !== tempId)));
  };

  const addPregunta = (modTempId) => {
    setModulos((prev) =>
      prev.map((m) =>
        m.tempId === modTempId
          ? { ...m, preguntas: [...m.preguntas, { tempId: Math.random().toString(36).slice(2), enunciado: '' }] }
          : m
      )
    );
  };

  const updatePregunta = (modTempId, pregTempId, value) => {
    setModulos((prev) =>
      prev.map((m) =>
        m.tempId === modTempId
          ? {
              ...m,
              preguntas: m.preguntas.map((p) =>
                p.tempId === pregTempId ? { ...p, enunciado: value } : p
              )
            }
          : m
      )
    );
  };

  const removePregunta = (modTempId, pregTempId) => {
    setModulos((prev) =>
      prev.map((m) =>
        m.tempId === modTempId
          ? {
              ...m,
              preguntas: m.preguntas.length === 1 ? m.preguntas : m.preguntas.filter((p) => p.tempId !== pregTempId)
            }
          : m
      )
    );
  };

  const validar = () => {
    if (!form.nombre.trim()) return 'Ingresa un nombre para la evaluacion';
    const seccionesLibres = secciones.filter((s) => !s.instrumentoId);
    const seccionActual = secciones.find((s) => s.instrumentoId === instrumentoId);
    const hayOpciones = seccionesLibres.length > 0 || seccionActual;
    if (!hayOpciones) return 'No hay secciones libres en este periodo para asignar';
    if (hayOpciones && !selectedSeccion) return 'Selecciona una seccion para asignar';
    const hasPregunta = modulos.some((m) =>
      m.preguntas.some((p) => p.enunciado && p.enunciado.trim().length > 0)
    );
    if (!hasPregunta) return 'Agrega al menos una pregunta';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validar();
    if (errMsg) {
      setFeedback(errMsg);
      return;
    }
    setFeedback('');
    setSaving(true);
    try {
      const modulosLimpios = modulos
        .map((m) => {
          const preguntas = m.preguntas
            .filter((p) => p.enunciado && p.enunciado.trim().length > 0)
            .map((p) => ({ enunciado: p.enunciado.trim() }));
          return {
            nombre: m.nombre || 'Modulo',
            descripcion: m.descripcion,
            preguntas
          };
        })
        .filter((m) => m.preguntas.length > 0);

      const payload = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion,
        periodoId,
        modulos: modulosLimpios
      };
      const instrumento = instrumentoId
        ? await instrumentosApi.actualizar(instrumentoId, payload)
        : await instrumentosApi.crear(payload);

      const seccionSeleccionada = secciones.find((s) => s.seccionId === selectedSeccion);
      if (seccionSeleccionada && seccionSeleccionada.instrumentoId && seccionSeleccionada.instrumentoId !== instrumento.id) {
        throw new Error('La seccion seleccionada ya tiene evaluacion');
      }

      const seccionIdAsignar = selectedSeccion;

      if (!seccionIdAsignar) {
        throw new Error('Selecciona una seccion para asignar la evaluacion');
      }
      const seccionActual = secciones.find((s) => s.seccionId === seccionIdAsignar);
      if (!seccionActual || seccionActual.instrumentoId !== instrumento.id) {
        await instrumentosApi.asignarASeccion({
          instrumentoId: instrumento.id,
          seccionId: seccionIdAsignar
        });
      }
      navigate('/comision/periodos');
    } catch (submitErr) {
      console.error(submitErr);
      setFeedback(submitErr?.response?.data?.message || 'No se pudo guardar la evaluacion');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !instrumentoLoaded) return <div className="eva-loading">Cargando...</div>;
  if (error) return <div className="eva-error">{error}</div>;
  if (!periodo) {
    return (
      <div className="eva-error">
        No se encontro el periodo.
        <button onClick={() => navigate('/comision/periodos')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="eva-crear">
      <div className="eva-header">
        <div>
          <p className="eva-breadcrumb">Periodos / {periodo.nombre}</p>
          <h1>Formulario de evaluacion</h1>
          <p>Configura los modulos y preguntas que responderan docentes/estudiantes.</p>
        </div>
        <div className="eva-period-chip">
          <span>{periodo.nombre}</span>
          <small>
            {new Date(periodo.fechaInicio).toLocaleDateString('es-PE')} - {new Date(periodo.fechaFin).toLocaleDateString('es-PE')}
          </small>
        </div>
      </div>

      <form className="eva-form" onSubmit={handleSubmit}>
        {feedback && <div className="eva-alert">{feedback}</div>}

        <div className="eva-card">
          <h3>Datos generales</h3>
          <div className="eva-field">
            <label>Curso / seccion a evaluar</label>
            {seccionesLoading ? (
              <div className="eva-hint">Cargando secciones...</div>
            ) : (
              <>
                {(() => {
                  const seccionesLibres = secciones.filter((s) => !s.instrumentoId);
                  const seccionActual = secciones.find((s) => s.instrumentoId === instrumentoId);
                  const opciones = seccionActual
                    ? [seccionActual, ...seccionesLibres.filter((s) => s.seccionId !== seccionActual.seccionId)]
                    : seccionesLibres;

                  if (opciones.length > 0) {
                    return (
                      <select
                        value={selectedSeccion}
                        onChange={(e) => setSelectedSeccion(e.target.value)}
                      >
                        {opciones.map((s) => (
                          <option key={s.seccionId} value={s.seccionId}>
                            {s.cursoNombre} - Seccion {s.codigoSeccion}{s.instrumentoId ? ' (con evaluacion)' : ''}
                          </option>
                        ))}
                      </select>
                    );
                  }

                  return <div className="eva-alert">No hay secciones libres en este periodo.</div>;
                })()}
              </>
            )}
         </div>
          <div className="eva-field">
            <label>Nombre de la evaluacion</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Evaluacion docente 2025-I"
            />
          </div>
          <div className="eva-field">
            <label>Descripcion</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows="3"
              placeholder="Objetivo, instrucciones o alcance (opcional)"
            />
          </div>
        </div>

        <div className="eva-card">
          <div className="eva-card-header">
            <div>
              <h3>Modulos y preguntas</h3>
              <p>Agrega secciones tematicas (modulos) y sus preguntas. La escala es de 1 (muy deficiente) a 5 (excelente).</p>
            </div>
            <button type="button" className="btn-primary" onClick={addModulo}>Agregar modulo</button>
          </div>

          <div className="eva-modulos">
            {modulos.map((modulo, idx) => (
              <div key={modulo.tempId} className="eva-modulo">
                <div className="eva-modulo-header">
                  <div>
                    <p className="eva-modulo-label">Modulo {idx + 1}</p>
                    <input
                      type="text"
                      placeholder="Titulo del modulo"
                      value={modulo.nombre}
                      onChange={(e) => updateModulo(modulo.tempId, 'nombre', e.target.value)}
                    />
                  </div>
                  <div className="eva-modulo-actions">
                    <button type="button" className="btn-secondary" onClick={() => addPregunta(modulo.tempId)}>Agregar pregunta</button>
                    <button type="button" className="btn-ghost" onClick={() => removeModulo(modulo.tempId)}>Eliminar modulo</button>
                  </div>
                </div>
                <textarea
                  placeholder="Descripcion del modulo (opcional)"
                  value={modulo.descripcion}
                  onChange={(e) => updateModulo(modulo.tempId, 'descripcion', e.target.value)}
                  rows="2"
                />

                <div className="eva-preguntas">
                  {modulo.preguntas.map((pregunta, pIdx) => (
                    <div key={pregunta.tempId} className="eva-pregunta">
                      <div className="eva-pregunta-header">
                        <p className="eva-pregunta-label">Pregunta {pIdx + 1}</p>
                        <button type="button" className="btn-ghost" onClick={() => removePregunta(modulo.tempId, pregunta.tempId)}>Eliminar</button>
                      </div>
                      <input
                        type="text"
                        placeholder="Enunciado de la pregunta"
                        value={pregunta.enunciado}
                        onChange={(e) => updatePregunta(modulo.tempId, pregunta.tempId, e.target.value)}
                      />
                      <div className="eva-escala">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span key={num} className="eva-escala-item">{num}</span>
                        ))}
                        <div className="eva-escala-caption">
                          <span>1 Muy deficiente</span>
                          <span>5 Excelente</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="eva-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(`/comision/periodos/${periodoId}/evaluaciones`)}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar evaluacion'}</button>
        </div>
      </form>
    </div>
  );
};
