export interface IFontSize {
  fontSize?:
    | '0.625rem' // 10px
    | '0.75rem' // 12px
    | '0.875rem' // 14px
    | '1rem' // 16px
    | '1.125rem' // 18px
    | '1.25rem' // 20px
    | '1.375rem' // 22px
    | '1.5rem' // 24px
    | '1.625rem' // 26px
    | '1.75rem' // 28px
    | '1.875rem' // 30px
    | '2rem'; // 32px
}

export const fontSize = (props: IFontSize) => {
  if (!props.fontSize) return '';

  return `font-size: ${props.fontSize};`;
};
