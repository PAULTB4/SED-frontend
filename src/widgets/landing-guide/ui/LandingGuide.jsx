import { Button, Card } from '@/shared/ui/components';
import { Link } from 'react-router-dom';
import './LandingGuide.css';

export const LandingGuide = () => {
  const steps = [
    {
      id: 1,
      title: 'Accede a la plataforma',
      description: 'Visita sed.pautb.com desde cualquier navegador.'
    },
    {
      id: 2,
      title: 'Inicia sesión',
      description: 'Utiliza tu correo institucional y contraseña para acceder.'
    },
    {
      id: 3,
      title: 'Selecciona el curso y docente',
      description: 'Elige el curso y docente que deseas evaluar de tu lista de asignaturas.'
    },
    {
      id: 4,
      title: 'Completa la evaluación',
      description: 'Valora con estrellas los diferentes criterios y añade comentarios si lo deseas.'
    },
    {
      id: 5,
      title: 'Envía tu evaluación',
      description: 'Revisa tus respuestas y haz clic en "Enviar" para completar el proceso.'
    }
  ];

  return (
    <section className="guide" id="manual">
      <div className="container">
        <div className="guide__header">
          <span className="guide__badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            Guía
          </span>
          <h2 className="guide__title">¿Cómo ingresar y evaluar?</h2>
          <p className="guide__description">
            Sigue estos sencillos pasos para realizar tus evaluaciones docentes
          </p>
        </div>

        <div className="guide__content">
          {/* Lista de pasos */}
          <div className="guide__steps">
            <div className="guide__steps-header">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
              </svg>
              <h3>Pasos a seguir</h3>
            </div>

            <ol className="guide__steps-list">
              {steps.map((step) => (
                <li key={step.id} className="guide__step">
                  <div className="guide__step-number">{step.id}</div>
                  <div className="guide__step-content">
                    <h4 className="guide__step-title">{step.title}</h4>
                    <p className="guide__step-description">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Callouts informativos */}
          <div className="guide__callouts">
            {/* Callout Anonimato */}
            <Card 
              padding="md"
              className="guide__callout guide__callout--primary"
            >
              <div className="guide__callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="guide__callout-content">
                <h4 className="guide__callout-title">100% Anónimo y Seguro</h4>
                <p className="guide__callout-description">
                  Tus evaluaciones son totalmente anónimas. Ni los docentes ni las autoridades 
                  podrán saber quién realizó cada evaluación, garantizando sinceridad y protección.
                </p>
              </div>
            </Card>

            {/* Callout Mejora */}
            <Card 
              padding="md"
              className="guide__callout guide__callout--secondary"
            >
              <div className="guide__callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="guide__callout-content">
                <h4 className="guide__callout-title">Mejora la calidad educativa</h4>
                <p className="guide__callout-description">
                  Tu participación es crucial para mejorar la calidad de la enseñanza. Cada 
                  evaluación ayuda a identificar fortalezas y áreas de mejora de los docentes.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="guide__cta">
  <Link to="/login">
    <Button 
      variant="primary" 
      size="lg"
      leftIcon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
            fill="currentColor"
          />
        </svg>
      }
    >
      Comenzar ahora
    </Button>
  </Link>
</div>
      </div>
    </section>
  );
};