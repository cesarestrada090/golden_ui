import {Component, TemplateRef} from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {ContratoService} from "../../../services/Contrato/ContratoService";
import {NbComponentStatus, NbDialogService, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'contrato-table',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent {
  idForm: string = '';
  errorMsg: string = '';
  nombre: string = '';
  fechaInicio: Date;
  fechaFin: Date;

  mantenedor: string = 'Contrato';
  responseListName: string = 'contratos';
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
        title: 'Razon Social',
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
          return parsedDate.toLocaleDateString();
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
          return parsedDate.toLocaleDateString();
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private contratoService : ContratoService,private httpClient: HttpClient,private dialogService: NbDialogService, private notificacionService: NbToastrService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.contratoService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_CONTRATO_PATH, //full-url-for-endpoint without any query strings
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
    this.fechaInicio = event.data.fechaInicio;
    this.fechaFin = event.data.fechaFin;
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
    return this.nombre === '' || this.fechaInicio === null || this.fechaFin === null ;
  }

  saveButton(dialog: TemplateRef<any>){

    if (this.fechaInicio && this.fechaFin && this.fechaInicio > this.fechaFin) {
      this.errorMsg = 'Fecha inicio no puede ser mayor a la fecha fin';
      this.dialogService.open(dialog);
      return;
    }

    if(this.idForm === ''){
      this.contratoService.save(this.nombre,this.fechaInicio,this.fechaFin).subscribe((data: any[]) => {
        this.contratoService.sendGetRequest().subscribe((data: any[]) => {
          this.mostrarNotificacionGrabado()
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.contratoService.update(this.idForm,this.nombre,this.fechaInicio,this.fechaFin).subscribe((data: any[]) => {
        this.contratoService.sendGetRequest().subscribe((data: any[]) => {
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
    this.fechaInicio = null;
    this.fechaFin = null;
    this.nombre = '';
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
