import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/components';
import { authApi } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import './RegisterForm.css';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'estudiante',
    facultad: '',
    codigo: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const facultades = [
    'Agronomía',
    'Zootecnia',
    'Ing. de Industrias Alimentarias',
    'Ing. Ambiental',
    'Ing. en Conservación de Suelos y Agua',
    'Ing. Forestal',
    'Ing. en Recursos Naturales Renovables',
    'Administración',
    'Economía',
    'Contabilidad',
    'Ing. en Informática y Sistemas',
    'Ing. Mecánica Eléctrica',
    'Ing. Civil',
    'Ing. en Ciberseguridad',
    'Turismo y Hotelería'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nombres.trim()) {
      errors.nombres = 'Los nombres son requeridos';
    }

    if (!formData.apellidos.trim()) {
      errors.apellidos = 'Los apellidos son requeridos';
    }

    if (!formData.email) {
      errors.email = 'El correo es requerido';
    } else if (!formData.email.endsWith('@unas.edu.pe')) {
      errors.email = 'Debes usar un correo institucional @unas.edu.pe';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      errors.password = 'Mínimo 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.facultad) {
      errors.facultad = 'Selecciona tu facultad';
    }

    if ((formData.rol === 'estudiante' || formData.rol === 'docente') && !formData.codigo) {
      errors.codigo = 'El código es requerido';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setValidationErrors({});
    setSuccessMessage('');

    try {
      const res = await authApi.register({
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.email,
        password: formData.password,
        rol: formData.rol,
        codigo: formData.codigo
      });
      // Login inmediato y redirigir según rol seleccionado
      await login({
        correo: formData.email,
        password: formData.password,
        rol: formData.rol,
        nombreCompleto: `${formData.nombres} ${formData.apellidos}`.trim(),
        perfilId: res?.data?.perfilId,
        usuarioId: res?.data?.usuarioId
      });
      setSuccessMessage('Cuenta creada y sesión iniciada.');
      navigate('/register/cursos', { state: { rol: formData.rol, perfilId: res?.data?.perfilId } });
    } catch (err) {
      const message = err?.message || err?.error?.message || 'Error al crear cuenta';
      setValidationErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="register-form__alert register-form__alert--success">
          <span>{successMessage}</span>
        </div>
      )}

      {validationErrors.general && (
        <div className="register-form__alert register-form__alert--error">
          <span>{validationErrors.general}</span>
        </div>
      )}

      <div className="register-form__field">
        <label className="register-form__label">Nombres *</label>
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          className={`register-form__input ${validationErrors.nombres ? 'register-form__input--error' : ''}`}
          placeholder="Ej: Juan Carlos"
        />
        {validationErrors.nombres && <span className="register-form__error">{validationErrors.nombres}</span>}
      </div>

      <div className="register-form__field">
        <label className="register-form__label">Apellidos *</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className={`register-form__input ${validationErrors.apellidos ? 'register-form__input--error' : ''}`}
          placeholder="Ej: Garcia Lopez"
        />
        {validationErrors.apellidos && <span className="register-form__error">{validationErrors.apellidos}</span>}
      </div>

      <div className="register-form__field">
        <label className="register-form__label">Correo Institucional *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`register-form__input ${validationErrors.email ? 'register-form__input--error' : ''}`}
          placeholder="ejemplo@unas.edu.pe"
        />
        {validationErrors.email && <span className="register-form__error">{validationErrors.email}</span>}
      </div>

      <div className="register-form__field">
        <label className="register-form__label">Rol *</label>
        <select name="rol" value={formData.rol} onChange={handleChange} className="register-form__input">
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="comision">Comisión</option>
        </select>
      </div>

      <div className="register-form__field">
        <label className="register-form__label">Facultad *</label>
        <select
          name="facultad"
          value={formData.facultad}
          onChange={handleChange}
          className={`register-form__input ${validationErrors.facultad ? 'register-form__input--error' : ''}`}
        >
          <option value="">Selecciona tu facultad</option>
          {facultades.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
        {validationErrors.facultad && <span className="register-form__error">{validationErrors.facultad}</span>}
      </div>

      {(formData.rol === 'estudiante' || formData.rol === 'docente') && (
        <div className="register-form__field">
          <label className="register-form__label">
            Código de {formData.rol === 'estudiante' ? 'Estudiante' : 'Docente'} *
          </label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className={`register-form__input ${validationErrors.codigo ? 'register-form__input--error' : ''}`}
            placeholder={formData.rol === 'estudiante' ? '2021100456' : 'DOC12345'}
            maxLength={formData.rol === 'estudiante' ? 10 : 12}
          />
          {validationErrors.codigo && <span className="register-form__error">{validationErrors.codigo}</span>}
        </div>
      )}

      <div className="register-form__field">
        <label className="register-form__label">Contraseña *</label>
        <div className="register-form__input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`register-form__input ${validationErrors.password ? 'register-form__input--error' : ''}`}
            placeholder="********"
          />
          <button
            type="button"
            className="register-form__toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        {validationErrors.password && <span className="register-form__error">{validationErrors.password}</span>}
      </div>

      <div className="register-form__field">
        <label className="register-form__label">Confirmar Contraseña *</label>
        <div className="register-form__input-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`register-form__input ${validationErrors.confirmPassword ? 'register-form__input--error' : ''}`}
            placeholder="********"
          />
          <button
            type="button"
            className="register-form__toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <span className="register-form__error">{validationErrors.confirmPassword}</span>
        )}
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>

      <div className="register-form__footer">
        <span>¿Ya tienes cuenta?</span>
        <Link to="/login" className="register-form__link">
          Inicia sesión
        </Link>
      </div>
    </form>
  );
};
