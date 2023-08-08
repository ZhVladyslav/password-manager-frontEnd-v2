export interface IContentY {
  contentY?: 'left' | 'center' | 'right' | 'space-between';
}

// ----------------------------------------------------------------------

export const contentY = ({ contentY }: IContentY) => {
  if (!contentY) return '';

  return `justify-content: ${contentY};`;
};
