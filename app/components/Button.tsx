import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-[#ee8822] text-black py-2 px-4 font-start rounded-sm border-4 border-black
        shadow-[4px_4px_0px_rgba(0,0,0,1),8px_8px_0px_rgba(0,0,0,0.25)]
        hover:bg-[#F4EDD8] hover:shadow-[2px_2px_0px_rgba(0,0,0,1),4px_4px_0px_rgba(0,0,0,0.25)]
        hover:translate-x-1 hover:translate-y-1
        font-bold transition-transform duration-150
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
