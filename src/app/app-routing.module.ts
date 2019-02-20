import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
