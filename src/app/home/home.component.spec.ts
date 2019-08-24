import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const testData = 'Test User';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let store = {
      currentUser: {
        displayName: ''
      }
    };
    store.currentUser.displayName = testData;

    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? JSON.stringify(store[key]) : null;
      },
      // setItem: (key: string, value: string) => {
      //   store[key] = `${JSON.parse(value)}`;
      // },
      // removeItem: (key: string) => {
      //   delete store[key];
      // },
      // clear: () => {
      //   store = {
      //     currentUser: {
      //       displayName: ''
      //     }
      //   };
      // }
    };
    spyOn(sessionStorage, 'getItem')
    .and.callFake(mockSessionStorage.getItem);
    // spyOn(sessionStorage, 'setItem')
    //   .and.callFake(mockSessionStorage.setItem);
    // spyOn(sessionStorage, 'removeItem')
    //   .and.callFake(mockSessionStorage.removeItem);
    // spyOn(sessionStorage, 'clear')
    //   .and.callFake(mockSessionStorage.clear);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome message on the toolbar', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Welcome ' + testData);
  });
});
