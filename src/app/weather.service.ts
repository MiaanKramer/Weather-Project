import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Forecast } from './forecast/forecast.component';
import { Settings } from './settings/settings.component';
import { Location } from './locations/locations.component';

import { Observable } from 'rxjs';


@Injectable()
export class WeatherService {

	constructor(private http: HttpClient, private settings: Settings) { }
	forecast: Observable<Forecast[]>;
	apiCall: string;

	

	getForecastByCoordinates(lat: number, lng: number): Observable<Forecast[]> {
		
		this.apiCall = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&units=metric&id=524901&APPID=' + this.settings.apiKey;
		this.http.get(this.apiCall).subscribe(data => {
			
		},
		err => {
			console.log('Error occured while loading data.')
		}
	);

		return this.forecast;

	}
	getForecastByZipCode(zipCode: string, countryCode: string): Observable<Forecast[]> {
		this.apiCall = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode + ',' + countryCode +  '&units=metric&id=524901&APPID=' + this.settings.apiKey;
		this.http.get(this.apiCall).subscribe(data => {
			
		},
		err => {
			console.log('Error occured while loading data.')
		}
	);

		return this.forecast;
	}
	getForecastByLocation(location: Location): Observable<Forecast[]> {
		this.apiCall = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + location.zipCode + ',' + location.countryCode +  '&units=metric&id=524901&APPID=' + this.settings.apiKey;
		this.http.get(this.apiCall).subscribe(data => {
			
		},
		err => {
			console.log('Error occured while loading data.')
		}
	);

		return this.forecast;
	}

	
}
