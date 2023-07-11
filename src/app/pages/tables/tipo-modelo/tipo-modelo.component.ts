import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TipoModeloService} from "../../../services/TipoModelo/TipoModeloService";
import {ServiceConstants} from "../../../constants/ServiceConstants";

@Component({
  selector: 'tipo-modelo-table',
  templateUrl: './tipo-modelo.component.html',
  styleUrls: ['./tipo-modelo.component.scss'],
})
export class TipoModeloComponent {
  idForm: string = '';
  nombreForm: string = '';
  mantenedor: string = "Tipo Modelo";

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true // set to false if no need for pagination
    },
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: true,
      custom: [],
      position: 'left',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private tipoModeloService : TipoModeloService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {


    this.tipoModeloService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_TIPO_MODELO_PATH, //full-url-for-endpoint without any query strings
          dataKey: 'tipoModelos',
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  onDeleteConfirm(event): void {
    console.log('sss');
    if (window.confirm('¿Confirma que desea eliminar este registro?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSelectRow(event): void {
    console.log(event);
    this.idForm = event.data.id;
    this.nombreForm = event.data.nombre;
  }

  onCreate(event): void {
    if (window.confirm('¿Confirma que desea grabar este registro?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getOperacion(): string {
    return this.idForm === '' ? 'Grabar' : 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return this.nombreForm === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.tipoModeloService.saveTipoModelo(this.nombreForm).subscribe((data: any[]) => {
        this.tipoModeloService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data['tipoModelos']);
        })
      });
    } else {
      this.tipoModeloService.updateTipoModelo(this.idForm , this.nombreForm).subscribe((data: any[]) => {
        this.tipoModeloService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data['tipoModelos']);
        })
      });
    }
  }

  cleanForm(){
    this.idForm = '';
    this.nombreForm = '';
  }
}
