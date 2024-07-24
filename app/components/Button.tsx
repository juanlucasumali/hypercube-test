import React, { useState } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-accent text-black py-2 px-4 font-start border-4 border-black
        font-bold
        ${isHovered && !disabled
          ? 'bg-background translate-x-1 translate-y-1 shadow-[2px_2px_0px_rgba(0,0,0,1),4px_4px_0px_rgba(0,0,0,0.25)]'
          : 'shadow-[4px_4px_0px_rgba(0,0,0,1),8px_8px_0px_rgba(0,0,0,0.25)]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
