export interface IBRadius {
  borderRadius?: '4px' | '8px' | '12px' | '16px' | '20px' | '24px' | '50%';
}

// ----------------------------------------------------------------------

export const bRadius = ({ borderRadius }: IBRadius) => {
  if (!borderRadius) return '';

  return `border-radius: ${borderRadius};`;
};
