import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { WeatherService } from './weather.service';
import { SettingsService } from './settings.service';
import { LocationsService } from './locations.service';

import { SettingsComponent } from './settings/settings.component';
import { LocationsComponent } from './locations/locations.component';
import { HomeComponent } from './home/home.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LocationModalComponent } from './location-modal/location-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    LocationsComponent,
    HomeComponent,
    ForecastComponent,
    LocationModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    WeatherService,
    SettingsService,
    LocationsService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
