import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width'
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
      <span className="btn__text">{children}</span>
      {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </button>
  );
};