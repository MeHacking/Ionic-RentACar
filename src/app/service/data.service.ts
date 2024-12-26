import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  deleteDoc,
  addDoc,
  setDoc
} from '@angular/fire/firestore';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { query, where } from 'firebase/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';  // Modularni import



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

  async updateAutomobil(automobil: Automobil) {
    if (!automobil.id) {
      throw new Error("ID automobila nije definisan. Nemoguće je ažurirati dokument.");
    }
  
    try {
      // Ako je id broj, konvertujte ga u string pre nego što ga koristite u doc funkciji
      const automobilId = String(automobil.id); // Konvertovanje ID-a u string
  
      // Prvo, pretražujemo dokument pomoću dokument ID-a iz URL-a (Firebase dokument ID)
      const automobilRef = doc(this.firestore, 'automobili', automobilId); // ID koji se koristi za dokument
  
      // Dohvatimo dokument sa odgovarajućim ID-em
      const docSnap = await getDoc(automobilRef);
  
      if (!docSnap.exists()) {
        throw new Error(`Dokument sa ID-om ${automobilId} ne postoji.`);
      }
  
      // Ažuriramo dokument sa novim podacima
      await updateDoc(automobilRef, {
        kompanija: automobil.kompanija,
        model: automobil.model,
        opis: automobil.opis,
        kategorija: automobil.kategorija,
        godiste: automobil.godiste,
      });
  
      console.log("Automobil uspešno ažuriran.");
    } catch (error) {
      console.error("Greška prilikom ažuriranja automobila:", error);
      throw error;
    }
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
