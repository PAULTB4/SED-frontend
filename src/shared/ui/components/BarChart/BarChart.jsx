import './BarChart.css';

/**
 * Componente BarChart - Gráfico de barras simple con SVG
 * @param {Array} data - Array de objetos con { label, value }
 * @param {number} maxValue - Valor máximo para la escala (default: 5)
 * @param {string} color - Color de las barras (default: '#10B981')
 */
export const BarChart = ({ 
  data = [], 
  maxValue = 5,
  color = '#10B981'
}) => {
  const height = 300;
  const width = 100;
  const barWidth = 60;
  const gap = 20;

  return (
    <div className="bar-chart">
      <div className="bar-chart__container">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          
          return (
            <div key={index} className="bar-chart__item">
              <div className="bar-chart__bar-container">
                <div 
                  className="bar-chart__bar"
                  style={{ 
                    height: `${barHeight}px`,
                    backgroundColor: color
                  }}
                >
                  <span className="bar-chart__value">{item.value.toFixed(1)}</span>
                </div>
              </div>
              <div className="bar-chart__label">{item.label}</div>
            </div>
          );
        })}
      </div>
      <div className="bar-chart__y-axis">
        {[5, 4, 3, 2, 1, 0].map((value) => (
          <div key={value} className="bar-chart__y-label">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
