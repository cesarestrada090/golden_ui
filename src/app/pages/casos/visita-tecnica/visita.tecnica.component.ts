import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient,} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {CasoService} from "../../../services/Caso/CasoService";
import {VisitaTecnicaService} from "../../../services/VisitaTecnica/VisitaTecnicaService";
import {EstadoVisitaService} from "../../../services/EstadoVisita/EstadoVisitaService";

@Component({
  selector: 'visita-tecnica-table',
  templateUrl: './visita.tecnica.component.html',
  styleUrls: ['./visita.tecnica.component.scss'],
})
export class VisitaTecnicaComponent {
  idForm: string = '';

  selectedId: number;
  codigoCaso: string;

  fechaCreacion: Date;
  fechaModificacion: Date;

  //cbo
  casoTecnicoCbo: any;
  estadoVisitaTecnicaCbo: any;

  //cbo ids
  casoTecnicoId:number;
  estadoVisitaId:number;

  mantenedor: string = "Visitas Técnicas";
  responseListName: string = "visitaTecnicas";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  changeCasoTecnicoId(event){
    this.casoTecnicoId = event;
  }

  changeEstadoVisitaId(event){
    this.estadoVisitaId = event;
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
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'}],
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      codigoCasoTecnico: {
        title: 'Código Caso Técnico',
        type: 'string',
        filter: false
      },
      estadoVisitaTecnica: {
        title: 'Estado Visita Técnica',
        type: 'string',
        filter: false
      },
      fechaCreacion: {
        title: 'Fecha Creación',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      },
      fechaModificacion: {
        title: 'Ultima Modificación',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      }
    },
  };

  detailSettings = {
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
      edit: true,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      nombreTecnico: {
        title: 'Nombre Técnico',
        type: 'string',
        filter: false
      },
      nombreOperador: {
        title: 'Nombre Operador',
        type: 'string',
        filter: false
      },
      fecha: {
        title: 'Fecha Creación',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      },
      estadoEstadoDetalleVisita: {
        title: 'Estado',
        type: 'date',
        filter: false
      },
      comentario: {
        title: 'Comentario',
        type: 'string',
        filter: false
      },
      estadoAnterior: {
        title: 'Estado Anterior',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  detalleSource: LocalDataSource = new LocalDataSource();

  constructor(private visitaTecnicaService: VisitaTecnicaService,
              private estadoVisitaService : EstadoVisitaService,
              private casoService : CasoService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();

    this.estadoVisitaService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoVisitaTecnicaCbo = data['estados'];
    });

    this.casoService.sendGetRequest().subscribe((data: any[]) => {
      this.casoTecnicoCbo = data['casoTecnicos'];
    });
  }

  private loadInitialData() {
    this.visitaTecnicaService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_VISITA_TECNICA_PATH,
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
  onViewVisitaTecnica(event): void {
    this.selectedId = event.data.id;
    this.codigoCaso = event.data.codigoCasoTecnico;
    this.detalleSource = new ServerDataSource(this.httpClient,
      {
        endPoint: ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH + '/'+this.selectedId,
        dataKey: 'detalleVisitas',
        pagerPageKey: 'page',
        pagerLimitKey: 'size',
        totalKey: 'totalItems', //  total records returned in response path
      });
  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.fechaCreacion = event.data.fechaCreacion;
    this.casoTecnicoId = event.data.casoTecnicoId;
    this.estadoVisitaId = event.data.estadoId;
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
    return !this.casoTecnicoId || !this.estadoVisitaId || !this.fechaCreacion;
  }

  saveButton(){
    if(this.idForm === ''){
      this.visitaTecnicaService.save(this.casoTecnicoId,this.estadoVisitaId,this.fechaCreacion).subscribe((data: any[]) => {
        this.visitaTecnicaService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.visitaTecnicaService.update(this.idForm,this.casoTecnicoId,this.estadoVisitaId,this.fechaCreacion).subscribe((data: any[]) => {
        this.visitaTecnicaService.sendGetRequest().subscribe((data: any[]) => {
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
    this.casoTecnicoId = null;
    this.estadoVisitaId = null;
    this.fechaCreacion = null;
    this.selectedId = null;
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
