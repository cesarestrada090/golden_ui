export class ServiceConstants {

  //Server Constant
  public static get GET_API_HOST(){
    return 'http://localhost';
  }

  public static get GET_PORT() : string {
    return ':8081';
  }

  public static get GET_ROOT_PATH() : string {
    return '/app';
  }
  public static get GET_API_PATH() : string {
    return this.GET_API_HOST + this.GET_PORT + this.GET_ROOT_PATH;
  }

  // Domain Paths
  public static get GET_TIPO_MODELO_PATH() : string {
    return this.GET_API_PATH + '/tipoModelo';
  }

}
