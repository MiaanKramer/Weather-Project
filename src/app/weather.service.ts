import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { SettingsService } from './settings.service';
import { Location } from './locations.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Pipe } from '@angular/core';


@Injectable()
export class WeatherService {

	static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';

	constructor(
		private http: HttpClient,
		private settings: SettingsService
	){}

	getForecastByCoordinates(lat: string, lng: string): Observable<LocalWeather> {

		let location: Location = {
			type: 'coordinates',
			lat: lat,
			lng: lng
		};

		return this.requestForecast(location);
	}
	getForecastByZipCode(zipCode: string, countryCode: string): Observable<LocalWeather> {

		let location: Location = {
			type: 'zipcode',
		};

		return this.requestForecast(location);
	}

	getForecastByCityId(cityId: string): Observable<LocalWeather> {

		let location: Location = {
			type: 'city_id',
		};

		return this.requestForecast(location);
	}

	getForecastByLocation(location: Location){
		return this.requestForecast(location);
	}


	private requestForecast(location: Location){

		let settings = this.settings.get();
		let params = new HttpParams();

		params = params.append('appid', settings.apiKey);
		params = params.append('units', settings.unitType);

		if(location.type == 'coordinates'){
			params = params.append('lat', location.lat);
			params = params.append('lon', location.lng);
		}

		let url = `${WeatherService.BASE_URL}forecast`;

		return this.http.get<any>(url, {params: params}) 
				   .map(results => {

						let localWeather: LocalWeather = {
							type: location.type,
							cityName: results.city.name,
							cityId: results.city.id,
							lat: results.city.coord.lat,
							lng: results.city.coord.lon,
							zipCode: location.zipCode,
							countryCode: location.countryCode,
							forecasts: []
						};

						localWeather.forecasts = results.list.map(result => {
							return {
								dateTime: result.dt_txt,
								tempMin: result.main.temp_min,
								tempMax: result.main.temp_max,
								tempAvg: result.main.temp,
								conditions: result.weather[0].description,
								conditionIcon: result.weather[0].icon,
								windSpeed: result.wind.speed,
								windDirection: result.wind.deg,
							};
						});

						return localWeather;
				   });

	}

}

export interface Forecast {
	dateTime: string;
	tempMax: number;
	tempMin: number;
	tempAvg: number;
	conditions: string;
	conditionIcon: string;
	windSpeed: number;
	windDirection: number;
}

export interface LocalWeather extends Location {
	forecasts: Forecast[];
}

// Custom pipe temp
// https://codecraft.tv/courses/angular/pipes/custom-pipes/
