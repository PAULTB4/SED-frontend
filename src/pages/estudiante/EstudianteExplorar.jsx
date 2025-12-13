import { useState } from 'react';
import { StarRating, Avatar, Button } from '@/shared/ui/components';
import './EstudianteExplorar.css';

/**
 * Página Explorar Docentes
 * Permite buscar y ver evaluaciones de docentes
 */
export const EstudianteExplorar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departamento, setDepartamento] = useState('todos');
  const [calificacionMinima, setCalificacionMinima] = useState('todas');

  // Datos mock de docentes
  const docentes = [
    {
      id: 1,
      nombre: 'Dr. Carlos Méndez',
      departamento: 'Ingeniería de Sistemas',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      calificacion: 4.8,
      numeroEvaluaciones: 156
    },
    {
      id: 2,
      nombre: 'Dra. Ana Torres',
      departamento: 'Matemáticas',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      calificacion: 4.6,
      numeroEvaluaciones: 132
    },
    {
      id: 3,
      nombre: 'Prof. Roberto Silva',
      departamento: 'Idiomas',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
      calificacion: 4.9,
      numeroEvaluaciones: 98
    },
    {
      id: 4,
      nombre: 'Dr. Luis Ramírez',
      departamento: 'Física',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
      calificacion: 4.3,
      numeroEvaluaciones: 87
    },
    {
      id: 5,
      nombre: 'Dra. Patricia Gómez',
      departamento: 'Ingeniería de Sistemas',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
      calificacion: 4.7,
      numeroEvaluaciones: 124
    },
    {
      id: 6,
      nombre: 'Prof. Miguel Sánchez',
      departamento: 'Matemáticas',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
      calificacion: 4.2,
      numeroEvaluaciones: 76
    }
  ];

  const departamentos = [
    'Todos los departamentos',
    'Ingeniería de Sistemas',
    'Matemáticas',
    'Física',
    'Idiomas'
  ];

  // Filtrar docentes
  const docentesFiltrados = docentes.filter(docente => {
    const cumpleNombre = docente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleDepartamento = departamento === 'todos' || docente.departamento === departamento;
    const cumpleCalificacion = calificacionMinima === 'todas' || docente.calificacion >= parseFloat(calificacionMinima);
    
    return cumpleNombre && cumpleDepartamento && cumpleCalificacion;
  });

  return (
    <div className="estudiante-explorar">
      <h1 className="estudiante-explorar__title">Explorar Docentes</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="estudiante-explorar__filters">
        <div className="estudiante-explorar__search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar docente por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="estudiante-explorar__search-input"
          />
        </div>

        <div className="estudiante-explorar__filter-group">
          <div className="estudiante-explorar__filter">
            <label className="estudiante-explorar__filter-label">Departamento</label>
            <select
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="estudiante-explorar__select"
            >
              <option value="todos">Todos los departamentos</option>
              <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
              <option value="Matemáticas">Matemáticas</option>
              <option value="Física">Física</option>
              <option value="Idiomas">Idiomas</option>
            </select>
          </div>

          <div className="estudiante-explorar__filter">
            <label className="estudiante-explorar__filter-label">Calificación mínima</label>
            <select
              value={calificacionMinima}
              onChange={(e) => setCalificacionMinima(e.target.value)}
              className="estudiante-explorar__select"
            >
              <option value="todas">Todas las calificaciones</option>
              <option value="4.5">4.5 estrellas o más</option>
              <option value="4.0">4.0 estrellas o más</option>
              <option value="3.5">3.5 estrellas o más</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de docentes */}
      <div className="estudiante-explorar__results">
        <p className="estudiante-explorar__results-count">
          {docentesFiltrados.length} {docentesFiltrados.length === 1 ? 'docente encontrado' : 'docentes encontrados'}
        </p>

        <div className="estudiante-explorar__grid">
          {docentesFiltrados.map((docente) => (
            <div key={docente.id} className="estudiante-explorar__card">
              <div className="estudiante-explorar__card-header">
                <Avatar src={docente.avatar} alt={docente.nombre} size="lg" fallback="D" />
              </div>
              
              <div className="estudiante-explorar__card-body">
                <h3 className="estudiante-explorar__card-title">{docente.nombre}</h3>
                <p className="estudiante-explorar__card-department">{docente.departamento}</p>
                
                <div className="estudiante-explorar__card-rating">
                  <StarRating rating={docente.calificacion} size="sm" />
                  <span className="estudiante-explorar__card-rating-value">{docente.calificacion}</span>
                </div>
                
                <p className="estudiante-explorar__card-reviews">
                  {docente.numeroEvaluaciones} evaluaciones
                </p>
              </div>
              
              <div className="estudiante-explorar__card-footer">
                <Button variant="primary" fullWidth size="sm">
                  Ver perfil
                </Button>
              </div>
            </div>
          ))}
        </div>

        {docentesFiltrados.length === 0 && (
          <div className="estudiante-explorar__empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>No se encontraron docentes con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  );
};