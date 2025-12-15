import apiClient from '@/shared/api/apiClient';

export const resumenDocenteApi = {
  getResumen: async (seccionId) => {
    const res = await apiClient.get('/docente/evaluaciones/resumen', { params: { seccionId } });
    return res.data?.data;
  }
};
