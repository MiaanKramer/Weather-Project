import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsModalEditComponent } from './locations-modal-edit.component';

describe('LocationsModalEditComponent', () => {
  let component: LocationsModalEditComponent;
  let fixture: ComponentFixture<LocationsModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
