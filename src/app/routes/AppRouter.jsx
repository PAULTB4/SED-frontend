import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/landing';
import { LoginPage } from '@/pages/auth';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/login" element={<LoginPage />} />
         {/* Rutas futuras */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
        
        {/* Rutas protegidas por rol */}
        {/* <Route path="/estudiante/*" element={<EstudianteDashboard />} /> */}
        {/* <Route path="/docente/*" element={<DocenteDashboard />} /> */}
        {/* <Route path="/comision/*" element={<ComisionDashboard />} /> */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
        
        {/* 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};