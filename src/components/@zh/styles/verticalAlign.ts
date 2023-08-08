export interface IVerticalAlign {
  verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'sub' | 'text-top' | 'text-bottom';
}

export const verticalAlign = (props: IVerticalAlign) => {
  if (!props.verticalAlign) return '';

  return `vertical-align: ${props.verticalAlign};`;
};
