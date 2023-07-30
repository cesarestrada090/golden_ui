import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ConfiguracionModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
