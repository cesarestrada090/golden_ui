import {Component, TemplateRef} from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {ContratoService} from "../../../services/Contrato/ContratoService";
import {NbComponentStatus, NbDialogService, NbToastrService} from "@nebular/theme";
import {UbicacionService} from "../../../services/Ubicacion/UbicacionService";

@Component({
  selector: 'ubicacion-table',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
})
export class UbicacionComponent {
  idForm: string = '';
  errorMsg: string = '';
  nombreForm: string = '';
  direccionForm: string;
  ciudadForm: string;
  departamentoForm: string;
  provinciaForm: string;

  mantenedor: string = 'Ubicacion';
  responseListName: string = 'ubicacionSedes';
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
        title: 'Nombre',
        type: 'string',
        filter: false
      },
      direccion: {
        title: 'Direccion',
        type: 'string',
        filter: false
      },
      ciudad: {
        title: 'Ciudad',
        type: 'string',
        filter: false
      },
      provincia: {
        title: 'Provincia',
        type: 'string',
        filter: false
      },
      departamento: {
        title: 'Departamento',
        type: 'string',
        filter: false
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private ubicacionService : UbicacionService,
              private httpClient: HttpClient,
              private dialogService: NbDialogService,
              private notificacionService: NbToastrService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.ubicacionService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_UBICACION_PATH, //full-url-for-endpoint without any query strings
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
    this.nombreForm = event.data.nombre;
    this.direccionForm = event.data.direccion;
    this.ciudadForm = event.data.ciudad;
    this.provinciaForm = event.data.provincia;
    this.departamentoForm = event.data.departamento;
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
    return this.nombreForm === '' || this.direccionForm === null || this.provinciaForm === null ;
  }

  saveButton(dialog: TemplateRef<any>){

    if(this.idForm === ''){
      this.ubicacionService.save(this.nombreForm,this.direccionForm,this.ciudadForm,this.provinciaForm,this.departamentoForm).subscribe((data: any[]) => {
        this.ubicacionService.sendGetRequest().subscribe((data: any[]) => {
          this.mostrarNotificacionGrabado()
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.ubicacionService.update(this.idForm,this.nombreForm,this.direccionForm,this.ciudadForm,this.provinciaForm,this.departamentoForm).subscribe((data: any[]) => {
        this.ubicacionService.sendGetRequest().subscribe((data: any[]) => {
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
    this.nombreForm = '';
    this.direccionForm = '';
    this.ciudadForm = '';
    this.provinciaForm = '';
    this.departamentoForm = '';
  }

  private mostrarNotificacionGrabado() {
      this.notificacionService.show(
        '',
        this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
        ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
