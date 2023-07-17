import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class AreaService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_AREA_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_AREA_PATH,{params:queryParams});
  }

  public save(nombre : string, ceco : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_AREA_PATH,{ 'nombre': nombre, 'ceco': ceco},{ headers: headers});
  }

  public update(id : string , nombre : string, ceco : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_AREA_PATH+'/'+id,{ 'id': id,'nombre': nombre, 'ceco': ceco },{ headers: headers});
  }
}
