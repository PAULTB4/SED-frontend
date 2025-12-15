import apiClient from '@/shared/api/apiClient';

export const evaluacionesApi = {
  enviar: async ({ matriculaId, instrumentoId, respuestas }) => {
    const payload = {
      matriculaId,
      instrumentoId,
      respuestas
    };
    const res = await apiClient.post('/evaluaciones', payload);
    return res.data?.data;
  }
};
