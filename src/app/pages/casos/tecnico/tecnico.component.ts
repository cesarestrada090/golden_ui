import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {TecnicoService} from "../../../services/TecnicoService/TecnicoService";
import {ProveedorService} from "../../../services/Proveedor/ProveedorService";

@Component({
  selector: 'tecnico-table',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.scss'],
})
export class TecnicoComponent {
  idForm: string = '';
  nombre: string = '';
  celular: string = '';

  //cbo
  proveedorCbo: any;

  //cbo ids
  proveedorId:number;

  mantenedor: string = "Técnicos";
  responseListName: string = "tecnicos";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeProveedorId(event){
    this.proveedorId = event;
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
      nombre: {
        title: 'Nombre Técnico',
        type: 'string',
        filter: false
      },
      celular: {
        title: 'Celular',
        type: 'string',
        filter: false
      },
      nombreProveedorServicio: {
        title: 'Proveedor Servicio',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private tecnicoService: TecnicoService,
              private proveedorService : ProveedorService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.proveedorService.sendGetRequest().subscribe((data: any[]) => {
      this.proveedorCbo = data['proveedorServicios'];
    });
  }

  private loadInitialData() {


    this.tecnicoService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_TECNICO_PATH, //full-url-for-endpoint without any query strings
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
    this.celular = event.data.celular;
    this.nombre = event.data.nombre;
    this.proveedorId = event.data.proveedorServicioId;
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
    return this.celular === '' || this.nombre === '' || !this.proveedorId;
  }

  saveButton(){
    if(this.idForm === ''){
      this.tecnicoService.save(this.nombre,this.celular,this.proveedorId).subscribe((data: any[]) => {
        this.tecnicoService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.tecnicoService.update(this.idForm, this.nombre,this.celular,this.proveedorId).subscribe((data: any[]) => {
        this.tecnicoService.sendGetRequest().subscribe((data: any[]) => {
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
    this.celular = '';
    this.nombre = '';
    this.proveedorId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
