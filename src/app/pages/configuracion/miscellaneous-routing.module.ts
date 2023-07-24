import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous.component';
import {AreaComponent} from "./area/area.component";
import {ContratoComponent} from "./contrato/contrato.component";
import {ClienteComponent} from "./cliente/cliente.component";

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
