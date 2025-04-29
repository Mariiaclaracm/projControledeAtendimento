import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProximosAtendimentosPage } from './proximos-atendimentos.page';

const routes: Routes = [
  {
    path: '',
    component: ProximosAtendimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProximosAtendimentosPageRoutingModule {}
