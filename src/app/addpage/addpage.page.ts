import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.page.html',
  styleUrls: ['./addpage.page.scss'],
})
export class AddPage {
  carData = {
    godiste: null,
    kompanija: '',
    model: '',
    opis: '',
    kategorija: '',
  };

  constructor(private firestore: Firestore, private navCtrl: NavController) {}

  async addCar() {
    try {
      // Generate a random ID
      const id = Math.floor(Math.random() * 1000000).toString();

      // Get userId from local storage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Korisnik nije prijavljen.');
      }

      // Prepare data for Firebase
      const carDataWithId = {
        ...this.carData,
        id: +id,
        userId: userId,
      };

      // Reference to the 'automobili' collection
      const automobiliRef = collection(this.firestore, 'automobili');

      // Add document to Firebase
      await addDoc(automobiliRef, carDataWithId);

      // Show success message or navigate back
      console.log('Automobil je uspešno dodat.');
      this.navCtrl.back();
    } catch (error: any) {
      console.error('Greška pri dodavanju automobila:', error.message);
    }
  }
}
