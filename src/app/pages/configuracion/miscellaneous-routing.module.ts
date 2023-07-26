import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous.component';
import {AreaComponent} from "./area/area.component";
import {ContratoComponent} from "./contrato/contrato.component";
import {ClienteComponent} from "./cliente/cliente.component";
import {UbicacionComponent} from "./ubicacion/ubicacion.component";
import {SedeComponent} from "./sede/sede.component";
import {ProveedorComponent} from "./proveedor/proveedor.component";
import {OperadorComponent} from "./operador/operador.component";

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    children: [
      {
        path: 'area',
        component: AreaComponent
      },
      {
        path: 'contrato',
        component: ContratoComponent
      },
      {
        path: 'cliente',
        component: ClienteComponent
      },
      {
        path: 'ubicacion',
        component: UbicacionComponent
      },
      {
        path: 'sede',
        component: SedeComponent
      },
      {
        path: 'proveedor',
        component: ProveedorComponent
      },
      {
        path: 'operador',
        component: OperadorComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule {
}
