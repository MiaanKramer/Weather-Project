import { Injectable, OnInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LocationsComponent } from './locations/locations.component';

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

	constructor() { }

	OnInit() {
		this.read();
	}

	replace(index: number, location: Location) {
		this.locationsSubject[index].value = location;
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();
	}

	read() {

		let storage = JSON.parse(localStorage.getItem("locations"));

		if(storage) {
			this.locationsSubject.value;
			this.locationsSubject.next(this.locationsSubject.value);
		} else {
			this.locationsSubject.next([]);
		}
	}

	clear() {
		localStorage.setItem("locations", null);

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
}