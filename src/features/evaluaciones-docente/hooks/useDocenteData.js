import { useEffect, useState, useMemo } from 'react';
import { cursosDocenteApi } from '../api/cursosDocenteApi';
import { periodosApi } from '@/features/evaluacion-comision/api/periodosApi';

const getUserStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
};

export const useDocenteData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const user = useMemo(() => getUserStorage(), []);
  const perfilId =
    user?.perfilId ||
    user?.docenteId ||
    user?.id_usuario ||
    user?.usuarioId ||
    user?.userId ||
    user?.usuario?.id ||
    user?.id ||
    null;
  const nombre = user?.nombre_completo || user?.nombre || 'Docente';
  const departamento = user?.departamento || user?.facultad || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!perfilId) {
        setError('No se encontró el perfil del docente');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        let periodos = await periodosApi.getActivos();
        if (!periodos || periodos.length === 0) {
          periodos = (await periodosApi.getTodos?.()) || [];
        }
        const periodo = periodos?.[0];
        if (!periodo) {
          setError('No hay periodos disponibles');
          setLoading(false);
          return;
        }

        const cursos = await cursosDocenteApi.getByPeriodo(perfilId, periodo.id);
        const mappedCursos = (cursos || []).map((c) => ({
          id: c.cursoId || c.id,
          codigo: c.cursoCodigo || c.codigo || '',
          nombre: c.cursoNombre || c.nombre || '',
          estudiantes: c.estudiantes || 0,
          evaluaciones: c.evaluaciones || 0,
          promedio: c.promedio || 0,
          docenteNombre: c.docenteNombre || nombre
        }));

        const stats = {
          totalEvaluaciones: mappedCursos.reduce((acc, cur) => acc + (cur.evaluaciones || 0), 0),
          promedioGeneral: mappedCursos.length > 0
            ? (mappedCursos.reduce((acc, cur) => acc + (cur.promedio || 0), 0) / mappedCursos.length).toFixed(1)
            : 0,
          tendencia: 0.0,
          comentariosRecientes: 0
        };

        setData({
          docente: {
            id: perfilId,
            nombre,
            departamento,
            avatar: null
          },
          estadisticas: stats,
          cursos: mappedCursos
        });
        setError(null);
      } catch (err) {
        console.error('Error cargando datos del docente', err);
        setError(err?.message || 'Error al cargar los datos');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [perfilId, nombre, departamento]);

  return { data, loading, error };
};
