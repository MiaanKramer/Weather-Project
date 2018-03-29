import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Location {
	type: string;		// ‘C’ for cityId, ‘G’ for coordinates, ‘Z’ for zipCode
	cityId?: string;
	lat?: number;
	lng?: number;
	zipCode?: string;
	countryCode?: string;
}




@Injectable()
export class LocationsService {

  constructor(private http: HttpClient) { 

  }

  addCityId(cityId: string): void {

  }
		addCoordinates(lat: number, lng: number) : void {

    }
		addZipCode(zipCode: string, countryCode: string) : void {

    }
		add(loc: Location): void {

    }
		remove(loc: Location): void {

    }
		all(): Location[] {
      return;
    }

  

}



