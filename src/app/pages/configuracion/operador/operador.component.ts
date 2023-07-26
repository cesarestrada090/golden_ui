import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {ClienteService} from "../../../services/Cliente/ClienteService";
import {ContratoService} from "../../../services/Contrato/ContratoService";
import {NbToastrService} from "@nebular/theme";
import {ProveedorService} from "../../../services/Proveedor/ProveedorService";
import {EstadoProveedorService} from "../../../services/EstadoProveedor/EstadoProveedorService";
import {OperadorService} from "../../../services/Operador/OperadorService";

@Component({
  selector: 'operador-table',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss'],
})
export class OperadorComponent {
  idForm: string = '';
  nombre: string = '';
  celular: string = '';
  correo: string = '';
  proveedorServicioCbo: any;
  proveedorServicioId: number;
  mantenedor: string = "Operador";
  responseListName: string = "operadores";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeProveedorServicioId(event){
    this.proveedorServicioId = event;
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
        title: 'Nombre Operador',
        type: 'string',
        filter: false
      },
      celular: {
        title: 'Celular Operador',
        type: 'string',
        filter: false
      },
      correo: {
        title: 'Correo Operador',
        type: 'string',
        filter: false
      },
      proveedorServicio: {
        title: 'Nombre Proveedor',
        type: 'string',
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private operadorService: OperadorService,
              private proveedorService : ProveedorService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();
    this.proveedorService.sendGetRequest().subscribe((data: any[]) => {
      this.proveedorServicioCbo = data['proveedorServicios'];
    });
  }

  private loadInitialData() {


    this.operadorService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_OPERADOR_PATH, //full-url-for-endpoint without any query strings
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
    this.celular = event.data.celular;
    this.correo = event.data.correo;
    this.proveedorServicioId = event.data.proveedorServicioId;
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
    return this.nombre === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.operadorService.save(this.nombre,this.celular,this.correo,this.proveedorServicioId).subscribe((data: any[]) => {
        this.operadorService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.operadorService.update(this.idForm, this.nombre,this.celular,this.correo,this.proveedorServicioId).subscribe((data: any[]) => {
        this.operadorService.sendGetRequest().subscribe((data: any[]) => {
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
    this.nombre = '';
    this.celular = '';
    this.correo = '';
    this.proveedorServicioId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
