import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CoordinatesService, TransformationType, Direction} from 'angular-coordinates';
import { SettingsService, Settings } from '../settings.service';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AgmMap, AgmPolygon, AgmMarker, PolygonManager } from '@agm/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { google } from '@agm/core/services/google-maps-types';


@Component({
	selector: 'app-geolocate-dialog-component',
	templateUrl: './geolocate-dialog.component.html',
	styleUrls: ['./geolocate-dialog.component.scss']
})
export class GeolocateDialogComponent implements OnInit, AfterViewInit{

	@ViewChild(AgmPolygon)
	poly: AgmPolygon;

	@ViewChild(AgmMap)
	mapComponent: AgmMap;

	@ViewChild(AgmMarker)
	mark: AgmMarker;

	@ViewChild(PolygonManager)
	polyManager: PolygonManager;

	map = {
		markEditable: true,
		lat: 0,
		lng: 0,
		zoom: 2,
		mLat: 0,
		mLng: 0,
		apiKey: "AIzaSyABS__Tpc5IuYRGTbkFYL_0d1E1uMgRhp0"
	}

	paths = [];


	move(event, editable) {
		if(editable) {
			this.map.mLat = event.coords.lat;
			this.map.mLng = event.coords.lng;
		}
	}


	center(result) {
		this.map.lat = result.geometry.location.lat;
		this.map.lng = result.geometry.location.lng;
		this.map.zoom = 13;
		this.map.mLat = result.geometry.location.lat;
		this.map.mLng = result.geometry.location.lng;
	}

	generatePaths() {
		this.paths.push({lat: this.map.mLat - .01, lng: this.map.mLng + .012});
		this.paths.push({lat: this.map.mLat + .01, lng: this.map.mLng + .012});
		this.paths.push({lat: this.map.mLat + .01, lng: this.map.mLng - .012});
		this.paths.push({lat: this.map.mLat - .01, lng: this.map.mLng - .012});

		this.poly.paths = this.paths;
		this.poly.visible = true;
	}

	lockMarker() {
		this.generatePaths();
		this.map.markEditable = false;
		this.polyManager.addPolygon(this.poly);
	}

	searchTerm = new FormControl('');
	searhResults: Observable<any[]>;

	constructor(public dialogRef: MatDialogRef<GeolocateDialogComponent>, 
				private settingsService: SettingsService,
				private coordinatesService: CoordinatesService,
				private _http: HttpClient,
			) { }


	ngOnInit() {

		this.searhResults = 
			this.searchTerm.valueChanges
				.debounceTime(500)
				.filter(term => {
					return term.length > 2;
				})
				.switchMap(term => {

					return this._http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=' + this.map.apiKey)
					
				})
				.map(result => {
					return result.results;
				})
	}

	ngAfterViewInit() {
	}


}
