import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversEdComponent } from './drivers-ed.component';

describe('DriversEdComponent', () => {
  let component: DriversEdComponent;
  let fixture: ComponentFixture<DriversEdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversEdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversEdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
