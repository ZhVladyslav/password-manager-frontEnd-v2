const path = (root: string, sublink: string): string => {
  return `${root}${sublink}`;
};

// ----------------------------------------------------------------------

const ROOT_MAIN = '';
const ROOT_AUTH = '/auth';
const ROOT_COLLECTION = '/collection';
const ROOT_ERROR = '/error';

// ----------------------------------------------------------------------

export const PATH_MAIN = {
  home: path(ROOT_COLLECTION, '/list'),
};

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: path(ROOT_AUTH, '/login'),
  registration: path(ROOT_AUTH, '/registration'),
};

// ----------------------------------------------------------------------

export const PATH_COLLECTION = {
  list: path(ROOT_COLLECTION, '/list'),
  view: path(ROOT_COLLECTION, '/view'),
  create: path(ROOT_COLLECTION, '/create'),
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
