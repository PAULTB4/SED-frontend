import { Button } from '@/shared/ui/components';
import { Link } from 'react-router-dom';
import './LandingHero.css';

export const LandingHero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero__content">
          {/* Contenido izquierdo */}
          <div className="hero__text">
            <span className="hero__badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                  fill="currentColor"
                />
              </svg>
              Sistema de Evaluación
            </span>

            <h1 className="hero__title">
              Evalúa y mejora la{' '}
              <span className="hero__title--highlight">calidad educativa</span>
            </h1>

            <p className="hero__description">
              Plataforma diseñada para optimizar y transparentar la evaluación docente
            </p>

            <div className="hero__actions">
              <Link to="/login">
  <Button 
    variant="primary" 
    size="lg"
    leftIcon={
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
              stroke="currentColor" 
              strokeWidth="2"
        />
      </svg>
    }
  >
    Comenzar evaluación
  </Button>
</Link>

              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                }
              >
                Más información
              </Button>
            </div>
          </div>

          {/* Ilustración derecha */}
          <div className="hero__illustration">
            <div className="hero__illustration-wrapper">
              <svg 
                viewBox="0 0 400 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="hero__illustration-svg"
              >
                {/* Fondo circular */}
                <circle cx="200" cy="200" r="180" fill="#D1FAE5" opacity="0.5"/>
                
                {/* Pantalla/Monitor */}
                <rect x="120" y="100" width="160" height="120" rx="8" fill="#10B981"/>
                <rect x="130" y="110" width="140" height="90" rx="4" fill="white"/>
                
                {/* Líneas de texto en pantalla */}
                <rect x="145" y="125" width="80" height="6" rx="3" fill="#D1FAE5"/>
                <rect x="145" y="140" width="110" height="6" rx="3" fill="#D1FAE5"/>
                <rect x="145" y="155" width="90" height="6" rx="3" fill="#D1FAE5"/>
                
                {/* Base del monitor */}
                <rect x="190" y="220" width="20" height="30" fill="#10B981"/>
                <rect x="170" y="250" width="60" height="8" rx="4" fill="#10B981"/>
                
                {/* Persona (círculo + cuerpo simple) */}
                <circle cx="100" cy="180" r="30" fill="#34D399"/>
                <path d="M70 210 Q100 230 130 210 L130 260 Q100 270 70 260 Z" fill="#10B981"/>
                
                {/* Estrellas de calificación */}
                <g transform="translate(250, 120)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                        fill="#FCD34D" 
                        transform="scale(0.8)"
                  />
                </g>
                <g transform="translate(280, 120)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                        fill="#FCD34D" 
                        transform="scale(0.8)"
                  />
                </g>
                <g transform="translate(310, 120)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                        fill="#FCD34D" 
                        transform="scale(0.8)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};