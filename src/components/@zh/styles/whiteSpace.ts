export interface IWhiteSpace {
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
}

export const whiteSpace = (props: IWhiteSpace) => {
  if (!props.whiteSpace) return '';

  return `white-space: ${props.whiteSpace};`;
};
