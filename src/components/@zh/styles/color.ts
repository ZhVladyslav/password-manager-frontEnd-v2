import { IColorConfig, colorConfig } from './colorConfig';

// ----------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IColor extends Omit<IColorConfig, 'opacity'> {}

// ----------------------------------------------------------------------

export const color = ({ color }: IColor) => {
  return `color: ${colorConfig({ color })};`;
};
