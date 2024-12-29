import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/data.service'; // Dodajte ovaj import za DataService

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  phone: string = ''; // Polje za broj telefona
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  isRegisterMode: boolean = false; // Flag za switch između login i register moda

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    const app = initializeApp(environment.firebase);
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = userId && userId !== 'izlogovan' ? true : false;
  }

  // Toggle između login i register moda
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = ''; // Resetovanje greške pri promeni moda
  }

  // Handler za submit, može biti login ili register u zavisnosti od moda
  async onSubmit() {
    if (this.isRegisterMode) {
      await this.register();
    } else {
      await this.login();
    }
  }

  async login() {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid;
      localStorage.setItem('userId', userId);
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async register() {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid;
      localStorage.setItem('userId', userId);

      // Dodajemo korisnika u kolekciju "korisnici"
      await this.dataService.addKorisnik({
        userId: userId,
        telefon: this.phone,
      });

      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async logout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.setItem('userId', 'izlogovan');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
