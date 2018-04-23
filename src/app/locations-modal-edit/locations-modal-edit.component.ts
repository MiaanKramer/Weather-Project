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

  addLocation: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LocationsModalEditComponent>, private fb: FormBuilder, private locationService: LocationsService, private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
		this.addLocation = this.fb.group({
			"type": ["", Validators.required],
			"lat": ["", Validators.required],
			"lng": ["", Validators.required],
			"zipCode": ["", Validators.required],
			"countryCode": ["", Validators.required],
			"cityName": ["", Validators.required],
			"cityId": ["", Validators.required]
		});
     }

    selectedType = 'coordinates';

    OnNoClick(): void {
    this.dialogRef.close();
  }

  editLocation() {
      if(this.addLocation.valid) {
        this._snackbar.open("Location Updated", null, { duration: 3000 });
      } else {
        this._snackbar.open("Location Data Invalid", null, { duration: 3000});
      }
  }

  ngOnInit() { }
}

