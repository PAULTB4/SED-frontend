import { useState, useEffect } from 'react';

/**
 * Hook personalizado para obtener datos de comisión
 * Retorna datos simulados de la comisión de evaluación
 * @returns {Object} { data, loading, error }
 */
export const useComisionData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular llamada a API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));

        // Datos mock de la comisión
        const mockData = {
          comision: {
            id: 1,
            nombre: 'María García Rodríguez',
            email: 'maria.garcia@unas.edu.pe',
            avatar: 'https://i.pravatar.cc/150?img=5',
            cargo: 'Coordinadora de Evaluación',
            rol: 'Administrador de Comisión',
            facultad: 'Comisión Central de Evaluación Docente',
            telefono: '+51 942 567 890',
            anexo: '3401',
            oficina: 'Pabellón Administrativo - Oficina 302',
            responsabilidades: [
              'Coordinar procesos de evaluación docente',
              'Gestionar períodos de evaluación',
              'Supervisar aplicación de encuestas',
              'Generar reportes estadísticos',
              'Atender consultas de docentes y estudiantes'
            ]
          },
          estadisticas: {
            docentesEvaluados: 85,
            estudiantesParticipantes: 1245,
            tasaRespuesta: 78.5,
            periodosActivos: 2,
            encuestasConfigur: 4,
            reportesGenerados: 23
          },
          periodos: [
            {
              id: 1,
              nombre: 'Evaluación Semestral 2024-I',
              fechaInicio: '2024-03-01',
              fechaFin: '2024-03-31',
              estado: 'activo',
              progreso: 68,
              docentesEvaluados: 45,
              totalDocentes: 85,
              estudiantesParticipantes: 834,
              tasaRespuesta: 75.2
            },
            {
              id: 2,
              nombre: 'Evaluación Complementaria 2024-I',
              fechaInicio: '2024-04-01',
              fechaFin: '2024-04-15',
              estado: 'programado',
              progreso: 0,
              docentesEvaluados: 0,
              totalDocentes: 40,
              estudiantesParticipantes: 0,
              tasaRespuesta: 0
            },
            {
              id: 3,
              nombre: 'Evaluación Semestral 2023-II',
              fechaInicio: '2023-11-01',
              fechaFin: '2023-11-30',
              estado: 'finalizado',
              progreso: 100,
              docentesEvaluados: 82,
              totalDocentes: 82,
              estudiantesParticipantes: 1156,
              tasaRespuesta: 82.3
            },
            {
              id: 4,
              nombre: 'Evaluación Complementaria 2023-II',
              fechaInicio: '2023-12-01',
              fechaFin: '2023-12-15',
              estado: 'finalizado',
              progreso: 100,
              docentesEvaluados: 38,
              totalDocentes: 38,
              estudiantesParticipantes: 421,
              tasaRespuesta: 79.8
            }
          ],
          encuestas: [
            {
              id: 1,
              titulo: 'Evaluación de Desempeño Docente',
              tipo: 'docente',
              estado: 'activo',
              preguntas: 15,
              dimensiones: ['Metodología', 'Contenido', 'Evaluación', 'Actitud'],
              fechaCreacion: '2024-01-15',
              ultimaModificacion: '2024-02-20'
            },
            {
              id: 2,
              titulo: 'Evaluación de Infraestructura',
              tipo: 'infraestructura',
              estado: 'activo',
              preguntas: 10,
              dimensiones: ['Aulas', 'Equipamiento', 'Limpieza', 'Seguridad'],
              fechaCreacion: '2024-01-20',
              ultimaModificacion: '2024-02-18'
            },
            {
              id: 3,
              titulo: 'Evaluación de Servicios Administrativos',
              tipo: 'administrativo',
              estado: 'inactivo',
              preguntas: 8,
              dimensiones: ['Atención', 'Tiempos', 'Información', 'Satisfacción'],
              fechaCreacion: '2023-12-10',
              ultimaModificacion: '2024-01-05'
            },
            {
              id: 4,
              titulo: 'Autoevaluación Docente',
              tipo: 'autoevaluacion',
              estado: 'activo',
              preguntas: 12,
              dimensiones: ['Preparación', 'Metodología', 'Evaluación', 'Desarrollo'],
              fechaCreacion: '2024-02-01',
              ultimaModificacion: '2024-02-25'
            }
          ],
          reportesRecientes: [
            {
              id: 1,
              titulo: 'Reporte General 2024-I',
              tipo: 'general',
              fecha: '2024-03-15',
              periodo: 'Evaluación Semestral 2024-I',
              formato: 'PDF',
              tamaño: '2.4 MB'
            },
            {
              id: 2,
              titulo: 'Análisis por Facultad',
              tipo: 'facultad',
              fecha: '2024-03-14',
              periodo: 'Evaluación Semestral 2024-I',
              formato: 'Excel',
              tamaño: '1.8 MB'
            },
            {
              id: 3,
              titulo: 'Reporte Comparativo 2023-II vs 2024-I',
              tipo: 'comparativo',
              fecha: '2024-03-10',
              periodo: 'Varios períodos',
              formato: 'PDF',
              tamaño: '3.1 MB'
            }
          ],
          datosGraficos: {
            tasaRespuestaPorFacultad: [
              { facultad: 'Ingeniería', tasa: 82.5, docentes: 25 },
              { facultad: 'Ciencias', tasa: 78.3, docentes: 18 },
              { facultad: 'Económicas', tasa: 75.8, docentes: 15 },
              { facultad: 'Educación', tasa: 81.2, docentes: 12 },
              { facultad: 'Derecho', tasa: 73.4, docentes: 10 },
              { facultad: 'Salud', tasa: 79.6, docentes: 5 }
            ],
            promediosPorDimension: [
              { dimension: 'Metodología', promedio: 4.6 },
              { dimension: 'Contenido', promedio: 4.7 },
              { dimension: 'Evaluación', promedio: 4.5 },
              { dimension: 'Actitud', promedio: 4.8 },
              { dimension: 'Puntualidad', promedio: 4.4 }
            ],
            tendenciaMensual: [
              { mes: 'Enero', participacion: 0, evaluaciones: 0 },
              { mes: 'Febrero', participacion: 0, evaluaciones: 0 },
              { mes: 'Marzo', participacion: 834, evaluaciones: 45 },
              { mes: 'Abril', participacion: 0, evaluaciones: 0 },
              { mes: 'Mayo', participacion: 0, evaluaciones: 0 },
              { mes: 'Junio', participacion: 0, evaluaciones: 0 }
            ],
            distribucionCalificaciones: [
              { rango: 'Excelente (4.5-5.0)', cantidad: 38, porcentaje: 44.7 },
              { rango: 'Bueno (4.0-4.4)', cantidad: 32, porcentaje: 37.6 },
              { rango: 'Regular (3.5-3.9)', cantidad: 12, porcentaje: 14.1 },
              { rango: 'Deficiente (3.0-3.4)', cantidad: 3, porcentaje: 3.5 },
              { rango: 'Malo (<3.0)', cantidad: 0, porcentaje: 0 }
            ]
          }
        };

        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos de la comisión');
        console.error('Error fetching comision data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
