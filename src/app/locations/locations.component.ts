import { Component, OnInit, ComponentFactory, Inject} from '@angular/core';
import { LocationsService, Location } from '../locations.service'; 
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
		
		edit = false;

		

    genericLocation: Location = {
		type: 'coordinates',
		lat: '50.25',
		lng: '16.25'
	}

	addGeneric() {
		this.locations.add(this.genericLocation);
		this.locationsSubject.map(location => {
			console.log(location);
		});
	}

	ngOnInit() {
		this.locationsSubject = this.locations.observe();
		
	}

	clear() {
		this.locations.clear();
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

    openEdit(index): void {
				this.edit = true;

				this.selectedLocation = this.locationsSubject[index];
				
        let dialogRef = this.dialog.open(LocationModalComponent, {
          width: '325px',
          height: '500px',
          data: this.selectedLocation
        });
    
        dialogRef.afterClosed().subscribe(result => {
					this.locations.replace(index, this.selectedLocation);          
        });
			}
			
		openAdd(): void {
			this.edit = false;

			let dialogRef = this.dialog.open(LocationModalComponent, {
				width: '325px',
				height: '500px'
			});

			dialogRef.afterClosed().subscribe(result => {
				this.locations.add(this.selectedLocation);
			});
		}
}
