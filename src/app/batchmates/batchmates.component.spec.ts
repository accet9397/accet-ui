import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchmatesComponent } from './batchmates.component';

describe('BatchmatesComponent', () => {
  let component: BatchmatesComponent;
  let fixture: ComponentFixture<BatchmatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchmatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
