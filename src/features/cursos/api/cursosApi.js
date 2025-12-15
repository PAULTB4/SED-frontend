import apiClient from '@/shared/api/apiClient';

export const cursosApi = {
  getAll: async () => {
    const res = await apiClient.get('/cursos');
    return res.data?.data || [];
  }
};
