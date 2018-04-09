import { Component, OnInit } from '@angular/core';

export interface Location {
  type: string;
  cityId?: string;
  lat?: number;
  lng?: number;
  zipCode?: string;
  countryCode?: string;
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
