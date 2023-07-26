import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {ClienteService} from "../../../services/Cliente/ClienteService";
import {ContratoService} from "../../../services/Contrato/ContratoService";
import {NbToastrService} from "@nebular/theme";
import {SuministroService} from "../../../services/Suministro/SuministroService";
import {TipoSuministroService} from "../../../services/TipoSuministro/TipoSuministroService";
import {EstadoSuministroService} from "../../../services/EstadoSuministro/EstadoSuministroService";

@Component({
  selector: 'suministro-table',
  templateUrl: './suministro.component.html',
  styleUrls: ['./suministro.component.scss'],
})
export class SuministroComponent {
  idForm: string = '';
  capacidad: string = '';
  descripcion: string = '';
  modelo: string = '';

  //cbo
  estadoSuministroCbo: any[];
  tipoSuministroCbo: any;

  //cbo ids
  tipoSuministroId:number;
  estadoSuministroId:number;

  mantenedor: string = "Suministro";
  responseListName: string = "suministros";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeEstadoSuministro(event){
    this.estadoSuministroId = event;
  }

  changeTipoSuministro(event){
    this.tipoSuministroId = event;
  }

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
      capacidad: {
        title: 'Capacidad',
        type: 'string',
        filter: false
      },
      descripcion: {
        title: 'Descripción',
        type: 'string',
        filter: false
      },
      modelo: {
        title: 'Modelo Suministro',
        type: 'string',
        filter: false
      },
      estadoSuministro: {
        title: 'Estado Suministro',
        type: 'string',
        filter: false
      },
      tipoSuministro: {
        title: 'Tipo Suministro',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private suministroService: SuministroService,
              private tipoSuministroService : TipoSuministroService,
              private estadoSuministroService : EstadoSuministroService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.estadoSuministroService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoSuministroCbo = data['estados'];
    });
    this.tipoSuministroService.sendGetRequest().subscribe((data: any[]) => {
      this.tipoSuministroCbo = data['tipoSuministros'];
    });
  }

  private loadInitialData() {


    this.suministroService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_SUMINISTRO_PATH, //full-url-for-endpoint without any query strings
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
    this.descripcion = event.data.descripcion;
    this.capacidad = event.data.capacidad;
    this.modelo = event.data.modelo;
    this.tipoSuministroId = event.data.tipoSuministroId;
    this.estadoSuministroId = event.data.estadoId;
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
    return this.descripcion === '' || this.capacidad === '' || this.modelo === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.suministroService.save(this.capacidad,this.descripcion,this.modelo,this.estadoSuministroId,this.tipoSuministroId).subscribe((data: any[]) => {
        this.suministroService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.suministroService.update(this.idForm, this.capacidad,this.descripcion,this.modelo,this.estadoSuministroId,this.tipoSuministroId).subscribe((data: any[]) => {
        this.suministroService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
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
    this.descripcion = '';
    this.modelo = '';
    this.capacidad = '';
    this.tipoSuministroId = null;
    this.estadoSuministroId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
