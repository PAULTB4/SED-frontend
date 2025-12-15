import { useEffect, useMemo, useState } from 'react';
import { cursosEstudianteApi } from '../api/cursosEstudianteApi';
import { periodosApi } from '@/features/evaluacion-comision/api/periodosApi';

const getUserStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
};

export const useEstudianteData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const user = useMemo(() => getUserStorage(), []);
  const perfilId =
    user?.perfilId ||
    user?.estudianteId ||
    user?.id_usuario ||
    user?.usuarioId ||
    user?.userId ||
    user?.usuario?.id ||
    user?.id ||
    null;
  const nombre = user?.nombre_completo || user?.nombre || 'Estudiante';
  const carrera = user?.carrera || user?.facultad || user?.escuela || '';
  const codigoEstudiante =
    user?.codigoEstudiante ||
    user?.codigo_estudiante ||
    user?.codigoAlumno ||
    user?.codigo ||
    user?.username ||
    '';
  const semestreActual = user?.semestre || user?.semestreActual || user?.ciclo || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!perfilId) {
        setError('No se encontró el perfil del estudiante');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Buscar un periodo que tenga cursos del estudiante (activo primero, luego cualquiera)
        let periodos = await periodosApi.getActivos();
        if (!periodos || periodos.length === 0) {
          periodos = (await periodosApi.getTodos?.()) || [];
        }
        if (!periodos || periodos.length === 0) {
          setError('No hay periodos disponibles');
          setLoading(false);
          return;
        }

        let cursos = [];
        let periodo = null;
        for (const p of periodos) {
          const list = await cursosEstudianteApi.getByPeriodo(perfilId, p.id);
          if (list && list.length > 0) {
            cursos = list;
            periodo = p;
            break;
          }
        }
        // Si no se encontraron cursos en activos, probar con todos
        if (!periodo) {
          for (const p of periodos) {
            const list = await cursosEstudianteApi.getByPeriodo(perfilId, p.id);
            if (list && list.length > 0) {
              cursos = list;
              periodo = p;
              break;
            }
          }
        }
        // Si aun no hay cursos, usar el primer periodo para devolver vacio
        if (!periodo) {
          periodo = periodos[0];
        }

        const mappedCursos = (cursos || []).map((c) => ({
          id: c.cursoId || c.id,
          matriculaId: c.matriculaId,
          seccionId: c.seccionId,
          instrumentoId: c.instrumentoId,
          codigo: c.cursoCodigo || c.codigo || '',
          nombre: c.cursoNombre || c.nombre || '',
          docente: c.docenteNombre || 'Docente no asignado',
          evaluado: !!c.evaluado
        }));

        const stats = {
          pendientes: mappedCursos.filter((c) => !c.evaluado && c.instrumentoId).length,
          completadas: mappedCursos.filter((c) => c.evaluado).length
        };

        setData({
          estudiante: {
            id: perfilId,
            nombre,
            carrera,
            codigo: codigoEstudiante,
            semestre: semestreActual,
            avatar: null
          },
          estadisticas: stats,
          cursosActuales: mappedCursos,
          cursosMatriculados: mappedCursos,
          periodoActual: periodo
        });
        setError(null);
      } catch (err) {
        console.error('Error cargando datos del estudiante', err);
        setError(err?.message || 'Error al cargar los datos');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [perfilId, nombre, carrera]);

  return { data, loading, error };
};
