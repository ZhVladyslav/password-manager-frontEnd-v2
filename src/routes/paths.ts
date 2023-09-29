class Routes {
  private ROOT_AUTH: string;
  private ROOT_USER: string;
  private ROOT_DATA: string;
  private ROOT_ROLE: string;
  private ROOT_ERROR: string;

  constructor() {
    this.ROOT_AUTH = '/auth';
    this.ROOT_USER = '/user';
    this.ROOT_DATA = '/data';
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
      VIEW: this.createPath(root, '/view'),
      SETTINGS: this.createPath(root, '/settings'),
    };
  }

  public data() {
    const root = this.ROOT_DATA;
    return {
      DECRYPT: this.createPath(root, '/decrypt'),
      VIEW: this.createPath(root, '/view'),
      EDIT: this.createPath(root, '/edit'),
      LIST: this.createPath(root, '/list'),
    };
  }

  public role() {
    const root = this.ROOT_ROLE;
    return {
      VIEW: this.createPath(root, '/view'),
      EDIT: this.createPath(root, '/edit'),
      LIST: this.createPath(root, '/list'),
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
export const PATH_DATA = routes.data();
export const ROOT_ROLE = routes.role();
export const PATH_ERROR = routes.error();
