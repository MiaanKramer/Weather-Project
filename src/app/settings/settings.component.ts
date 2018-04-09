import { Component, OnInit } from '@angular/core';
import { SettingsService, Settings } from '../settings.service';



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
