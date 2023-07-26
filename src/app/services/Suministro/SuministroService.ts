import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class SuministroService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_SUMINISTRO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_SUMINISTRO_PATH,{params:queryParams});
  }

  public save(
               capacidad : string,
               descripcion : string,
               modelo : string,
               estadoId : number,
               tipoSuministroId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_SUMINISTRO_PATH,{
      'capacidad': capacidad,
      'descripcion': descripcion,
      'modelo': modelo,
      'estadoId': estadoId,
      'tipoSuministroId': tipoSuministroId
    },{ headers: headers});
  }

  public update(id : string ,
                capacidad : string,
                descripcion : string,
                modelo : string,
                estadoId : number,
                tipoSuministroId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_SUMINISTRO_PATH+'/'+id,
      {
        'id': id,
        'capacidad': capacidad,
        'descripcion': descripcion,
        'modelo': modelo,
        'estadoId': estadoId,
        'tipoSuministroId': tipoSuministroId
      },{ headers: headers});
  }
}
