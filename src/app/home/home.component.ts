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


    constructor(private weatherService: WeatherService, private locationService: LocationsService) {
		
    }

	locations: Observable<Location[]>;
	
	weathersSubject: Observable<LocalWeather[]>;
    

    ngOnInit() {



		this.locations = this.locationService.observe();
		// Sets this.locations equal to the observable locations array contained in the location service
		// the observe function of locationService reterns the locationsSubject as an observable so that
		//  locations can become subscribed to it if any changes occur
		this.weathersSubject = this.locations.switchMap(locations => {
			let obs = locations.map(loc => this.weatherService.getForecastByLocation(loc));
			// Maps through the locations Observable array and passed each object to the getForecastByLocation
			// function on the weather service which inturn returns an object of objects to populate the weatherSubject
			// and display the retrieved Api requests as DOM elements
			return Observable.combineLatest(obs);
		});
      
	}
}
