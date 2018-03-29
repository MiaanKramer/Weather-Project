import { Component, OnInit } from '@angular/core';

import { Location } from '../locations.service';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})

export class LocationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.load();
  }

  load() {
    let location = localStorage.getItem('location-data');

    if (!Location) {
    }
  }

  

}

