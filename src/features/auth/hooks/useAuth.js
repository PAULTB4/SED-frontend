import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

/**
 * Hook personalizado para manejar autenticación
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Login de usuario
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(credentials);
      
      // Guardar token en localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirigir según el rol del usuario
      redirectByRole(response.user.rol);

      return response;
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout de usuario
   */
  const logout = async () => {
    setLoading(true);
    
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      setLoading(false);
      navigate('/login');
    }
  };

  /**
   * Redirigir según el rol del usuario
   */
  const redirectByRole = (role) => {
    const routes = {
      ESTUDIANTE: '/estudiante/dashboard',
      DOCENTE: '/docente/dashboard',
      COMISION: '/comision/dashboard',
      ADMINISTRADOR: '/admin/dashboard',
      ADMIN: '/admin/dashboard'
    };

    const route = routes[role] || '/';
    navigate(route);
  };

  /**
   * Verificar si el usuario está autenticado
   */
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  /**
   * Obtener usuario actual
   */
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated,
    getCurrentUser
  };
};