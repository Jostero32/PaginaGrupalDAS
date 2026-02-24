import './Button.css';

function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

  if (Component === 'button') {
    return (
      <button className={classes} type={type} {...props}>
        {children}
      </button>
    );
  }

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Button;
