import apiClient from '@/shared/api/apiClient';

export const periodosApi = {
  getTodos: async () => {
    const res = await apiClient.get('/periodos');
    return res.data?.data || [];
  },
  getActivos: async () => {
    const res = await apiClient.get('/periodos/activos');
    return res.data?.data || [];
  },
  crear: async (payload) => {
    const res = await apiClient.post('/periodos', payload);
    return res.data?.data;
  },
  actualizar: async (id, payload) => {
    const res = await apiClient.put(`/periodos/${id}`, payload);
    return res.data?.data;
  },
  eliminar: async (id) => {
    const res = await apiClient.delete(`/periodos/${id}`);
    return res.data?.data;
  }
};
