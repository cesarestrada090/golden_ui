import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class EstadoContractualService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_ESTADO_CONTRACTUAL_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_ESTADO_CONTRACTUAL_PATH,{params:queryParams});
  }

  public save(estado : string, descripcion : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_ESTADO_CONTRACTUAL_PATH,{ 'estado': estado, 'descripcion': descripcion},{ headers: headers});
  }

  public update(id : string , estado : string, descripcion : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_ESTADO_CONTRACTUAL_PATH+'/'+id,{ 'id': id,'estado': estado, 'descripcion': descripcion },{ headers: headers});
  }
}
