import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  as?: typeof Link;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  icon,
  as,
  to,
  ...rest
}) => {
  const variantClasses = {
    primary: 'bg-blue-800 hover:bg-blue-700 text-white border border-blue-800',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200',
    outline: 'bg-transparent hover:bg-gray-50 text-white border border-white hover:text-blue-800 hover:border-blue-800',
    link: 'bg-transparent text-blue-800 hover:text-blue-700 border-none underline'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  // If the button is rendered as a Link
  if (as === Link && to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;