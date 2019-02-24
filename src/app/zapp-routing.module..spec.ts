import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import { AppComponent, HomeComponent, SigninComponent, routes } from './mock.component';
// import { routes } from './app-routing.module';

describe ('Routing', () => {
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        HomeComponent,
        SigninComponent,
        AppComponent
      ],
      providers: [Location]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    router.navigate(['']);
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/home');
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('p').textContent).toContain('feature works!');
  }));

});
