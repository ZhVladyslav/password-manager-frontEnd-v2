export interface IUserSelect {
  userSelect?: 'auto' | 'none';
}

export const userSelect = (props: IUserSelect) => {
  if (!props.userSelect) return '';

  return `user-select: ${props.userSelect};`;
};
