import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ModeloService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_MODELO_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_MODELO_PATH,{params:queryParams});
  }

  public save(codigoModelo : string,
              nombreModelo : string,
              volumenMensualMinimo : string,
              volumenMensualMaximo : string,
              tipoModeloId : number,
              hardwareModeloId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_MODELO_PATH,{
      'codigoModelo': codigoModelo,
      'nombreModelo': nombreModelo,
      'volumenMensualMinimo': volumenMensualMinimo,
      'volumenMensualMaximo': volumenMensualMaximo,
      'tipoModeloId': tipoModeloId,
      'hardwareModeloId': hardwareModeloId
    },{ headers: headers});
  }

  public update(id : string ,
                codigoModelo : string,
                nombreModelo : string,
                volumenMensualMinimo : string,
                volumenMensualMaximo : string,
                tipoModeloId : number,
                hardwareModeloId : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_MODELO_PATH+'/'+id,
      {
        'id': id,
        'codigoModelo': codigoModelo,
        'nombreModelo': nombreModelo,
        'volumenMensualMinimo': volumenMensualMinimo,
        'volumenMensualMaximo': volumenMensualMaximo,
        'tipoModeloId': tipoModeloId,
        'hardwareModeloId': hardwareModeloId
      },{ headers: headers});
  }
}
