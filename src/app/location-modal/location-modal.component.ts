import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { LocationsService, Location} from '../locations.service';
import { Observable } from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']

})

export class LocationModalComponent implements OnInit {

  constructor(private LocationService: LocationsService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  locations: Observable<Location[]>;

  location: Location = {
    type: "coordinates",
  };

  select: string = "coordinates";
  
  ngOnInit() {
    this.read();
  }

  add(location: Location) {
    if(location.type == "coordinates") {
      this.LocationService.addCoordinates(location.lat, location.lng);
    }
    if(location.type == "zipcode") {
      this.LocationService.addZipCode(location.cityId, location.countryCode);
    }
    if(location.type == "city_id") {
      this.LocationService.addCityId(location.cityId);
    }
  }

  read() {
    this.locations = this.LocationService.observe();
  }
}

@Component({
  selector: 'app-local-modal-edit',
  template: '',
  styleUrls: ['./location-modal.component.scss']

})

export class LocationModalEditComponent implements OnInit {
  constructor(){}

  ngOnInit() {

  }
}

@Component({
  selector: 'app-local-modal-add',
  template: '',
  styleUrls: ['./location-modal.component.scss']

})

export class LocationModalAddComponent implements OnInit {
  constructor(){}

  ngOnInit() {
    
  }
}