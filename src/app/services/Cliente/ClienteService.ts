import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ClienteService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_CLIENTE_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_CLIENTE_PATH,{params:queryParams});
  }

  public save( razonSocial : string, ruc : string, contratoId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_CLIENTE_PATH,{
      'razonSocial': razonSocial,
      'ruc': ruc,
      'contratoId': contratoId
    },{ headers: headers});
  }

  public update(id : string , razonSocial : string, ruc : string, contratoId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_CLIENTE_PATH+'/'+id,
      {
        'id': id,
        'razonSocial': razonSocial,
        'ruc': ruc,
        'contratoId': contratoId
      },{ headers: headers});
  }
}