import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class EquipoService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_EQUIPO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_EQUIPO_PATH,{params:queryParams});
  }

  public save(
        serie : string,
        modeloId : number,
        estadoId : number,
        sedeId : number,
        areaId : number,
        clienteId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_EQUIPO_PATH,{
      'serie': serie,
      'modeloId': modeloId,
      'estadoId': estadoId,
      'sedeId': sedeId,
      'areaId': areaId,
      'clienteId': clienteId
    },{ headers: headers});
  }

  public update(id : string ,
                serie : string,
                modeloId : number,
                estadoId : number,
                sedeId : number,
                areaId : number,
                clienteId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_EQUIPO_PATH+'/'+id,
      {
        'id': id,
        'serie': serie,
        'modeloId': modeloId,
        'estadoId': estadoId,
        'sedeId': sedeId,
        'areaId': areaId,
        'clienteId': clienteId
      },{ headers: headers});
  }
}
