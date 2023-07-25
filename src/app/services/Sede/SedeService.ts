import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class SedeService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_SEDE_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_SEDE_PATH,{params:queryParams});
  }

  public save(nombre : string, ubicacionSedeId : number, estadoSedeId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_SEDE_PATH,
      {
        'nombre': nombre,
        'ubicacionSedeId': ubicacionSedeId,
        'estadoId': estadoSedeId,
      },
      { headers: headers});
  }

  public update(id : string , nombre : string, ubicacionSedeId : number, estadoSedeId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_SEDE_PATH+'/'+id,
      { 'id': id,
        'nombre': nombre,
        'ubicacionSedeId': ubicacionSedeId,
        'estadoId': estadoSedeId,
      },
      { headers: headers});
  }
}
