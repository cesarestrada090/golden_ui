import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {TipoSuministroService} from "../../../services/TipoSuministro/TipoSuministroService";

@Component({
  selector: 'tipo-suministro-table',
  templateUrl: './tipo-suministro.component.html',
  styleUrls: ['./tipo-suministro.component.scss'],
})
export class TipoSuministroComponent {
  idForm: string = '';
  nombreForm: string = '';
  color: string = '';
  mantenedor: string = "Tipo Suministro";
  responseListName: string = "tipoSuministros";
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
      color: {
        title: 'Color',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private tipoSuministroService : TipoSuministroService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {


    this.tipoSuministroService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_TIPO_SUMINISTRO_PATH, //full-url-for-endpoint without any query strings
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
    console.log(event);
    this.idForm = event.data.id;
    this.nombreForm = event.data.nombre;
    this.color = event.data.color;
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
    return this.nombreForm === '' || this.color === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.tipoSuministroService.saveTipoSuministro(this.nombreForm, this.color).subscribe((data: any[]) => {
        this.tipoSuministroService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.tipoSuministroService.updateTipoSuministro(this.idForm , this.nombreForm, this.color).subscribe((data: any[]) => {
        this.tipoSuministroService.sendGetRequest().subscribe((data: any[]) => {
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
    this.nombreForm = '';
    this.color = '';
  }
}
