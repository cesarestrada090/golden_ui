import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ContratoService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_CONTRATO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_CONTRATO_PATH,{params:queryParams});
  }

  public save( razonSocial : string, fechaInicio : Date, fechaFin : Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_CONTRATO_PATH,{
      'nombre': razonSocial,
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin
    },{ headers: headers});
  }

  public update(id : string , razonSocial : string, fechaInicio : Date, fechaFin : Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_CONTRATO_PATH+'/'+id,
      {
        'id': id,
        'nombre': razonSocial,
        'fechaInicio': fechaInicio,
        'fechaFin': fechaFin
      },{ headers: headers});
  }
}
