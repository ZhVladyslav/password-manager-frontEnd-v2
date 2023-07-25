const path = (root: string, subLink: string): string => {
  return `${root}${subLink}`;
};

// ----------------------------------------------------------------------

const ROOT_AUTH = '/auth';
const ROOT_COLLECTION = '/collection';
const ROOT_ERROR = '/error';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: path(ROOT_AUTH, '/login'),
  registration: path(ROOT_AUTH, '/registration'),
};

// ----------------------------------------------------------------------

export const PATH_COLLECTION = {
  view: path(ROOT_COLLECTION, '/view'),
};

// ----------------------------------------------------------------------

export const PATH_ERROR = {
  error400: path(ROOT_ERROR, '/400'),
  error401: path(ROOT_ERROR, '/401'),
  error403: path(ROOT_ERROR, '/403'),
  error404: path(ROOT_ERROR, '/404'),
  error500: path(ROOT_ERROR, '/500'),
};

// ----------------------------------------------------------------------
