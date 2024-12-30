import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, Automobil } from '../service/data.service';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
    this.sub = this.dataService.getAutomobiliWithUsers().subscribe((res) => {
      this.automobili = res;
      this.loading = false; // Isključuje status učitavanja
      console.log(this.automobili);
    });
  }
  
  async deleteAutomobil(automobil: any) {
    await this.dataService.deleteAutomobil(automobil);
  }


}