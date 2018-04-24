import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { LocationsService, Location} from '../locations.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-locations-modal-edit',
  templateUrl: './locations-modal-edit.component.html',
  styleUrls: ['./locations-modal-edit.component.scss']
})

export class LocationsModalEditComponent {
  public location: Location;
  selectedType = 'coordinates';
  index = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {location: Location, index},
    public dialogRef: MatDialogRef<LocationsModalEditComponent>,
    private fb: FormBuilder, private locationService: LocationsService, private _snackbar: MatSnackBar,) {}


    editLocation: FormGroup = this.fb.group({
      "type": [this.data.location.type, Validators.required],
      "lat": [this.data.location.lat],
      "lng": [this.data.location.lng],
      "zipCode": [this.data.location.zipCode],
      "countryCode": [this.data.location.countryCode, Validators.minLength(2)],
      "cityName": [this.data.location.cityName]
    });

    OnNoClick(): void {
    this.dialogRef.close();
  }

  // updateLocation() {
  //     if(this.editLocation.valid) {
  //       this.locationService.replace(this.index, this.editLocation.value);
  //       this._snackbar.open("Location Updated", null, { duration: 3000 });
  //     } else {
  //       this._snackbar.open("Location Data Invalid", null, { duration: 3000});
  //     }
  // }

ngOnInit() {
  this.selectedType = this.data.location.type;
  this.index = this.data.index;
  this.location = this.data.location;

  
  
  console.log(this.data.location);
}
}

