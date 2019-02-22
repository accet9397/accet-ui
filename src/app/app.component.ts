import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

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
  redirect: string;
  routeComp: string[];

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.userSub = this.user.subscribe(appUser => this.authChangeListener(appUser, this.router));
    this.routeSub = this.router.events.subscribe(event => this.routerEventListener(event));
  }

  authChangeListener(appUser: any, router: Router): void {
    appUser ? this.showMenu = true : this.showMenu = false;

    // Save user in sessionStorage
    sessionStorage.setItem ('currentUser', JSON.stringify(appUser));
    // Get the redirect URL from sessionStorage
    // If no redirect has been set, use the default
    this.redirect = sessionStorage.getItem('redirectUrl');
    // Redirect the user
    router.navigate([this.redirect ? this.redirect : ''], { skipLocationChange: true });
  }

  routerEventListener(event): void {
    if (event instanceof NavigationEnd ) {
      this.setComponentTitle(this.router.url);
    }
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
      // case '/myprofile': {
      //     this.componentTitle = 'My Profile';
      //     break;
      // }
      // case '/profile': {
      //     this.componentTitle = 'Profile';
      //     break;
      // }
      // case '/batchmates': {
      //     this.componentTitle = 'Batchmates';
      //     break;
      // }
      // case '/social': {
      //     this.componentTitle = 'Social Groups';
      //     break;
      // }
      // case '/celebration': {
      //     this.componentTitle = 'Birthdays & Anniversaries';
      //     break;
      // }
      // case '/event': {
      //     this.componentTitle = 'Events';
      //     break;
      // }
      // case '/settings': {
      //     this.componentTitle = 'Settings';
      //     break;
      // }
      default: {
          this.componentTitle = 'ACCET 93-97';
          break;
      }
    }
  }

  // signout(): void {
  //   this.afAuth.auth.signOut();
  //   sessionStorage.removeItem ('currentUser');
  //   sessionStorage.removeItem ('redirectUrl');
  //   this.showMenu = false;
  //   this.router.navigate(['/signin'], { skipLocationChange: true });
  // }

  ngOnDestroy() {
    this.userSub.unsubscribe && this.userSub.unsubscribe();
    this.routeSub.unsubscribe && this.routeSub.unsubscribe();
  }
}
