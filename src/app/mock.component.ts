import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-signin',
  template: `Signin`
})
export class SigninComponent {
}

@Component({
  selector: 'app-home',
  template: `Home`
})
export class HomeComponent {
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
