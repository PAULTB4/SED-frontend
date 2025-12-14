import { AuthLayout } from '@/shared/ui/layouts';
import { RegisterForm } from '@/features/auth';

export const RegisterPage = () => {
  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Regístrate con tu correo institucional @unas.edu.pe"
    >
      <RegisterForm />
    </AuthLayout>
  );
};
