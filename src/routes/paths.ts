class Routes {
  private ROOT_AUTH: string;
  private ROOT_DATA: string;
  private ROOT_ERROR: string;

  constructor() {
    this.ROOT_AUTH = '/auth';
    this.ROOT_DATA = '/data';
    this.ROOT_ERROR = '/error';
  }

  private createPath(root: string, subLink: string): string {
    return `${root}${subLink}`;
  }

  public home() {
    return {
      HOME: '/',
    };
  }

  public data() {
    const root = this.ROOT_DATA;
    return {
      VIEW: (id: string) => this.createPath(root, `/view/${id}`),
      CREATE: this.createPath(root, '/create'),
      LIST: this.createPath(root, '/list'),
    };
  }

  public auth() {
    const root = this.ROOT_AUTH;
    return {
      LOGIN: this.createPath(root, '/login'),
      REGISTRATION: this.createPath(root, '/registration'),
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
export const PATH_DATA = routes.data();
export const PATH_AUTH = routes.auth();
export const PATH_ERROR = routes.error();
