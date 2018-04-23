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

	selectedLocation: Location = {
		type: "coordinates",
		cityName: "Paarl",
		lat: "-32",
		lng: "18",
		zipCode: "7646",
		countryCode: "ZA" 	
		};

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
				
        let dialogRef = this.dialog.open(LocationsModalEditComponent, {
          width: '325px',
          height: '350px',
          data: this.locationsSubject[index].value
        });
    
        dialogRef.afterClosed().subscribe((result: Location) => {
			this.locations.replace(index, result);
						        
		});
		
		this.read();
			}
			
	openAdd(): void {

		let empty: Location = {
			type: 'coordinates'
		}

		let dialogRef = this.dialog.open(LocationModalComponent, {
			width: '350px',
			height: '330px'
		});

		dialogRef.afterClosed().subscribe((result: Location) => {
				this.locations.add(result);
		});

		this.read();
	}
}
