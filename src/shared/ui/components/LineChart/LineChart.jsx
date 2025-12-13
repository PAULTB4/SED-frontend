import './LineChart.css';

/**
 * Componente LineChart - Gráfico de línea para evolución temporal
 * @param {Array} data - Array de objetos con { label, value }
 * @param {number} maxValue - Valor máximo para la escala (default: 5)
 * @param {string} color - Color de la línea (default: '#10B981')
 */
export const LineChart = ({ 
  data = [], 
  maxValue = 5,
  color = '#10B981'
}) => {
  const height = 300;
  const width = 600;
  const padding = 40;
  
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  
  // Calcular puntos
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = height - padding - (item.value / maxValue) * chartHeight;
    return { x, y, value: item.value };
  });
  
  // Crear path para la línea
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="line-chart">
      <svg 
        width={width} 
        height={height}
        className="line-chart__svg"
      >
        {/* Grid lines horizontales */}
        {[0, 1, 2, 3, 4, 5].map((value) => {
          const y = height - padding - (value / maxValue) * chartHeight;
          return (
            <g key={value}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray={value === 0 ? "0" : "4 4"}
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#9CA3AF"
              >
                {value}
              </text>
            </g>
          );
        })}
        
        {/* Línea principal */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Puntos */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="white"
              stroke={color}
              strokeWidth="3"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill={color}
            />
          </g>
        ))}
        
        {/* Labels del eje X */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          return (
            <text
              key={index}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
            >
              {item.label}
            </text>
          );
        })}
      </svg>
      
      <div className="line-chart__legend">
        <div className="line-chart__legend-item">
          <div 
            className="line-chart__legend-color"
            style={{ backgroundColor: color }}
          ></div>
          <span className="line-chart__legend-label">Calificación</span>
        </div>
      </div>
    </div>
  );
};
