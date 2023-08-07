import { IColorConfig, colorConfig } from './colorConfig';

// ----------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IColor extends Omit<IColorConfig, 'opacity'> {}

// ----------------------------------------------------------------------

export const colorStyle = (props: IColor) => {
  return `color: ${colorConfig({ color: props.color })};`;
};
