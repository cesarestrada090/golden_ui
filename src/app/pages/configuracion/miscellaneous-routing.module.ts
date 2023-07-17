import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AreaComponent} from "./area/area.component";

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    children: [
      {
        path: 'area',
        component: AreaComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule {
}
