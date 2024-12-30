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
      // Generisanje id-ja
      const id = Math.floor(Math.random() * 1000000).toString();

      // Citanje id-a iz lokalne memorije 
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Korisnik nije prijavljen.');
      }

      const carDataWithId = {
        ...this.carData,
        id: +id,
        userId: userId,
      };

      const automobiliRef = collection(this.firestore, 'automobili');

      // Dodavanje dokumenta u bazu
      await addDoc(automobiliRef, carDataWithId);

      console.log('Automobil je uspešno dodat.');
      this.navCtrl.back();
    } catch (error: any) {
      console.error('Greška pri dodavanju automobila:', error.message);
    }
  }
}
