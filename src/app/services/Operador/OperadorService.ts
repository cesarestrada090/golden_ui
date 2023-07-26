import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class OperadorService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_OPERADOR_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_OPERADOR_PATH,{params:queryParams});
  }

  public save(nombre : string, celular : string, correo : string, proveedorServicioId: number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_OPERADOR_PATH,{
      'nombre': nombre,
      'celular': celular,
      'correo': correo,
      'proveedorServicioId':proveedorServicioId
    },{ headers: headers});
  }

  public update(id : string , nombre : string, celular : string, correo : string, proveedorServicioId: number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_OPERADOR_PATH+'/'+id,
      { 'id': id,
        'nombre': nombre,
        'celular': celular,
        'correo': correo,
        'proveedorServicioId':proveedorServicioId
      },
      { headers: headers});
  }
}
