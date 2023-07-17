import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TipoModeloService} from "../../../services/TipoModelo/TipoModeloService";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {EstadoEquipoService} from "../../../services/EstadoEquipo/EstadoEquipoService";

@Component({
  selector: 'estado-equipo-table',
  templateUrl: './estado-equipo.component.html',
  styleUrls: ['./estado-equipo.component.scss'],
})
export class EstadoEquipoComponent {
  idForm: string = '';
  nombreEstado: string = '';
  mantenedor: string = "Estado Equipo";
  responseListName: string = "estadoEquipos";
  placeholder: string = 'Nombre ' + this.mantenedor;

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
      delete: false,
      custom: [],
      position: 'left',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      estado: {
        title: 'Estado',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private estadoEquipoService : EstadoEquipoService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {


    this.estadoEquipoService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_ESTADO_EQUIPO_PATH, //full-url-for-endpoint without any query strings
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  onDeleteConfirm(event): void {
    console.log('sss');
    if (window.confirm(ServiceConstants.GET_DELETE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.nombreEstado = event.data.estado;
  }

  onCreate(event): void {
    if (window.confirm(ServiceConstants.GET_SAVE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getOperacion(): string {
    return this.idForm === '' ? 'Grabar' : 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return this.nombreEstado === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.estadoEquipoService.save(this.nombreEstado).subscribe((data: any[]) => {
        this.estadoEquipoService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      });
    } else {
      this.estadoEquipoService.update(this.idForm , this.nombreEstado).subscribe((data: any[]) => {
        this.estadoEquipoService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      });
    }
  }

  cleanForm(){
    this.idForm = '';
    this.nombreEstado = '';
  }
}
