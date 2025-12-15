import apiClient from '@/shared/api/apiClient';

export const cursosEstudianteApi = {
  getByPeriodo: async (estudianteId, periodoId) => {
    const res = await apiClient.get('/estudiante/cursos', { params: { periodoId, estudianteId } });
    return res.data?.data || [];
  }
};
