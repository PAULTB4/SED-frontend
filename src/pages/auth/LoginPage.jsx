import { AuthLayout } from '@/shared/ui/layouts';
import { LoginForm } from '@/features/auth';

export const LoginPage = () => {
  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Ingresa con tu correo institucional para acceder al sistema"
    >
      <LoginForm />
    </AuthLayout>
  );
};