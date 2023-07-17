import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import {TipoModeloService} from "../../services/TipoModelo/TipoModeloService";
import {FormsModule} from "@angular/forms";
import {TipoSuministroService} from "../../services/TipoSuministro/TipoSuministroService";
import {EstadoEquipoService} from "../../services/EstadoEquipo/EstadoEquipoService";
import {EstadoCasoTecnicoService} from "../../services/EstadoCasoTecnico/EstadoCasoTecnicoService";

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
  providers: [TipoModeloService,TipoSuministroService,EstadoEquipoService,EstadoCasoTecnicoService]
})
export class TablesModule { }
