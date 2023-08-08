export interface IZIndex {
  z?: number;
}

export const zIndex = (props: IZIndex) => {
  if (!props.z) return '';

  return `z-index: ${props.z};`;
};
