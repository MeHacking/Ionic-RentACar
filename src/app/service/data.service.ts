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
import { query, where } from 'firebase/firestore';

export interface Automobil {
  id?: number;
  kompanija: string;
  opis: string;
  model: string;
  kategorija: string;
  godiste: number;
  userId?: string; 
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

  // Read operacije (Filtriranje prema korisniku)
  getAutomobilUser() {
    const userId = localStorage.getItem('userId');  // Dobijanje ID ulogovanog korisnika iz lokalne memorije
    if (!userId) {
      throw new Error("Korisnik nije prijavljen.");
    }

    const automobiliRef = collection(this.firestore, 'automobili');
    const q = query(automobiliRef, where("userId", "==", userId));  // Filtriranje prema userId
    return collectionData(q, { idField: 'id' });
  }

  // Create operacije (Dodavanje userId kada dodaješ automobil)
  addAutomobilUser(automobil: Automobil) {
    const userId = localStorage.getItem('userId');  // Dobijanje ID ulogovanog korisnika iz lokalne memorije
    if (!userId) {
      throw new Error("Korisnik nije prijavljen.");
    }

    automobil.userId = userId;  // Dodavanje userId u dokument
    const automobilRef = collection(this.firestore, 'automobili');
    return addDoc(automobilRef, automobil);
  }

}
