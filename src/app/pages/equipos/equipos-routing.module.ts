import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquiposComponent } from './equipos.component';
import {SuministroComponent} from "./suministro/suministro.component";
import {HardwareComponent} from "./hardware/hardware.component";
import {ModeloComponent} from "./modelo/modelo.component";

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
