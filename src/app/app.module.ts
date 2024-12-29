import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

// Rad sa Firebase bazom podataka
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DeleteConfirmationModal } from './delete-confirmation-modal/delete-confirmation-modal.component';

@NgModule({
  declarations: [AppComponent, DeleteConfirmationModal],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    // Inicijalizacija Firebase aplikacije
    provideFirebaseApp(() => initializeApp(environment.firebase)),  // Ovdje koristite environment
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),  // Povezivanje Firebase Auth-a
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
