import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocateDialogComponent } from './geolocate-dialog.component';

describe('GeolocateDialogComponentComponent', () => {
  let component: GeolocateDialogComponent;
  let fixture: ComponentFixture<GeolocateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
