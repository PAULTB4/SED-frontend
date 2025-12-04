import axios from 'axios';

/**
 * Cliente HTTP Singleton para todas las peticiones a la API
 */
class ApiClient {
  static instance = null;

  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    // Configuración de Axios
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Configurar interceptors
    this.setupInterceptors();

    ApiClient.instance = this;
  }

  /**
   * Configura interceptors de request y response
   */
  setupInterceptors() {
    // Request interceptor - Agregar token de autenticación
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'sed_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Manejo de errores global
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY || 'sed_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }

        if (error.response?.status === 403) {
          // Sin permisos
          window.location.href = '/unauthorized';
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Obtiene la instancia única del cliente
   */
  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Métodos HTTP
   */
  get(url, config = {}) {
    return this.client.get(url, config);
  }

  post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  patch(url, data, config = {}) {
    return this.client.patch(url, data, config);
  }
}

// Exportar instancia única
const apiClient = ApiClient.getInstance();
export default apiClient;