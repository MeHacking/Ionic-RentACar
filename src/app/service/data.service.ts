
import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc, 
  addDoc
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
  model:string;
  kategorija: string;
  godiste: number;
 }
 @Injectable({
  providedIn: 'root'
})

export class DataService {
 
    constructor(private firestore: Firestore ){}
//read operacije
    getKorisnik() {
      const korisniciRef = collection(this.firestore, 'korisnici');
      return collectionData(korisniciRef, { idField: 'username' });
        }
getAutomobil() {
  const automobiliRef = collection(this.firestore, 'automobili');
  return collectionData(automobiliRef, { idField: 'id' });
    }
 // create operacije
 addKorisnik(korisnik: Korisnik) {
  const korisnikRef = collection(this.firestore, 'korisnici');
  return addDoc(korisnikRef, korisnik); 
}
addAutomobil(automobil: Automobil) {
  const automobilRef = collection(this.firestore, 'automobili');
  return addDoc(automobilRef, automobil); 
}
//update operacije


 
}
