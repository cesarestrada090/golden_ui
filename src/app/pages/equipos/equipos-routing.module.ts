import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquiposComponent } from './equipos.component';
import {SuministroComponent} from "./suministro/suministro.component";

const routes: Routes = [
  {
    path: '',
    component: EquiposComponent,
    children: [
      {
        path: 'suministro',
        component: SuministroComponent
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
