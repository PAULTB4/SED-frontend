import apiClient from '@/shared/api/apiClient';

/**
 * API de autenticación
 * Endpoints para login, logout, registro, etc.
 */
export const authApi = {
  /**
   * Login de usuario
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { user, token }
   */
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout de usuario
   * @returns {Promise}
   */
  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Verificar token actual
   * @returns {Promise} - { user }
   */
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Recuperar contraseña
   * @param {string} email
   * @returns {Promise}
   */
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};