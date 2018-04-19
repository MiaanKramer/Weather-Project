import { Component, OnInit, ComponentFactory, Inject} from '@angular/core';
import { LocationsService, Location } from '../locations.service'; 
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
    
    dialogRef;

	ngOnInit() {
		this.locationsSubject = this.locations.observe();
		
	}

	addGeneric() {
		this.locations.add(this.locations.genericLocation);
		this.locations.save();
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
    
    

    openDialog(index): void {
        this.selectedLocation = this.locationsSubject[index];

        console.log(this.selectedLocation);
        let dialogRef = this.dialog.open(LocationModalComponent, {
          width: '325px',
          data: this.selectedLocation
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The locartion has been saved');
          this.locations.add(result);
        });
      }
}
