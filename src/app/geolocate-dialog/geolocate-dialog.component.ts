import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CoordinatesService, TransformationType, Direction} from 'angular-coordinates';
import { SettingsService, Settings } from '../settings.service';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

@Component({
	selector: 'app-geolocate-dialog-component',
	templateUrl: './geolocate-dialog.component.html',
	styleUrls: ['./geolocate-dialog.component.scss']
})
export class GeolocateDialogComponent implements OnInit {

	settings = "AIzaSyABS__Tpc5IuYRGTbkFYL_0d1E1uMgRhp0";
	lat = 0;
	lng = 0;
	zoom = 2;
	markLat = 0;
	markLng = 0;

	searchTerm = new FormControl('');
	searhResults: Observable<any[]>;


	constructor(public dialogRef: MatDialogRef<GeolocateDialogComponent>, 
				private settingsService: SettingsService,
				private coordinatesService: CoordinatesService,
				private _http: HttpClient
			) { }


	ngOnInit() {

		this.searhResults = 
			this.searchTerm.valueChanges
				.debounceTime(500)
				.filter(term => {
					return term.length > 2;
				})
				.switchMap(term => {

					return this._http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=' + this.settings)
					
				})
				.map(result => {
					return result.results;
				})
	}

	centerLocation(result) {
		this.lat = result.geometry.location.lat;
		this.lng = result.geometry.location.lng;
		this.zoom = 15;
		this.markLat = result.geometry.location.lat;
		this.markLng = result.geometry.location.lng;
	}

	moveMarker(event) {

		this.markLat = event.coords.lat;
		this.markLng = event.coords.lng;
	}
}
