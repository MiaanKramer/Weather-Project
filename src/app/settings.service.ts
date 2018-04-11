import { Injectable } from '@angular/core';
import { all } from 'q';

@Injectable()
export class SettingsService {

	private current: Settings;

  	constructor() {
		this.current = this.read();
	}

	set(settings: Settings)	{
		this.current = settings;
		this.save(this.current);
	}

	get(): Settings	{
		return Object.assign({}, this.current);
	}

	private read(){
		return JSON.parse(localStorage.getItem("settings"));
	}

	private save(settings: Settings){
		this.current = settings;
		localStorage.setItem("settings", JSON.stringify(settings));
	}

	reset(): void {
		// reset settings to defaults
		localStorage.setItem("settings", JSON.stringify({
			apiKey: '24d09d88dd8b97951eeb4f7f56da91c5',
			unitType: 'metric'
		}));
		this.current = this.read();
	}

}

export interface Settings {
	apiKey: string;
	unitType: 'metric' | 'imperial';
}