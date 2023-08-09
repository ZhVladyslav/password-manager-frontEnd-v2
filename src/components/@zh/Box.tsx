import React from 'react';

// ----------------------------------------------------------------------

interface IProps {
  children?: React.ReactNode;
  className?: () => { main: string; inner: string };
}

// ----------------------------------------------------------------------

const Box: React.FC<IProps> = ({ className, children }) => {
  const { main, inner } = className ? className() : { main: '', inner: '' };

  return (
    <div className={main}>
      <div className={`relative w-full h-full ${inner}`}>{children}</div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Box;
