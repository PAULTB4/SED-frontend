import './Card.css';

export const Card = ({ 
  children, 
  variant = 'default',
  padding = 'md',
  shadow = true,
  hoverable = false,
  className = '',
  ...props 
}) => {
  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    shadow && 'card--shadow',
    hoverable && 'card--hoverable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};