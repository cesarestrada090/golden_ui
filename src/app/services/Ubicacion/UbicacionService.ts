import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class UbicacionService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_UBICACION_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_UBICACION_PATH,{params:queryParams});
  }

  public save( nombre : string,
               direccion : string,
               ciudad : string,
               provincia : string,
               departamento : string ){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_UBICACION_PATH,{
      'nombre': nombre,
      'direccion': direccion,
      'ciudad': ciudad,
      'provincia': provincia,
      'departamento': departamento
    },{ headers: headers});
  }

  public update(id : string ,
                nombre : string,
                direccion : string,
                ciudad : string,
                provincia : string,
                departamento : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_UBICACION_PATH+'/'+id,
      {
        'id': id,
        'nombre': nombre,
        'direccion': direccion,
        'ciudad': ciudad,
        'provincia': provincia,
        'departamento': departamento
      },{ headers: headers});
  }
}
