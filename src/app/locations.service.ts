import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LocationsComponent } from './locations/locations.component';

export interface Location {

	type: 'coordinates' | 'zipcode' | 'city_id';
	cityName?: string;
	cityId?: string;
	lat?: string;
	lng?: string;
	zipCode?: string;
	countryCode?: string;

}


@Injectable()
export class LocationsService {

	private locationsSubject = new BehaviorSubject<Location[]>([]);

	private full = false;
	constructor() {
		this.read();

		if(this.locationsSubject.value.length > 0) {
			this.full = true;
		}

	}

	replace(index: number, location: Location) {
		this.locationsSubject[index].value = location;
	}

	read() {

		let storage = JSON.parse(localStorage.getItem("locations"));

		if(storage) {
			this.locationsSubject.value.push(storage);
			this.locationsSubject.next(this.locationsSubject.value);
		} else {
			this.locationsSubject.next([]);
		}
	}

	clear() {
		localStorage.setItem("locations", null);
		console.log(this.locationsSubject.value);

		this.read();
	}

	addCityId(cityId: string) : void {

		let location: Location = {

			type: "city_id",
			cityId: cityId

		}
	
		this.locationsSubject.value.push(location);
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();

	}

	addCoordinates(lat: string, lng: string) : void {

		let location: Location = {

			type: "coordinates",
			lat: lat,
			lng: lng
		}

		this.locationsSubject.value.push(location);
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();

	}

	addZipCode(zipCode: string, countryCode: string) : void {

		let location: Location  = {

			type: "zipcode",
			zipCode: zipCode,
			countryCode: countryCode
		}

		this.locationsSubject.value.push(location);
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();

	}

	add(location: Location) : void {

		this.locationsSubject.value.push(location);
		this.locationsSubject.next(this.locationsSubject.value);
		this.save();

		if(this.locationsSubject.value.length > 0) {
			this.full = true;
		} else {
			this.full = false;
		}
		
	}

	save() {

		localStorage.setItem("locations", JSON.stringify(this.locationsSubject.value));
		this.read();

	}

	observe() {

		return this.locationsSubject.asObservable();

	}

	delete(index) {

		this.locationsSubject.value.splice(index, 1);
		console.log(this.locationsSubject.value);
		this.save();

		if(this.locationsSubject.value.length > 0) {
			this.full = true;
		} else {
			this.full = false;
		}


	}
}


