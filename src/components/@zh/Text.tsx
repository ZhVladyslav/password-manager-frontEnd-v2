import React from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

interface IProps {
  children?: string;
  variant?: 'span' | 'a' | 'p' | 'b' | 'i' | 'u' | 's' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  to?: string;
}

// ----------------------------------------------------------------------

const Text: React.FC<IProps> = ({ children, variant, className, to }) => {
  if (variant === 'p') return <p>{children}</p>;
  else if (variant === 'b') return <b className={`text-base font-bold ${className}`}>{children}</b>;
  else if (variant === 'i') return <i className={`text-base font-normal ${className}`}>{children}</i>;
  else if (variant === 'u') return <u className={`text-base font-normal ${className}`}>{children}</u>;
  else if (variant === 's') return <s className={`text-base font-normal ${className}`}>{children}</s>;
  else if (variant === 'h1') return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;
  else if (variant === 'h2') return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
  else if (variant === 'h3') return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
  else if (variant === 'h4') return <h4 className={`text-lg font-bold ${className}`}>{children}</h4>;
  else if (variant === 'h5') return <h5 className={`text-base font-bold ${className}`}>{children}</h5>;
  else if (variant === 'h6') return <h6 className={`text-sm font-bold ${className}`}>{children}</h6>;
  else if (variant === 'a' && to)
    return (
      <Link to={to} className={`text-base font-normal text-white hover:underline ${className}`}>
        {children}
      </Link>
    );

  // DEFAULT
  return <span className={`text-base font-normal ${className}`}>{children}</span>;
};

// ----------------------------------------------------------------------

export default Text;
