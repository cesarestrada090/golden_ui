import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ProveedorService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_PROVEEDOR_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_PROVEEDOR_PATH,{params:queryParams});
  }

  public save(  nombre : string, estadoId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_PROVEEDOR_PATH,{
      'nombre': nombre,
      'estadoId': estadoId
    },{ headers: headers});
  }

  public update(id : string , nombre : string, estadoId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_PROVEEDOR_PATH+'/'+id,
      {
        'id': id,
        'nombre': nombre,
        'estadoId': estadoId
      },{ headers: headers});
  }
}
