export interface ITextAlign {
  textAlign?: 'start' | 'end' | 'center' | 'justify';
}

export const textAlign = (props: ITextAlign) => {
  if (!props.textAlign) return '';

  return `text-align: ${props.textAlign};`;
};
