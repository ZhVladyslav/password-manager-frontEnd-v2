export interface IPadding {
  p?: string | number;
  pt?: string | number;
  pb?: string | number;
  pl?: string | number;
  pr?: string | number;
  px?: string | number;
  py?: string | number;
}

// ----------------------------------------------------------------------

export const paddingStyle = ({ p, pb, pl, pr, pt, px,py }: IPadding) => {
  let padding: string | undefined = undefined;
  let paddingTop: string | undefined = undefined;
  let paddingBottom: string | undefined = undefined;
  let paddingLeft: string | undefined = undefined;
  let paddingRight: string | undefined = undefined;

  // padding
  if (p) {
    if (typeof p === 'string') padding = p;
    if (typeof p === 'number') padding = `${p}px`;
  }
  // padding top
  if (pt) {
    if (typeof pt === 'string') paddingTop = pt;
    if (typeof pt === 'number') paddingTop = `${pt}px`;
  }
  // padding bottom
  if (pb) {
    if (typeof pb === 'string') paddingBottom = pb;
    if (typeof pb === 'number') paddingBottom = `${pb}px`;
  }
  // padding left
  if (pl) {
    if (typeof pl === 'string') paddingLeft = pl;
    if (typeof pl === 'number') paddingLeft = `${pl}px`;
  }
  // padding right
  if (pr) {
    if (typeof pr === 'string') paddingRight = pr;
    if (typeof pr === 'number') paddingRight = `${pr}px`;
  }
  // padding X
  if (px) {
    if (typeof px === 'string') {
      paddingTop = px;
      paddingBottom = px;
    }
    if (typeof px === 'number') {
      paddingTop = `${px}px`;
      paddingBottom = `${px}px`;
    }
  }
  // padding Y
  if (py) {
    if (typeof py === 'string') {
      paddingLeft = py;
      paddingRight = py;
    }
    if (typeof py === 'number') {
      paddingLeft = `${py}px`;
      paddingRight = `${py}px`;
    }
  }

  return `
  ${padding ? `padding: ${padding};` : ''}
  ${paddingTop ? `padding-top: ${paddingTop};` : ''}
  ${paddingBottom ? `padding-bottom: ${paddingBottom};` : ''}
  ${paddingLeft ? `padding-left: ${paddingLeft};` : ''}
  ${paddingRight ? `padding-right: ${paddingRight};` : ''}
  `;
};
