import './StarRating.css';

/**
 * Componente StarRating - Sistema de calificación con estrellas
 * @param {number} rating - Calificación (0-5)
 * @param {number} maxStars - Número máximo de estrellas (default: 5)
 * @param {string} size - Tamaño: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} showValue - Mostrar valor numérico (default: false)
 */
export const StarRating = ({ 
  rating = 0, 
  maxStars = 5, 
  size = 'md',
  showValue = false 
}) => {
  const stars = [];
  
  for (let i = 1; i <= maxStars; i++) {
    const isFilled = i <= Math.round(rating);
    stars.push(
      <svg
        key={i}
        className={`star-rating__star star-rating__star--${size} ${isFilled ? 'star-rating__star--filled' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={isFilled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className="star-rating">
      <div className="star-rating__stars">
        {stars}
      </div>
      {showValue && (
        <span className="star-rating__value">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};
