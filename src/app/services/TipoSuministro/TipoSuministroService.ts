import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {SmartTableData} from "../../@core/data/smart-table";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class TipoSuministroService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_TIPO_SUMINISTRO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_TIPO_SUMINISTRO_PATH,{params:queryParams});
  }

  public saveTipoSuministro(nombre : string, color : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_TIPO_SUMINISTRO_PATH,{ 'nombre': nombre,'color': color},{ headers: headers});
  }

  public updateTipoSuministro(id : string , nombre : string, color : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_TIPO_SUMINISTRO_PATH+'/'+id,{ 'id': id,'nombre': nombre,'color': color},{ headers: headers});
  }
}
