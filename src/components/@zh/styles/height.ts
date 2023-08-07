export interface IHeight {
  h?: string | number;
  minH?: string | number;
  maxH?: string | number;
}

// ----------------------------------------------------------------------

export const height = ({ h, minH, maxH }: IHeight) => {
  let height: string | undefined = undefined;
  let minHeight: string | undefined = undefined;
  let maxHeight: string | undefined = undefined;

  // height
  if (h) {
    if (typeof h === 'string') height = h;
    else if (typeof h === 'number') height = `${h}px`;
  }
  // minHeight
  if (minH) {
    if (typeof minH === 'string') minHeight = minH;
    else if (typeof minH === 'number') minHeight = `${minH}px`;
  }
  // maxHeight
  if (maxH) {
    if (typeof maxH === 'string') maxHeight = maxH;
    else if (typeof maxH === 'number') maxHeight = `${maxH}px`;
  }

  return `
  ${height ? `height: ${height};` : ''}
  ${minHeight ? `min-height: ${minHeight};` : ''}
  ${maxHeight ? `max-height: ${maxHeight};` : ''}
  `;
};
