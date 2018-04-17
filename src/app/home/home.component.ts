import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { WeatherService, LocalWeather } from '../weather.service';
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

	localWeather: Observable<LocalWeather[]>;
    

    ngOnInit() {

	this.read();
	  
    }

	read() {
		this.locations = this.location.observe();

		// this.localWeather = this.locations.map(location => {
		// 	return this.weather.typeSorter(location);
		// });

	
	};
      
      
    }
      // Basic dialog opener
  // openDialog(index) {
  //   // create a new dialog with layout provided by the locationModalCOmpoonent
  //   let dialogRef = this.dialog.open(LocationModalComponent, {
  //     // the data which the dialog uses it passed to it within this object
  //     width: "600px",
  //     data: location[index]
  //   });

  //   // results retrieved from dialog with be 
  //   //retrieved and sent to this function which will then produce a console.log to display information
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog closed: ${result}`);
  //   });
  // }
