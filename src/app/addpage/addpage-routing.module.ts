import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPage } from './addpage.page';

const routes: Routes = [
  {
    path: '',
    component: AddPage // Usklađeno sa nazivom komponente
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPageRoutingModule {}
