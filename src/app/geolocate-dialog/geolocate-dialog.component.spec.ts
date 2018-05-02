import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocateDialogComponentComponent } from './geolocate-dialog-component.component';

describe('GeolocateDialogComponentComponent', () => {
  let component: GeolocateDialogComponentComponent;
  let fixture: ComponentFixture<GeolocateDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocateDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocateDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
