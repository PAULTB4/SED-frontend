import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Button } from '@/shared/ui/components';
import { instrumentosApi } from '@/features/evaluacion-comision/api/instrumentosApi';
import { evaluacionesApi } from '@/features/evaluacion-estudiante/api/evaluacionesApi';
import { useEstudianteData } from '@/features/evaluacion-estudiante';
import './EstudianteEvaluar.css';

/**
 * Página Evaluar Docente
 * Renderiza dinámicamente los módulos/preguntas del instrumento asignado a la sección.
 */
export const EstudianteEvaluar = () => {
  const { t } = useTranslation();
  const { cursoId: seccionId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: estudianteData, loading: loadingEstudiante } = useEstudianteData();
  const curso = useMemo(
    () => estudianteData?.cursosActuales?.find((c) => c.seccionId === seccionId) || null,
    [estudianteData, seccionId]
  );
  const instrumentoId = searchParams.get('instrumentoId') || curso?.instrumentoId;
  const matriculaId = curso?.matriculaId;

  const [instrumento, setInstrumento] = useState(null);
  const [loadingInstrumento, setLoadingInstrumento] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const loadInstrumento = async () => {
      if (!instrumentoId) return;
      try {
        setLoadingInstrumento(true);
        const inst = await instrumentosApi.getById(instrumentoId);
        setInstrumento(inst);
        const initial = {};
        (inst?.modulos || []).forEach((m) => {
          (m.preguntas || []).forEach((p) => {
            initial[p.id] = 0;
          });
        });
        setRespuestas(initial);
      } catch (err) {
        console.error(err);
        setFeedback('No se pudo cargar el instrumento de evaluación');
      } finally {
        setLoadingInstrumento(false);
      }
    };
    loadInstrumento();
  }, [instrumentoId]);

  const handleRatingChange = (preguntaId, valor) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }));
  };

  const handleSubmit = async () => {
    if (!instrumentoId || !matriculaId) {
      setFeedback('Falta información del curso o la matrícula.');
      return;
    }
    const todas = Object.values(respuestas).length > 0 && Object.values(respuestas).every((v) => v > 0);
    if (!todas) {
      setFeedback('Completa todas las preguntas antes de enviar.');
      return;
    }
    try {
      setFeedback('');
      await evaluacionesApi.enviar({
        matriculaId,
        instrumentoId,
        respuestas: Object.entries(respuestas).map(([preguntaId, valor]) => ({
          preguntaId,
          valor,
          comentario: ''
        }))
      });
      alert('Evaluación enviada correctamente');
      navigate('/estudiante/dashboard');
    } catch (err) {
      console.error(err);
      setFeedback(err?.response?.data?.message || 'No se pudo enviar la evaluación');
    }
  };

  const RatingScale = ({ preguntaId, label, valor }) => (
    <div className="estudiante-evaluar__rating-item">
      <p className="estudiante-evaluar__rating-label">{label}</p>
      <div className="estudiante-evaluar__rating-scale">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`estudiante-evaluar__rating-button ${valor === num ? 'estudiante-evaluar__rating-button--active' : ''}`}
            onClick={() => handleRatingChange(preguntaId, num)}
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

  if (loadingEstudiante || loadingInstrumento) {
    return (
      <div className="estudiante-evaluar__loading">
        <div className="estudiante-evaluar__spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (!curso || !instrumento) {
    return (
      <div className="estudiante-evaluar__error">
        <p>No se encontró el curso o la evaluación.</p>
        <button onClick={() => navigate('/estudiante/dashboard')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="estudiante-evaluar">
      {/* Breadcrumb */}
      <div className="estudiante-evaluar__breadcrumb">
        <Link to="/estudiante/dashboard">{t('estudiante.evaluate.home')}</Link>
        <span>/</span>
        <Link to="/estudiante/evaluar-docentes">{t('estudiante.evaluate.evaluateTeacher')}</Link>
        <span>/</span>
        <span>{curso.docente}</span>
      </div>

      {/* Header con info del docente */}
      <div className="estudiante-evaluar__header">
        <Avatar src={curso.avatar} alt={curso.docente} size="lg" fallback="CM" />
        <div className="estudiante-evaluar__header-info">
          <h1 className="estudiante-evaluar__title">{curso.docente}</h1>
          <p className="estudiante-evaluar__subtitle">
            {t('estudiante.evaluate.course')}: {curso.nombre}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="estudiante-evaluar__form-container">
        <div className="estudiante-evaluar__form-header">
          <h2 className="estudiante-evaluar__form-title">{instrumento.nombre}</h2>
          <p className="estudiante-evaluar__form-description">
            {instrumento.descripcion || t('estudiante.evaluate.formDescription')}
          </p>
        </div>

        {(instrumento.modulos || []).map((modulo, idx) => (
          <div className="estudiante-evaluar__section" key={modulo.id || idx}>
            <div className="estudiante-evaluar__section-header static">
              <h3 className="estudiante-evaluar__section-title">{modulo.nombre || `Módulo ${idx + 1}`}</h3>
            </div>
            <div className="estudiante-evaluar__section-content">
              {(modulo.preguntas || []).map((pregunta, pIdx) => (
                <RatingScale
                  key={pregunta.id || pIdx}
                  preguntaId={pregunta.id}
                  label={pregunta.enunciado}
                  valor={respuestas[pregunta.id] || 0}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="estudiante-evaluar__actions">
          {feedback && <div className="estudiante-evaluar__alert">{feedback}</div>}
          <Button variant="outline" onClick={() => navigate('/estudiante/dashboard')}>
            {t('estudiante.evaluate.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t('estudiante.evaluate.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};
