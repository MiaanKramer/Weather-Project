import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { SettingsService } from './settings.service';
import { Location } from './locations.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Pipe } from '@angular/core';
import { count } from 'rxjs/operator/count';


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
			zipCode: zipCode,
			countryCode: countryCode
		};

		return this.requestForecast(location);
	}

	getForecastByCityId(cityName: string, countryCode: string): Observable<LocalWeather> {

		let location: Location = {
			type: 'cityName',
			cityName: cityName,
			countryCode: countryCode
		};

		return this.requestForecast(location);
	}

	getForecastByLocation(location: Location){
		return this.requestForecast(location);
	}


	private requestForecast(location: Location){

		let settings = this.settings.get();

		//  creating paramaters to be passed into the http request to refine search results
		let params = new HttpParams();

		// setting the settings of the api request according to the save settings in the settings component

		

		// adding more params to the api request based on the location type to get spesific location based on three values
		if (location.type == 'coordinates') {
			params = params.append('lat', location.lat);
			params = params.append('lon', location.lng);
			// adding params based on coordinates
		} else if (location.type == 'zipcode') {
			params = params.append('zip', location.zipCode + ',' + location.countryCode)
			// adding params based on zipcode
		} else if(location.type == 'cityName') {
			let query = location.cityName + ',' + location.countryCode;
			console.log(query);
			params = params.append('q', query);
			// adding params based on city_id
		}

		params = params.append('appid', settings.apiKey);
		params = params.append('units', settings.unitType);
		

		let url = `${WeatherService.BASE_URL}forecast`;
		

		return this.http.get<any>(url, {params: params}) 
				   .map(results => {

						let localWeather: LocalWeather = Object.assign({
							cityName: results.city.name,
							cityId: results.city.id,
							lat: results.city.coord.lat,
							lng: results.city.coord.lon,
							forecasts: []
						},);

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
