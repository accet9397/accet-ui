import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  componentTitle = 'ACCET 93-97';
  user: Observable<firebase.User>;
  userSub: Subscription;
  routeSub: Subscription;
  showMenu = false;
  currentUrl: string;
  redirect: string;
  routeComp: string[];

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    this.userSub = this.user.subscribe(appUser => this.authChangeListener(appUser, router));
    this.routeSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = this.router.url;
        this.setComponentTitle(this.currentUrl);
      }
    });
  }

  ngOnInit() { }

  authChangeListener(appUser: any, router: Router): void {
    if (appUser) {
      this.showMenu = true;
    }
    // Save user in sessionStorage
    sessionStorage.setItem ('currentUser', JSON.stringify(appUser));
    // Get the redirect URL from sessionStorage
    // If no redirect has been set, use the default
    this.redirect = sessionStorage.getItem('redirectUrl');
    // Redirect the user
    router.navigate([this.redirect ? this.redirect : ''], { skipLocationChange: true });
  }

  setComponentTitle(route: string): void {
    this.routeComp = route.split(';', 2);
    switch (this.routeComp[0]) {
      case '/signin': {
          this.componentTitle = 'ACCET 93-97';
          break;
      }
      case '/home': {
          this.componentTitle = 'ACCET 93-97';
          break;
      }
      case '/myprofile': {
          this.componentTitle = 'My Profile';
          break;
      }
      case '/profile': {
          this.componentTitle = 'Profile';
          break;
      }
      case '/batchmates': {
          this.componentTitle = 'Batchmates';
          break;
      }
      case '/social': {
          this.componentTitle = 'Social Groups';
          break;
      }
      case '/celebration': {
          this.componentTitle = 'Birthdays & Anniversaries';
          break;
      }
      case '/event': {
          this.componentTitle = 'Events';
          break;
      }
      case '/settings': {
          this.componentTitle = 'Settings';
          break;
      }
      default: {
          this.componentTitle = 'ACCET 93-97';
          break;
      }
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe && this.userSub.unsubscribe();
    this.routeSub.unsubscribe && this.routeSub.unsubscribe();
  }

  signout(): void {
    this.afAuth.auth.signOut();
    sessionStorage.removeItem ('currentUser');
    sessionStorage.removeItem ('redirectUrl');
    this.showMenu = false;
    this.router.navigate(['/signin'], { skipLocationChange: true });
  }
}
