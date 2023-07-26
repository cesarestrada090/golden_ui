import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class HardwareService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_HARDWARE_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_HARDWARE_PATH,{params:queryParams});
  }

  public save
  (     bandejas : string,
        conectividad : string,
        procesador : string,
        disco : string,
        memoria : string,
        impresionVelocidad : string,
        impresionResolucion : string,
        scannerTipo : string,
        scannerResolucion : string,
        scannerVelocidad : string,
        copiaResolucion : string,
        copiaVelocidad : string ){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_HARDWARE_PATH,{
      'bandejas': bandejas,
      'conectividad': conectividad,
      'procesador': procesador,
      'disco': disco,
      'memoria': memoria,
      'impresionVelocidad': impresionVelocidad,
      'impresionResolucion': impresionResolucion,
      'scanerTipo': scannerTipo,
      'scanerResolucion': scannerResolucion,
      'scanerVelocidad': scannerVelocidad,
      'copiaResolucion': copiaResolucion,
      'copiaVelocidad': copiaVelocidad
    },{ headers: headers});
  }

  public update(id : string ,
                bandejas : string,
                conectividad : string,
                procesador : string,
                disco : string,
                memoria : string,
                impresionVelocidad : string,
                impresionResolucion : string,
                scannerTipo : string,
                scannerResolucion : string,
                scannerVelocidad : string,
                copiaResolucion : string,
                copiaVelocidad : string
                ){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_HARDWARE_PATH+'/'+id,
      {
        'id': id,
        'bandejas': bandejas,
        'conectividad': conectividad,
        'procesador': procesador,
        'disco': disco,
        'memoria': memoria,
        'impresionVelocidad': impresionVelocidad,
        'impresionResolucion': impresionResolucion,
        'scanerTipo': scannerTipo,
        'scanerResolucion': scannerResolucion,
        'scanerVelocidad': scannerVelocidad,
        'copiaResolucion': copiaResolucion,
        'copiaVelocidad': copiaVelocidad
      },{ headers: headers});
  }
}
