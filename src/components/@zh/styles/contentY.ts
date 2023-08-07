export interface IContentY {
  contentY?: 'left' | 'center' | 'right' | 'space-between';
}

// ----------------------------------------------------------------------

export const contentY = ({ contentY }: IContentY) => {
  if (!contentY) return '';

  let position = '';

  if (contentY === 'left') position = 'flex-start';
  if (contentY === 'center') position = 'center';
  if (contentY === 'right') position = 'flex-end';
  if (contentY === 'space-between') position = 'space-between';

  return `justify-content: ${position};`;
};
