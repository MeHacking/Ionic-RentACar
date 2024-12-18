import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VasiAutomobiliPage } from './vasi-automobili.page';

const routes: Routes = [
  {
    path: '',
    component: VasiAutomobiliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VasiAutomobiliPageRoutingModule {}
