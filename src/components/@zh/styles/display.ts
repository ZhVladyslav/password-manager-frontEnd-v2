export interface IDisplay {
  d?: 'block' | 'inline-block' | 'none' | 'flex' | 'grid';
}

// ----------------------------------------------------------------------

export const display = (props: IDisplay) => {
  if (!props.d) return '';

  return `display: ${props.d};`;
};
