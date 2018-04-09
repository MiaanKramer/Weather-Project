import { Injectable } from '@angular/core';
import { all } from 'q';

import { Settings } from './settings/settings.component';

@Injectable()

export class SettingsService {

  	constructor() {  }

	set(settings: Settings)	{
		// set settings and save to local storage
		localStorage.setItem('apiKey', settings.apiKey);
		localStorage.setItem('unittype', settings.unitType);
	}	
	get(): Settings	{
		// get the current settings
		var settings : Settings = {
			apiKey: localStorage.getItem('apiKey'),
			unitType: localStorage.getItem('unitType')
		}

		return settings;

	}		
	reset(): void	{
		// reset settings to defaults
		localStorage.setItem('settings', '24d09d88dd8b97951eeb4f7f56da91c5');
		localStorage.setItem('unitType', '')
	}			

}
