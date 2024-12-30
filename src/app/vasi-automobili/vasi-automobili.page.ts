import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { DeleteConfirmationModal } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-vasi-automobili',
  templateUrl: './vasi-automobili.page.html',
  styleUrls: ['./vasi-automobili.page.scss'],
})
export class VasiAutomobiliPage implements OnInit {

  automobili: any;
  loading: boolean = true;
  sub: Subscription = new Subscription;
  isLoggedIn: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    private dataService: DataService) {}

    ngOnInit(): void {
      this.isLoggedIn = !!localStorage.getItem('userId') && localStorage.getItem('userId') !== 'izlogovan';
      if (this.isLoggedIn) {
        this.getData(); // Učitaj podatke samo ako je korisnik prijavljen
      } else {
        this.loading = false; // Isključuje spinner odmah ako nije prijavljen
      }
    }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  async getData() {
    this.sub = this.dataService.getAutomobilUser().subscribe((res) => {
      this.automobili = res;
      this.loading = false;
    });
  }

  async confirmDelete(automobil: any) {
    const modal = await this.modalCtrl.create({
      component: DeleteConfirmationModal,
      componentProps: { automobil }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.confirmed) {
      this.deleteAutomobilUser(automobil);
    }
  }

  async deleteAutomobilUser(automobil: any) {
    await this.dataService.deleteAutomobil(automobil);
    this.getData(); // Ponovno učitaj podatke nakon brisanja
  }
}
