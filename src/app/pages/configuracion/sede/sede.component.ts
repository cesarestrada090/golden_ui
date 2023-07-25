import {Component, TemplateRef} from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {ContratoService} from "../../../services/Contrato/ContratoService";
import {NbComponentStatus, NbDialogService, NbToastrService} from "@nebular/theme";
import {SedeService} from "../../../services/Sede/SedeService";
import {EstadoSedeService} from "../../../services/EstadoSede/EstadoSedeService";
import {UbicacionService} from "../../../services/Ubicacion/UbicacionService";

@Component({
  selector: 'sede-table',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss'],
})
export class SedeComponent {
  idForm: string = '';
  errorMsg: string = '';
  nombre: string = '';

  estadoSedeId: number;
  estadoSedeCbo: any[];

  ubicacionSedeId: number;
  ubicacionSedeCbo: any[];

  mantenedor: string = 'Sede';
  responseListName: string = 'sedes';
  placeholder: string = 'Nombre ' + this.mantenedor;
  status: NbComponentStatus = 'success';

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
        title: 'Nombre Sede',
        type: 'string',
        filter: false
      },
      estadoSede: {
        title: 'Estado Sede',
        type: 'string',
        filter: false
      },
      direccionUbicacion: {
        title: 'Dirección Sede',
        type: 'string',
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private sedeService : SedeService,
              private estadoSedeService : EstadoSedeService,
              private ubicacionService : UbicacionService,
              private httpClient: HttpClient,
              private dialogService: NbDialogService,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.estadoSedeService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoSedeCbo = data['estados'];
    });
    this.ubicacionService.sendGetRequest().subscribe((data: any[]) => {
      this.ubicacionSedeCbo = data['ubicacionSedes'];
    });

  }

  private loadInitialData() {
    this.sedeService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_SEDE_PATH,
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems',
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
    this.estadoSedeId = event.data.estadoId;
    this.ubicacionSedeId = event.data.ubicacionSedeId;
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
    return this.nombre === '' || this.estadoSedeId === null || this.ubicacionSedeId === null ;
  }

  saveButton(dialog: TemplateRef<any>){

    if(this.idForm === ''){
      this.sedeService.save(this.nombre,this.ubicacionSedeId,this.estadoSedeId).subscribe((data: any[]) => {
        this.sedeService.sendGetRequest().subscribe((data: any[]) => {
          this.mostrarNotificacionGrabado()
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.sedeService.update(this.idForm,this.nombre,this.ubicacionSedeId,this.estadoSedeId).subscribe((data: any[]) => {
        this.sedeService.sendGetRequest().subscribe((data: any[]) => {
          this.mostrarNotificacionGrabado()
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
    this.ubicacionSedeId = null;
    this.estadoSedeId = null;
    this.nombre = '';
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }

  changeEstadoSede(event){
    this.estadoSedeId = event;
  }

  changeUbicacionSede(event){
    this.ubicacionSedeId = event;
  }
}
