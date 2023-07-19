import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {EstadoProveedorService} from "../../../services/EstadoProveedor/EstadoProveedorService";

@Component({
  selector: 'estado-proveedor-table',
  templateUrl: './estado-proveedor.component.html',
  styleUrls: ['./estado-proveedor.component.scss'],
})
export class EstadoProveedorComponent {
  idForm: string = '';
  nombreEstado: string = '';
  mantenedor: string = "Estado Proveedor Servicio";
  responseListName: string = "estados";
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

  constructor(private service: SmartTableData,private estadoProveedorService : EstadoProveedorService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.estadoProveedorService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_ESTADO_PROVEEDOR_PATH, //full-url-for-endpoint without any query strings
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
      console.log(error);
    };
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
      this.estadoProveedorService.save(this.nombreEstado).subscribe((data: any[]) => {
        this.estadoProveedorService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.estadoProveedorService.update(this.idForm , this.nombreEstado).subscribe((data: any[]) => {
        this.estadoProveedorService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    }
  }

  cleanForm(){
    this.idForm = '';
    this.nombreEstado = '';
  }
}
