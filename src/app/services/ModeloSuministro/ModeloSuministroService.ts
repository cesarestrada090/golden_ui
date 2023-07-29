import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ModeloSuministroService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_MODELO_SUMINISTRO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_MODELO_SUMINISTRO_PATH,{params:queryParams});
  }

  public save(modeloId : number,
              suministroId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_MODELO_SUMINISTRO_PATH,{
      'modeloId': modeloId,
      'suministroId': suministroId
    },{ headers: headers});
  }

  public update(modeloId : number,
                suministroId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_MODELO_SUMINISTRO_PATH+'/'+modeloId+'/'+suministroId,
      {
        'modeloId': modeloId,
        'suministroId': suministroId
      },{ headers: headers});
  }
}
