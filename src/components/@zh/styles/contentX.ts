export interface IContentX {
  contentX?: 'top' | 'center' | 'bottom';
}

// ----------------------------------------------------------------------

export const contentX = ({ contentX }: IContentX) => {
  if (!contentX) return '';

  let position = '';

  if (contentX === 'top') position = 'flex-start';
  if (contentX === 'center') position = 'center';
  if (contentX === 'bottom') position = 'flex-end';

  return `align-items: ${position};`;
};
