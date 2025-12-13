import './Avatar.css';

/**
 * Componente Avatar - Avatar circular de usuario
 * @param {string} src - URL de la imagen
 * @param {string} alt - Texto alternativo
 * @param {string} size - Tamaño: 'sm', 'md', 'lg', 'xl' (default: 'md')
 * @param {string} fallback - Iniciales si no hay imagen
 */
export const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md',
  fallback = '?' 
}) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="avatar__image"
        />
      ) : (
        <div className="avatar__fallback">
          {fallback}
        </div>
      )}
    </div>
  );
};
