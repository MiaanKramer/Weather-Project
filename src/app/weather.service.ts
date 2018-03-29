import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Forecast {
	datetime: string;		// date and time of forecast
	tempMax: number;	// max temperature for the day [deg kelvin]
	tempMin: number;	// min temperature for the day [deg kelvin]
	tempAvg: number;	// avg temperature for the day [deg kelvin]
	conditions: string;  	// description of weather condition
	conditionIcon: string;   // the icon used to describe weather conditions
	windSpeed: number;	   // wind speed [m/s]
	windDirection: number;  // wind direction [degrees]
}

@Injectable()
export class WeatherService {

	constructor(private http: HttpClient) { }

	getForecastByCityId(cityId: string) : Observable<Forecast[]> {
		return;
	}
	getForecastByCoordinates(lat: number, lng: number): Observable<Forecast[]> {
		return;
	}
	getForecastByZipCode(zipCode: string): Observable<Forecast[]> {
		return;
	}
	getForecastByLocation(location: Location): Observable<Forecast[]> {
		return;		
	}
}
