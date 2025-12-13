import { Avatar } from '@/shared/ui/components';
import { useEstudianteData } from '@/features/evaluacion-estudiante';
import './EstudiantePerfil.css';

/**
 * Página Mi Perfil del Estudiante
 * Muestra información personal y cursos matriculados
 */
export const EstudiantePerfil = () => {
  const { data, loading, error } = useEstudianteData();

  if (loading) {
    return (
      <div className="estudiante-perfil__loading">
        <div className="estudiante-perfil__spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estudiante-perfil__error">
        <p>{error}</p>
      </div>
    );
  }

  const { estudiante, cursosMatriculados } = data;

  return (
    <div className="estudiante-perfil">
      <h1 className="estudiante-perfil__page-title">Mi Perfil</h1>

      <div className="estudiante-perfil__grid">
        {/* Información Personal */}
        <div className="estudiante-perfil__card">
          <div className="estudiante-perfil__avatar-section">
            <Avatar 
              src={estudiante.avatar} 
              alt={estudiante.nombre} 
              size="xl" 
              fallback="MG" 
            />
            <h2 className="estudiante-perfil__name">{estudiante.nombre}</h2>
          </div>

          <div className="estudiante-perfil__info">
            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">Email</span>
              <span className="estudiante-perfil__info-value">{estudiante.email}</span>
            </div>

            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">Código de Estudiante</span>
              <span className="estudiante-perfil__info-value">{estudiante.codigo}</span>
            </div>

            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">Carrera</span>
              <span className="estudiante-perfil__info-value">{estudiante.carrera}</span>
            </div>

            <div className="estudiante-perfil__info-item">
              <span className="estudiante-perfil__info-label">Semestre Actual</span>
              <span className="estudiante-perfil__info-value">{estudiante.semestre}</span>
            </div>
          </div>
        </div>

        {/* Cursos Matriculados */}
        <div className="estudiante-perfil__card">
          <h3 className="estudiante-perfil__section-title">Mis Cursos Matriculados</h3>
          <div className="estudiante-perfil__courses-list">
            {cursosMatriculados.map((curso) => (
              <div key={curso.id} className="estudiante-perfil__course-item">
                <div className="estudiante-perfil__course-info">
                  <span className="estudiante-perfil__course-code">{curso.codigo}</span>
                  <span className="estudiante-perfil__course-name">{curso.nombre}</span>
                </div>
                <span className="estudiante-perfil__course-teacher">
                  Docente: {curso.docente}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};