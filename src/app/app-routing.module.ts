import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'vasi-automobili',
    loadChildren: () => import('./vasi-automobili/vasi-automobili.module').then( m => m.VasiAutomobiliPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addpage',
    loadChildren: () => import('./addpage/addpage.module').then( m => m.AddPageModule)
  },
  {
    path: 'updatepage',
    loadChildren: () => import('./updatepage/updatepage.module').then( m => m.UpdatepagePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
