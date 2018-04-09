import { Component, OnInit } from '@angular/core';
import { Forecast } from '../weather.service';



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
