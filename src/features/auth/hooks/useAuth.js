import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

/**
 * Hook personalizado para manejar autenticacion
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
      
      const storedUser = getStoredUser();
      const correo = response?.user?.correo || credentials?.correo || credentials?.email || storedUser?.correo || null;
      const storedRole = getStoredRole(correo) || storedUser?.rol || storedUser?.role;
      const resolvedRole =
        response?.user?.rol ||
        response?.user?.role ||
        (credentials?.rol ? credentials.rol.toUpperCase() : null) ||
        storedRole ||
        inferRoleByEmail(correo) ||
        'ESTUDIANTE';
      const nombreCompleto =
        response?.user?.nombreCompleto ||
        response?.user?.nombre ||
        storedUser?.nombreCompleto ||
        storedUser?.nombre ||
        credentials?.nombreCompleto ||
        credentials?.nombre ||
        (correo ? correo.split('@')[0] : null) ||
        'Usuario';

      const resolvedUser = {
        ...storedUser,
        ...response?.user,
        correo,
        rol: response?.user?.rol || response?.user?.role || resolvedRole,
        nombreCompleto,
        perfilId: response?.user?.perfilId || credentials?.perfilId || storedUser?.perfilId,
        usuarioId: response?.user?.usuarioId || credentials?.usuarioId || storedUser?.usuarioId,
        nombre: response?.user?.nombre || nombreCompleto
      };

      // Guardar token y usuario
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }
      localStorage.setItem('user', JSON.stringify(resolvedUser));
      if (correo && resolvedRole) {
        setStoredRole(correo, resolvedRole);
      }

      // Redirigir segun el rol del usuario
      redirectByRole(resolvedRole);

      return { ...response, user: resolvedUser };
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesion';
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
      console.error('Error al cerrar sesion:', err);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      setLoading(false);
      navigate('/login');
    }
  };

  /**
   * Redirigir segun el rol del usuario
   */
  const redirectByRole = (role) => {
    const routes = {
      ESTUDIANTE: '/estudiante/dashboard',
      DOCENTE: '/docente/dashboard',
      COMISION: '/comision/dashboard',
      ADMINISTRADOR: '/admin/dashboard',
      ADMIN: '/admin/dashboard'
    };

    const route = routes[role] || '/estudiante/dashboard';
    navigate(route);
  };

  const inferRoleByEmail = (email) => {
    if (!email) return null;
    const e = email.toLowerCase();
    if (e.includes('admin')) return 'ADMIN';
    if (e.includes('docente')) return 'DOCENTE';
    if (e.includes('comision')) return 'COMISION';
    if (e.includes('estudiante')) return 'ESTUDIANTE';
    return null;
  };

  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  };

  const getStoredRole = (email) => {
    if (!email) return null;
    try {
      const map = JSON.parse(localStorage.getItem('roleByEmail') || '{}');
      return map[email.toLowerCase()] || null;
    } catch {
      return null;
    }
  };

  const setStoredRole = (email, role) => {
    if (!email || !role) return;
    try {
      const key = email.toLowerCase();
      const map = JSON.parse(localStorage.getItem('roleByEmail') || '{}');
      map[key] = role;
      localStorage.setItem('roleByEmail', JSON.stringify(map));
    } catch {
      /* ignore storage errors */
    }
  };

  /**
   * Verificar si el usuario esta autenticado
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
