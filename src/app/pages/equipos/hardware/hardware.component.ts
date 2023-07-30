import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {HardwareService} from "../../../services/Hardware/HardwareService";

@Component({
  selector: 'hardware-table',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
})
export class HardwareComponent {
  idForm: string = '';
  nombre: string = '';
  bandejas: string = '';
  conectividad: string = '';
  procesador: string = '';
  disco: string = '';
  memoria: string = '';
  impresionVelocidad: string = '';
  impresionResolucion: string = '';
  scannerTipo: string = '';
  scannerResolucion: string = '';
  scannerVelocidad: string = '';
  copiaResolucion: string = '';
  copiaVelocidad: string = '';

  mantenedor: string = "Hardware Modelo";
  responseListName: string = "hardwareModelos";
  errorMsg: string = '';
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
        title: 'nombre',
        type: 'string',
        filter: false
      },
      bandejas: {
        title: 'Bandejas',
        type: 'string',
        filter: false
      },
      conectividad: {
        title: 'Conectividad',
        type: 'string',
        filter: false
      },
      procesador: {
        title: 'Procesador',
        type: 'string',
        filter: false
      },
      disco: {
        title: 'Disco',
        type: 'string',
        filter: false
      },
      memoria: {
        title: 'Memoria',
        type: 'string',
        filter: false
      },
      impresionVelocidad: {
        title: 'Impresión Velocidad',
        type: 'string',
        filter: false
      },
      impresionResolucion: {
        title: 'Impresión Resolución',
        type: 'string',
        filter: false
      },
      scanerTipo: {
        title: 'Tipo Scanner',
        type: 'string',
        filter: false
      },
      scanerResolucion: {
        title: 'Resolución Scanner',
        type: 'string',
        filter: false
      },
      scanerVelocidad: {
        title: 'Velocidad Scanner',
        type: 'string',
        filter: false
      },
      copiaResolucion: {
        title: 'Resolución Copia',
        type: 'string',
        filter: false
      },
      copiaVelocidad: {
        title: 'Velocidad Copia',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private hardwareService: HardwareService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.hardwareService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_HARDWARE_PATH, //full-url-for-endpoint without any query strings
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
    this.nombre = event.data.nombre;
    this.bandejas = event.data.bandejas;
    this.conectividad = event.data.conectividad;
    this.procesador = event.data.procesador;
    this.disco = event.data.disco;
    this.memoria = event.data.memoria;
    this.impresionVelocidad = event.data.impresionVelocidad;
    this.impresionResolucion = event.data.impresionResolucion;
    this.scannerTipo = event.data.scanerTipo;
    this.scannerResolucion = event.data.scanerResolucion;
    this.scannerVelocidad = event.data.scanerVelocidad;
    this.copiaResolucion = event.data.copiaResolucion;
    this.copiaVelocidad = event.data.copiaVelocidad;
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
    return false;
  }

  saveButton(){
    if(this.idForm === ''){
      this.hardwareService.save(
        this.nombre,
        this.bandejas,
        this.conectividad,
        this.procesador,
        this.disco,
        this.memoria,
        this.impresionVelocidad,
        this.impresionResolucion,
        this.scannerTipo,
        this.scannerResolucion,
        this.scannerVelocidad,
        this.copiaResolucion,
        this.copiaVelocidad).subscribe((data: any[]) => {
        this.hardwareService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.hardwareService.update(
        this.idForm,
        this.nombre,
        this.bandejas,
        this.conectividad,
        this.procesador,
        this.disco,
        this.memoria,
        this.impresionVelocidad,
        this.impresionResolucion,
        this.scannerTipo,
        this.scannerResolucion,
        this.scannerVelocidad,
        this.copiaResolucion,
        this.copiaVelocidad)
        .subscribe((data: any[]) => {
        this.hardwareService.sendGetRequest().subscribe((data: any[]) => {
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
    this.bandejas = '';
    this.conectividad = '';
    this.procesador = '';
    this.disco = '';
    this.memoria = '';
    this.impresionVelocidad = '';
    this.impresionResolucion = '';
    this.scannerTipo = '';
    this.scannerResolucion = '';
    this.scannerVelocidad = '';
    this.copiaResolucion = '';
    this.copiaVelocidad = '';
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
