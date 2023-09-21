class Routes {
  private ROOT_AUTH: string = '/auth';
  private ROOT_ERROR: string = '/error';

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
      '404': this.createPath(root, '/404'),
      '403': this.createPath(root, '/403'),
    };
  }
}

const routes = new Routes();

export const PATH_HOME = routes.home();
export const PATH_AUTH = routes.auth();
export const PATH_ERROR = routes.error();
