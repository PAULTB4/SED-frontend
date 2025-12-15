import { useCallback, useEffect, useState } from 'react';
import { periodosApi } from '../api/periodosApi';
import apiClient from '@/shared/api/apiClient';

// Hook para datos de comision usando backend con posibilidad de refrescar
export const useComisionData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const periodos = await periodosApi.getTodos();

      const mappedPeriodos = await Promise.all(
        (periodos || []).map(async (p) => {
          const estadoCalculado = mapEstadoPeriodo(p.estado, p.fechaInicio, p.fechaFin);
          let metricas = {};
          try {
            const res = await apiClient.get(`/comision/periodos/${p.id}/metricas`);
            metricas = res.data?.data || {};
          } catch (err) {
            metricas = {};
          }
          return {
            id: p.id,
            nombre: p.nombre,
            fechaInicio: p.fechaInicio,
            fechaFin: p.fechaFin,
            estado: estadoCalculado,
            estadoBackend: p.estado,
            progreso: metricas.progreso ?? 0,
            docentesEvaluados: metricas.docentesEvaluados ?? 0,
            totalDocentes: metricas.docentesEvaluados ?? 0,
            estudiantesParticipantes: metricas.estudiantesMatriculados ?? 0,
            tasaRespuesta: metricas.tasaRespuesta ?? 0
          };
        })
      );

      const baseComision = getBaseComision();
      const stats = {
        docentesEvaluados: 0,
        estudiantesParticipantes: 0,
        tasaRespuesta: 0,
        periodosActivos: mappedPeriodos.length,
        encuestasConfigur: 0,
        reportesGenerados: 0
      };

      setData({
        comision: baseComision,
        estadisticas: stats,
        periodos: mappedPeriodos,
        encuestas: [],
        reportesRecientes: [],
        datosGraficos: {}
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching comision data:', err);
      setData(getFallbackData());
      setError(err?.message || 'No se pudieron cargar los periodos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

const mapEstadoPeriodo = (estado, fechaInicio, fechaFin) => {
  const hoy = new Date();
  const inicio = fechaInicio ? new Date(fechaInicio) : null;
  const fin = fechaFin ? new Date(fechaFin) : null;

  if (inicio && fin) {
    if (hoy < inicio) return 'programado';
    if (hoy > fin) return 'finalizado';
    return 'activo';
  }

  if (!estado) return 'activo';
  const val = estado.toString().toUpperCase();
  if (['PLANIFICADO'].includes(val)) return 'programado';
  if (['ABIERTO', 'EN_EVALUACION', 'PUBLICADO', 'ACTIVO'].includes(val)) return 'activo';
  if (['CERRADO', 'FINALIZADO'].includes(val)) return 'finalizado';
  return 'activo';
};

const getBaseComision = () => ({
  id: 1,
  nombre: 'Comision',
  email: '',
  avatar: null,
  cargo: '',
  rol: 'Administrador de Comision',
  facultad: '',
  telefono: '',
  anexo: '',
  oficina: '',
  responsabilidades: []
});

const getFallbackData = () => ({
  comision: getBaseComision(),
  estadisticas: {
    docentesEvaluados: 0,
    estudiantesParticipantes: 0,
    tasaRespuesta: 0,
    periodosActivos: 0,
    encuestasConfigur: 0,
    reportesGenerados: 0
  },
  periodos: [],
  encuestas: [],
  reportesRecientes: [],
  datosGraficos: {}
});
