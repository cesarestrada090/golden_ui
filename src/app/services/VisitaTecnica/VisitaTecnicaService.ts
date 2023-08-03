import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class VisitaTecnicaService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_VISITA_TECNICA_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_VISITA_TECNICA_PATH,{params:queryParams});
  }

  public sendGetRequestById(id: number){
    return this.httpClient.get(ServiceConstants.GET_VISITA_TECNICA_PATH + '/'+id);
  }


  public save(casoTecnicoId : number,
              estadoId : number,
              fechaCreacion: Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_VISITA_TECNICA_PATH,{
      'casoTecnicoId': casoTecnicoId,
      'estadoId': estadoId,
      'fechaCreacion': fechaCreacion,
      'fechaModificacion': new Date()
    },{ headers: headers});
  }

  public update(id : string ,
                casoTecnicoId : number,
                estadoId : number,
                fechaCreacion: Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_VISITA_TECNICA_PATH+'/'+id,
      {
        'id': id,
        'casoTecnicoId': casoTecnicoId,
        'estadoId': estadoId,
        'fechaCreacion': fechaCreacion,
        'fechaModificacion': new Date()
      },{ headers: headers});
  }
}
