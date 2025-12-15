import apiClient from '@/shared/api/apiClient';

export const cursosDocenteApi = {
  getByPeriodo: async (docenteId, periodoId) => {
    const res = await apiClient.get('/docente/cursos', { params: { docenteId, periodoId } });
    return res.data?.data || [];
  }
};
