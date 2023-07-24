import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AreaComponent} from "./area/area.component";
import {AreaService} from "../../services/Area/AreaService";
import {FormsModule} from "@angular/forms";
import {TablesRoutingModule} from "../general/tables-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ContratoComponent} from "./contrato/contrato.component";
import {ContratoService} from "../../services/Contrato/ContratoService";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    MiscellaneousRoutingModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    NbDatepickerModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    MiscellaneousComponent,
    NotFoundComponent,
    AreaComponent,
    ContratoComponent
  ],
  providers: [
    AreaService,ContratoService
  ]
})
export class MiscellaneousModule { }
