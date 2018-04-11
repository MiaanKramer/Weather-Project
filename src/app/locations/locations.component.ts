import { Component, OnInit, ComponentFactory} from '@angular/core';
import { LocationsService, Location } from '../locations.service'; 
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locationsSubject: Observable<Location[]>;

constructor(private locations: LocationsService, public dialog: MatDialog) {}

editing: boolean = false;;

ngOnInit() {
  this.locationsSubject = this.locations.observe();
}

addLocation() {
	let ranLat = Math.random().toString();
	let ranLng = Math.random().toString();

	this.locations.add({
		type: 'coordinates',
		lat: ranLat,
		lng: ranLng
	});

	this.locations.save();
}

delete(index) {
	this.locations.delete(index);
}

edit(index): void {
	
}


}
