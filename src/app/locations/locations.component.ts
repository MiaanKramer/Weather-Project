import { Component, OnInit, ComponentFactory, Inject} from '@angular/core';
import { LocationsService, Location } from '../locations.service';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { locateHostElement } from '@angular/core/src/render3/instructions';
// import { LocationsModalEditComponent } from '../locations-modal-edit/locations-modal-edit.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

	locationsSubject: Observable<Location[]>;

	constructor(private locations: LocationsService, public dialog: MatDialog) {}

	ngOnInit() {
		this.locationsSubject = this.locations.observe();
	}

	clear() {
		this.locations.clear();
	}

	delete(location) {
		this.locations.delete(location);
	}

    openEdit(location: Location) {

        let dialogRef = this.dialog.open(LocationModalComponent, {
          width: '350px',
          height: '330px',
          data: location
		});

		dialogRef.afterClosed().subscribe(location => {
			if(location){
				this.locations.update(location);
			}
		});

	}

	openAdd() {
		let dialogRef = this.dialog.open(LocationModalComponent, {
			width: '350px',
			height: '330px'
		});

		dialogRef.afterClosed().subscribe(location => {
			if(location){
				this.locations.add(location);
			}
		});

	}
}
