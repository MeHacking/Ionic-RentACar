import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdatePageRoutingModule } from './updatepage-routing.module';
import { UpdatePage } from './updatepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePageRoutingModule
  ],
  declarations: [UpdatePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Dodavanje CUSTOM_ELEMENTS_SCHEMA
})
export class UpdatePageModule {}
