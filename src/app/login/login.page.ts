import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicijalizacija Firebase aplikacije
    const app = initializeApp(environment.firebase);

    // Proveriti da li je korisnik već ulogovan na osnovu 'userId' u localStorage
    const userId = localStorage.getItem('userId');
    if (userId && userId !== 'izlogovan') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  async login() {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid;
      localStorage.setItem('userId', userId); // Smestanje u lokalnu memoriju
      this.isLoggedIn = true;
      this.router.navigate(['/home']);  // Preusmeravanje na stranicu nakon prijave
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async register() {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid;
      localStorage.setItem('userId', userId); // Smestanje u lokalnu memoriju
      this.router.navigate(['/home']);  // Preusmeravanje na stranicu nakon registracije
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async logout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.setItem('userId', "izlogovan"); // Brisanje iz lokalne memorije
      this.isLoggedIn = false;
      this.router.navigate(['/login']);  // Preusmeravanje na login stranicu nakon odjave
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
