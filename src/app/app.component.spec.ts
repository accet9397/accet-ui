import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const testDataValidUser = {
  displayName: 'Test User',
  isAnonymous: false,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
} as firebase.User;
const testDataNullUser: firebase.User = null;

const mockAngularFireAuth: any = { authState: of(testDataValidUser) };
const mockAngularFireAuthNullUser: any = { authState: of(testDataNullUser) };

describe('AppComponent with valid user', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as component title 'ACCET 93-97'`, () => {
    expect(app.componentTitle).toEqual('ACCET 93-97');
  });

  it(`user should be valid`, () => {
    app.user.subscribe(result => {
      expect(result).toEqual(testDataValidUser);
    });
  });

  it(`showMenu should be true`, () => {
    expect(app.showMenu).toEqual(true);
  });

});

describe('AppComponent with null user', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuthNullUser }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it(`user should be null`, () => {
    app.user.subscribe(result => {
      expect(result).toEqual(testDataNullUser);
    });
  });

  it(`showMenu should be false`, () => {
    expect(app.showMenu).toEqual(false);
  });

});
