import './PieChart.css';

/**
 * Componente de gráfico circular (Pie Chart) SVG
 * @param {Array} data - Array de objetos con { label, value, color }
 * @param {Number} size - Tamaño del gráfico (por defecto 200)
 */
export const PieChart = ({ data = [], size = 200 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="pie-chart-empty" style={{ width: size, height: size }}>
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calcular ángulos y crear paths
  let currentAngle = -90; // Empezar desde arriba
  const paths = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Convertir ángulos a coordenadas
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');
    
    currentAngle = endAngle;
    
    return {
      path: pathData,
      color: item.color || `hsl(${(index * 360) / data.length}, 70%, 60%)`,
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1)
    };
  });

  return (
    <div className="pie-chart-container">
      <svg
        viewBox="0 0 100 100"
        className="pie-chart"
        style={{ width: size, height: size }}
      >
        {paths.map((segment, index) => (
          <path
            key={index}
            d={segment.path}
            fill={segment.color}
            className="pie-segment"
          >
            <title>{`${segment.label}: ${segment.value} (${segment.percentage}%)`}</title>
          </path>
        ))}
      </svg>
      
      <div className="pie-legend">
        {paths.map((segment, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: segment.color }}
            ></div>
            <div className="legend-content">
              <span className="legend-label">{segment.label}</span>
              <span className="legend-value">
                {segment.value} ({segment.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
