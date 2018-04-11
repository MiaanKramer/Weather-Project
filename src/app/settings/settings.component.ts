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

  settings: Settings = null;

  ngOnInit() {
  
    this.settings = this.settingsService.get();

  }

  answer: string = '';
  answerDisplay: string = '';
  showSpinner: boolean = false;


  // basic spinner to simulate loading but no loading 
  // will be present since im working with local storage
showAnswer() {
    this.showSpinner = true;

	setTimeout(() => {
		this.answerDisplay = this.answer;
		this.showSpinner = false;
	}, 2000);
}

	reset() {
		this.settingsService.reset();
		this.settings = this.settingsService.get();
	}

	save() {
		this.settingsService.set(this.settings);
		this.showAnswer();
	}

}
