import { Injectable } from '@angular/core';
import { all } from 'q';

@Injectable()
export class SettingsService {

	current: Settings;

  	constructor() {
		  this.current = this.read();
	}

	set(settings: Settings)	{
		this.current = settings;
		this.save(this.current);
	}

	get(): Settings	{
		return this.current;
	}

	private read(){
		return {
			apiKey: localStorage.getItem('apiKey'),
			unitType: <any>localStorage.getItem('unitType')
		};
	}

	private save(settings: Settings){
		localStorage.setItem('apiKey', settings.apiKey);
		localStorage.setItem('unittype', settings.unitType);
	}

	reset(): void	{
		// reset settings to defaults
		localStorage.setItem('apiKey', '24d09d88dd8b97951eeb4f7f56da91c5');
		localStorage.setItem('unitType', 'metric')
	}

}

export interface Settings {
	apiKey: string;
	unitType: 'metric' | 'imperial';
}