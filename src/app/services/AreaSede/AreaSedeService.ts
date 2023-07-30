import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class AreaSedeService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_AREA_SEDE_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_AREA_SEDE_PATH,{params:queryParams});
  }

  public save(areaId : number,
              sedeId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_AREA_SEDE_PATH,{
      'areaId': areaId,
      'sedeId': sedeId
    },{ headers: headers});
  }

  public update(areaId : number,
                sedeId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_AREA_SEDE_PATH+'/'+areaId+'/'+sedeId,
      {
        'areaId': areaId,
        'sedeId': sedeId
      },{ headers: headers});
  }
}
