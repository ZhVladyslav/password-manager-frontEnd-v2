class Routes {
  private ROOT_AUTH: string;
  private ROOT_USER: string;
  private ROOT_ADMIN: string;
  private ROOT_PASS_COLLECTION: string;
  private ROOT_PASS_COLLECTION_DECRYPT: string;
  private ROOT_ROLE: string;
  private ROOT_ERROR: string;

  constructor() {
    this.ROOT_AUTH = '/auth';
    this.ROOT_USER = '/user';
    this.ROOT_ADMIN = '/admin';
    this.ROOT_PASS_COLLECTION = '/passCollection';
    this.ROOT_PASS_COLLECTION_DECRYPT = '/passCollection-decrypt';
    this.ROOT_ROLE = '/role';
    this.ROOT_ERROR = '/error';
  }

  private createPath(root: string, subLink: string): string {
    return `${root}${subLink}`;
  }

  public auth() {
    const root = this.ROOT_AUTH;
    return {
      LOGIN: this.createPath(root, '/login'),
      REGISTRATION: this.createPath(root, '/registration'),
    };
  }

  public home() {
    return {
      HOME: '/',
    };
  }

  public user() {
    const root = this.ROOT_USER;
    return {
      SETTINGS: this.createPath(root, '/settings'),
      SESSION: this.createPath(root, '/session'),
    };
  }

  public admin() {
    const root = this.ROOT_ADMIN;
    return {
      VIEW_USER_INFO: this.createPath(root, '/view'),
      EDIT_USER: this.createPath(root, '/edit'),
      USER_LIST: this.createPath(root, '/user-list'),
    };
  }

  public passCollection() {
    const root = this.ROOT_PASS_COLLECTION;
    return {
      LIST: this.createPath(root, '/list'),
      CREATE: this.createPath(root, '/create'),
    };
  }

  public passCollectionDecrypt() {
    const root = this.ROOT_PASS_COLLECTION_DECRYPT;
    return {
      DECRYPT: this.createPath(root, '/decrypt'),
      VIEW: this.createPath(root, '/view'),
      EDIT: this.createPath(root, '/edit'),
    };
  }

  public role() {
    const root = this.ROOT_ROLE;
    return {
      VIEW: this.createPath(root, '/view'),
      EDIT: this.createPath(root, '/edit'),
      LIST: this.createPath(root, '/list'),
      CREATE: this.createPath(root, '/create'),
    };
  }

  public error() {
    const root = this.ROOT_ERROR;
    return {
      '403': this.createPath(root, '/403'),
      '404': this.createPath(root, '/404'),
      '500': this.createPath(root, '/500'),
    };
  }
}

const routes = new Routes();

export const PATH_HOME = routes.home();
export const PATH_AUTH = routes.auth();
export const PATH_USER = routes.user();
export const PATH_ADMIN = routes.admin();
export const PATH_PASS_COLLECTION = routes.passCollection();
export const PATH_PASS_COLLECTION_DECRYPT = routes.passCollectionDecrypt();
export const PATH_ROLE = routes.role();
export const PATH_ERROR = routes.error();
