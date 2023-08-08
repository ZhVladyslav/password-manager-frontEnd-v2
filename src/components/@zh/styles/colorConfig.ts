export interface IColorConfig {
  color?: colorType | colorGrayType;
  opacity?: opacityType;
}

type bColorClassType = 'Primary' | 'Secondary' | 'Info' | 'Success' | 'Warning' | 'Error';
type bColorSaturationType = 'Lighter' | 'Light' | 'Main' | 'Dark' | 'Darker';
type bColorGraySaturationType = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type opacityType = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export type colorType = `${bColorClassType} ${bColorSaturationType}`;
export type colorGrayType = `Grey ${bColorGraySaturationType}`;

// ----------------------------------------------------------------------

export const colorConfig = ({ color, opacity }: IColorConfig) => {
  if (!color) return '';

  let opacityColor = opacity;
  if (opacity === null || opacity === undefined) opacityColor = 1;

  // Primary
  if (color === 'Primary Lighter') return `rgba(209, 233, 252, ${opacityColor})`;
  if (color === 'Primary Light') return `rgba(118, 176, 241, ${opacityColor})`;
  if (color === 'Primary Main') return `rgba(32, 101, 209, ${opacityColor})`;
  if (color === 'Primary Dark') return `rgba(16, 57, 150, ${opacityColor})`;
  if (color === 'Primary Darker') return `rgba(6, 27, 100, ${opacityColor})`;

  // Secondary
  if (color === 'Secondary Lighter') return `rgba(239, 214, 255, ${opacityColor})`;
  if (color === 'Secondary Light') return `rgba(198, 132, 255, ${opacityColor})`;
  if (color === 'Secondary Main') return `rgba(142, 51, 255, ${opacityColor})`;
  if (color === 'Secondary Dark') return `rgba(81, 25, 183, ${opacityColor})`;
  if (color === 'Secondary Darker') return `rgba(39, 9, 122, ${opacityColor})`;

  // Info
  if (color === 'Info Lighter') return `rgba(202, 253, 245, ${opacityColor})`;
  if (color === 'Info Light') return `rgba(97, 243, 243, ${opacityColor})`;
  if (color === 'Info Main') return `rgba(0, 184, 217, ${opacityColor})`;
  if (color === 'Info Dark') return `rgba(0, 108, 156, ${opacityColor})`;
  if (color === 'Info Darker') return `rgba(0, 55, 104, ${opacityColor})`;

  // Success
  if (color === 'Success Lighter') return `rgba(211, 252, 210, ${opacityColor})`;
  if (color === 'Success Light') return `rgba(119, 237, 139, ${opacityColor})`;
  if (color === 'Success Main') return `rgba(34, 197, 94, ${opacityColor})`;
  if (color === 'Success Dark') return `rgba(17, 141, 87, ${opacityColor})`;
  if (color === 'Success Darker') return `rgba(6, 94, 73, ${opacityColor})`;

  // Warning
  if (color === 'Warning Lighter') return `rgba(255, 245, 204, ${opacityColor})`;
  if (color === 'Warning Light') return `rgba(255, 214, 102, ${opacityColor})`;
  if (color === 'Warning Main') return `rgba(255, 171, 0, ${opacityColor})`;
  if (color === 'Warning Dark') return `rgba(183, 110, 0, ${opacityColor})`;
  if (color === 'Warning Darker') return `rgba(122, 65, 0, ${opacityColor})`;

  // Error
  if (color === 'Error Lighter') return `rgba(255, 233, 213, ${opacityColor})`;
  if (color === 'Error Light') return `rgba(255, 172, 130, ${opacityColor})`;
  if (color === 'Error Main') return `rgba(255, 86, 48, ${opacityColor})`;
  if (color === 'Error Dark') return `rgba(183, 29, 24, ${opacityColor})`;
  if (color === 'Error Darker') return `rgba(122, 9, 22, ${opacityColor})`;

  // Error
  if (color === 'Grey 100') return `rgba(249, 250, 251, ${opacityColor})`;
  if (color === 'Grey 200') return `rgba(244, 246, 248, ${opacityColor})`;
  if (color === 'Grey 300') return `rgba(223, 227, 232, ${opacityColor})`;
  if (color === 'Grey 400') return `rgba(196, 205, 213, ${opacityColor})`;
  if (color === 'Grey 500') return `rgba(145, 158, 171, ${opacityColor})`;
  if (color === 'Grey 600') return `rgba(99, 115, 129, ${opacityColor})`;
  if (color === 'Grey 700') return `rgba(69, 79, 91, ${opacityColor})`;
  if (color === 'Grey 800') return `rgba(33, 43, 54, ${opacityColor})`;
  if (color === 'Grey 900') return `rgba(22, 28, 36, ${opacityColor})`;
};
