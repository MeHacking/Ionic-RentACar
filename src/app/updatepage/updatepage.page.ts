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

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    const carId = this.route.snapshot.queryParamMap.get('id');
    if (carId) {
      this.loadCarData(carId);
    } else {
      console.error('Nema ID parametra u URL-u.');
    }
  }

  // Funkcija za učitavanje podataka o automobilu iz Firestore-a
  async loadCarData(id: string) {
    try {
      // Kreiramo referencu na dokument koristeći ID iz URL-a (id dokumenta Firestore-a)
      const carRef = doc(this.firestore, `automobili/${id}`);
      const carSnap = await getDoc(carRef);
      
      if (carSnap.exists()) {
        // Ako je dokument pronađen, učitaj podatke
        this.carData = { id, ...carSnap.data() } as any;
      } else {
        console.error('Automobil sa tim ID-em nije pronađen.');
      }
    } catch (error) {
      console.error('Greška prilikom učitavanja podataka o automobilu:', error);
    }
  }

  // Funkcija za ažuriranje podataka o automobilu
  async updateCar() {
    if (!this.carData.id) {
      console.error('ID automobila nije definisan.');
      return;
    }
  
    try {
      // Proveravamo tipove podataka pre nego što šaljemo u Firestore
      const { kompanija, model, opis, kategorija, godiste } = this.carData;
  
      if (typeof kompanija !== 'string' || 
          typeof model !== 'string' || 
          typeof opis !== 'string' || 
          typeof kategorija !== 'string' || 
          typeof godiste !== 'number') {
        console.error('Podaci nisu ispravnog tipa. Proverite sve unete vrednosti.');
        return;
      }
  
      // Dokument koji treba ažurirati
      const carRef = doc(this.firestore, 'automobili', this.carData.id);
  
      // Ažuriranje podataka
      await updateDoc(carRef, {
        kompanija: this.carData.kompanija,
        model: this.carData.model,
        opis: this.carData.opis,
        kategorija: this.carData.kategorija,
        godiste: this.carData.godiste,
      });
  
      console.log('Automobil uspešno ažuriran.');
      this.router.navigate(['/vasi-automobili']);
    } catch (error) {
      console.error('Greška prilikom ažuriranja automobila:', error);
    }
  }
  
}