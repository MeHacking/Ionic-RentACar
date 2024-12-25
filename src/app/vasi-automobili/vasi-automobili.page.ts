import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-vasi-automobili',
  templateUrl: './vasi-automobili.page.html',
  styleUrls: ['./vasi-automobili.page.scss'],
})
export class VasiAutomobiliPage implements OnInit {

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
      this.sub = this.dataService.getAutomobilUser().subscribe((res) => {
      this.automobili = res;
      this.loading = false; // Isključuje status učitavanja
      console.log(this.automobili);
      });
    }
    async deleteAutomobilUser(automobil: any) {
      await this.dataService.deleteAutomobil(automobil);
    }

}
