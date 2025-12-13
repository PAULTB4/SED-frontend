import { useState, useEffect } from 'react';

/**
 * Hook para obtener datos del docente
 * NOTA: Este hook usa datos MOCK temporales
 * Cuando se integre con el backend, se reemplazará por llamadas a la API
 */
export const useDocenteData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carga de datos
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos MOCK - Se reemplazarán con llamadas reales a la API
        const mockData = {
          docente: {
            id: 1,
            nombre: 'Dr. Carlos Méndez',
            email: 'docente@test.com',
            departamento: 'Departamento de Ingeniería de Sistemas',
            especialidad: 'Desarrollo de Software',
            grado: 'Doctor en Ciencias de la Computación',
            avatar: null
          },
          estadisticas: {
            totalEvaluaciones: 91,
            promedioGeneral: 4.8,
            tendencia: 0.3,
            comentariosRecientes: 12,
            anosExperiencia: 15,
            totalEstudiantes: 1250,
            calificacionHistorica: 4.8
          },
          cursos: [
            {
              id: 1,
              codigo: 'CS-101',
              nombre: 'Introducción a la Programación',
              estudiantes: 45,
              evaluaciones: 38,
              promedio: 4.8
            },
            {
              id: 2,
              codigo: 'CS-301',
              nombre: 'Estructuras de Datos',
              estudiantes: 32,
              evaluaciones: 28,
              promedio: 4.7
            },
            {
              id: 3,
              codigo: 'CS-401',
              nombre: 'Programación Avanzada',
              estudiantes: 28,
              evaluaciones: 25,
              promedio: 4.9
            }
          ]
        };
        
        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
