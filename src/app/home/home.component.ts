import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { WeatherService, LocalWeather, Forecast } from '../weather.service';
import { LocationsService, Location } from '../locations.service';
import { mapTo } from 'rxjs/operator/mapTo';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor(private weather: WeatherService, private location: LocationsService) {
		
    }

	locations: Observable<Location[]>;
	
	weathersSubject: Observable<LocalWeather[]>;
    

    ngOnInit() {

		this.locations = this.location.observe();

		this.weathersSubject = this.locations.switchMap(locations => {
			let obs = locations.map(loc => this.weather.getForecastByLocation(loc));

			return Observable.combineLatest(obs);
		});
      
	}
}
