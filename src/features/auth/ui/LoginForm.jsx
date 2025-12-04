import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/components';
import { useAuth } from '../hooks/useAuth';
import './LoginForm.css';

export const LoginForm = () => {
  const { login, loading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error de ese campo
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validar email
    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido';
    }

    // Validar password
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      // El error ya se maneja en useAuth
      console.error('Error en login:', err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Error general */}
      {error && (
        <div className="login-form__alert login-form__alert--error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Campo Email */}
      <div className="login-form__field">
        <label htmlFor="email" className="login-form__label">
          Correo electrónico institucional
        </label>
        <div className="login-form__input-wrapper">
          <svg 
            className="login-form__input-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`login-form__input ${validationErrors.email ? 'login-form__input--error' : ''}`}
            placeholder="ejemplo@unas.edu.pe"
            disabled={loading}
            autoComplete="email"
          />
        </div>
        {validationErrors.email && (
          <span className="login-form__error">{validationErrors.email}</span>
        )}
      </div>

      {/* Campo Password */}
      <div className="login-form__field">
        <label htmlFor="password" className="login-form__label">
          Contraseña
        </label>
        <div className="login-form__input-wrapper">
          <svg 
            className="login-form__input-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`login-form__input ${validationErrors.password ? 'login-form__input--error' : ''}`}
            placeholder="••••••••"
            disabled={loading}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="login-form__toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" 
                      stroke="currentColor" 
                      strokeWidth="2"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
        </div>
        {validationErrors.password && (
          <span className="login-form__error">{validationErrors.password}</span>
        )}
      </div>

      {/* Recordar y Olvidé contraseña */}
      <div className="login-form__options">
        <label className="login-form__checkbox">
          <input type="checkbox" />
          <span>Recordarme</span>
        </label>
        <Link to="/forgot-password" className="login-form__link">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {/* Botón Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
      >
        {loading ? (
          <>
            <svg 
              className="login-form__spinner" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                strokeDasharray="32"
                strokeDashoffset="32"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="32;0"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </Button>

      {/* Divider */}
      <div className="login-form__divider">
        <span>o</span>
      </div>

      {/* Registro */}
      <p className="login-form__register">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="login-form__link login-form__link--primary">
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
};