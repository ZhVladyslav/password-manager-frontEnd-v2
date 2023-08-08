export interface ITextTransform {
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
}

export const textTransform = (props: ITextTransform) => {
  if (!props.textTransform) return '';

  return `text-transform: ${props.textTransform};`;
};
