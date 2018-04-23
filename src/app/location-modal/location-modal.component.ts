import { Component, Inject, OnInit } from '@angular/core';
import { LocationsService, Location} from '../locations.service';
import { Observable } from 'rxjs';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackbar: MatSnackBar, private locationService: LocationsService) { 

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

  validateLatLng() {
	  let temp = 0;
	let latLng = {
		lat: false,
		latNaN: false,
		lng: false,
		lngNaN: false
	};

	try {
		temp = temp + this.addLocation.value.lat;
	} catch {
		latLng.latNaN = true;
	}
	try {
		temp = temp + this.addLocation.value.lng;
	} catch {
		latLng.lngNaN = true;
	}

	if(this.addLocation.value.lat < 90 && this.addLocation.value.lat > -90) {
		latLng.lat = true;
	}

	if(this.addLocation.value.lng < 180 && this.addLocation.value.lng > -180) {
		latLng.lng = true;
	}

	return latLng;


  }

  addlocation() {
	if(this.addLocation.valid) {
		this.locationService.add(this.addLocation.value);
		console.log(this.addLocation.value);
	} else {
		this._snackbar.open("Location Invalid", null, { duration: 3000});
	}
	this.onNoClick();
}

  ngOnInit() { }
}