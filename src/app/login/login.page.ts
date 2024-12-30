import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/data.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  phone: string = ''; 
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  isRegisterMode: boolean = false; 

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    const app = initializeApp(environment.firebase);
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = userId && userId !== 'izlogovan' ? true : false;
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = ''; 
  }

  // Handler za submit
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
      window.location.reload();
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
