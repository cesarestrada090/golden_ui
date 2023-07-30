import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasosComponent } from './casos.component';
import {TecnicoComponent} from "./tecnico/tecnico.component";

const routes: Routes = [
  {
    path: '',
    component: CasosComponent,
    children: [
      {
        path: 'tecnico',
        component: TecnicoComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasosRoutingModule {
}
