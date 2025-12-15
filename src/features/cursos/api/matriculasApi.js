import apiClient from '@/shared/api/apiClient';

export const matriculasApi = {
  create: async ({ estudianteId, seccionId }) => {
    const res = await apiClient.post('/matriculas', { estudianteId, seccionId });
    return res.data?.data;
  }
};
