import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient,} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {CasoService} from "../../../services/Caso/CasoService";
import {EstadoCasoTecnicoService} from "../../../services/EstadoCasoTecnico/EstadoCasoTecnicoService";
import {EquipoService} from "../../../services/Equipo/EquipoService";

@Component({
  selector: 'caso-table',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.scss'],
})
export class CasoComponent {
  idForm: string = '';
  codigo: string = '';
  tipo: string = '';

  fechaCasoTecnico: Date;

  //cbo
  equipoCbo: any;
  estadoCasoCbo: any;

  //cbo ids
  equipoId:number;
  estadoCasoId:number;

  mantenedor: string = "Casos";
  responseListName: string = "casoTecnicos";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeEquipoId(event){
    this.equipoId = event;
  }

  changeEstadoId(event){
    this.estadoCasoId = event;
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
      codigo: {
        title: 'Código',
        type: 'string',
        filter: false
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
        filter: false
      },
      fecha: {
        title: 'Fecha Caso Técnico',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      },
      nombreEstadoCasoTecnico: {
        title: 'Estado del Caso',
        type: 'string',
        filter: false
      },
      serieEquipo: {
        title: 'Serie Equipo',
        type: 'string',
        filter: false
      },
      clienteEquipo: {
        title: 'Cliente Afectado',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private casoService: CasoService,
              private estadoCasoTecnicoService : EstadoCasoTecnicoService,
              private equipoService : EquipoService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.estadoCasoTecnicoService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoCasoCbo = data['estados'];
    });

    this.equipoService.sendGetRequest().subscribe((data: any[]) => {
      this.equipoCbo = data['equipos'];
    });
  }

  private loadInitialData() {


    this.casoService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_CASO_PATH,
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
    this.tipo = event.data.tipo;
    this.codigo = event.data.codigo;
    this.fechaCasoTecnico = event.data.fecha;
    this.equipoId = event.data.equipoId;
    this.estadoCasoId = event.data.estadoId;
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
    return this.tipo === '' || this.codigo === '' || !this.equipoId;
  }

  saveButton(){
    if(this.idForm === ''){
      this.casoService.save(this.codigo,this.tipo,this.fechaCasoTecnico,this.estadoCasoId,this.equipoId).subscribe((data: any[]) => {
        this.casoService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.casoService.update(this.idForm, this.codigo,this.tipo,this.fechaCasoTecnico,this.estadoCasoId,this.equipoId).subscribe((data: any[]) => {
        this.casoService.sendGetRequest().subscribe((data: any[]) => {
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
    this.tipo = '';
    this.codigo = '';
    this.equipoId = null;
    this.estadoCasoId = null;
    this.fechaCasoTecnico = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
