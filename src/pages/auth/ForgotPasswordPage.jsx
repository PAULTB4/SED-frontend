import { AuthLayout } from '@/shared/ui/layouts';
import { ForgotPasswordForm } from '@/features/auth';

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Ingresa tu correo institucional"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};