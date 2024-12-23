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

export interface Korisnik {
  ime: string;
  prezime: string;
  username: string;
  password: string;
  telefon: string;
}
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
  getKorisnik() {
    const korisniciRef = collection(this.firestore, 'korisnici');
    return collectionData(korisniciRef, { idField: 'username' });
  }

  getAutomobil() {
    const automobiliRef = collection(this.firestore, 'automobili');
    return collectionData(automobiliRef, { idField: 'id' });
  }

  // Create operacije
  addKorisnik(korisnik: Korisnik) {
    const korisnikRef = collection(this.firestore, 'korisnici');
    return addDoc(korisnikRef, korisnik);
  }

  addAutomobil(automobil: Automobil) {
    const automobilRef = collection(this.firestore, 'automobili');
    return addDoc(automobilRef, automobil);
  }

  // Update operacije
  updateKorisnik(username: string, korisnik: Partial<Korisnik>) {
    const korisnikDocRef = doc(this.firestore, `korisnici/${username}`);
    return updateDoc(korisnikDocRef, korisnik);
  }

  updateAutomobil(id: string, automobil: Partial<Automobil>) {
    const automobilDocRef = doc(this.firestore, `automobili/${id}`);
    return updateDoc(automobilDocRef, automobil);
  }

  // Delete operacije
  deleteKorisnik(username: string) {
    const korisnikDocRef = doc(this.firestore, `korisnici/${username}`);
    return deleteDoc(korisnikDocRef);
  }

  deleteAutomobil(id: string) {
    const automobilDocRef = doc(this.firestore, `automobili/${id}`);
    return deleteDoc(automobilDocRef);
  }
}

