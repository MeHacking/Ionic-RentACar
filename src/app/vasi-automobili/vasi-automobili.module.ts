import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VasiAutomobiliPageRoutingModule } from './vasi-automobili-routing.module';

import { VasiAutomobiliPage } from './vasi-automobili.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VasiAutomobiliPageRoutingModule
  ],
  declarations: [VasiAutomobiliPage]
})
export class VasiAutomobiliPageModule {}
