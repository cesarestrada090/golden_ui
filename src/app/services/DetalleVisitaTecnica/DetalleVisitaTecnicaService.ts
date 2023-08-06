import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Time} from "@angular/common";

@Injectable()
export class DetalleVisitaTecnicaService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH);
  }

  public sendGetRequestById(id: number){
    return this.httpClient.get(ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH + '/'+id);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH,{params:queryParams});
  }

  public save(tecnicoId : number,
              operadorId : number,
              visitaTecnicaId : number,
              fecha : Date,
              comentario : string,
              estadoId : number,
              hora: Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH,{
      'tecnicoId': tecnicoId,
      'operadorId': operadorId,
      'visitaTecnicaId': visitaTecnicaId,
      'fecha': fecha,
      'comentario': comentario,
      'estadoId': estadoId,
      'hora': hora
    },{ headers: headers});
  }

  public update(id : string,
                tecnicoId : number,
                operadorId : number,
                visitaTecnicaId : number,
                fecha : Date,
                comentario : string,
                estadoId : number,
                hora: Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH+'/'+id,
      {
        'id': id,
        'tecnicoId': tecnicoId,
        'operadorId': operadorId,
        'visitaTecnicaId': visitaTecnicaId,
        'fecha': fecha,
        'comentario': comentario,
        'estadoId': estadoId,
        'hora': hora
      },{ headers: headers});
  }
}
