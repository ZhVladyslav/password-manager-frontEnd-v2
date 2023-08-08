export interface IOverflow {
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
}

export const overflow = (props: IOverflow) => {
  let overflowStyle = '';
  let overflowX = '';
  let overflowY = '';

  if (props.overflow) overflowStyle = props.overflow;
  if (props.overflowX) overflowX = props.overflowX;
  if (props.overflowY) overflowY = props.overflowY;

  return `
  overflow: ${overflowStyle};
  overflow-x: ${overflowX};
  overflow-y: ${overflowY};
  `;
};
