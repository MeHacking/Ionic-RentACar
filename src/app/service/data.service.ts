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
import { map, switchMap } from 'rxjs/operators';
import { query, where } from 'firebase/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';



export interface Automobil {
  id?: number;
  kompanija: string;
  opis: string;
  model: string;
  kategorija: string;
  godiste: number;
  userId?: string; 
}

export interface Korisnik {
  userId?: string;
  telefon: string;
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

  getKorisnici() {
    const korisniciRef = collection(this.firestore, 'korisnici');
    return collectionData(korisniciRef, { idField: 'id' }).pipe(
      map((korisnici: any[]) => {
        return korisnici.map(korisnik => ({
          ...korisnik,
          userId: korisnik.userId || korisnik.id 
        }));
      })
    );
  }

  getAutomobiliWithUsers() {
    const automobiliRef = collection(this.firestore, 'automobili');
    
    return collectionData(automobiliRef, { idField: 'id' }).pipe(
      switchMap((automobili: any[]) => {
        return this.getKorisnici().pipe(
          map((korisnici: any[]) => {
            return automobili.map(automobil => {
              const korisnik = korisnici.find(k => k.userId === automobil.userId);
              return {
                ...automobil,
                telefon: korisnik?.telefon || 'N/A'
              };
            });
          })
        );
      })
    );
  }
  
  


  // Create operacije

  addKorisnik(korisnik: Korisnik) {
    const korisniciRef = collection(this.firestore, 'korisnici');
    return addDoc(korisniciRef, korisnik);
  }

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
      const automobilId = String(automobil.id);
      const automobilRef = doc(this.firestore, 'automobili', automobilId); 
      const docSnap = await getDoc(automobilRef);
  
      if (!docSnap.exists()) {
        throw new Error(`Dokument sa ID-om ${automobilId} ne postoji.`);
      }
  
      // Ažuriranje dokumenta
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
