import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {UbicacionEquipolService} from "../../../services/UbicacionEquipo/UbicacionEquipolService";
import {EstadoContractualService} from "../../../services/EstadoContractual/EstadoContractualService";

@Component({
  selector: 'estado-contratual-table',
  templateUrl: './estado-contractual.component.html',
  styleUrls: ['./estado-contractual.component.scss'],
})
export class EstadoContractualComponent {
  idForm: string = '';
  estado: string = '';
  descripcion: string = '';
  mantenedor: string = "Estados Contractuales";
  responseListName: string = "estadosContractuales";
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
        title: 'Ubicacion',
        type: 'string',
        filter: false
      },
      descripcion: {
        title: 'Descripción',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private estadoContractualService : EstadoContractualService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {


    this.estadoContractualService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_ESTADO_CONTRACTUAL_PATH, //full-url-for-endpoint without any query strings
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm(ServiceConstants.GET_DELETE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.estado = event.data.estado;
    this.descripcion = event.data.descripcion;
  }

  onCreate(event): void {
    if (window.confirm(ServiceConstants.GET_SAVE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getOperacion(): string {
    return this.idForm === '' ? 'Crear' : 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return this.estado === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.estadoContractualService.save(this.estado,this.descripcion).subscribe((data: any[]) => {
        this.estadoContractualService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.estadoContractualService.update(this.idForm , this.estado,this.descripcion).subscribe((data: any[]) => {
        this.estadoContractualService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    }
  }

  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
      console.log(error);
    };
  }

  cleanForm(){
    this.idForm = '';
    this.estado = '';
    this.descripcion = '';
  }
}
