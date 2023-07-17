import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {EstadoCasoTecnicoService} from "../../../services/EstadoCasoTecnico/EstadoCasoTecnicoService";
import {AreaService} from "../../../services/Area/AreaService";

@Component({
  selector: 'area-table',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent {
  idForm: string = '';
  nombreArea: string = '';
  ceco: string = '';
  mantenedor: string = "Área";
  responseListName: string = "areas";
  placeholder: string = 'Nombre ' + this.mantenedor;

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
      ceco: {
        title: 'CECO',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private areaService : AreaService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {


    this.areaService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_AREA_PATH, //full-url-for-endpoint without any query strings
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
    this.nombreArea = event.data.nombre;
    this.ceco = event.data.ceco;
  }

  onCreate(event): void {
    if (window.confirm(ServiceConstants.GET_SAVE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getOperacion(): string {
    return this.idForm === '' ? 'Grabar' : 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return this.nombreArea === '' || this.ceco === '' ;
  }

  saveButton(){
    if(this.idForm === ''){
      this.areaService.save(this.nombreArea,this.ceco).subscribe((data: any[]) => {
        this.areaService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      });
    } else {
      this.areaService.update(this.idForm , this.nombreArea,this.ceco).subscribe((data: any[]) => {
        this.areaService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      });
    }
  }

  cleanForm(){
    this.idForm = '';
    this.nombreArea = '';
    this.ceco = '';
  }
}
