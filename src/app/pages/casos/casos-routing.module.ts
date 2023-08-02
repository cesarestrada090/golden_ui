import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasosComponent } from './casos.component';
import {TecnicoComponent} from "./tecnico/tecnico.component";
import {CasoComponent} from "./caso/caso.component";
import {VisitaTecnicaComponent} from "./visita-tecnica/visita.tecnica.component";

const routes: Routes = [
  {
    path: '',
    component: CasosComponent,
    children: [
      {
        path: 'tecnico',
        component: TecnicoComponent
      },
      {
        path: 'caso',
        component: CasoComponent
      },
      {
        path: 'visita-tecnica',
        component: VisitaTecnicaComponent
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
