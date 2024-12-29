import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModal {

  @Input() automobil: any;

  constructor(private modalCtrl: ModalController) {}

  dismiss(confirmed: boolean) {
    this.modalCtrl.dismiss({ confirmed });
  }
}

