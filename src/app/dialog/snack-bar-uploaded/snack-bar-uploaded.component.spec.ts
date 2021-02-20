import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarUploadedComponent } from './snack-bar-uploaded.component';

describe('SnackBarUploadedComponent', () => {
  let component: SnackBarUploadedComponent;
  let fixture: ComponentFixture<SnackBarUploadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarUploadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
