import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
  setDoc
} from '@angular/fire/firestore';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Automobil {
  id?: number;
  kompanija: string;
  opis: string;
  model: string;
  kategorija: string;
  godiste: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private firestore: Firestore) {}

  // Read operacije

  getAutomobil() {
    const automobiliRef = collection(this.firestore, 'automobili');
    return collectionData(automobiliRef, { idField: 'id' });
  }

  // Create operacije

  addAutomobil(automobil: Automobil) {
    const automobilRef = collection(this.firestore, 'automobili');
    return addDoc(automobilRef, automobil);
  }

  // Update operacije

  updateAutomobil(automobil: Automobil){
    const automobilRef = collection(this.firestore, `automobili/${automobil.id}`);
    return addDoc(automobilRef, {
    kompanija: automobil.kompanija,
    model: automobil.model,
    opis: automobil.opis,
    kategorija: automobil.kategorija,
    godiste: automobil.godiste,
    });
  }

  // Delete operacije

  deleteAutomobil(automobil: Automobil) {
    const automobilRef = doc(this.firestore, `automobili/${automobil.id}`);
    return deleteDoc(automobilRef);
  }

}
