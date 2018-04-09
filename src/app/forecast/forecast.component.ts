import { Component, OnInit } from '@angular/core';
import { Forecast } from '../forecast/forecast.component';

export interface Forecast {
  dateTime: string;
  tempMax: number;
  tempAvg: number;
  conditions: string;
  conditionIcon: string;
  windSpeed: number;
  windDirection: number;
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
	
	constructor() {	
	}

	ngOnInit() {


	}

	changeForecast(direction: boolean, index: number) {
		if (direction) {
			// curreentForecast{} = forecasts[number + 1];
		} else {
			// curreentForecast{} = forecasts[number - 1];
		}
	}

}
