import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cursosApi } from '@/features/cursos/api/cursosApi';
import { seccionesApi } from '@/features/cursos/api/seccionesApi';
import { matriculasApi } from '@/features/cursos/api/matriculasApi';
import { periodosApi } from '@/features/evaluacion-comision/api/periodosApi';
import { Button } from '@/shared/ui/components';
import './RegisterCoursesPage.css';

export const RegisterCoursesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userStorage = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const rol = location.state?.rol || userStorage?.rol || 'estudiante';
  const perfilId = location.state?.perfilId || userStorage?.perfilId;

  const [cursos, setCursos] = useState([]);
  const [periodoId, setPeriodoId] = useState(null);
  const [periodoNombre, setPeriodoNombre] = useState('');
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seccionesPeriodo, setSeccionesPeriodo] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const cursosRes = await cursosApi.getAll();
        setCursos(cursosRes);
        let periodos = await periodosApi.getActivos();
        if (!periodos || periodos.length === 0) {
          periodos = (await periodosApi.getTodos?.()) || [];
        }
        const primero = periodos?.[0];
        if (primero) {
          setPeriodoId(primero.id);
          setPeriodoNombre(primero.nombre || '');
          const secs = await seccionesApi.getByPeriodo(primero.id);
          setSeccionesPeriodo(secs);
        } else {
          setError('No hay periodos disponibles, crea uno primero.');
        }
      } catch (err) {
        setError(err?.message || 'No se pudieron cargar los cursos');
      }
    };
    load();
  }, []);

  const toggleCurso = (cursoId) => {
    setSelected((prev) => ({
      ...prev,
      [cursoId]: !prev[cursoId]
    }));
  };

  const handleSave = async () => {
    if (!perfilId || !periodoId) {
      setError('Falta perfil o periodo activo');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const cursosSeleccionados = Object.keys(selected).filter((c) => selected[c]);
      for (const cursoId of cursosSeleccionados) {
        let seccion = seccionesPeriodo.find((s) => s.cursoId === cursoId);

        if (rol === 'docente') {
          // Asigna docente (crea o actualiza la sección existente)
          seccion = await seccionesApi.create({
            cursoId,
            periodoId,
            docenteId: perfilId,
            codigo: seccion?.codigo || 'A',
            modalidad: seccion?.modalidad || 'PRESENCIAL'
          });
          if (seccion?.docenteId && seccion.docenteId !== perfilId) {
            throw new Error('El curso ya tiene un docente asignado');
          }
        } else {
          // Estudiante: crea sección si no existe
          if (!seccion) {
            seccion = await seccionesApi.create({ cursoId, periodoId, codigo: 'A' });
          }
          if (seccion) {
            await matriculasApi.create({ estudianteId: perfilId, seccionId: seccion.seccionId || seccion.id });
          }
        }

        if (seccion) {
          setSeccionesPeriodo((prev) => {
            const rest = prev.filter((s) => (s.seccionId || s.id) !== (seccion.seccionId || seccion.id));
            return [...rest, seccion];
          });
        }
      }
      navigate(rol === 'docente' ? '/docente/dashboard' : '/estudiante/dashboard');
    } catch (err) {
      setError(err?.message || 'No se pudo guardar la selección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-courses">
      <div className="register-courses__card">
        <h2>Selecciona tus cursos</h2>
        <p>Periodo activo: {periodoId ? periodoNombre : 'No disponible'}</p>
        {error && <div className="register-courses__error">{error}</div>}
        <div className="register-courses__list">
          {cursos.map((curso) => (
            <label key={curso.id || curso.codigo} className="register-courses__item">
              <input
                type="checkbox"
                checked={!!selected[curso.id]}
                onChange={() => toggleCurso(curso.id)}
              />
              <span className="register-courses__nombre">{curso.nombre}</span>
              <span className="register-courses__codigo">{curso.codigo}</span>
            </label>
          ))}
        </div>
        <div className="register-courses__actions">
          <Button variant="secondary" onClick={() => navigate('/login')}>
            Omitir
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar y continuar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
