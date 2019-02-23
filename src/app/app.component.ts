import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { HelpComponent } from './help/help.component';
// import { AboutComponent } from './about/about.component';
// import { MatDialog } from '@angular/material';
import { ComponentTitle } from './app.component.title';

import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  componentTitle = '';
  user: Observable<firebase.User>;
  userSub: Subscription;
  routeSub: Subscription;
  showMenu = false;
  redirect: string;
  routeComp: string[];

  constructor(
    private afAuth: AngularFireAuth
  // , private dialog: MatDialog
  , private router: Router) {}

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.userSub = this.user.subscribe(appUser => this.authChangeListener(appUser, this.router));
    this.routeSub = this.router.events.subscribe(event => this.routerEventListener(event));
    this.setComponentTitle('--default--');
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

  routerEventListener(event: any): void {
    if (event instanceof NavigationEnd ) {
      this.setComponentTitle(this.router.url);
    }
  }

  setComponentTitle(route: string): void {
    this.routeComp = route.split(';', 2);
    this.componentTitle = ComponentTitle.find(ctitle => ctitle.location === this.routeComp[0]).title;
  }

  sendFeedback(): void {
    window.location.href = 'mailto:accet.93.97@gmail.com?subject=Feedback on ACCET 93-97 App';
  }

  showHelp(): void {
    // this.dialog.open(HelpComponent, {
    //   data: this.router.url
    // });
  }

  showAbout(): void {
    // this.dialog.open(AboutComponent);
  }

  signout(): void {
    this.afAuth.auth.signOut();
    sessionStorage.removeItem ('currentUser');
    sessionStorage.removeItem ('redirectUrl');
    this.showMenu = false;
    this.router.navigate(['/signin'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe && this.userSub.unsubscribe();
    this.routeSub.unsubscribe && this.routeSub.unsubscribe();
  }
}
