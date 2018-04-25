import { Injectable, OnInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LocationsComponent } from './locations/locations.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Location {

	type: 'coordinates' | 'zipcode' | 'cityName';
	cityName?: string;
	lat?: string;
	lng?: string;
	zipCode?: string;
	countryCode?: string;
}

@Injectable()
export class LocationsService {

	private locationsSubject = new BehaviorSubject<Location[]>([]);

	constructor(private _http: HttpClient) { }

	OnInit() {
		this.read();
	}

	replace(index: number, location: Location) {
		this.locationsSubject[index].value = location;
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();
	}

	read() {

		let storage: Location[] = JSON.parse(localStorage.getItem("locations"));

		if(storage) {
			storage.map(location => {
				this.locationsSubject.value.push(location);
			});
			this.locationsSubject.next(this.locationsSubject.value);
		} else {
			this.locationsSubject.next([]);
		}
	}

	clear() {
		localStorage.clearItem("locations", null);
		this.read();
	}

	add(location: Location) : void {

		this.locationsSubject.value.push(location);
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();
	}

	save() {
		localStorage.setItem("locations", JSON.stringify(this.locationsSubject.value));
	}

	observe() {

		return this.locationsSubject.asObservable();
	}

	delete(index) {
		this.locationsSubject.value.splice(index, 1);
		this.save();
	}

	// Location Validation
	validateCity(city: string){
		return this._http.get(`http://aapi.openweathermap.org/data/2.5/forecast?q=${city}&&appid=24d09d88dd8b97951eeb4f7f56da91c5`, {observe: 'response'})
						.catch(err => {
							return Observable.of(err);
						})
						.map(response => {
							if(response.status === 200){
								return true;
							}
							return false;
						});
	}

	validateCountryCodeCity(city: string, countryCode: string){
		return this._http.get(`http://aapi.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&&appid=24d09d88dd8b97951eeb4f7f56da91c5`, {observe: 'response'})
						.catch(err => {
							return Observable.of(err);
						})
						.map(response => {
							if(response.status === 200){
								return true;
							}
							return false;
						});
	}

	validateCountryCodeZip(zipCode: string, countryCode: string){
		return this._http.get(`http://aapi.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&&appid=24d09d88dd8b97951eeb4f7f56da91c5`, {observe: 'response'})
						.catch(err => {
							return Observable.of(err);
						})
						.map(response => {
							if(response.status === 200){
								return true;
							}
							return false;
						});
	}

	validateLatLng(lat, lng) {

		try {
			lat = lat.parseInt;
			lng = lng.parseInt;
		} catch {
			return {NaN: true}
		}



		if(lat > 90 || lat < -90) {
			return {latExceedsBounds: true}
		}
		
		if(lng > 180 || lng < -180) {
			return {lngExceedsBounds: true}
		}

	}

}