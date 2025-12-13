import './StatCard.css';

/**
 * Componente StatCard - Card de estadística con borde de color
 * @param {string} title - Título de la estadística
 * @param {string|number} value - Valor principal
 * @param {string} color - Color del borde: 'green', 'yellow', 'blue', 'red' (default: 'green')
 * @param {ReactNode} icon - Ícono SVG
 */
export const StatCard = ({ 
  title, 
  value, 
  color = 'green',
  icon 
}) => {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon">
        {icon}
      </div>
      <div className="stat-card__content">
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__title">{title}</div>
      </div>
    </div>
  );
};
