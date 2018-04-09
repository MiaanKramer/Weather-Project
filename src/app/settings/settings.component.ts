import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

export interface Settings {
  apiKey: string;
  unitType: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) {

  }

  

  ngOnInit() {
    this.settingsService.get();
  }

}
