import { Component, OnInit, ComponentFactory, Inject} from '@angular/core';
import { LocationsService, Location } from '../locations.service'; 
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { LocationsModalEditComponent } from '../locations-modal-edit/locations-modal-edit.component';




@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

	locationsSubject: Observable<Location[]>;

	

	selectedLocation: Location;

	constructor(private locations: LocationsService, public dialog: MatDialog) {}

	ngOnInit() {
		this.read();
	}

	read() {
		this.locationsSubject = this.locations.observe();
	}

	clear() {
		this.locations.clear();
	}

	delete(index) {
		this.locations.delete(index);
	}   

    openEdit(index): void {

			this.selectedLocation = this.locationsSubject[index];
				
        let dialogRef = this.dialog.open(LocationsModalEditComponent, {
          width: '325px',
          height: '500px',
          data: this.selectedLocation
        });
    
        dialogRef.afterClosed().subscribe(result => {
				this.locations.replace(index, this.selectedLocation);
			        
        });
			}
			
	openAdd(): void {

		let empty: Location = {
			type: 'coordinates',
			lat: null,
			lng: null
		}

		let dialogRef = this.dialog.open(LocationModalComponent, {
			width: '325px',
			height: '500px',
			data: empty
		});

		dialogRef.afterClosed().subscribe(result => {
			
				this.locations.add(result);
		});
	}
}
