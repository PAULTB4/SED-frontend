import { useState, useEffect } from 'react';

/**
 * Hook para obtener datos del estudiante
 * NOTA: Este hook usa datos MOCK temporales
 * Cuando se integre con el backend, se reemplazará por llamadas a la API
 */
export const useEstudianteData = () => {
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
          estudiante: {
            id: 1,
            nombre: 'María García',
            email: 'alumno@test.com',
            codigo: '20210045',
            carrera: 'Ingeniería de Sistemas',
            semestre: 'Sexto Semestre',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
          },
          estadisticas: {
            pendientes: 3,
            completadas: 2
          },
          cursosActuales: [
            {
              id: 1,
              codigo: 'CS-101',
              nombre: 'Introducción a la Programación',
              docente: 'Dr. Carlos Méndez',
              evaluado: false
            },
            {
              id: 2,
              codigo: 'MATH-201',
              nombre: 'Cálculo Diferencial',
              docente: 'Dra. Ana Torres',
              evaluado: false
            },
            {
              id: 3,
              codigo: 'ENG-102',
              nombre: 'Inglés Técnico II',
              docente: 'Prof. Roberto Silva',
              evaluado: true
            },
            {
              id: 4,
              codigo: 'PHY-150',
              nombre: 'Física General',
              docente: 'Dr. Luis Ramírez',
              evaluado: false
            },
            {
              id: 5,
              codigo: 'DB-301',
              nombre: 'Bases de Datos',
              docente: 'Dra. Patricia Gómez',
              evaluado: true
            }
          ],
          cursosMatriculados: [
            {
              id: 1,
              codigo: 'CS-101',
              nombre: 'Introducción a la Programación',
              docente: 'Dr. Carlos Méndez'
            },
            {
              id: 2,
              codigo: 'MATH-201',
              nombre: 'Cálculo Diferencial',
              docente: 'Dra. Ana Torres'
            },
            {
              id: 3,
              codigo: 'ENG-102',
              nombre: 'Inglés Técnico II',
              docente: 'Prof. Roberto Silva'
            },
            {
              id: 4,
              codigo: 'PHY-150',
              nombre: 'Física General',
              docente: 'Dr. Luis Ramírez'
            }
          ],
          evaluacionesRealizadas: [
            {
              id: 1,
              fecha: '2024-11-15',
              curso: 'ENG-102',
              nombreCurso: 'Inglés Técnico II',
              docente: 'Prof. Roberto Silva',
              calificacion: 5,
              estado: 'completada'
            },
            {
              id: 2,
              fecha: '2024-11-10',
              curso: 'DB-301',
              nombreCurso: 'Bases de Datos',
              docente: 'Dra. Patricia Gómez',
              calificacion: 4,
              estado: 'completada'
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