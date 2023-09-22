class Routes {
  private ROOT_AUTH: string;
  private ROOT_ERROR: string;

  constructor() {
    this.ROOT_AUTH = '/auth';
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
export const PATH_AUTH = routes.auth();
export const PATH_ERROR = routes.error();
