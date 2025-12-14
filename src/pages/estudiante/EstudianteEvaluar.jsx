import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Button } from '@/shared/ui/components';
import './EstudianteEvaluar.css';

/**
 * Página Evaluar Docente
 * Formulario de evaluación con criterios y comentarios
 */
export const EstudianteEvaluar = () => {
  const { t } = useTranslation();
  const { cursoId } = useParams();
  const navigate = useNavigate();
  
  // Estado del formulario
  const [evaluacion, setEvaluacion] = useState({
    // Dominio de la materia
    conocimientoProfundo: 0,
    explicacionClara: 0,
    // Metodología
    metodologiaEfectiva: 0,
    recursosDidacticos: 0,
    // Interacción
    disposicionAyuda: 0,
    respetoEstudiantes: 0,
    // Sistema de evaluación
    criteriosTransparentes: 0,
    retroalimentacion: 0,
    // Comentarios
    comentarios: ''
  });

  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    dominio: true,
    metodologia: false,
    interaccion: false,
    sistema: false
  });

  // Datos mock del curso y docente
  const cursoData = {
    codigo: 'CS-101',
    nombre: 'Introducción a la Programación',
    docente: {
      nombre: 'Dr. Carlos Méndez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
    }
  };

  const toggleSeccion = (seccion) => {
    setSeccionesAbiertas({
      ...seccionesAbiertas,
      [seccion]: !seccionesAbiertas[seccion]
    });
  };

  const handleRatingChange = (criterio, valor) => {
    setEvaluacion({
      ...evaluacion,
      [criterio]: valor
    });
  };

  const handleSubmit = () => {
    // Validar que todos los criterios estén evaluados
    const criteriosCompletos = Object.entries(evaluacion).every(([key, value]) => {
      if (key === 'comentarios') return true;
      return value > 0;
    });

    if (!criteriosCompletos) {
      alert('Por favor completa todas las calificaciones');
      return;
    }

    // Aquí se enviaría la evaluación al backend
    console.log('Evaluación enviada:', evaluacion);
    alert('Evaluación enviada exitosamente');
    navigate('/estudiante/dashboard');
  };

  const RatingScale = ({ criterio, label, valor }) => (
    <div className="estudiante-evaluar__rating-item">
      <p className="estudiante-evaluar__rating-label">{label}</p>
      <div className="estudiante-evaluar__rating-scale">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`estudiante-evaluar__rating-button ${valor === num ? 'estudiante-evaluar__rating-button--active' : ''}`}
            onClick={() => handleRatingChange(criterio, num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="estudiante-evaluar__rating-labels">
        <span>{t('estudiante.evaluate.veryPoor')}</span>
        <span>{t('estudiante.evaluate.excellent')}</span>
      </div>
    </div>
  );

  return (
    <div className="estudiante-evaluar">
      {/* Breadcrumb */}
      <div className="estudiante-evaluar__breadcrumb">
        <Link to="/estudiante/dashboard">{t('estudiante.evaluate.home')}</Link>
        <span>/</span>
        <Link to="/estudiante/evaluar-docentes">{t('estudiante.evaluate.evaluateTeacher')}</Link>
        <span>/</span>
        <span>{cursoData.docente.nombre}</span>
      </div>

      {/* Header con info del docente */}
      <div className="estudiante-evaluar__header">
        <Avatar src={cursoData.docente.avatar} alt={cursoData.docente.nombre} size="lg" fallback="CM" />
        <div className="estudiante-evaluar__header-info">
          <h1 className="estudiante-evaluar__title">{cursoData.docente.nombre}</h1>
          <p className="estudiante-evaluar__subtitle">{t('estudiante.evaluate.course')}: {cursoData.nombre}</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="estudiante-evaluar__form-container">
        <div className="estudiante-evaluar__form-header">
          <h2 className="estudiante-evaluar__form-title">{t('estudiante.evaluate.formTitle')}</h2>
          <p className="estudiante-evaluar__form-description">
            {t('estudiante.evaluate.formDescription')}
          </p>
        </div>

        {/* Sección: Dominio de la materia */}
        <div className="estudiante-evaluar__section">
          <button
            type="button"
            className="estudiante-evaluar__section-header"
            onClick={() => toggleSeccion('dominio')}
          >
            <h3 className="estudiante-evaluar__section-title">{t('estudiante.evaluate.domainTitle')}</h3>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              style={{ transform: seccionesAbiertas.dominio ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          {seccionesAbiertas.dominio && (
            <div className="estudiante-evaluar__section-content">
              <RatingScale
                criterio="conocimientoProfundo"
                label={t('estudiante.evaluate.deepKnowledge')}
                valor={evaluacion.conocimientoProfundo}
              />
              <RatingScale
                criterio="explicacionClara"
                label={t('estudiante.evaluate.clearExplanation')}
                valor={evaluacion.explicacionClara}
              />
            </div>
          )}
        </div>

        {/* Sección: Metodología de enseñanza */}
        <div className="estudiante-evaluar__section">
          <button
            type="button"
            className="estudiante-evaluar__section-header"
            onClick={() => toggleSeccion('metodologia')}
          >
            <h3 className="estudiante-evaluar__section-title">{t('estudiante.evaluate.methodologyTitle')}</h3>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              style={{ transform: seccionesAbiertas.metodologia ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          {seccionesAbiertas.metodologia && (
            <div className="estudiante-evaluar__section-content">
              <RatingScale
                criterio="metodologiaEfectiva"
                label={t('estudiante.evaluate.effectiveMethodology')}
                valor={evaluacion.metodologiaEfectiva}
              />
              <RatingScale
                criterio="recursosDidacticos"
                label={t('estudiante.evaluate.teachingResources')}
                valor={evaluacion.recursosDidacticos}
              />
            </div>
          )}
        </div>

        {/* Sección: Interacción con estudiantes */}
        <div className="estudiante-evaluar__section">
          <button
            type="button"
            className="estudiante-evaluar__section-header"
            onClick={() => toggleSeccion('interaccion')}
          >
            <h3 className="estudiante-evaluar__section-title">{t('estudiante.evaluate.interactionTitle')}</h3>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              style={{ transform: seccionesAbiertas.interaccion ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          {seccionesAbiertas.interaccion && (
            <div className="estudiante-evaluar__section-content">
              <RatingScale
                criterio="disposicionAyuda"
                label={t('estudiante.evaluate.willingnessToHelp')}
                valor={evaluacion.disposicionAyuda}
              />
              <RatingScale
                criterio="respetoEstudiantes"
                label={t('estudiante.evaluate.respectStudents')}
                valor={evaluacion.respetoEstudiantes}
              />
            </div>
          )}
        </div>

        {/* Sección: Sistema de evaluación */}
        <div className="estudiante-evaluar__section">
          <button
            type="button"
            className="estudiante-evaluar__section-header"
            onClick={() => toggleSeccion('sistema')}
          >
            <h3 className="estudiante-evaluar__section-title">{t('estudiante.evaluate.evaluationSystemTitle')}</h3>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              style={{ transform: seccionesAbiertas.sistema ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          {seccionesAbiertas.sistema && (
            <div className="estudiante-evaluar__section-content">
              <RatingScale
                criterio="criteriosTransparentes"
                label={t('estudiante.evaluate.transparentCriteria')}
                valor={evaluacion.criteriosTransparentes}
              />
              <RatingScale
                criterio="retroalimentacion"
                label={t('estudiante.evaluate.timelyFeedback')}
                valor={evaluacion.retroalimentacion}
              />
            </div>
          )}
        </div>

        {/* Comentarios adicionales */}
        <div className="estudiante-evaluar__comments-section">
          <h3 className="estudiante-evaluar__section-title">{t('estudiante.evaluate.additionalComments')}</h3>
          <textarea
            className="estudiante-evaluar__textarea"
            placeholder={t('estudiante.evaluate.commentsPlaceholder')}
            rows="5"
            value={evaluacion.comentarios}
            onChange={(e) => setEvaluacion({ ...evaluacion, comentarios: e.target.value })}
          />
        </div>

        {/* Botones de acción */}
        <div className="estudiante-evaluar__actions">
          <Button 
            variant="outline" 
            onClick={() => navigate('/estudiante/dashboard')}
          >
            {t('estudiante.evaluate.cancel')}
          </Button>
          <Button 
            variant="primary"
            onClick={handleSubmit}
          >
            {t('estudiante.evaluate.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};