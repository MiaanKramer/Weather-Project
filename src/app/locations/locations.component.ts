import { Component, OnInit, ComponentFactory, Inject} from '@angular/core';
import { LocationsService, Location } from '../locations.service'; 
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { locateHostElement } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locationsSubject: Observable<Location[]>;

	constructor(private locations: LocationsService, public dialog: MatDialog) {}

	selectedLocation: Location;

	ngOnInit() {
		this.locationsSubject = this.locations.observe();
		
	}

	addGeneric() {
		this.locations.add(this.locations.genericLocation);
	}

	addLocation(location: Location) {
		if(location.type == "coordinates") {
			this.locations.addCoordinates(location.lat, location.lng);
		} else if(location.type == "city_id") {
			this.locations.addCityId(location.cityId);
		} else if (location.type == "zipcode") {
			this.locations.addZipCode(location.zipCode, location.countryCode);
		}
	}

	delete(index) {
		this.locations.delete(index);
	}

	cancel(index): void {
		this.locationsSubject[index] = this.selectedLocation;
	}	

	edit(index: number) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		this.dialog.open(LocationModalEditComponent, {
			data: {location: this.locationsSubject[index]}
		});
	}

	add(index: number) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		this.dialog.open(LocationModalAddComponent, {

		});
	}
}

@Component({
	selector: 'app-local-modal-edit',
	template: `
	<div>
    <h3 mat-dialog-title>Add Location</h3>
    <mat-dialog-content>
        <select matInput [(ngModel)] = "location.type">
            <option value="coordinates">Coordinates</option>
            <option value="zipcode">Zip Code</option>
            <option value="city_id">City ID</option>
        </select>
        <br>
        <!-- Every location has a type but not every location is given coordinates of cityId and so on -->
        <div *ngIf="select == 'coordinates'">
                <!-- so based off of it being either a coordinate, cityId or zipcode its given diffrent results using ngIf -->
            <br>
                <input placeholder="Lat" matInput required [(ngModel)]="location.lat">
            <br>
                <input placeholder="Lng" matInput required [(ngModel)]="location.lng">
            <br>
        </div>
        <div *ngIf="select == 'zipcode'">
            <br>
                <input matInput required placeholder="Zip Code" [(ngModel)]="location.zipcode">
            <br>
                <input matInput required placeholder="Country Code" [(ngModel)]="location.Country">
            <br>
        </div>
        <div *ngIf="select == 'city_id'">
            <br>
                <input matInput required placeholder="City ID" [(ngModel)]="location.city_id">
            <br>
        </div>
            <mat-dialog-actions>
                <button mat-button color="primary" (click)="add(dialogResult)">ADD</button>
                <button mat-button color="primary">CANCEL</button>
            </mat-dialog-actions>
    </mat-dialog-content>
</div>`,
	styleUrls: ['./locations.component.scss']
  
  })
  
  export class LocationModalEditComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
	ngOnInit() {
  
	}
  }
  
  @Component({
	selector: 'app-local-modal-add',
	template: `
	<div>
    <h3 mat-dialog-title>Add Location</h3>
    <mat-dialog-content>
        <select matInput [(ngModel)] = "location.type">
            <option value="coordinates">Coordinates</option>
            <option value="zipcode">Zip Code</option>
            <option value="city_id">City ID</option>
        </select>
        <br>
        <!-- Every location has a type but not every location is given coordinates of cityId and so on -->
        <div *ngIf="select == 'coordinates'">
                <!-- so based off of it being either a coordinate, cityId or zipcode its given diffrent results using ngIf -->
            <br>
                <input placeholder="Lat" matInput required [(ngModel)]="location.lat">
            <br>
                <input placeholder="Lng" matInput required [(ngModel)]="location.lng">
            <br>
        </div>
        <div *ngIf="select == 'zipcode'">
            <br>
                <input matInput required placeholder="Zip Code" [(ngModel)]="location.zipcode">
            <br>
                <input matInput required placeholder="Country Code" [(ngModel)]="location.Country">
            <br>
        </div>
        <div *ngIf="select == 'city_id'">
            <br>
                <input matInput required placeholder="City ID" [(ngModel)]="location.city_id">
            <br>
        </div>
            <mat-dialog-actions>
                <button mat-button color="primary" (click)="add(dialogResult)">ADD</button>
                <button mat-button color="primary">CANCEL</button>
            </mat-dialog-actions>
    </mat-dialog-content>
</div>`,
	styleUrls: ['./locations.component.scss']
  
  })
  
  export class LocationModalAddComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
	ngOnInit() {
	  
	}
  }
