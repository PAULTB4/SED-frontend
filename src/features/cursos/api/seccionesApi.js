import apiClient from '@/shared/api/apiClient';

export const seccionesApi = {
  create: async ({ cursoId, periodoId, docenteId, codigo, modalidad }) => {
    const res = await apiClient.post('/secciones', {
      cursoId,
      periodoId,
      docenteId,
      codigo,
      modalidad
    });
    return res.data?.data;
  },
  getByPeriodo: async (periodoId) => {
    const res = await apiClient.get(`/comision/periodos/${periodoId}/secciones`);
    return res.data?.data || [];
  }
};
