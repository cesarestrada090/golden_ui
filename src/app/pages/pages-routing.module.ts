import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'general',
      loadChildren: () => import('./general/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'configuracion',
      loadChildren: () => import('./configuracion/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'equipos',
      loadChildren: () => import('./equipos/equipos.module')
        .then(m => m.EquiposModule),
    },
    {
      path: 'casos',
      loadChildren: () => import('./casos/casos.module')
        .then(m => m.CasosModule),
    },
    {
      path: '',
      redirectTo: 'general',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
