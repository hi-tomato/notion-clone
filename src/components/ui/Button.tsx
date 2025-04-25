import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  text?: string;
  type?: ButtonType;
  className?: string;
}

const Button = ({
  onClick,
  children,
  type = 'button',
  className = '',
  text,
}: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children || text}
    </button>
  );
};

export default Button;
