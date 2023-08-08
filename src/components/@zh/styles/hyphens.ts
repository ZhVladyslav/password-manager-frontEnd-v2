export interface IHyphens {
  hyphens?: 'none' | 'manual' | 'auto';
}

export const hyphens = (props: IHyphens) => {
  if (!props.hyphens) return '';

  return `hyphens: ${props.hyphens};`;
};
