import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class EstadoSuministroService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_ESTADO_SUMINISTRO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_ESTADO_SUMINISTRO_PATH,{params:queryParams});
  }

  public save(estado : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_ESTADO_SUMINISTRO_PATH,{ 'estado': estado},{ headers: headers});
  }

  public update(id : string , estado : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_ESTADO_SUMINISTRO_PATH+'/'+id,{ 'id': id,'estado': estado},{ headers: headers});
  }
}
