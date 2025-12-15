import { useEffect, useMemo, useState } from 'react';
import { seccionesApi } from '@/features/cursos/api/seccionesApi';

export const useSeccionesPeriodo = (periodoIds = []) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stableIds = useMemo(
    () => Array.from(new Set((periodoIds || []).filter(Boolean))),
    [periodoIds]
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const entries = await Promise.all(
          stableIds.map(async (id) => {
            const secciones = await seccionesApi.getByPeriodo(id);
            return [id, secciones];
          })
        );
        const map = Object.fromEntries(entries);
        setData(map);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err?.message || 'No se pudieron cargar las secciones');
      } finally {
        setLoading(false);
      }
    };

    if (stableIds.length > 0) {
      fetchAll();
    } else {
      setData({});
      setLoading(false);
    }
  }, [stableIds]);

  return { data, loading, error };
};
