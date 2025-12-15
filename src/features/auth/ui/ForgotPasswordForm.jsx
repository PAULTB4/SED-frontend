import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/components';
import './ForgotPasswordForm.css';

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    
    if (validationError) {
      setValidationError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateEmail = () => {
    if (!email) {
      return 'El correo es requerido';
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'El correo no es válido';
    }
    
    if (!email.endsWith('@unas.edu.pe')) {
      return 'Debe usar su correo institucional @unas.edu.pe';
    }
    
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateEmail();
    if (error) {
      setValidationError(error);
      return;
    }

    setLoading(true);
    setValidationError('');
    
    try {
      // Simulación de llamada al API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Integrar con el backend
      // await authApi.forgotPassword({ email });
      
      setSuccessMessage('Se han enviado las instrucciones de recuperación a tu correo institucional');
      setEmail('');
      
    } catch (error) {
      setValidationError(
        error.response?.data?.message || 
        'Error al enviar las instrucciones. Por favor, intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-form">
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <div className="success-message">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                fill="currentColor"
              />
            </svg>
            {successMessage}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="ejemplo@unas.edu.pe"
              className={validationError ? 'error' : ''}
              disabled={loading}
            />
          </div>
          {validationError && (
            <span className="error-message">{validationError}</span>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Enviando instrucciones...' : 'Enviar instrucciones'}
        </Button>
      </form>

      <div className="form-footer">
        <div className="back-to-login">
          <Link to="/login">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 9.16667H6.52499L10.6833 5.00833L9.99999 4.33333L4.33332 10L9.99999 15.6667L10.675 14.9917L6.52499 10.8333H15.8333V9.16667Z"
                fill="currentColor"
              />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};