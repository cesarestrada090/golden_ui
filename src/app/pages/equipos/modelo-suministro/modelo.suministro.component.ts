import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {ModeloService} from "../../../services/Modelo/ModeloService";
import {ModeloSuministroService} from "../../../services/ModeloSuministro/ModeloSuministroService";
import {SuministroService} from "../../../services/Suministro/SuministroService";

@Component({
  selector: 'modelo-suministro-table',
  templateUrl: './modelo.suministro.component.html',
  styleUrls: ['./modelo.suministro.component.scss'],
})
export class ModeloSuministroComponent {
  idForm: string = '';

  //cbo
  modeloCbo: any[];
  suministroCbo: any[];

  //cbo ids
  modeloId:number;
  suministroId:number;

  mantenedor: string = "Modelos y Suministros";
  responseListName: string = "modeloSuministros";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeSuministroId(event){
    this.suministroId = event;
  }

  changeModelo(event){
    this.modeloId = event;
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
      deleteButtonContent: '<i class="nb-power"></i>',
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
      codigoModelo: {
        title: 'Nombre Modelo',
        type: 'string',
        filter: false
      },
      codigoSuministro: {
        title: 'Nombre Suministro',
        type: 'string',
        filter: false
      },
      estado: {
        title: 'Estado Relación',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell: any, row: any) =>{
          if(cell === 1){
            return 'Activo';
          }
          return 'Inactivo';
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private modeloSuministroService: ModeloSuministroService,
              private modeloService : ModeloService,
              private suministroService : SuministroService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.suministroService.sendGetRequest().subscribe((data: any[]) => {
      this.suministroCbo = data['suministros'];
    });
    this.modeloService.sendGetRequest().subscribe((data: any[]) => {
      this.modeloCbo = data['modelos'];
    });
  }

  private loadInitialData() {


    this.modeloSuministroService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_MODELO_SUMINISTRO_PATH,
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm(ServiceConstants.GET_UPDATE_STATUS_CONFIRM_MESSAGE)) {
        this.modeloSuministroService.update(event.data.modeloId,event.data.suministroId).subscribe((data: any[]) => {
          this.modeloSuministroService.sendGetRequest().subscribe((data: any[]) => {
            this.source.load(data[this.responseListName]);
            this.mostrarNotificacionGrabado()
          })
        },this.manejarErrorSave());
    } else {
      event.confirm.reject();
    }
  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.modeloId = event.data.modeloId;
    this.suministroId = event.data.suministroId;
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
    return !this.modeloId || !this.suministroId;
  }

  saveButton(){
    this.modeloSuministroService.save(this.modeloId,this.suministroId).subscribe((data: any[]) => {
      this.modeloSuministroService.sendGetRequest().subscribe((data: any[]) => {
        this.source.load(data[this.responseListName]);
        this.mostrarNotificacionGrabado()
      })
    },this.manejarErrorSave());
  }

  private manejarErrorSave() {
    return error => {
      window.alert('La relación ya existe, por favor ingrese otros valores') ;
      console.log(error);
    };
  }

  cleanForm(){
    this.idForm = '';
    this.modeloId = null;
    this.suministroId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
