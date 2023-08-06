import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {ClienteService} from "../../../services/Cliente/ClienteService";
import {ContratoService} from "../../../services/Contrato/ContratoService";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'cliente-table',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  idForm: string = '';
  razonSocial: string = '';
  ruc: string = '';
  contratoCbo: any;
  contratoId:number;
  mantenedor: string = "Cliente";
  responseListName: string = "clientes";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeClient(event){
    this.contratoId = event;
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
      razonSocial: {
        title: 'Razon Social',
        type: 'string',
        filter: false
      },
      ruc: {
        title: 'ruc',
        type: 'string',
        filter: false
      },
      nombreContrato: {
        title: 'Nombre Contrato',
        type: 'string',
        filter: false
      },
      fechaInicio: {
        title: 'Fecha Inicio',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      },
      fechaFin: {
        title: 'Fecha Fin',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private clienteService: ClienteService,
              private contratoService : ContratoService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.contratoService.sendGetRequest().subscribe((data: any[]) => {
      this.contratoCbo = data['contratos'];
    });
  }

  private loadInitialData() {
    this.clienteService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_CLIENTE_PATH, //full-url-for-endpoint without any query strings
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
    this.razonSocial = event.data.razonSocial;
    this.ruc = event.data.ruc;
    this.contratoId = event.data.contratoId;
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
    return this.razonSocial === '' || this.ruc === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.clienteService.save(this.razonSocial,this.ruc,this.contratoId).subscribe((data: any[]) => {
        this.clienteService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.clienteService.update(this.idForm, this.razonSocial,this.ruc, this.contratoId).subscribe((data: any[]) => {
        this.clienteService.sendGetRequest().subscribe((data: any[]) => {
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
    this.razonSocial = '';
    this.ruc = '';
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
