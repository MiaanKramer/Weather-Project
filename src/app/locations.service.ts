import { Injectable, OnInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LocationsComponent } from './locations/locations.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Location {

	id: string;
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
	private locationsObs = this.locationsSubject.asObservable();

	constructor(private _http: HttpClient) {
		this.read();
	}

	clear() {
		localStorage.setItem("locations", '[]');
		this.locationsSubject.next([]);
	}

	add(location: Location) : void {

		location.id = generateID(10);

		this.locationsSubject.value.push(location);
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();
	}

	delete(remove: Location) {

		let next = this.locationsSubject.value.filter(loc => {
			if(loc.id === remove.id) return false;
			return true;
		});
		this.locationsSubject.next(next);
		this.save();
	}

	update(update: Location){
		let next = this.locationsSubject.value.map(loc => {
			if(loc.id === update.id) return update;
			return loc;
		});
		this.locationsSubject.next(next);
		this.save();
	}

	observe() {
		return this.locationsObs;
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

	private save() {
		localStorage.setItem("locations", JSON.stringify(this.locationsSubject.value));
	}

	private read() {

		let storage: Location[] = JSON.parse(localStorage.getItem("locations"));

		if(storage) {
			this.locationsSubject.next(storage);
		} else {
			this.locationsSubject.next([]);
		}
	}


}

function generateID(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
