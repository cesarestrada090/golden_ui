import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {AreaSedeService} from "../../../services/AreaSede/AreaSedeService";
import {AreaService} from "../../../services/Area/AreaService";
import {SedeService} from "../../../services/Sede/SedeService";

@Component({
  selector: 'area-sede-table',
  templateUrl: './area.sede.component.html',
  styleUrls: ['./area.sede.component.scss'],
})
export class AreaSedeComponent {
  idForm: string = '';

  //cbo
  sedeCbo: any[];
  areaCbo: any[];

  //cbo ids
  sedeId: number;
  areaId: number;

  mantenedor: string = "Áreas y Sedes";
  responseListName: string = "modeloSuministros";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeAreaId(event){
    this.areaId = event;
  }

  changeSedeId(event){
    this.sedeId = event;
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
      nombreArea: {
        title: 'Nombre Área',
        type: 'string',
        filter: false
      },
      nombreSede: {
        title: 'Nombre Sede',
        type: 'string',
        filter: false
      },
      activo: {
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

  constructor(private areaSedeService: AreaSedeService,
              private areaService : AreaService,
              private sedeService : SedeService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.sedeService.sendGetRequest().subscribe((data: any[]) => {
      this.sedeCbo = data['sedes'];
    });
    this.areaService.sendGetRequest().subscribe((data: any[]) => {
      this.areaCbo = data['areas'];
    });
  }

  private loadInitialData() {


    this.areaSedeService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_AREA_SEDE_PATH,
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm(ServiceConstants.GET_UPDATE_STATUS_CONFIRM_MESSAGE)) {
        this.areaSedeService.update(event.data.areaId,event.data.sedeId).subscribe((data: any[]) => {
          this.areaSedeService.sendGetRequest().subscribe((data: any[]) => {
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
    return this.idForm === '' ? 'Crear Relación' : 'Actualizar Relación' + 'de: ';
  }

  shouldDisableSaveButton():boolean{
    return !this.sedeId || !this.areaId;
  }

  saveButton(){
    this.areaSedeService.save(this.areaId,this.sedeId).subscribe((data: any[]) => {
      this.areaSedeService.sendGetRequest().subscribe((data: any[]) => {
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
    this.sedeId = null;
    this.areaId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
