export interface IWidth {
  w?: string | number;
  minW?: string | number;
  maxW?: string | number;
}

// ----------------------------------------------------------------------

export const width = ({ w, minW, maxW }: IWidth) => {
  let width: string | undefined = undefined;
  let minWidth: string | undefined = undefined;
  let maxWidth: string | undefined = undefined;

  // width
  if (w) {
    if (typeof w === 'string') width = w;
    else if (typeof w === 'number') width = `${w}px`;
  }
  // minWidth
  if (minW) {
    if (typeof minW === 'string') minWidth = minW;
    else if (typeof minW === 'number') minWidth = `${minW}px`;
  }
  // maxWidth
  if (maxW) {
    if (typeof maxW === 'string') maxWidth = maxW;
    else if (typeof maxW === 'number') maxWidth = `${maxW}px`;
  }

  return `
  ${width ? `width: ${width};` : ''}
  ${minWidth ? `min-width: ${minWidth};` : ''}
  ${maxWidth ? `max-width: ${maxWidth};` : ''}
  `;
};
