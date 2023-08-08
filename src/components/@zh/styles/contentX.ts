export interface IContentX {
  contentX?: 'top' | 'center' | 'bottom';
}

// ----------------------------------------------------------------------

export const contentX = ({ contentX }: IContentX) => {
  if (!contentX) return '';

  return `align-items: ${contentX};`;
};
