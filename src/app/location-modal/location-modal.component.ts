import { Component, Inject, OnInit } from '@angular/core';
import { LocationsService, Location} from '../locations.service';
import { Observable } from 'rxjs';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']

})

export class LocationModalComponent {

  addLocation: FormGroup;

  type: Location = {
	  type: 'coordinates'
  }

  constructor(
    public dialogRef: MatDialogRef<LocationModalComponent>, private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any, private _snackbar: MatSnackBar, private locationService: LocationsService,
		private _http: HttpClient) { 

		this.addLocation = this.fb.group({
			"type": ["", Validators.required],
			"lat": "",
			"lng": "",
			"zipCode": "",
			"countryCode": "",
			"cityName": "",
			"cityId": ""
		});
     }

    selectedType = 'coordinates';

  onNoClick() {
	this.dialogRef.close();
	
  }

  addlocation() {
	if(this.addLocation.valid) {
		this.locationService.add(this.addLocation.value);
		this._snackbar.open("Location Added", null, { duration: 3000});
	} else {
		this._snackbar.open("Location Invalid", null, { duration: 3000});
	}
	this.onNoClick();
}

checkLocationName(control: AbstractControl) {
		return this.locationService
					.validateCity(control.value)
					.map(result => {
						console.log('Validate City', result);
						if(result) return null;
						else return { invalidCity: true };
					});
}

  ngOnInit() { }
}