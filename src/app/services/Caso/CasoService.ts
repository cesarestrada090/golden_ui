import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class CasoService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_CASO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_CASO_PATH,{params:queryParams});
  }

  public save(codigo : string,
              tipo : string,
              fecha : Date,
              estadoId : number,
              equipoId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_CASO_PATH,{
      'codigo': codigo,
      'tipo': tipo,
      'fecha': fecha,
      'estadoId': estadoId,
      'equipoId': equipoId
    },{ headers: headers});
  }

  public update(id : string,
                codigo : string,
                tipo : string,
                fecha : Date,
                estadoId : number,
                equipoId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_CASO_PATH+'/'+id,
      {
        'id': id,
        'codigo': codigo,
        'tipo': tipo,
        'fecha': fecha,
        'estadoId': estadoId,
        'equipoId': equipoId
      },{ headers: headers});
  }
}
