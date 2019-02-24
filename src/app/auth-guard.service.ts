import { Injectable } from '@angular/core';
import { CanActivate
       , Router
       , ActivatedRouteSnapshot
       , RouterStateSnapshot
       , Route
       } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuardService implements CanActivate {
      constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Store the attempted URL for redirecting
    sessionStorage.setItem ('redirectUrl', state.url);

    if (this.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/signin'], { skipLocationChange: true });
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    // check if currentUser exist in sessionStorage
    return JSON.parse(sessionStorage.getItem('currentUser')) != null;
  }
}
