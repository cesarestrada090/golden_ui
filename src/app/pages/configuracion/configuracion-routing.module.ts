import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfiguracionComponent } from './configuracion.component';
import {AreaComponent} from "./area/area.component";
import {ContratoComponent} from "./contrato/contrato.component";
import {ClienteComponent} from "./cliente/cliente.component";
import {UbicacionComponent} from "./ubicacion/ubicacion.component";
import {SedeComponent} from "./sede/sede.component";
import {ProveedorComponent} from "./proveedor/proveedor.component";
import {OperadorComponent} from "./operador/operador.component";
import {AreaSedeComponent} from "./area-sede/area.sede.component";

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionComponent,
    children: [
      {
        path: 'area',
        component: AreaComponent
      },
      {
        path: 'sede',
        component: SedeComponent
      },
      {
        path: 'areaSede',
        component: AreaSedeComponent
      },
      {
        path: 'contrato',
        component: ContratoComponent
      },
      {
        path: 'suministro',
        component: ClienteComponent
      },
      {
        path: 'ubicacion',
        component: UbicacionComponent
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
export class ConfiguracionRoutingModule {
}
