import type { FC, SelectHTMLAttributes } from 'react';
import React from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
  variant?: 'border' | 'borderless'; 
  rounded?: string;
}

const Select: FC<SelectProps> = ({
  className = '',
  sizeClass = 'h-11 px-4 py-3',
  variant = 'borderless', 
  rounded = 'rounded-lg',
  children,
  ...args
}) => {
  const baseClasses = `block w-full ${sizeClass} ${rounded} text-sm ${className}`;
  const borderClasses =
    variant === 'border'
      ? 'border border-neutral-300 bg-transparent focus:border-gold focus:ring focus:ring-transparent focus:ring-opacity-25'
      : 'border-transparent bg-gray focus:border-transparent focus:ring focus:ring-transparent focus:ring-opacity-50';

  return (
    <select className={`${baseClasses} ${borderClasses}`} {...args}>
      {children}
    </select>
  );
};

export default Select;
