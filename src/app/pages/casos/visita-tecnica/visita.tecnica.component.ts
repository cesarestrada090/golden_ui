import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient,} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {CasoService} from "../../../services/Caso/CasoService";
import {VisitaTecnicaService} from "../../../services/VisitaTecnica/VisitaTecnicaService";
import {EstadoVisitaService} from "../../../services/EstadoVisita/EstadoVisitaService";
import {EstadoDetalleService} from "../../../services/EstadoDetalle/EstadoDetalleService";
import {TecnicoService} from "../../../services/TecnicoService/TecnicoService";
import {OperadorService} from "../../../services/Operador/OperadorService";
import {DetalleVisitaTecnicaService} from "../../../services/DetalleVisitaTecnica/DetalleVisitaTecnicaService";

@Component({
  selector: 'visita-tecnica-table',
  templateUrl: './visita.tecnica.component.html',
  styleUrls: ['./visita.tecnica.component.scss'],
})
export class VisitaTecnicaComponent {
  idForm: string = '';

  selectedId: number;
  selectedDetailId: boolean = false;
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



  // Detalle form

  showDetalleForm: boolean = false;
  idDetalleForm: string = '';
  createDetailFormEnabled: boolean = false;
  comentario: string = '';
  fechaCreacionDetalle: Date;

  //cbo
  tecnicoCbo: any;
  operadorCbo: any;
  estadoDetalleVisitaCbo: any;

  //ids
  tecnicoId:number;
  operadorId:number;
  estadoDetalleVisitaId:number;


  // master
  changeCasoTecnicoId(event){
    this.casoTecnicoId = event;
  }

  changeEstadoVisitaId(event){
    this.estadoVisitaId = event;
  }

  // detail

  changeTecnicoId(event){
    this.tecnicoId = event;
  }

  changeOperadorId(event){
    this.operadorId = event;
  }
  changeEstadoDetalleVisita(event){
    this.estadoDetalleVisitaId = event;
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
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      visitaTecnicaId: {
        title: 'Código Visita Técnica',
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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  detalleSource: LocalDataSource = new LocalDataSource();

  constructor(private visitaTecnicaService: VisitaTecnicaService,
              private detalleVisitaTecnicaService: DetalleVisitaTecnicaService,
              private estadoVisitaService : EstadoVisitaService,
              private estadoDetalleService : EstadoDetalleService,
              private tecnicoService : TecnicoService,
              private operadorService : OperadorService,
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


    this.estadoDetalleService.sendGetRequest().subscribe((data: any[]) => {
      this.estadoDetalleVisitaCbo = data['estados'];
    });
    this.operadorService.sendGetRequest().subscribe((data: any[]) => {
      this.operadorCbo = data['operadores'];
    });
    this.tecnicoService.sendGetRequest().subscribe((data: any[]) => {
      this.tecnicoCbo = data['tecnicos'];
    });
  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.fechaCreacion = event.data.fechaCreacion;
    this.casoTecnicoId = event.data.casoTecnicoId;
    this.estadoVisitaId = event.data.estadoId;
  }

  onSelectDetailRow(event): void {
    this.createDetailFormEnabled = true;
    this.selectedDetailId = true;
    this.idDetalleForm = event.data.id;
    this.tecnicoId = event.data.tecnicoId;
    this.estadoDetalleVisitaId = event.data.estadoId;
    this.operadorId = event.data.operadorId;
    this.comentario = event.data.comentario
    this.fechaCreacionDetalle = event.data.fecha;
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

  getOperacionDetalle(): string {
    return this.idDetalleForm === '' ? 'Crear Detalle' : 'Actualizar Detalle';
  }

  shouldDisableSaveButton():boolean{
    return !this.casoTecnicoId || !this.estadoVisitaId || !this.fechaCreacion;
  }

  shouldDisableSaveDetailButton():boolean{
    return !this.tecnicoId || !this.estadoDetalleVisitaId || !this.operadorId || !this.fechaCreacionDetalle;
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

  saveDetalleButton(){
    if(this.idDetalleForm === ''){
      this.detalleVisitaTecnicaService.save(
        this.tecnicoId,
        this.operadorId,
        this.selectedId,
        this.fechaCreacionDetalle,
        this.comentario,
        this.estadoDetalleVisitaId
        ).subscribe((data: any[]) => {
        this.detalleVisitaTecnicaService.sendGetRequestById(this.selectedId).subscribe((data: any[]) => {
          this.detalleSource.load(data[this.responseListName]);
          this.mostrarNotificacionGrabado()
        })
      },this.manejarErrorSave());
    } else {
      this.detalleVisitaTecnicaService.update(
        this.idDetalleForm,
        this.tecnicoId,
        this.operadorId,
        this.selectedId,
        this.fechaCreacionDetalle,
        this.comentario,
        this.estadoDetalleVisitaId).subscribe((data: any[]) => {
        this.detalleVisitaTecnicaService.sendGetRequestById(this.selectedId).subscribe((data: any[]) => {
          this.detalleSource.load(data[this.responseListName]);
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
    this.idDetalleForm = '';
    this.selectedDetailId = null;
  }
  cleanDetalleForm(){
    this.idDetalleForm = '';
    this.tecnicoId = null;
    this.operadorId = null;
    this.estadoVisitaId = null;
    this.estadoDetalleVisitaId = null;
    this.fechaCreacionDetalle = null;
    this.comentario = '';
  }

  activarDesactivarDetalleForm(){
    this.createDetailFormEnabled = !this.createDetailFormEnabled;
    this.idDetalleForm = '';
    this.tecnicoId = null;
    this.operadorId = null;
    this.estadoDetalleVisitaId = null;
    this.estadoVisitaId = null;
    this.fechaCreacionDetalle = null;
    this.comentario = '';
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      this.idForm == '' ? ServiceConstants.GET_SAVE_NOTIFICATION_MESSAGE : ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
