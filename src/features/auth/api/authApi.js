import apiClient from '@/shared/api/apiClient';

/**
 * API de autenticacion
 * Endpoints para login, logout, registro, etc.
 */
export const authApi = {
  /**
   * Login de usuario
   * @param {Object} credentials - { email|correo, password }
   * @returns {Promise} - { user, token }
   */
  login: async (credentials) => {
    try {
      const payload = {
        correo: credentials?.correo || credentials?.email,
        password: credentials?.password,
        ip: credentials?.ip,
        userAgent: credentials?.userAgent,
      };
      const response = await apiClient.post('/auth/login', payload);

      // El backend responde con ApiResponse { success, message, data: { token, ... } }
      const data = response?.data?.data || response?.data || {};
      return {
        token: data.token,
        refreshToken: data.refreshToken,
        tokenType: data.tokenType,
        user: data.user || null
      };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Registro de usuario
   * @param {Object} data - { nombres, apellidos, email, password, rol }
   * @returns {Promise}
   */
  register: async (data) => {
    try {
      const payload = {
        nombres: data?.nombres || '',
        apellidos: data?.apellidos || '',
        correo: data?.correo || data?.email,
        password: data?.password,
        rol: (data?.rol || '').toUpperCase(),
        codigo: data?.codigo
      };
      const response = await apiClient.post('/auth/register', payload);
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
   * Recuperar contrasena
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
