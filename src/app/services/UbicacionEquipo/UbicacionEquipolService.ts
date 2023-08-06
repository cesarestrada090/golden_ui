import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class UbicacionEquipolService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_UBICACION_EQUIPO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_UBICACION_EQUIPO_PATH,{params:queryParams});
  }

  public save(ubicacion : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_UBICACION_EQUIPO_PATH,{ 'ubicacion': ubicacion},{ headers: headers});
  }

  public update(id : string , ubicacion : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_UBICACION_EQUIPO_PATH+'/'+id,{ 'id': id,'ubicacion': ubicacion },{ headers: headers});
  }
}
