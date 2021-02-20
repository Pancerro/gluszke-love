import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterpageComponent } from './starterpage.component';

describe('StarterpageComponent', () => {
  let component: StarterpageComponent;
  let fixture: ComponentFixture<StarterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
