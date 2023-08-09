import React from 'react';
import styles from './Button.module.scss';

// ----------------------------------------------------------------------

interface IProps {
  title?: string;
  svg?: React.ReactNode;
  svgPosition?: 'left' | 'right';
  variant?: 'contained' | 'outlined' | 'text' | 'soft';
  color?: 'default' | 'primary' | 'info' | 'success' | 'warn' | 'error';
  size?: 'large' | 'medium' | 'small';
  wFull?: boolean;
}

// ----------------------------------------------------------------------

const Button: React.FC<IProps> = ({
  title,
  variant = 'contained',
  size = 'medium',
  color = 'default',
  svg,
  svgPosition = 'left',
  wFull,
}) => {
  const svgComponent = () => {
    if (!svg) return <></>;
    return (
      <span
        className={`flex justify-center items-center w-[20px] h-[20px] ${
          title && (svgPosition === 'right' ? 'ml-[10px]' : 'mr-[10px]')
        }`}
      >
        {svg}
      </span>
    );
  };

  return (
    <button
      className={`
        ${styles.button} 
        ${styles[`button-size-${size}`]} 
        ${styles[`button-${variant}`]}
        ${styles[`button-${variant}-${color}`]}
        ${wFull ? 'w-full' : ''}
      `}
    >
      {svgPosition !== 'right' && svgComponent()}

      <span>{title}</span>

      {svgPosition === 'right' && svgComponent()}
    </button>
  );
};

// ----------------------------------------------------------------------

export default Button;
