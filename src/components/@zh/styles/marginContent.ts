export interface IMarginContent {
  mContent?: string | number;
  mtContent?: string | number;
  mbContent?: string | number;
  mlContent?: string | number;
  mrContent?: string | number;
  mxContent?: string | number;
  myContent?: string | number;
}

// ----------------------------------------------------------------------

export const marginContentStyle = ({
  mContent,
  mbContent,
  mlContent,
  mrContent,
  mtContent,
  mxContent,
  myContent,
}: IMarginContent) => {
  let margin: string | undefined = undefined;
  let marginTop: string | undefined = undefined;
  let marginBottom: string | undefined = undefined;
  let marginLeft: string | undefined = undefined;
  let marginRight: string | undefined = undefined;

  // margin
  if (mContent) {
    if (typeof mContent === 'string') margin = mContent;
    if (typeof mContent === 'number') margin = `${mContent}px`;
  }
  // margin top
  if (mtContent) {
    if (typeof mtContent === 'string') marginTop = mtContent;
    if (typeof mtContent === 'number') marginTop = `${mtContent}px`;
  }
  // margin bottom
  if (mbContent) {
    if (typeof mbContent === 'string') marginBottom = mbContent;
    if (typeof mbContent === 'number') marginBottom = `${mbContent}px`;
  }
  // margin left
  if (mlContent) {
    if (typeof mlContent === 'string') marginLeft = mlContent;
    if (typeof mlContent === 'number') marginLeft = `${mlContent}px`;
  }
  // margin right
  if (mrContent) {
    if (typeof mrContent === 'string') marginRight = mrContent;
    if (typeof mrContent === 'number') marginRight = `${mrContent}px`;
  }
  // margin X
  if (mxContent) {
    if (typeof mxContent === 'string') {
      marginLeft = mxContent;
      marginRight = mxContent;
    }
    if (typeof mxContent === 'number') {
      marginLeft = `${mxContent}px`;
      marginRight = `${mxContent}px`;
    }
  }
  // margin Y
  if (myContent) {
    if (typeof myContent === 'string') {
      marginTop = myContent;
      marginBottom = myContent;
    }
    if (typeof myContent === 'number') {
      marginTop = `${myContent}px`;
      marginBottom = `${myContent}px`;
    }
  }

  return `
  & > * {
  ${margin ? `margin: ${margin};` : ''}
  ${marginTop ? `margin-top: ${marginTop};` : ''}
  ${marginBottom ? `margin-bottom: ${marginBottom};` : ''}
  ${marginLeft ? `margin-left: ${marginLeft};` : ''}
  ${marginRight ? `margin-right: ${marginRight};` : ''}
  }`;
};
