import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {EquipoService} from "../../../services/Equipo/EquipoService";
import {ModeloService} from "../../../services/Modelo/ModeloService";
import {EstadoEquipoService} from "../../../services/EstadoEquipo/EstadoEquipoService";
import {SedeService} from "../../../services/Sede/SedeService";
import {AreaService} from "../../../services/Area/AreaService";
import {ClienteService} from "../../../services/Cliente/ClienteService";
import {EstadoContractualService} from "../../../services/EstadoContractual/EstadoContractualService";
import {UbicacionEquipolService} from "../../../services/UbicacionEquipo/UbicacionEquipolService";

@Component({
  selector: 'equipo-table',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent {
  idForm: string = '';
  serie: string = '';

  //cbo
  modeloCbo: any[];
  estadoEquipoCbo: any[];
  sedeCbo: any[];
  areaCbo: any[];
  clienteCbo: any[];
  ubicacionEquipoCbo: any[];
  estadoContractualCbo: any[];
  ddcCbo: any[];

  //cbo ids
  modeloId:number;
  estadoEquipoId:number;
  sedeId:number;
  areaId:number;
  clienteId:number;
  ubicacionEquipoId:number;
  ddcId:string;
  estadoContractualId:number;

  mantenedor: string = "Equipo";
  responseListName: string = "equipos";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeSedeId(event){
    this.sedeId = event;
  }

  changeModeloId(event){
    this.modeloId = event;
  }

  changeClienteId(event){
    this.clienteId = event;
  }

  changeEstadoEquipoId(event){
    this.estadoEquipoId = event;
  }
  changeAreaId(event){
    this.areaId = event;
  }

  changeEstadoContractualId(event){
    this.estadoContractualId = event;
  }
  changeUbicacionEquipoId(event){
    this.ubicacionEquipoId = event;
  }
  changeDdcId(event){
    this.ddcId = event;
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
      serie: {
        title: 'Serie',
        type: 'string',
        filter: false
      },
      clienteRazonSocial: {
        title: 'Cliente Razon Social',
        type: 'string',
        filter: false
      },
      nombreModelo: {
        title: 'Modelo',
        type: 'string',
        filter: false
      },
      estadoEstadoEquipo: {
        title: 'Estado Operativo',
        type: 'string',
        filter: false
      },
      nombreSede: {
        title: 'Sede',
        type: 'string',
        filter: false
      },
      nombreArea: {
        title: 'Área',
        type: 'string',
        filter: false
      },
      ubicacionEquipo: {
        title: 'Ubicación',
        type: 'string',
        filter: false
      },
      estadoContractual: {
        title: 'Estado Contractual',
        type: 'string',
        filter: false
      },
      ddc: {
        title: 'DDC',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private equipoService: EquipoService,
              private modeloService : ModeloService,
              private estadoEquipoService : EstadoEquipoService,
              private sedeService : SedeService,
              private areaService : AreaService,
              private clienteService : ClienteService,
              private estadoContractualService : EstadoContractualService,
              private ubicacionEquipolService : UbicacionEquipolService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.modeloService.sendGetRequest().subscribe((data: any[]) => {
      this.modeloCbo = data['modelos'];
    });
    this.estadoEquipoService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoEquipoCbo = data['estadoEquipos'];
    });
    this.sedeService.sendGetRequest().subscribe((data: any[]) => {
      this.sedeCbo = data['sedes'];
    });
    this.areaService.sendGetRequest().subscribe((data: any[]) => {
      this.areaCbo = data['areas'];
    });
    this.clienteService.sendGetRequest().subscribe((data: any[]) => {
      this.clienteCbo = data['clientes'];
    });
    this.ubicacionEquipolService.sendGetRequest().subscribe((data: any[]) => {
      this.ubicacionEquipoCbo = data['ubicacionEquipos'];
    });
    this.estadoContractualService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoContractualCbo = data['estadosContractuales'];
    });
    this.ddcCbo = [{id: 'Registrado', value: 'Registrado'},{id: 'No Registrado', value: 'No Registrado'}];
  }

  private loadInitialData() {


    this.equipoService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_EQUIPO_PATH,
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
    this.serie = event.data.serie;
    this.clienteId = event.data.clienteId;
    this.ddcId = event.data.ddc;
    this.modeloId = event.data.modeloId;
    this.estadoEquipoId = event.data.estadoEquipoId;
    this.estadoContractualId = event.data.estadoContractualId;
    this.ubicacionEquipoId = event.data.ubicacionEquipoId;
    this.sedeId = event.data.sedeId;
    this.areaId = event.data.areaId;
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
    return !this.areaId;
  }

  saveButton(){
    if(this.idForm === ''){
      this.equipoService.save(
        this.serie,this.modeloId,
        this.estadoEquipoId,
        this.sedeId,
        this.areaId,
        this.clienteId,
        this.estadoContractualId,
        this.ubicacionEquipoId,
        this.ddcId).subscribe((data: any[]) => {
        this.equipoService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.equipoService.update(
        this.idForm,
        this.serie,
        this.modeloId,
        this.estadoEquipoId,
        this.sedeId,
        this.areaId,
        this.clienteId,
        this.estadoContractualId,
        this.ubicacionEquipoId,
        this.ddcId).subscribe((data: any[]) => {
        this.equipoService.sendGetRequest().subscribe((data: any[]) => {
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
    this.serie = '';
    this.modeloId = null;
    this.clienteId = null;
    this.sedeId = null;
    this.ddcId = '';
    this.areaId = null;
    this.estadoContractualId = null;
    this.ubicacionEquipoId = null;
    this.estadoEquipoId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
