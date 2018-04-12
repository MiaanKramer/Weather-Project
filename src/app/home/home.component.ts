import { Component, OnInit } from '@angular/core';

import { WeatherService, LocalWeather } from '../weather.service';
import { LocationsService, Location } from '../locations.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor(private weather: WeatherService, private location: LocationsService) { 
      
    }

    locations: Location[];

    ngOnInit() {
      this.read();
      

    }

    read() {
      this.locations = this.location.all();

      this.locations.forEach(loc => {
        if(loc.type == "coordinates") {
          this.weather.getForecastByCoordinates(loc.lat, loc.lng);
        } else if(loc.type == "city_id") {
          this.weather.getForecastByCityId(loc.cityId);
        } else if (loc.type == "zipcode") {
          this.weather.getForecastByZipCode(loc.zipCode, loc.countryCode);
        }
      });
      
    }


    



}
