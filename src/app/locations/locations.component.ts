import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service'; 
import { LocationModalComponent } from '../location-modal/location-modal.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

constructor() {}

ngOnInit() {
}
}
