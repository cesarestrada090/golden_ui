import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {EstadoCasoTecnicoService} from "../../../services/EstadoCasoTecnico/EstadoCasoTecnicoService";
import {AreaService} from "../../../services/Area/AreaService";

@Component({
  selector: 'area-table',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  idForm: string = '';
  razonSocial: string = '';
  ruc: string = '';
  mantenedor: string = "Área";
  responseListName: string = "areas";
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
      nombre: {
        title: 'Nombre',
        type: 'string',
        filter: false
      },
      ceco: {
        title: 'CECO',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private areaService : AreaService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {


    this.areaService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_AREA_PATH, //full-url-for-endpoint without any query strings
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
    this.razonSocial = event.data.nombre;
    this.ruc = event.data.ceco;
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
    return this.razonSocial === '' || this.ruc === '' ;
  }

  saveButton(){
    if(this.idForm === ''){
      this.areaService.save(this.razonSocial,this.ruc).subscribe((data: any[]) => {
        this.areaService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.areaService.update(this.idForm , this.razonSocial,this.ruc).subscribe((data: any[]) => {
        this.areaService.sendGetRequest().subscribe((data: any[]) => {
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
    this.razonSocial = '';
    this.ruc = '';
  }
}
