import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/landing';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/auth';
import { 
  EstudianteDashboard, 
  EstudiantePerfil, 
  EstudianteEvaluar,
  EstudianteExplorar 
} from '@/pages/estudiante';
import { 
  DocenteDashboard, 
  DocenteProfile, 
  DocenteEvaluaciones, 
  DocenteRecomendaciones 
} from '@/pages/docente';
import { 
  ComisionDashboard, 
  ComisionProfile, 
  ComisionPeriodos, 
  ComisionReportes 
} from '@/pages/comision';
import { EstudianteLayout, DocenteLayout, ComisionLayout } from '@/shared/ui/layouts';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Rutas protegidas por rol */}
        {/* <Route path="/estudiante/*" element={<EstudianteDashboard />} /> */}
        {/* Rutas del Estudiante - ACTIVADAS PARA TESTING */}
        <Route path="/estudiante" element={<EstudianteLayout />}>
          <Route path="dashboard" element={<EstudianteDashboard />} />
          <Route path="perfil" element={<EstudiantePerfil />} />
          <Route path="evaluar/:cursoId" element={<EstudianteEvaluar />} />
          <Route path="evaluar-docentes" element={<EstudianteDashboard />} />
          <Route path="explorar" element={<EstudianteExplorar />} />
        </Route>


        {/* Rutas del Docente - ACTIVADAS PARA TESTING */}
        <Route path="/docente" element={<DocenteLayout />}>
          <Route path="dashboard" element={<DocenteDashboard />} />
          <Route path="perfil" element={<DocenteProfile />} />
          <Route path="evaluaciones" element={<DocenteEvaluaciones />} />
          <Route path="recomendaciones" element={<DocenteRecomendaciones />} />
        </Route>
        
        {/* Rutas de Comisión - ACTIVADAS PARA TESTING */}
        <Route path="/comision" element={<ComisionLayout />}>
          <Route path="dashboard" element={<ComisionDashboard />} />
          <Route path="perfil" element={<ComisionProfile />} />
          <Route path="periodos" element={<ComisionPeriodos />} />
          <Route path="reportes" element={<ComisionReportes />} />
        </Route>
        
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
        
        {/* 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};