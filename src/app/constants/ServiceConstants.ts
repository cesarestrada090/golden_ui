import {NbGlobalPhysicalPosition} from "@nebular/theme";

export class ServiceConstants {

  //Server Constant
  public static get GET_API_HOST(){
    return 'http://localhost';
  }

  public static get GET_PORT() : string {
    return ':8080';
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
  public static get GET_ESTADO_EQUIPO_PATH() : string {
    return this.GET_API_PATH + '/estadoEquipo';
  }

  public static get GET_CASO_TECNICO_PATH() : string {
    return this.GET_API_PATH + '/estadoCasoTecnico';
  }
  public static get GET_ESTADO_PROVEEDOR_PATH() : string {
    return this.GET_API_PATH + '/estadoProveedorServicio';
  }
  public static get GET_ESTADO_SEDE_PATH() : string {
    return this.GET_API_PATH + '/estadoSede';
  }
  public static get GET_ESTADO_SUMINISTRO_PATH() : string {
    return this.GET_API_PATH + '/estadoSuministro';
  }

  public static get GET_ESTADO_DETALLE_PATH() : string {
    return this.GET_API_PATH + '/estadoDetalleVisita';
  }
  public static get GET_TIPO_SUMINISTRO_PATH() : string {
    return this.GET_API_PATH + '/tipoSuministro';
  }


  // CONFIGURATION

  public static get GET_AREA_PATH() : string {
    return this.GET_API_PATH + '/area';
  }

  public static get GET_CONTRATO_PATH() : string {
    return this.GET_API_PATH + '/contrato';
  }


  public static get GET_DELETE_CONFIRM_MESSAGE() : string {
    return '¿Confirma que desea eliminar este registro?';
  }

  public static get GET_SAVE_CONFIRM_MESSAGE() : string {
    return '¿Confirma que desea grabar este registro?';
  }

  public static get GET_SAVE_NOTIFICATION_MESSAGE() : string {
    return 'Grabado Correctamente';
  }

  public static get SAVE_TOAST_CONFIG()  {
    return {
      status: 'success',
      duration: 3000,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true
    };
  };
}
