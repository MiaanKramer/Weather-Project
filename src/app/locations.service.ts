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

	genericLocation: Location = {

		cityId: "London, GB",
		cityName: "London",
		countryCode: "44",
		lat: "51.5085",
		lng: "-0.1258",
		type: "coordinates",
		zipCode: "EC2V 8EX"

	}

	private locationsSubject = new BehaviorSubject<Location[]>([]);

	private location = Location;

	constructor() {
		this.read();
	 }

	read() {

		this.locationsSubject.next(JSON.parse(localStorage.getItem("locations")));
		this.save();

	}


	addCityId(cityId: string) : void {
		let location: Location = {
			type: "city_id",
			cityId: cityId
		}
		this.locationsSubject.value.push(location);
		this.save();
	}

	addCoordinates(lat: string, lng: string) : void {
		let location: Location = {
			type: "coordinates",
			lat: lat,
			lng: lng
		}
		this.locationsSubject.value.push(location);
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
	}

	all() : Location[]{

		return JSON.parse(localStorage.getItem("locations"));

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


