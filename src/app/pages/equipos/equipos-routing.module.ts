import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquiposComponent } from './equipos.component';
import {SuministroComponent} from "./suministro/suministro.component";
import {HardwareComponent} from "./hardware/hardware.component";
import {ModeloComponent} from "./modelo/modelo.component";
import {ModeloSuministroComponent} from "./modelo-suministro/modelo.suministro.component";
import {EquipoComponent} from "./equipo/equipo.component";

const routes: Routes = [
  {
    path: '',
    component: EquiposComponent,
    children: [
      {
        path: 'suministro',
        component: SuministroComponent
      },{
        path: 'hardware',
        component: HardwareComponent
      },{
        path: 'modelo',
        component: ModeloComponent
      },{
        path: 'modeloSuministro',
        component: ModeloSuministroComponent
      },{
        path: 'equipo',
        component: EquipoComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {
}
