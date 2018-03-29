import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { AppRoutingModule } from './/app-routing.module';
import { ForecastComponent } from './forecast/forecast.component';
import { LayoutComponent } from './layout/layout.component';
import { WeatherService } from './weather.service';
import { SettingsService } from './settings.service';
import { LocationsService } from './locations.service';


@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    SettingsComponent,
    HomeComponent,
    LocationModalComponent,
    ForecastComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    WeatherService,
    SettingsService,
    LocationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
