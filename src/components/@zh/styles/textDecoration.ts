type lineType = 'underline' | 'overline' | 'line-through';
type lineStyleType = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';

export interface ITextDecoration {
  textDecoration?: 'none' | lineType | `${lineType} ${lineStyleType}`;
}

export const textDecoration = (props: ITextDecoration) => {
  if (!props.textDecoration) return '';

  return `text-decoration: ${props.textDecoration};`;
};
