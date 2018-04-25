import { Component, Inject, OnInit } from '@angular/core';
import { Location} from '../locations.service';
import { Observable } from 'rxjs';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
  host: {
      class: 'mat-typography'
  }

})
export class LocationModalComponent implements OnInit{

    typeControl = new FormControl('', [Validators.required]);
    latControl = new FormControl(null, []);
    lngControl = new FormControl(null, []);
    zipCodeControl = new FormControl(null, []);
    countryCodeControl = new FormControl(null, []);
    cityNameControl = new FormControl(null, []);
    cityIdControl = new FormControl(null, []);

    formGroup: FormGroup = new FormGroup({
        type: this.typeControl,
        lat: this.latControl,
        lng: this.lngControl,
        zipCode: this.zipCodeControl,
        countryCode: this.countryCodeControl,
        cityName: this.cityNameControl,
        cityId: this.cityIdControl,
    });

    action = 'create';
    original = null;

    constructor(
            public dialogRef: MatDialogRef<LocationModalComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Location,
            private _snackbar: MatSnackBar,
            private _http: HttpClient
        ) {}

    ngOnInit() {

        let location: Location;

        if(this.data) {
            location = this.data;
            this.action = 'update';
        }else{
            location = {
                id: null,
                type: 'coordinates'
            };
            this.action = 'create';
        }

        this.original = location;
        this.formGroup.reset(location);
        this.updateValidators(location.type);

        this.typeControl.valueChanges.subscribe(type => {
            this.updateValidators(type);
        });

        this.formGroup.valueChanges.subscribe(value => {
        });

    }


    private updateValidators(type: string){
        this.latControl.setValidators([]);
        this.lngControl.setValidators([]);
        this.zipCodeControl.setValidators([]);
        this.countryCodeControl.setValidators([]);
        this.cityIdControl.setValidators([]);
        this.cityNameControl.setValidators([]);

        switch(type){
            case 'coordinates':
                this.latControl.setValidators([
                    Validators.required,
                    Validators.min(-90),
                    Validators.max(90),
                ]);
                this.lngControl.setValidators([
                    Validators.required,
                    Validators.min(-180),
                    Validators.max(180),
                ]);
                break;
            case 'zipCode':
                this.zipCodeControl.setValidators([
                    Validators.required
                ]);
                this.countryCodeControl.setValidators([
                    Validators.required
                ]);
                break;
            case 'cityName':
                this.cityNameControl.setValidators([
                    Validators.required
                ]);
                this.countryCodeControl.setValidators([
                    Validators.required
                ]);
                break;
        }

        this.latControl.updateValueAndValidity();
        this.lngControl.updateValueAndValidity();
        this.zipCodeControl.updateValueAndValidity();
        this.countryCodeControl.updateValueAndValidity();
        this.cityIdControl.updateValueAndValidity();
        this.cityNameControl.updateValueAndValidity();
        this.formGroup.updateValueAndValidity();

    }

    onNoClick() {
        this.dialogRef.close();
    }

    addlocation() {
        console.log(this.formGroup.valid, this.formGroup.errors);
        if(this.formGroup.valid) {
            let location = this.formGroup.value;

            if(this.original){
                location.id = this.original.id;
            }

            this.dialogRef.close(location);
            if(this.action === 'create'){
                this._snackbar.open("Location Added", null, { duration: 3000});
            }else{
                this._snackbar.open("Location Updated", null, { duration: 3000});
            }
        } else {
            this._snackbar.open("Location Invalid", null, { duration: 3000});
        }
    }

    checkLocationName(control: AbstractControl) {
        // return this.locationService
        //             .validateCity(control.value)
        //             .map(result => {
        //                 console.log('Validate City', result);
        //                 if(result) return null;
        //                 else return { invalidCity: true };
        //             });
    }

}