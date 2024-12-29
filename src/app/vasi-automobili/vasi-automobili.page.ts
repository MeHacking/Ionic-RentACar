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
