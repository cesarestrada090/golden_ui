import {Injectable, OnInit} from '@angular/core';
import { SmartTableData } from '../data/smart-table';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SmartTableService extends SmartTableData{

  private GET_REST_API_SERVER = "http://localhost:8081/app/tipoModelo";

  constructor(private httpClient: HttpClient) {
    super();
  }


  public sendGetRequest(){
    return this.httpClient.get(this.GET_REST_API_SERVER);
  }

  data = [{
    id: 1,
    firstName: 'Mark',
    nombre: 'Otto',
    username: '@mdo',
    email: 'mdo@gmail.com',
    age: '28',
  }];

  getData(): any[] {
    this.sendGetRequest().subscribe((data: any[])=>{
       return this.data = data['tipoModelos'];
    })
    return this.data;
  }
}
