import { Injectable } from '@angular/core';

export interface Settings {
  apiKey: string;
  unitType: string;
}

@Injectable()

export class SettingsService {

  	constructor() { }

	set(settings: Settings)	{
		// set settings and save to local storage
	}	
	get(): Settings	{
		// get the current settings
	return;
	}		
	reset(): void	{
		// reset settings to defaults
	}			

}
