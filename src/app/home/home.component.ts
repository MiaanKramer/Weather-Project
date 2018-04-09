import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private weather: WeatherService) { }

    ngOnInit() {

        this.weather.getForecastByCoordinates('35', '139')
            .subscribe(weather => {
                console.log(weather);
            });

    }

}
