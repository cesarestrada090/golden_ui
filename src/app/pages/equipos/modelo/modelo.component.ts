import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {ModeloService} from "../../../services/Modelo/ModeloService";
import {HardwareService} from "../../../services/Hardware/HardwareService";
import {TipoModeloService} from "../../../services/TipoModelo/TipoModeloService";

@Component({
  selector: 'modelo-table',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss'],
})
export class ModeloComponent {
  idForm: string = '';
  codigo: string = '';
  nombreModelo: string = '';
  volumenMinimo: string = '';
  volumenMaximo: string = '';

  //cbo
  tipoModeloCbo: any[];
  hardwareCbo: any[];

  //cbo ids
  tipoModeloId:number;
  hardwareId:number;

  mantenedor: string = "Modelo";
  responseListName: string = "modelos";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeHardware(event){
    this.hardwareId = event;
  }

  changeTipoModelo(event){
    this.tipoModeloId = event;
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
      codigoModelo: {
        title: 'Codigo Modelo',
        type: 'string',
        filter: false
      },
      nombreModelo: {
        title: 'Nombre Modelo',
        type: 'string',
        filter: false
      },
      nombreTipoModelo: {
        title: 'Tipo Modelo',
        type: 'string',
        filter: false
      },
      nombreHardware: {
        title: 'Nombre Hardware',
        type: 'string',
        filter: false
      },
      volumenMensualMinimo: {
        title: 'Volumen Mensual Mínimo',
        type: 'string',
        filter: false
      },
      volumenMensualMaximo: {
        title: 'Volumen Mensual Máximo',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private modeloService: ModeloService,
              private hardwareService : HardwareService,
              private tipoModeloService : TipoModeloService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.tipoModeloService.sendGetRequest().subscribe((data: any[]) => {
      this.tipoModeloCbo = data['tipoModelos'];
    });
    this.hardwareService.sendGetRequest().subscribe((data: any[]) => {
      this.hardwareCbo = data['hardwareModelos'];
    });
  }

  private loadInitialData() {


    this.modeloService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_MODELO_PATH, //full-url-for-endpoint without any query strings
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
    this.nombreModelo = event.data.nombreModelo;
    this.codigo = event.data.codigoModelo;
    this.volumenMaximo = event.data.volumenMensualMaximo;
    this.volumenMinimo = event.data.volumenMensualMinimo;
    this.tipoModeloId = event.data.tipoModeloId;
    this.hardwareId = event.data.hardwareModeloId;
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
    return this.nombreModelo === '' || this.codigo === '' || this.volumenMaximo === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.modeloService.save(this.codigo,this.nombreModelo,this.volumenMinimo,this.volumenMaximo,this.tipoModeloId,this.hardwareId).subscribe((data: any[]) => {
        this.modeloService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.modeloService.update(this.idForm, this.codigo,this.nombreModelo,this.volumenMinimo,this.volumenMaximo,this.tipoModeloId,this.hardwareId).subscribe((data: any[]) => {
        this.modeloService.sendGetRequest().subscribe((data: any[]) => {
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
    this.nombreModelo = '';
    this.volumenMaximo = '';
    this.volumenMinimo = '';
    this.codigo = '';
    this.tipoModeloId = null;
    this.hardwareId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
