class Routes {
  private ROOT_AUTH: string = '/auth';
  private ROOT_ERROR: string = '/error';

  private createPath(root: string, subLink: string): string {
    return `${root}${subLink}`;
  }

  public home() {
    return {
      home: '/',
    };
  }

  public auth() {
    const root = this.ROOT_AUTH;
    return {
      login: this.createPath(root, '/login'),
      registration: this.createPath(root, '/registration'),
    };
  }
  
  public error() {
    const root = this.ROOT_ERROR;
    return {
      '404': this.createPath(root, '/404'),
    };
  }
}

const routes = new Routes();

export const routesHome = routes.home();
export const routesAuth = routes.auth();
export const routesError = routes.error();
