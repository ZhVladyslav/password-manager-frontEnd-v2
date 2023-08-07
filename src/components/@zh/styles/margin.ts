export interface IMargin {
  m?: string | number;
  mt?: string | number;
  mb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mx?: string | number;
  my?: string | number;
}

// ----------------------------------------------------------------------

export const marginStyle = ({ m, mb, ml, mr, mt, mx, my }: IMargin) => {
  let margin: string | undefined = undefined;
  let marginTop: string | undefined = undefined;
  let marginBottom: string | undefined = undefined;
  let marginLeft: string | undefined = undefined;
  let marginRight: string | undefined = undefined;

  // margin
  if (m) {
    if (typeof m === 'string') margin = m;
    if (typeof m === 'number') margin = `${m}px`;
  }
  // margin top
  if (mt) {
    if (typeof mt === 'string') marginTop = mt;
    if (typeof mt === 'number') marginTop = `${mt}px`;
  }
  // margin bottom
  if (mb) {
    if (typeof mb === 'string') marginBottom = mb;
    if (typeof mb === 'number') marginBottom = `${mb}px`;
  }
  // margin left
  if (ml) {
    if (typeof ml === 'string') marginLeft = ml;
    if (typeof ml === 'number') marginLeft = `${ml}px`;
  }
  // margin right
  if (mr) {
    if (typeof mr === 'string') marginRight = mr;
    if (typeof mr === 'number') marginRight = `${mr}px`;
  }
  // margin X
  if (mx) {
    if (typeof mx === 'string') {
      marginTop = mx;
      marginBottom = mx;
    }
    if (typeof mx === 'number') {
      marginTop = `${mx}px`;
      marginBottom = `${mx}px`;
    }
  }
  // margin Y
  if (my) {
    if (typeof my === 'string') {
      marginLeft = my;
      marginRight = my;
    }
    if (typeof my === 'number') {
      marginLeft = `${my}px`;
      marginRight = `${my}px`;
    }
  }

  return `
  ${margin ? `margin: ${margin};` : ''}
  ${marginTop ? `margin-top: ${marginTop};` : ''}
  ${marginBottom ? `margin-bottom: ${marginBottom};` : ''}
  ${marginLeft ? `margin-left: ${marginLeft};` : ''}
  ${marginRight ? `margin-right: ${marginRight};` : ''}
  `;
};
