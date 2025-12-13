import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BarChart, LineChart, StarRating } from '@/shared/ui/components';
import { useDocenteData } from '@/features/evaluaciones-docente';
import './DocenteEvaluaciones.css';

/**
 * Página Mis Evaluaciones del Docente
 * Muestra gráficos y tabla de evaluaciones por curso
 */
export const DocenteEvaluaciones = () => {
  const [searchParams] = useSearchParams();
  const { data, loading } = useDocenteData();
  const [selectedCurso, setSelectedCurso] = useState(searchParams.get('curso') || '1');

  if (loading) {
    return (
      <div className="docente-evaluaciones__loading">
        <div className="docente-evaluaciones__spinner"></div>
        <p>Cargando evaluaciones...</p>
      </div>
    );
  }

  const { cursos } = data;
  const cursoActual = cursos.find(c => c.id.toString() === selectedCurso) || cursos[0];

  // Datos mock para gráficos
  const categoriesData = [
    { label: 'Dominio de materia', value: 4.9 },
    { label: 'Metodología', value: 4.7 },
    { label: 'Interacción', value: 4.8 },
    { label: 'Evaluación', value: 4.6 }
  ];

  const temporalData = [
    { label: '2023-1', value: 4.5 },
    { label: '2023-2', value: 4.6 },
    { label: '2024-1', value: 4.7 },
    { label: '2024-2', value: 4.8 }
  ];

  const evaluacionesIndividuales = [
    { 
      fecha: '2024-10-15', 
      estudiante: 'Estudiante Anónimo #1', 
      calificacion: 5, 
      comentario: 'Excelente profesor, explica muy bien los conceptos' 
    },
    { 
      fecha: '2024-10-14', 
      estudiante: 'Estudiante Anónimo #2', 
      calificacion: 5, 
      comentario: 'Muy dedicado a la enseñanza' 
    },
    { 
      fecha: '2024-10-12', 
      estudiante: 'Estudiante Anónimo #3', 
      calificacion: 4, 
      comentario: 'Buen profesor, aunque a veces va rápido' 
    },
    { 
      fecha: '2024-10-10', 
      estudiante: 'Estudiante Anónimo #4', 
      calificacion: 5, 
      comentario: 'Sus ejemplos prácticos facilitan el aprendizaje' 
    },
    { 
      fecha: '2024-10-08', 
      estudiante: 'Estudiante Anónimo #5', 
      calificacion: 5, 
      comentario: 'Siempre disponible para resolver dudas' 
    }
  ];

  return (
    <div className="docente-evaluaciones">
        <div className="docente-evaluaciones__header">
          <h1 className="docente-evaluaciones__title">Mis Evaluaciones</h1>
          
          <select 
            className="docente-evaluaciones__select"
            value={selectedCurso}
            onChange={(e) => setSelectedCurso(e.target.value)}
          >
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.codigo} - {curso.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Gráficos */}
        <div className="docente-evaluaciones__charts">
          <div className="docente-evaluaciones__chart-card">
            <h3 className="docente-evaluaciones__chart-title">
              Promedio por Categoría
            </h3>
            <BarChart data={categoriesData} maxValue={5} color="#10B981" />
          </div>

          <div className="docente-evaluaciones__chart-card">
            <h3 className="docente-evaluaciones__chart-title">
              Evolución Temporal
            </h3>
            <LineChart data={temporalData} maxValue={5} color="#10B981" />
          </div>
        </div>

        {/* Tabla de Evaluaciones Individuales */}
        <div className="docente-evaluaciones__table-card">
          <h3 className="docente-evaluaciones__table-title">
            Evaluaciones Individuales
          </h3>
          
          <div className="docente-evaluaciones__table-container">
            <table className="docente-evaluaciones__table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Estudiante</th>
                  <th>Calificación</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {evaluacionesIndividuales.map((evaluacion, index) => (
                  <tr key={index}>
                    <td>{evaluacion.fecha}</td>
                    <td>{evaluacion.estudiante}</td>
                    <td>
                      <StarRating rating={evaluacion.calificacion} size="sm" />
                    </td>
                    <td>{evaluacion.comentario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};
