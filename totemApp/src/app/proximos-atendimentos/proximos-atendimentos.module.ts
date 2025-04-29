import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProximosAtendimentosPageRoutingModule } from './proximos-atendimentos-routing.module';

import { ProximosAtendimentosPage } from './proximos-atendimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProximosAtendimentosPageRoutingModule
  ],
 
})
export class ProximosAtendimentosPageModule {}
