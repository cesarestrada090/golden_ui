import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import {TipoModeloComponent} from "./tipo-modelo/tipo-modelo.component";
import {TipoSuministroComponent} from "./tipo-suministro/tipo-suministro.component";
import {EstadoEquipoComponent} from "./estado-equipo/estado-equipo.component";
import {EstadoCasoComponent} from "./estado-caso/estado-caso.component";
import {EstadoProveedorComponent} from "./estado-proveedor/estado-proveedor.component";
import {EstadoSedeComponent} from "./estado-sede/estado-sede.component";
import {EstadoDetalleComponent} from "./estado-detalle/estado-detalle.component";
import {EstadoSuministroComponent} from "./estado-suministro/estado-suministro.component";
import {EstadoVisitaComponent} from "./estado-visita/estado-visita.component";
import {UbicacionEquipoComponent} from "./ubicacion-equipo/ubicacion-equipo.component";
import {EstadoContractualComponent} from "./estado-contractual/estado-contractual.component";

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'tipo-suministro',
      component: TipoSuministroComponent,
    },
    {
      path: 'estado-suministro',
      component: EstadoSuministroComponent,
    },
    {
      path: 'tipo-modelo',
      component: TipoModeloComponent,
    },
    {
      path: 'estado-equipo',
      component: EstadoEquipoComponent,
    },
    {
      path: 'estado-caso',
      component: EstadoCasoComponent,
    },
    {
      path: 'estado-proveedor',
      component: EstadoProveedorComponent,
    },
    {
      path: 'estado-sede',
      component: EstadoSedeComponent
    },
    {
      path: 'estado-detalle',
      component: EstadoDetalleComponent
    },
    {
      path: 'estado-visita',
      component: EstadoVisitaComponent
    },
    {
      path: 'ubicacion-equipo',
      component: UbicacionEquipoComponent
    },
    {
      path: 'estado-contractual',
      component: EstadoContractualComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TipoModeloComponent,
  TipoSuministroComponent,
  EstadoEquipoComponent,
  EstadoCasoComponent,
  EstadoProveedorComponent,
  EstadoSedeComponent,
  EstadoDetalleComponent,
  EstadoSuministroComponent,
  EstadoVisitaComponent,
  UbicacionEquipoComponent,
  EstadoContractualComponent,
  TreeGridComponent
];
