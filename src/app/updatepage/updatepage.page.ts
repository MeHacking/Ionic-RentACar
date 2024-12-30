import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-updatepage',
  templateUrl: './updatepage.page.html',
  styleUrls: ['./updatepage.page.scss'],
})
export class UpdatePage implements OnInit {
  carData = {
    id: '',
    godiste: null,
    kompanija: '',
    model: '',
    opis: '',
    kategorija: '',
  };

  carId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    // Preuzimanje ID-a automobila iz upita i cuvanje u this.carId
    this.carId = this.route.snapshot.queryParamMap.get('id') || '';
    if (this.carId) {
      this.loadCarData(this.carId);
    } else {
      console.error('Nema ID parametra u URL-u.');
    }
  }

  // Učitavanje podataka o automobilu
  async loadCarData(id: string) {
    try {
      const carRef = doc(this.firestore, `automobili/${id}`);
      const carSnap = await getDoc(carRef);
      
      if (carSnap.exists()) {
        this.carData = { id, ...carSnap.data() } as any;
      } else {
        console.error('Automobil sa tim ID-em nije pronađen.');
      }
    } catch (error) {
      console.error('Greška prilikom učitavanja podataka o automobilu:', error);
    }
  }

  async updateCar() {
    if (!this.carId) {
      console.error('ID automobila nije definisan.');
      return;
    }

    try {
      const { kompanija, model, opis, kategorija, godiste } = this.carData;

      if (
        typeof kompanija !== 'string' ||
        typeof model !== 'string' ||
        typeof opis !== 'string' ||
        typeof kategorija !== 'string' ||
        typeof godiste !== 'number'
      ) {
        console.error('Podaci nisu ispravnog tipa. Proverite sve unete vrednosti.');
        return;
      }

      const carRef = doc(this.firestore, 'automobili', this.carId);

      // Ažuriranje podataka
      await updateDoc(carRef, {
        kompanija,
        model,
        opis,
        kategorija,
        godiste,
      });

      console.log('Automobil uspešno ažuriran.');
      this.router.navigate(['/vasi-automobili']);
    } catch (error) {
      console.error('Greška prilikom ažuriranja automobila:', error);
    }
  }
}
