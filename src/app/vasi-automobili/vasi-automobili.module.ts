import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { VasiAutomobiliPageRoutingModule } from './vasi-automobili-routing.module';

import { VasiAutomobiliPage } from './vasi-automobili.page';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VasiAutomobiliPageRoutingModule
  ],
  declarations: [VasiAutomobiliPage]
})
export class VasiAutomobiliPageModule {

  automobili: any; // Lista za čuvanje automobila
    loading: boolean = true; // Prikaz statusa učitavanja
    sub: Subscription = new Subscription;
  
  
    constructor(
      public modalCtrl: ModalController,
      private dataService: DataService) {}
  
    ngOnInit(): void {
      this.getData();
    }
  
    ngOnDestroy(): void{
      this.sub.unsubscribe();
    }
  
    async getData() {
      this.sub = this.dataService.getAutomobil().subscribe((res) => {
      this.automobili = res;
      this.loading = false; // Isključuje status učitavanja
      console.log(this.automobili);
      });
    }
    async deleteAutomobil(automobil: any) {
      await this.dataService.deleteAutomobil(automobil);
    }

}
