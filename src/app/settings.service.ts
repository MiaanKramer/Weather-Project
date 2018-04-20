import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class SettingsService {

	private current: Settings;

  	constructor(private _http: HttpClient) {
		this.read();
	}

	set(settings: Settings)	{
		this.current = settings;
		this.save(this.current);
	}

	get(): Settings	{
		return Object.assign({}, this.current);
	}

	reset(): void {
		this.set({
			apiKey: null,
			unitType: 'metric'
		});
	}

	validateApiKey(apiKey: string){
		return this._http.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`, {observe: 'response'})
						.catch(err => {
							return Observable.of(err);
						})
						.map(response => {
							if(response.status === 200){
								return true;
							}
							return false;
						});
	}

	private read(){

		let stored = localStorage.getItem("settings");

		if(!stored){
			this.reset();
			return;
		}

		try {
			this.current = JSON.parse(stored);
		}catch(e){
			console.warn('SettingsService: Settings invalid, resetting...')
			this.reset();
		}

	}

	private save(settings: Settings){
		localStorage.setItem("settings", JSON.stringify(settings));
	}
}

export interface Settings {
	apiKey: string;
	unitType: 'metric' | 'imperial';
}