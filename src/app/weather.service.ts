import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { SettingsService } from './settings.service';
import { Location } from './locations.service';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { Pipe } from '@angular/core';
import { count } from 'rxjs/operator/count';


@Injectable()
export class WeatherService {

	static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';

	constructor(
		private http: HttpClient,
		private settings: SettingsService
	){}

	public errorHandler = (error: HttpErrorResponse) => {
		return Observable.throw(error.message || "Server Error");
	}

	getForecastByLocation(location: Location){
		return this.requestForecast(location);
	}

	private requestForecast(location: Location){

		let settings = this.settings.get();
		let params = new HttpParams();

		if (location.type == 'coordinates') {
			params = params.append('lat', location.lat);
			params = params.append('lon', location.lng);
		} else if (location.type == 'zipcode') {
			params = params.append('zip', location.zipCode + ',' + location.countryCode)
		} else if(location.type == 'cityName') {
			let query = location.cityName + ',' + location.countryCode;
			params = params.append('q', query);
		}

		params = params.append('appid', settings.apiKey);
		params = params.append('units', settings.unitType);

		let url = `${WeatherService.BASE_URL}forecast`;
		return this.http.get<any>(url, {params: params})
				   .map(results => {

						let localWeather: LocalWeather = {
							type: location.type,
							cityName: results.city.name,
							// cityId: results.city.id,
							lat: results.city.coord.lat,
							lng: results.city.coord.lon,
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
				   }).catch(this.errorHandler);
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

export interface LocalWeather {
	forecasts: Forecast[];
	type: 'coordinates' | 'zipcode' | 'cityName';
	cityName?: string;
	lat?: string;
	lng?: string;
	zipCode?: string;
	countryCode?: string;
}