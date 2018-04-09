import { Injectable } from '@angular/core';
import { Location } from './locations/locations.component';

import { Observable } from 'rxjs';


@Injectable()
export class LocationsService {

	Locations : Observable<Location[]>;

	constructor() { }

	addCityId(cityId: string) : void {


	}

	addCoordinates(lat: number, lng: number) : void {

	}

	addZipCode(zipCode: string, countryCode: string) : void {

	}

	add(loc: Location) : void {

	}

	all() : Location[] {
	return;
	}
}
