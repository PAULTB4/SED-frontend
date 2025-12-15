import apiClient from '@/shared/api/apiClient';

export const instrumentosApi = {
  listarPorPeriodo: async (periodoId) => {
    const res = await apiClient.get('/instrumentos', { params: { periodoId } });
    return res.data?.data || [];
  },
  getById: async (instrumentoId) => {
    const res = await apiClient.get(`/instrumentos/${instrumentoId}`);
    return res.data?.data;
  },
  crear: async (payload) => {
    const res = await apiClient.post('/instrumentos', payload);
    return res.data?.data;
  },
  actualizar: async (id, payload) => {
    const res = await apiClient.put(`/instrumentos/${id}`, payload);
    return res.data?.data;
  },
  asignarASeccion: async ({ instrumentoId, seccionId }) => {
    const res = await apiClient.post('/instrumentos/asignar', { instrumentoId, seccionId });
    return res.data?.data;
  },
  eliminar: async (id) => {
    const res = await apiClient.delete(`/instrumentos/${id}`);
    return res.data?.data;
  }
};
