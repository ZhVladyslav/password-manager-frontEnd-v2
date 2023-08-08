export interface ITextOverflow {
  textOverflow?: 'clip' | 'ellipsis';
}

export const textOverflow = (props: ITextOverflow) => {
  if (!props.textOverflow) return '';

  return `text-overflow: ${props.textOverflow};`;
};
